import React from 'react';

const Confirmation = props => {
    const { message, onCancel, onConfirm, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel' } = props;

    return (
        <div>
            {message && <div>{message}</div>}
            <button onClick={onConfirm}>{confirmButtonText}</button>
            <button onClick={onCancel}>{cancelButtonText}</button>
        </div>
    );
}

export default Confirmation;
