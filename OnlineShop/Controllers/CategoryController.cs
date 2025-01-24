using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.DTO;
using OnlineShop.Models;
using OnlineShop.Repository.Interfaces;

namespace OnlineShop.Controllers
{
    [Route("api/Category")]
    [ApiController]
  
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost]

        public async Task<ActionResult> Create(CategoriesDto categoryDto)
        {
            var category = new Category
            {
                CategoryName = categoryDto.CategoryName,
                
            };
            await _categoryRepository.AddAsync(category);
            return Ok(categoryDto);
        }
        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer" ,Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<CategoriesDto>>> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();
            var categoryDtos = categories.Select(p => new CategoriesDto
            {
                Id = p.Id,
                CategoryName = p.CategoryName,
            }).ToList();

            return Ok(categoryDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CategoriesDto categoryDto)
        {
           

            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryDto.CategoryName;
            

            await _categoryRepository.UpdateAsync(category);

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(int id)
        {
            await _categoryRepository.DeleteAsync(id);
            return NoContent();
        }


    }
}
