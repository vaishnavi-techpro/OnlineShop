using System;
using System.Collections.Generic;

namespace OnlineShop.Models;

public partial class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = null!;

    public decimal Price { get; set; }

    public virtual ICollection<ProductCategories> ProductCategories { get; set; } = new List<ProductCategories>();


}
