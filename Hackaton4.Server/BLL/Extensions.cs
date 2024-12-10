using Microsoft.Extensions.DependencyInjection.Extensions;
using rusal.Server.BLL.Interfaces;
using rusal.Server.BLL.Services;

namespace rusal.Server.BLL
{
    public static class Extensions
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            return service.AddAuthServices().AddJwtServices();
        }
        private static IServiceCollection AddAuthServices(this IServiceCollection service)
        {
            service.TryAddScoped<IAuthService, AuthService>();
            return service;
        }
        private static IServiceCollection AddJwtServices(this IServiceCollection service)
        {
            service.TryAddScoped<JwtService>();
            return service;
        }
    }
}
