using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.DTO;
using OnlineShop.Models;
using OnlineShop.Service.Interface;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpPost]
        public async Task<ActionResult> Create(ProductDto productDto)
        {
            var product = new Product
            {
                ProductName = productDto.ProductName,
                Price = productDto.Price
            };

            await _productService.AddAsync(product);  
            return Ok(productDto);
        }

        
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
        {
            var products = await _productService.GetAllAsync();  
            var productDtos = products.Select(p => new ProductDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                Price = p.Price
            }).ToList();

            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);  
            if (product == null)
            {
                return NotFound();
            }

            var productDto = new ProductDto
            {
                ProductName = product.ProductName,
                Price = product.Price
            };

            return Ok(productDto);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductDto productDto)
        {
            var product = await _productService.GetByIdAsync(id);  
            if (product == null)
            {
                return NotFound();
            }

            product.ProductName = productDto.ProductName;
            product.Price = productDto.Price;

            await _productService.UpdateAsync(product);  

            return NoContent();
        }

      
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productService.GetByIdAsync(id);  
            if (product == null)
            {
                return NotFound();
            }

            await _productService.DeleteAsync(id);  
            return NoContent();
        }
    }
}
