using System;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Web;

namespace bipinpaul.com
{
    class Program
    {
        public static async Task<int> Main(string[] args)
        {
            var netlifyToken = System.Environment.GetEnvironmentVariable("NETLIFY_TOKEN");
            if (string.IsNullOrWhiteSpace(netlifyToken))
            {
                throw new Exception("NETLIFY_TOKEN is Required");
            }
            await Bootstrapper
                .Factory
                .CreateWeb(args)
                .DeployToNetlify(
                    "bipinpaul.netlify.com", netlifyToken
                )
                .RunAsync();
            return 0;
        }
    }
}
