
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
    id: number;
    categoryName: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>('https://localhost:7176/api/Category');
                setCategories(response.data);
            } catch {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <strong>{category.categoryName}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
