
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.DTO;
using OnlineShop.Models;
using OnlineShop.Repository.Interfaces;

namespace OnlineShop.Repository.Implementation
{
    public class ProductCategoriesRepository: IProductCategoriesRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoriesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductCategories>> GetAllAsync()
        {
           
            return await _context.ProductCategories.ToListAsync();
        }

    }
}
