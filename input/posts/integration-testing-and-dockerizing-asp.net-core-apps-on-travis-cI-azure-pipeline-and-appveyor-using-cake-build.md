Title: Integration  Testing and  dockerizing  asp.net core apps on Travis CI,  Azure pipeline and appveyor using cake build.
Published: 01/07/2019  
Tags:  
  - Cake build   
  - Travis CI  
  - AppVeyor  
  - Azure Pipeline  
  - Aspnetcore  
  - Dotnet  
  - Docker    
---  
When we are working on some open source project we often have to build the same project on multiple CI server and every CI server have theirs  own configuration file  and it doesn't make sense to write the different file to do the same tasks.  

Here comes Cake build, which uses roslyn under the hood.  

You may be not familiar with Cake build, This this the Official definition   

> Cake (C# Make) is a cross-platform build automation system with a C# DSL for tasks such as compiling code, copying files and folders, running unit tests, compressing files and building NuGet packages.  

In order to work with cake we need to have cake build file, normally it’s build.cake. In this file we can define the different task that will performed the way it is defined. We can make some task dependent on another task. Suppose `Task A` is dependent on `task B` then First `task B` and then `task A` will execute.  

Example   

```csharp
Task("Restore")
    .Does(() =>
{
    DotNetCoreRestore(Paths.SolutionFile.FullPath);
}); 
	
Task("Build")
    .IsDependentOn("Restore")
    .Does(() =>
{
    DotNetCoreBuild(
        Paths.ProjectFile.FullPath,
        new DotNetCoreBuildSettings
        {
            Configuration = configuration
        });
});
```  

In the above example, when the target is set as `Build` it will run the Task `Restore` before the Task `Build`.  
So defining the order of execution of task is much easier.

[Visit document site if you want to know more](https://cakebuild.net/docs/) It also support addins and we can also use nuget package which makes it more powerful.

The project that I’m going to use is simple which also illustrates integration testing.  
 
## What we have in project. 
We have asp.net core application with one entity called `Person` which returns a list of person form the home controller as json data.  
##  Testing Setup  
For testing purpose I’m using nUnit.
Project structure contains one ASP.NET Core application with just one endpoint that returns the list of person from the database. 
 
I have one seed project that seeds the database with 100 person. It has a class called `Data` with a method called `CreateData`.It takes DbContext as argument so while running the console application independently it seeds the data to the database. I am using this `CreateData` to seed that data for testing as well. 
 
Method that seedes the database.
 
```csharp 
namespace AspNetCoreDevOps.Seeder
{
    public class Data
    {
        public static void CreateData(ApplicationDbContext _context)
        {
            var users = Builder<Person>.CreateListOfSize(1000)
                .All()
                .With(c => c.Id = 0)
                .With(c => c.Name = Name.First())
                .With(c => c.Surname = Name.Last())
                .Build();

            _context.People.AddRange(users);
            _context.SaveChanges();
        }
    }
}
``` 
 
For testing I have two project `AspNetCoreDevOps.Tests.Core` and `AspNetCoreDevOps.Controllers.Tests`.

`AspNetCoreDevOps.Tests.Core` has class BaseIntegrationTests.cs which handles creation and seeding of database before starting a test case and deleting the database after finishing a test case. 
 
```csharp
namespace AspNetCoreDevOps.Tests.Core
{
    public abstract class BaseIntegrationTests
    {
        protected ApplicationDbContext Context;

        public virtual void SetUp()
        {
            var helper = new Helper();
            var result = helper.GetContextAdnUserManager();
            Console.WriteLine("Deleting database");
            result.Database.EnsureDeleted();

            Context = result;


            Console.WriteLine("Applying Migrations");
            result.Database.Migrate();

            Console.WriteLine("Making sure database is created ");
            result.Database.EnsureCreated();

            Console.WriteLine("Going to save the data ");


            Data.CreateData(result);
            Console.WriteLine("Adding Data into database");
            result.SaveChanges();

            Console.WriteLine("Database successfully seeded");
            var totalTopic = result.People.ToList();
            Console.WriteLine($"Total People seeded is {totalTopic.Count()}");
        }

        [TearDown]
        public virtual void TearDown()
        {
            Context.Database.EnsureDeleted();
        }
    }
}
``` 
 
Here `setup` method will create the database and seed the initial data and `TearDown` method will delete the database after finishing a test case. 
 
The other project `AspNetCoreDevOps.Controllers.Tests` has class BaseControllerTests.cs that creates host server, test server and a test client for testing. 

```csharp 
namespace AspNetCoreDevOps.Controllers.Tests
{
    public class BaseControllerTests : BaseIntegrationTests
    {
        protected HttpClient Client, Client2;

        protected TestServer Server;

        public override void SetUp()
        {
            base.SetUp();
            Server = new TestServer(new WebHostBuilder()
                .UseConfiguration(new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json")
                    .Build()
                )
                .UseStartup<Startup>());
            Client = Server.CreateClient();
            Client.BaseAddress = new Uri("https://localhost");
            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
    }
} 
``` 
This class inherits from BaseIntegrationTests to create and seed the database. 
 
Here we have one HomeControllerTests class that inherits from  BaseControllerTests. It has SetUp() and GetPeopleSucessFullyAsync() method.
SetUp() method calls the base class to prepare the database, test server and client.
GetPeopleSucessFullyAsync() calls the Api to get the list of people and compare it to the expected value. 
 
```csharp
 namespace AspNetCoreDevOps.Controllers.Tests.IntegrationTests
{
    [TestFixture]
    internal class HomeControllerTests : BaseControllerTests
    {
        [SetUp]
        public override void SetUp()
        {
            base.SetUp();
        }

        [Test]
        public async Task GetPeopleSuccessfullyAsync()
        {
            var response = await Client.GetAsync("Home/index");
            var people = new List<Person>();
            Assert.That(response.IsSuccessStatusCode, Is.EqualTo(true));
            if (response.IsSuccessStatusCode)
            {
                var af = await response.Content.ReadAsStringAsync();
                people = JsonConvert.DeserializeObject<List<Person>>(af);
            }

            Assert.That(people.Count, Is.EqualTo(1000));
        }
    }
} 
``` 
 
We have one docker compose file which pulls and run the postgreSQL image.
```yml
version: '3'

services:
  db:
    image: postgres
    container_name: travis_db
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=1q2w3e
      - POSTGRES_DB=travisdb
    ports:
      - "1234:5432" 
``` 
The test use postgreSQL as database so we are testing here against real database. 

We also have another dockerfile that builds multi part image for our api project. 
```yml
FROM microsoft/dotnet:2.2.100-sdk-alpine3.8 AS buildimg
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet build
WORKDIR /app/src/AspNetCoreDevOps.Api
RUN dotnet publish -c  Release -o output

FROM microsoft/dotnet:2.2.0-aspnetcore-runtime-alpine3.8
WORKDIR output
COPY --from=buildimg /app/src/AspNetCoreDevOps.Api/output .
ENTRYPOINT ["dotnet","AspNetCoreDevOps.Api.dll"] 
``` 
 
For the cake build, we can use either bootstrapper powershell or bash file to download all required files including cake build from nuget. Or we can use dotnet global tools that will do all these stuff which I will be using in this post. 
 
We can install cake global tools running the following commands  
``` 
dotnet tool install -g Cake.Tool 
``` 
We also have one cake.config file, where we can configure which nuget feed to use, where it will store the nuget package and other stuff. 
 
This is how the file looks.
``` 
; This is the default configuration file for Cake.
; This file was downloaded from https://github.com/cake-build/resources

[Nuget]
Source=https://api.nuget.org/v3/index.json
UseInProcessClient=true
LoadDependencies=false

[Paths]
Tools=./caketools
Addins=./caketools/Addins
Modules=./caketools/Modules

[Settings]
SkipVerification=false 
``` 
 
We now have our cake config file, so we can move to creating build.cake file which will define all the steps for the testing, building and pushing docker images to the docker hub. 
 
> For the simplicity I have used path.cake and projectInfo.cake which have static class, method and variable that provides some basic information like solution name, which Docker hub repository to push and others. We can do this in main build.cake file as well. 
 
path.cake  
```csharp

public static class Paths
{
    public static FilePath SolutionFile => "AspNetCoreDevOps.sln";
    public static FilePath ProjectFile => "src/AspNetCoreDevOps.Api/AspNetCoreDevOps.Api.csproj";
    public static FilePath TestProjectFile => "test/AspNetCoreDevOps.Controllers.Tests/AspNetCoreDevOps.Controllers.Tests.csproj";
}
public static FilePath Combine(DirectoryPath directory, FilePath file)
{
    return directory.CombineWithFilePath(file);
}

``` 
 
projectInfo.cake  
```csharp
public static class Docker
{
    public static string  Username ="iambipinpaul";
    public static string  Repository ="aspnet-core-devops";
}
``` 
 
Our buid.cake file builds the solution, test it and on success it push the image to the docker hub. 
 
On the first line we are referencing our helpers cake files from where we will get project/solution to build. We are also adding docker addon so that we can use docker cli in our cake build file . 
```csharp
#load cake/paths.cake  
#load cake/projectInfo.cake  
#addin "Cake.Docker  
``` 
 
I’m tagging the docker images based on the branch and build id. So we need to get the branch from the build server but different server has different way to get the branch and build id. Lucky, it does provide the wrapper for all the major CI servers  
 
```csharp 
var buildId ="";
var branch="";
if(BuildSystem.TFBuild.IsRunningOnVSTS)
{
   branch= $"VSTS{BuildSystem.TFBuild.Environment.Repository.Branch}";
   buildId= (BuildSystem.TFBuild.Environment.Build.Id).ToString();
}
if(BuildSystem.AppVeyor.IsRunningOnAppVeyor)
{     branch=$"AppVeyor{BuildSystem.AppVeyor.Environment.Repository.Branch}";
      buildId= BuildSystem.AppVeyor.Environment.Build.Id; 
}

if (BuildSystem.TravisCI.IsRunningOnTravisCI)
{          
     branch= $"TravisCI{BuildSystem.TravisCI.Environment.Build.Branch}";            
     buildId= BuildSystem.TravisCI.Environment.Build.BuildId;
}
if(string.IsNullOrEmpty(buildId))
{
    buildId="github-action";
    branch="master";
} 
``` 
We have two variable here, buildId and branch, at time of writing this post there was no wrapper available for the Github Actions. So, I have hardcoded branch and buildId.Remaining part of the file contains cake task that builds and tests. It also builds the docker and push it to docker hub. 
 
>  We can use environment variable in our cake file like this. 
```csharp
var dockerPassword = EnvironmentVariable("DOCKER_PASSWORD"); 
here we are passing the envornment varialbe name “DOCKER_PASSWORD” and it assign this to dokcerPassword  varaiable.
``` 
 
So our complete build.cake looks like this. 
 
```csharp 
#load cake/paths.cake 
#load cake/projectInfo.cake  
#addin "Cake.Docker"

var target = Argument("target", "DockerPush");
var configuration = Argument("configuration", "Release");
var buildId ="";
var branch="";
if(BuildSystem.TFBuild.IsRunningOnVSTS)
{
   branch= $"VSTS{BuildSystem.TFBuild.Environment.Repository.Branch}";
   buildId= (BuildSystem.TFBuild.Environment.Build.Id).ToString();
}
if(BuildSystem.AppVeyor.IsRunningOnAppVeyor)
{     branch=$"AppVeyor{BuildSystem.AppVeyor.Environment.Repository.Branch}";
      buildId= BuildSystem.AppVeyor.Environment.Build.Id; 
}

if (BuildSystem.TravisCI.IsRunningOnTravisCI)
{          
     branch= $"TravisCI{BuildSystem.TravisCI.Environment.Build.Branch}";            
     buildId= BuildSystem.TravisCI.Environment.Build.BuildId;
}
if(string.IsNullOrEmpty(buildId))
{
    buildId="github-action";
    branch="master";
}
Task("DockerCompose")
.Does(() => {
   DockerComposeUp(new DockerComposeUpSettings{ForceRecreate=true,DetachedMode=true,Build=true});   
});


Task("DockerLogin")
.IsDependentOn("Test")
.Does(() => {   
  var dockerPassword = EnvironmentVariable("DOCKER_PASSWORD");
        if(string.IsNullOrEmpty(dockerPassword))
        {
            throw new Exception("Could not get dockerPassword environment variable");
        }
   DockerLogin(new DockerRegistryLoginSettings{Password=dockerPassword,Username=Docker.Username});   
});


Task("DockerBuild")
 .IsDependentOn("DockerLogin")
.Does(() => {
    string [] tags = new string[]  { $"{Docker.Username}/{Docker.Repository}:{buildId}"};
    DockerBuild(new DockerImageBuildSettings{Tag=tags},".");   
});


Task("DockerTag")
   .IsDependentOn("DockerBuild")
    .Does(() => {      
 bool IsVSTSMasterBrach = StringComparer.OrdinalIgnoreCase.Equals("VSTSmaster", branch);
 string tag="";
if(IsVSTSMasterBrach && BuildSystem.TFBuild.IsRunningOnVSTS)
{
tag="latest";
}else
{    
   tag=$"{branch}-{buildId}";
}
   DockerTag($"{Docker.Username}/{Docker.Repository}:{buildId}",$"{Docker.Username}/{Docker.Repository}:{tag}");   
});

Task("DockerPush")
    .IsDependentOn("DockerTag")
    .Does(() => {     
   DockerPush($"{Docker.Username}/{Docker.Repository}");   
});


Task("Restore")
    .Does(() =>
{
    DotNetCoreRestore(Paths.SolutionFile.FullPath);
}); 
	
Task("Build")
    .IsDependentOn("Restore")
    .Does(() =>
{
    DotNetCoreBuild(
        Paths.ProjectFile.FullPath,
        new DotNetCoreBuildSettings
        {
            Configuration = configuration
        });
});
Task("Test")
    .IsDependentOn("DockerCompose")
    .IsDependentOn("Restore")    
    .Does(() =>
{
    DotNetCoreTest(Paths.TestProjectFile.FullPath);
});
RunTarget(target); 
``` 
> Note RunTarget(target) should be at the last of the build.cake file. We can define which target to run in the beginning of the file or we can override by passing it when running the build. 
 
### Now to run this project on CI server we need to have separate yml file related to server that will tell the server which  service it needs and how to execute the cake build. 
 
## For the Travis CI (`.travis.yml`) 
```yml 
dist: xenial 
sudo: required 
language: csharp 
mono: none 
dotnet: 2.2.101 
solution: AspNetCoreDevOps.sln 
services: 
- docker 
script: 
- dotnet tool install -g Cake.Tool  
- export PATH=$HOME/.dotnet/tools:$PATH 
- dotnet cake build.cake  
``` 
Here we are also installing the dotnet global tools for the cake build and adding that to the path. At the last line we are executing our cake build to run the `build.cake` file. 

``` 
dotnet cake build.cake 
``` 
## For the AppVeyor (`.appveyor.yml`) 
 
```yml
version: '1.0.{build}' 
image: ubuntu 
environment: 
DOTNET_SKIP_FIRST_TIME_EXPERIENCE: 1 
DOTNET_CLI_TELEMETRY_OPTOUT: 1 
services: 
- docker 
install: 
- sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
- sudo chmod +x /usr/local/bin/docker-compose 
- wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb 
- sudo dpkg -i packages-microsoft-prod.deb 
- sudo apt-get install apt-transport-https 
- sudo apt-get update 
- sudo apt-get -y install dotnet-sdk-2.2 
# Install repo specific stuff here 
before_build: 
- dotnet tool install -g Cake.Tool 
build_script: 
- dotnet cake build.cake 
deploy: off  
``` 
  
At the time of writing this post .net core 2.2 is not pre-installed on the appveyor but project is targetting the .net core 2.2 so I had to install this manually. Appveyor had 2.1 installed and since global tools is supported 2.1 on wards, we don’t have to add global tolls to the path. 
 
## For the Azure Pipline (`.appveyor.yml`)  
```yml
pool:
   vmImage: 'Ubuntu 16.04'   
variables:
   buildConfiguration: 'Release' 
steps:
  - task: DotNetCoreInstaller@0
    inputs:
       version: '2.2.100' # replace this value with the version that you need for your project
  - script: |
       dotnet tool install -g Cake.Tool
       dotnet cake build.cake 
``` 
On azure pipeline, at the time of writing this post there was no pre installed version of .net 2.2 so I had to install it using DotnetCoreInstaller but we don’t have to import global tools to path as 2.1 is already installed, and global tolls is supported by 2.1 on wards. 
 
> On our local machine we don’t have to add that to the path as per the current limitation we have to close the cmd and open again to add that to the path automatically but we can not do that on ci server so we have to add that manually to that path. 
 
source code.
[https://github.com/iAmBipinPaul/AspNetCoreDevOps/](https://github.com/iAmBipinPaul/AspNetCoreDevOps/)
 
Thank you !\
Happy Coding ! 


