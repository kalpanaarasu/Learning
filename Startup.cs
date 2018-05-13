using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Learning.Startup))]
namespace Learning
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
