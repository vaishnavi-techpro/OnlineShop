import React, { useState } from 'react';
interface DeleteCategoryProps {
    categoryId: number;
    categoryName: string;
    onDelete: (id: number) => void;
    onCancel: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ categoryId, categoryName, onDelete, onCancel }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClose = () => {
        setIsOpen(false);
        onCancel();

    }

    const handleDelete = () => {
        onDelete(categoryId);
        setIsOpen(false);

    }
    if (!isOpen) return null;

    return (

        <div className="modal-overlay">
            <div className="modal-content">
                <h2> Are you sure you wan to delete this Category? : {categoryName}</h2>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="delete-confirm-btn">Yes</button>
                    <button onClick={handleClose} className="delete-cancel-btn">No</button>
                </div>
            </div>

        </div>
    )

};

export default DeleteCategory

