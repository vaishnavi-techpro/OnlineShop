using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OnlineShop.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterAsync(string username, string email, string password);
        Task<SignInResult> LoginAsync(string username, string password);
        Task<IdentityResult> AddRoleAsync(string roleName);
        Task<IdentityResult> AssignRoleToUserAsync(string userId, string roleName);
    }
}
