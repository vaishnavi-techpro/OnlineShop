import React, { useState } from 'react';

interface DeleteProductProps {
    productId: number;
    productName: string;
    onDelete: (id: number) => void;
    onCancel: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, productName, onDelete, onCancel }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);


    const handleClose = () => {
        setIsOpen(false);
        onCancel();
    };


    const handleDelete = () => {
        onDelete(productId);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure you want to delete the product "{productName}"?</h2>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="delete-confirm-btn">Yes</button>
                    <button onClick={handleClose} className="delete-cancel-btn">No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
