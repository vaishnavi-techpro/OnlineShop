using Microsoft.AspNetCore.Identity;

namespace OnlineShop.Service.Interface
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterAsync(string username, string email, string password);
        Task<SignInResult> LoginAsync(string username, string password);
        Task<IdentityResult> AddRoleAsync(string roleName);
        Task<IdentityResult> AssignRoleToUserAsync(string userId, string roleName);
    }
}
