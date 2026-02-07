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


app.UseAntiforgery();

app.MapRazorComponents<App>();

app.UseBlazorStaticGenerator(!app.Environment.IsDevelopment());

app.Run();

public static class WebsiteKeys
{
    public const string GitHubRepo = "https://github.com/iAmBipinPaul/bipinpaul.com";
    public const string X = "https://x.com/iAmBipinPaul";
    public const string Title = "Bipin Paul";
    public const string BlogPostStorageAddress = $"{GitHubRepo}/tree/master/Content/Blog";
    public const string BlogLead = "A personal blog sharing insights and experiences.";
    public const string BlogPostUrl = "https://bipinpaul.com";
}
