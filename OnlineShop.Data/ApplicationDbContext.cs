using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Models;

namespace OnlineShop.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategories> ProductCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Always call base method for Identity-related mappings

            // Custom configuration for Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                // Primary key configuration
                entity.HasKey(e => e.Id).HasName("PK_Category");

                // Column configuration for CategoryName property
                entity.Property(e => e.CategoryName)
                    .HasMaxLength(100)
                    .IsRequired() // Making sure the category name is required
                    .HasColumnName("CategoryName");

                // You can configure additional properties here if needed
            });

            // Custom configuration for Product entity
            modelBuilder.Entity<Product>(entity =>
            {
                // Primary key configuration
                entity.HasKey(e => e.Id).HasName("PK_Product");

                // Column configuration for ProductName property
                entity.Property(e => e.ProductName)
                    .HasMaxLength(100)
                    .IsRequired() // Making product name required
                    .HasColumnName("ProductName");

                // Column configuration for Price property
                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 2)") // Ensuring correct decimal type
                    .IsRequired() // Price should be required
                    .HasColumnName("Price");

                // You can configure additional properties here if needed
            });

            // Custom configuration for ProductCategories (many-to-many relationship)
            modelBuilder.Entity<ProductCategories>(entity =>
            {
                // Composite primary key configuration
                entity.HasKey(e => new { e.ProductId, e.CategoryId })
                    .HasName("PK_ProductCategories");

                // Configuring foreign key relationship with Product
                entity.HasOne(e => e.Product)
                      .WithMany(p => p.ProductCategories)
                      .HasForeignKey(e => e.ProductId)
                      .OnDelete(DeleteBehavior.Cascade) // Ensures that when a product is deleted, related records in ProductCategories are also deleted

                      .HasConstraintName("FK_Product_ProductCategories");

                // Configuring foreign key relationship with Category
                entity.HasOne(e => e.Category)
                      .WithMany(c => c.ProductCategories)
                      .HasForeignKey(e => e.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade) 
                      .HasConstraintName("FK_Category_ProductCategories");
            });
        }
    }
}
