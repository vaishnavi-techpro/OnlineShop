import React, { useEffect, useState } from 'react';

interface ProductCategoryDto {
    productId: number;
    categoryId: number;
}

const ListProductCategory: React.FC = () => {
    const [productcategory, setProductCategory] = useState<ProductCategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const response = await fetch('https://localhost:7176/api/ProductCategories');
                if (!response.ok) {
                    throw new Error('Failed to fetch product categories');
                }
                const data = await response.json();
                setProductCategory(data);
            } catch (error) {
                console.error('Error fetching product categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCategories();
    }, []);

    return (
        <div className="card-container">
            <div className="card">
                {loading ? (
                    <p>Loading product categories...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Category ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productcategory.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.categoryId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListProductCategory;
