using Microsoft.AspNetCore.Identity;
using OnlineShop.Service.Interface;
using OnlineShop.Repository.Interfaces;
namespace OnlineShop.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IdentityResult> RegisterAsync(string username, string email, string password)
        {
            return await _userRepository.RegisterAsync(username, email, password);
        }

        public async Task<SignInResult> LoginAsync(string username, string password)
        {
            return await _userRepository.LoginAsync(username, password);
        }
        public async Task<IdentityResult> AddRoleAsync(string roleName)
        {
            return await _userRepository.AddRoleAsync(roleName);
        }
        public async Task<IdentityResult> AssignRoleToUserAsync(string userId, string roleName)
        {
            return await _userRepository.AssignRoleToUserAsync(userId, roleName);
        }
    }
}
