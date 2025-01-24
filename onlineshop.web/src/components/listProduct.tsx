import React, { useEffect, useState } from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../components/deleteProduct';
import AddProduct from '../components/addProduct';  

interface ProductDto {
    id: number;
    productName: string;
    price: number;
}

const ListProduct: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(5);
    const [productToDelete, setProductToDelete] = useState<ProductDto | null>(null);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7176/api/Product');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7176/api/Product/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== id));
            } else {
                alert('Failed to delete product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setProductToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setProductToDelete(null);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit product with ID: ${id}`);
        navigate(`/edit-product/${id}`);
    };

    const handleView = (id: number) => {
        console.log(`View product with ID: ${id}`);
        navigate(`/view-product/${id}`);
    };

    const handleAddProduct = () => {
        setIsAddProductModalOpen(true); 
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Loading...</p>;
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="card-container">
            <button onClick={handleAddProduct} className="add-product-btn">+ Add Product</button>

            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => handleView(product.id)} className="view-btn">
                                        <Visibility />
                                    </button>
                                    <button onClick={() => handleEdit(product.id)} className="edit-btn">
                                        <Edit />
                                    </button>
                                    <button onClick={() => setProductToDelete(product)} className="delete-btn">
                                        <Delete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="prev-btn"
                >
                    Prev
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`page-btn ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className="next-btn"
                >
                    Next
                </button>
            </div>

            {productToDelete && (
                <DeleteProduct
                    productId={productToDelete.id}
                    productName={productToDelete.productName}
                    onDelete={handleDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {isAddProductModalOpen && (
                <AddProduct
                    onClose={() => setIsAddProductModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default ListProduct;
