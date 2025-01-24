using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.DTO;
using OnlineShop.Models;
using OnlineShop.Repository.Interfaces;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly IProductCategoriesRepository _productCategoriesRepository;

        public ProductCategoriesController(IProductCategoriesRepository productCategoriesRepository)
        {
            _productCategoriesRepository = productCategoriesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategoryDto>>> GetAll()
        {
            var productCategories = await _productCategoriesRepository.GetAllAsync();
            var productCategoryDtos = productCategories.Select(pc => new ProductCategoryDto
            {
                ProductId = pc.ProductId,
                CategoryId = pc.CategoryId
            }).ToList();

            return Ok(productCategoryDtos);
        }
    }
}
