using System.Security.Claims;

namespace OnlineShop.Service.Implementation
{
    internal class UserManager<T>
    {
        internal async Task<IEnumerable<ClaimsIdentity?>> GetRolesAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }
    }
}