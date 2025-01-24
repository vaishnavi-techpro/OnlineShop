using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineShop.Models;

namespace OnlineShop.Repository.Interfaces
{
    public interface IProductCategoriesRepository
    {

        Task<IEnumerable<ProductCategories>> GetAllAsync();
       
    }
}
