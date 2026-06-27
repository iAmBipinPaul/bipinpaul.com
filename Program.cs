using bipinpaul.com.Components;
using BlazorStatic;
using Microsoft.Extensions.FileProviders;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseStaticWebAssets();

builder.Services.AddBlazorStaticService(opt =>
    {
        //opt. //check to change the defaults
        opt.ShouldGenerateSitemap = true;
        opt.SiteUrl = WebsiteKeys.BlogPostUrl;
        opt.HotReloadEnabled = true;
    }
).AddBlazorStaticContentService<BlogFrontMatter>();

builder.Services.AddRazorComponents();

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
        "Content", "Blog", "media"))
});
// Serve blog media at the same path the generated site resolves to (via <base href="/">),
// so images render in local dev preview exactly as they do in production.
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
        "Content", "Blog", "media")),
    RequestPath = "/Content/Blog/media"
});


app.UseAntiforgery();

app.MapRazorComponents<App>();

// Fetch live GitHub figures once, before the static generator renders the pages,
// so the real numbers are baked into the output. Falls back to last-known values.
await GitHubStats.LoadAsync();

app.UseBlazorStaticGenerator(!app.Environment.IsDevelopment());

app.Run();

public static class WebsiteKeys
{
    public const string Username = "iambipinpaul";
    public const string GitHubProfile = "https://github.com/iambipinpaul";
    public const string GitHubRepo = $"{GitHubProfile}/bipinpaul.com";
    public const string LinkedIn = "https://www.linkedin.com/in/iambipinpaul";
    public const string X = "https://x.com/iambipinpaul";
    public const string DevTo = "https://dev.to/iambipinpaul";
    public const string Facebook = "https://www.facebook.com/iambipinpaul";
    public const string Bluesky = "https://bsky.app/profile/bipinpaul.com";
    public const string Title = "Bipin Paul";
    public const string Tagline = ".NET, Blazor, Azure, and cloud engineering from Nepal";
    public const string BlogPostStorageAddress = $"{GitHubRepo}/tree/master/Content/Blog";
    public const string BlogLead = "Practical notes on ASP.NET Core, Blazor, Azure, and implementation patterns.";
    public const string BlogPostUrl = "https://bipinpaul.com";
    public const string ResumeFilePath = "/Resume/Bipin_Paul_Resume.pdf";
    public const string ResumePageUrl = $"{BlogPostUrl}/#resume";
    public const string ResumePreviewUrl = $"{BlogPostUrl}{ResumeFilePath}";
    public const string ResumeDownloadUrl = ResumePreviewUrl;
}
