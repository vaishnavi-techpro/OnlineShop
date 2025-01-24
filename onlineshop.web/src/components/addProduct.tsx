import { useState } from 'react';

interface AddProductProps {
    onClose: () => void;  
}

const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const productData = {
            productName,
            price,
        };

        try {
            const response = await fetch('https://localhost:7176/api/Product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                setMessage('Product added successfully!');
                setProductName('');
                setPrice(0);
                setTimeout(() => {
                    onClose();  
                }, 1000);
            } else {
                setMessage('Failed to add product.');
            }
        } catch (error) {
            setMessage('Error adding product.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
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
                    const products = lines.map((line) => {
                        const fields = line.split(",");
                        if (fields.length !== 3 || !line.trim()) {
                            return null;
                        }
                        const id = parseInt(fields[0].trim(), 10);
                        const productName = fields[1].trim();
                        const price = parseFloat(fields[2].trim());
                        if (isNaN(price)) {
                            return null;
                        }
                        return { id, productName, price };
                    }).filter(Boolean);
                    if (products.length > 0) {
                        setMessage('Products successfully parsed!');
                        console.log("Parsed Products:", products);
                        for (const product of products) {
                            const validProduct = product as { id: number, productName: string, price: number };

                            const productData = {
                                id: validProduct.id,
                                productName: validProduct.productName,
                                price: validProduct.price
                            };

                            const response = await fetch('https://localhost:7176/api/Product', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productData)
                            });

                            if (!response.ok) {
                                const errorResponse = await response.json();
                                console.error("Error response from server:", errorResponse);
                                setMessage(`Failed to upload product: ${errorResponse.message || 'Unknown error'}`);
                                return;
                            }
                        }

                        setMessage('Products uploaded successfully!');
                    } else {
                        setMessage('No valid products to upload.');
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
        <div className="add-product-modal">
            <div className="modal-content">
                <h2>Add a New Product</h2>
                {message && <p>{message}</p>}
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
                            type="text"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        <label>Upload Products File:</label>
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileChange}
                        />
                    </div>
                    <br />
                    <div className="form-buttons">
                        <button type="button" onClick={handleSubmit} className="submit-btn">Submit </button>
                        <button type="button" onClick={closeWindow} className="close-modal-btn"> Close</button>
                        <button type="button" onClick={handleUpload} className="upload-btn"> Upload </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
