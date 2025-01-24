import React, { useState } from 'react';

interface AddCategoryProps {
    onClose: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const categoryData = {
            id: 0,
            categoryName,
        };

        try {
            const response = await fetch('https://localhost:7176/api/Category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                setMessage('Category added successfully!');
                setCategoryName('');
                setTimeout(() => {
                    onClose();  
                }, 1000);
            } else {
                setMessage('Failed to add category.');
            }
        } catch (error) {
            setMessage('Error adding category.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please choose a file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target?.result;
            if (typeof content === 'string') {
                try {
                    const lines = content.split("\n");
                    console.log("File lines:", lines);
                    const categories = lines
                        .map((line, index) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) return null;

                            const fields = trimmedLine.split(",");
                            console.log(`Line ${index + 1}:`, fields);

                            if (fields.length !== 2) {
                                console.warn(`Skipping invalid line at index ${index + 1}: ${line}`);
                                return null;
                            }

                            const categoryName = fields[1].trim();
                            if (categoryName) {
                                return { id: 0, categoryName };
                            }

                            console.warn(`Skipping line at index ${index + 1} due to empty category name`);
                            return null;
                        })
                        .filter((category): category is { id: number; categoryName: string } => category !== null);

                    if (categories.length > 0) {
                        setMessage('Categories successfully parsed!');
                        for (const category of categories) {
                            const categoryData = {
                                id: category.id,
                                categoryName: category.categoryName,
                            };

                            console.log("Sending category data:", categoryData);

                            const response = await fetch('https://localhost:7176/api/Category', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(categoryData),
                            });

                            if (!response.ok) {
                                const errorResponse = await response.json();
                                console.error("Error response from server:", errorResponse);
                                setMessage(`Failed to upload category: ${errorResponse.message || 'Unknown error'}`);
                                return;
                            }
                        }

                        setMessage('Categories uploaded successfully!');
                    } else {
                        setMessage('No valid categories to upload.');
                    }
                } catch (error) {
                    setMessage('Error reading the file.');
                    console.error('Error:', error);
                }
            }
        };

        reader.onerror = () => {
            setMessage('Error reading the file.');
        };

        reader.readAsText(file);
    };

    const closeWindow = () => {
        onClose(); 
    };

    return (
        <div className="add-category-modal">
            <div className="modal-pop-up">
                <h2>Add the Product Category</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Category Name: </label>
                        <input
                            type="text"
                            name="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    <br />
                    <div className="form-buttons">
                        <button type="button" onClick={handleSubmit} className="submit-btn">Submit</button>
                        <button type="button" onClick={closeWindow} className="close-modal-btn">Close</button>
                        <button type="button" onClick={handleUpload} className="upload-btn">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
