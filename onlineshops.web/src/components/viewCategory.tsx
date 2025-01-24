import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface CategoryDto {
    id: number;
    categoryName: string;

}

const ViewCategory: React.FC = () => {
    const { id } = useParams();
    const [category, setCategory] = useState<CategoryDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            if (!id) return;

            try {
                const response = await fetch(`https://localhost:7176/api/Category/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCategory(data);
                } else {
                    setError('Category not found');
                }
            } catch {
                setError('Error fetching category');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleClear = () => {
        setCategory(null);
    }
    const handleBack = () => {
        navigate('/list-category')
    }
    const handleSave = () => {
        if (!category) return;
        const content = `
        Category Name: ${category.categoryName}
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `${category.categoryName}_details.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return <p>Loading category details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <div>
                {category && (
                    <div>
                        <h2>Category Details</h2>
                        <p><strong>Category Name:</strong> {category.categoryName}</p>
                    </div>
                )}
            </div>
            <div className='viewforms'>
                <button className='prnt-btn' onClick={handleSave}>Save</button>
                <button className='clr-btn' onClick={handleClear}>Clear </button>
                <button className='bck-btn' onClick={handleBack}>Back</button>

            </div>
        </>
    );
};

export default ViewCategory;
