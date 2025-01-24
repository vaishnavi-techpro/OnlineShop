/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import DeleteCategory from '../components/deleteCategory';
import AddCategory from '../components/addCategory';

interface CategoryDto {
    id: number;
    categoryName: string;
}

interface ListCategoryProps {
    isLoggedIn: boolean;
}

const ListCategory: React.FC<ListCategoryProps> = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categoriesPerPage] = useState<number>(5);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto | null>(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Unauthorized: Token missing');
                }
                const response = await fetch('https://localhost:7176/api/Category/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error: unknown) { 
                if (error instanceof Error) {
                    console.error('Error fetching categories:', error);
                    alert(error.message || 'An error occurred while fetching categories.');
                } else {
                    console.error('Unexpected error:', error);
                    alert('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You are not authorized to delete this category.');
                return;
            }

            const response = await fetch(`https://localhost:7176/api/Category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setCategories(categories.filter((category) => category.id !== id));
                alert('Category deleted successfully.');
            } else {
                alert('Failed to delete category.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('An error occurred while deleting the category.');
        } finally {
            setCategoryToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setCategoryToDelete(null);
    };

    const handleEdit = (id: number) => {
        navigate(`/edit-category/${id}`);
    };

    const handleView = (id: number) => {
        navigate(`/view-category/${id}`);
    };

    const handleAddProductCategory = () => {
        console.log("isLoggedIn:", isLoggedIn);
        if (isLoggedIn) {
            setIsAddCategoryModalOpen(true);
        } else {
            alert("You need to be logged in to add a category.");
            window.location.href = '/login';
        }
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="card-container">
            <button onClick={handleAddProductCategory} className="add-category-btn">
                + Add Category
            </button>

            <div className="card">
                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <button onClick={() => handleView(category.id)} className="view-btn">
                                            <Visibility />
                                        </button>
                                        <button onClick={() => handleEdit(category.id)} className="edit-btn">
                                            <Edit />
                                        </button>
                                        <button onClick={() => setCategoryToDelete(category)} className="delete-btn">
                                            <Delete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="prev-btn"
                >
                    Prev
                </button>
                {pageNumbers.map((number) => (
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

            {categoryToDelete && (
                <DeleteCategory
                    categoryId={categoryToDelete.id}
                    categoryName={categoryToDelete.categoryName}
                    onDelete={handleDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {isAddCategoryModalOpen && (
                <AddCategory onClose={() => setIsAddCategoryModalOpen(false)} />
            )}
        </div>
    );
};

export default ListCategory;
