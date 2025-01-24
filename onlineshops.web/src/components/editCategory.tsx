import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditCategory: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categoryName, setCategoryName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        console.log('Category ID:', id);
        if (!id) {
            setMessage('Category ID is missing.');
            return;
        }

        const fetchCategory = async () => {
            setLoading(true);
            setMessage('');
            try {
                const response = await fetch(`https://localhost:7176/api/Category/${id}`);
                const category = await response.json();
                setCategoryName(category.categoryName);
            } catch (error) {
                setMessage('Error fetching category details.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);
        setMessage('');

        console.log(`editing id:${id}`);

        const updatedCategory = {
            id,
            categoryName,

        };

        try {
            const response = await fetch(`https://localhost:7176/api/Category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (response.ok) {
                setMessage('Category updated successfully!');
                navigate('/list-category');

            } else {
                setMessage('Failed to update category.');
            }
        } catch (error) {
            setMessage('Error updating category.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2>Edit Category</h2>
                {message && <p>{message}</p>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Category Name:</label>
                            <input
                                type="text"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <button type="submit" className='updt-btn' disabled={loading}>
                                {loading ? 'Updating...' : 'Update Category'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditCategory;
