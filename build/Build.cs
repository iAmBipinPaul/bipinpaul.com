using System;
using NetlifySharp;
using Nuke.Common;
using Nuke.Common.Execution;
using Nuke.Common.Git;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tools.GitVersion;
using static Nuke.Common.IO.PathConstruction;

[CheckBuildProjectConfigurations]
[UnsetVisualStudioEnvironmentVariables]
class Build : NukeBuild
{
   
    public static int Main() => Execute<Build>(x => x.Deploy);

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild ? Configuration.Debug : Configuration.Release;

    [Solution] readonly Solution Solution;
    [GitRepository] readonly GitRepository GitRepository;
    [GitVersion] readonly GitVersion GitVersion;
    AbsolutePath OutputDirectory => RootDirectory / "output";
    [Parameter("Netlify access token for packages")]
    readonly string NetlifyAccessToken;
    Target Deploy => _ => _
        .Executes(() => 
        {
            Console.WriteLine(RootDirectory.ToString());
            var netlifyToken = NetlifyAccessToken;
            if (string.IsNullOrEmpty(netlifyToken))
            {
                throw new Exception("Could not get Netlify token environment variable");
            }
            Console.WriteLine(OutputDirectory.ToString());
            var client = new NetlifyClient(netlifyToken);
            client.UpdateSite($"bipinpaul.netlify.com", OutputDirectory.ToString()).SendAsync().Wait();
        });

}
