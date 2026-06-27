using System.Net.Http.Headers;
using System.Text.Json;

/// <summary>
/// Holds GitHub figures fetched once at build time and baked into the static HTML.
/// Values default to the last-known counts so the site still renders if the API
/// is unreachable during generation.
/// </summary>
public static class LiveStats
{
    /// <summary>Stars on the canonical Krafter repository (AditiKraft/Krafter).</summary>
    public static int KrafterStars { get; set; } = 90;
}

/// <summary>
/// Fetches live GitHub numbers during static generation. Runs in Program.cs
/// before the BlazorStatic generator renders the pages.
/// </summary>
public static class GitHubStats
{
    private const string KrafterRepo = "AditiKraft/Krafter";

    public static async Task LoadAsync()
    {
        var stars = await TryGetStarsAsync(KrafterRepo);
        if (stars is > 0)
        {
            LiveStats.KrafterStars = stars.Value;
        }
    }

    private static async Task<int?> TryGetStarsAsync(string repo)
    {
        try
        {
            using var http = new HttpClient { Timeout = TimeSpan.FromSeconds(8) };
            http.DefaultRequestHeaders.UserAgent.ParseAdd("bipinpaul.com-build");
            http.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github+json");

            // Use the CI token when available to lift the unauthenticated rate limit.
            var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN");
            if (!string.IsNullOrWhiteSpace(token))
            {
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            await using var stream = await http.GetStreamAsync($"https://api.github.com/repos/{repo}");
            using var doc = await JsonDocument.ParseAsync(stream);

            if (doc.RootElement.TryGetProperty("stargazers_count", out var element)
                && element.TryGetInt32(out var stars))
            {
                return stars;
            }
        }
        catch
        {
            // Network/API failure during generation: keep the fallback value.
        }

        return null;
    }
}
