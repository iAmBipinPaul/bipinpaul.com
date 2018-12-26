Title: Continuous integration and Continuous deployment of Blazor application to GitLab page.
Published: 7/23/2018
Tags:
  - JavaScript
  - Blazor
  - Aspnetcore
  - Dotnet
  - Web Hosting
---

> It only works with blazor 0.5 + version as GitLab uses linux and there was some issue related to copying files from wwwroot
> folder on linux machine. ([Github issue](https://github.com/aspnet/Blazor/pull/1018))
> If you are reading this post means you are already familiar with Blazor if not There are pretty awesome article out there that
> defines blazor in clear way. In short as per the official repository 
> ***Blazor is an experimental .NET web framework using C#/Razor and HTML that runs in the browser with WebAssembly***

To know more about what blazor and all the stuff related to it visit Blazor [GitHub repo](https://github.com/aspnet/Blazor) , [awesome-blazor repo](https://github.com/AdrienTorris/awesome-blazor) and [official documentation site](https://blazor.net/).

If you have already up and running blazor application you are good to go along, if not visit official documentation to setup and configure blazor on your machine.

> Link of official documentation to get started with Blazor\
> [Get started with Blazor](https://blazor.net/)

When you will host your blazor application on your GitLab or GitHub , It will treat that as a multiple page application and most of the file will not found and it will return 404 file not found when browser makes request for files so we need to have to 404.html files in our root level of the production build file inside dist folder and we also need to modify our index.html.

# Step 1 : Add 404.html

So basically when running dotnet cli to generate build file it will also copy everything from wwwroot folder to the dist , so we will create 404.html file in wwwroot folder of our project, with the following content so that it will copy that to dist folder when running dotnet cli for publish.

```<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub/GitLab Pages</title>
    <script type="text/javascript">
        // Single Page Apps for GitHub/GitLab Pages
        // https://github.com/rafrex/spa-github-pages
        // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
        // ----------------------------------------------------------------------
        // This script takes the current url and converts the path and query
        // string into just a query string, and then redirects the browser
        // to the new url with only a query string and hash fragment,
        // e.g. http://www.foo.tld/one/two?a=b&c=d#qwe, becomes
        // http://www.foo.tld/?p=/one/two&q=a=b~and~c=d#qwe
        // Note: this 404.html file must be at least 512 bytes for it to work
        // with Internet Explorer (it is currently > 512 bytes)
        // If you're creating a Project Pages site and NOT using a custom domain,
        // then set segmentCount to 1 (enterprise users may need to set it to > 1).
        // This way the code will only replace the route part of the path, and not
        // the real directory in which the app resides, for example:
        // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
        // https://username.github.io/repo-name/?p=/one/two&q=a=b~and~c=d#qwe
        // Otherwise, leave segmentCount as 0.
        var segmentCount = 0;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
            l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
            (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body>
</body>
</html>
```
# Step 2 : Modifying our index.html file

As I mentioned before we also have to modify our index.html file. Add following JavaScript in our index.html file just below the

```
<app>Loading.. </app>
```

```<!-- Start Single Page Apps for GitHub/GitLab Pages -->
    <script type="text/javascript">
        // Single Page Apps for GitHub/GitLab Pages
        // https://github.com/rafrex/spa-github-pages
        // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
        // ----------------------------------------------------------------------
        // This script checks to see if a redirect is present in the query string
        // and converts it back into the correct url and adds it to the
        // browser's history using window.history.replaceState(...),
        // which won't cause the browser to attempt to load the new url.
        // When the single page app is loaded further down in this file,
        // the correct url will be waiting in the browser's history for
        // the single page app to route accordingly.
        (function (l) {
            if (l.search) {
                var q = {};
                l.search.slice(1).split('&').forEach(function (v) {
                    var a = v.split('=');
                    q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
                });
                if (q.p !== undefined) {
                    window.history.replaceState(null, null,
                        l.pathname.slice(0, -1) + (q.p || '') +
                        (q.q ? ('?' + q.q) : '') +
                        l.hash
                    );
                }
            }
        }(window.location))
    </script>
    <!-- End Single Page Apps for GitHub/GitLab Pages -->
```

Now everything configured , our file structure should be as shown in the image below.

![solution view](images/solution-view.png)

after modifying our index.html file, index.html should be like this.

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>Blazor.CICD</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
</head>
<body>
    <app>Loading...</app>

    <!-- Start Single Page Apps for GitHub/GitLab Pages -->
    <script type="text/javascript">
        // Single Page Apps for GitHub/GitLab Pages
        // https://github.com/rafrex/spa-github-pages
        // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
        // ----------------------------------------------------------------------
        // This script checks to see if a redirect is present in the query string
        // and converts it back into the correct url and adds it to the
        // browser's history using window.history.replaceState(...),
        // which won't cause the browser to attempt to load the new url.
        // When the single page app is loaded further down in this file,
        // the correct url will be waiting in the browser's history for
        // the single page app to route accordingly.
        (function (l) {
            if (l.search) {
                var q = {};
                l.search.slice(1).split('&').forEach(function (v) {
                    var a = v.split('=');
                    q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
                });
                if (q.p !== undefined) {
                    window.history.replaceState(null, null,
                        l.pathname.slice(0, -1) + (q.p || '') +
                        (q.q ? ('?' + q.q) : '') +
                        l.hash
                    );
                }
            }
        }(window.location))
    </script>
    <!-- End Single Page Apps for GitHub/GitLab Pages -->
    
    <script src="_framework/blazor.webassembly.js"></script>
</body>
</html>
```
> Hosting SPA on GitHub is a project on [GitHub](https://github.com/rafrex/spa-github-pages) and we are leveraging this project technique to host our page on GitLab.

Till now we were just configuring our blazor application so that ,if we will run dotnet cli to publish it will also include 404.html and modified index.html in production build file.

> [Visit here , to know more about hosting and publishing blazor application](https://blazor.net/docs/host-and-deploy/index.html)

# Step 3 : Add gitlab-ci.yml at root level of solution

now we need one file that will tell GitLab build runner to perform build , deploy , tests and all. File name should be **.gitlab-ci.yml*** and place this file at root level of solution folder and save the file with the following content.

```
image:  microsoft/dotnet:2.1.302-sdk

before_script:
  - dotnet restore
  
pages:
  stage: deploy
  script:
  - mkdir public
  - dotnet publish -c Release -o output
  - cp -a ./Blazor.CICD/output/Blazor.CICD/dist/* ./public
  artifacts:
    paths:
    - public
  only:
  - master
```

in the above ***.gitlab-ci.yml*** file.

on line 9 : we are using dotnet cli to publish the build file to ***output*** folder

on line 11 : we are copying our files of to the public folder and
> (replace ***Blazor.CICD*** with project name)

on line 14 : we are saying that content of ***public*** folder needs to be deployed.

commit the change and GitLab will trigger the build and after building we should be able to see the blazor application live on 
*** <yourGitLabUserName>.gitab.io ***

> NOTE
> It only works for the repository with name ***`<yourGitLabUserName>.gitlab.io`*** , it should work for other repository as well but 
> unfortunately it doesn’t. It is always looking for the files such as site.css, on ***`<yourGitLabUserName>`*** .gitlab.io in fact it should 
> look at ***`<yourGitLabUserName>.gitlab.io/<repository_name>`***

Feel free to comment and suggests changes .

Full source code on [GitLab](https://gitlab.com/iAmBipinPaul/Blazor.CICD)

Happy Coding!
