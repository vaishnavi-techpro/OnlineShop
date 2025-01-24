import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProduct: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        console.log('Product ID:', id);  
        if (!id) {
            setMessage('Product ID is missing.');
            return;
        }

        const fetchProduct = async () => {
            setLoading(true);
            setMessage('');
            try {
                const response = await fetch(`https://localhost:7176/api/Product/${id}`);
                const product = await response.json();
                setProductName(product.productName);
                setPrice(product.price);
            } catch (error) {
                setMessage('Error fetching product details.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const updatedProduct = {
            id,
            productName,
            price,
        };

        
        try {
            const response = await fetch(`https://localhost:7176/api/Product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                setMessage('Product updated successfully!');
                navigate('/list-product'); 
                
            } else {
                setMessage('Failed to update product.');
            }
        } catch (error) {
            setMessage('Error updating product.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/list-product')
    }

    return (
        <div className="card-container">
            <div className="card">
                <h2>Edit Product</h2>
                {message && <p>{message}</p>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                            </div>
                            <br />
                            <div className='viewforms'>
                                <button type="button" className='updt-btn' onClick={handleSubmit} disabled={loading}>
                               Update
                                </button>
                                <button type="button" className='bck-btn' onClick={handleBack } disabled={loading}>
                                   Back
                                </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProduct;
