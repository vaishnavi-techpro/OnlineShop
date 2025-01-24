import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ProductDto {
    productName: string;
    price: number;
}

const ViewProduct: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                const response = await fetch(`https://localhost:7176/api/Product/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    setError('Product not found');
                }
            } catch {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSave = () => {
        if (!product) return;
        const content = `
        Product Name: ${product.productName}
        Price: $${product.price}
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `${product.productName}_details.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setProduct(null);
    }
    const handleBack = () => {
        navigate('/list-product')
    }

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {product && (
                <div >
                    <h2>Product Details</h2>
                    <p><strong>Product Name:</strong> {product.productName}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <div className='viewforms'>
                        <button className='prnt-btn' onClick={handleSave}>Save</button>
                        <button className='clr-btn' onClick={handleClear}>Clear</button>
                        <button className='bck-btn' onClick={handleBack}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
