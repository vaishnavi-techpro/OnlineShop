using System;
using System.Collections.Generic;

namespace OnlineShop.Models;

public partial class Category
{
    public int Id { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<ProductCategories> ProductCategories { get; set; } = new List<ProductCategories>();
}
