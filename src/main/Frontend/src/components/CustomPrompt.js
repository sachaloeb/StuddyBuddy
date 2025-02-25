import React, { useState } from "react";
import "../index.css";

const CustomPrompt = ({ message, callback, isForm = false, formContent = '', onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState(new FormData());

    const handleOk = () => {
        const data = isForm ? formData : inputValue;
        callback(data);
        onClose();
    };

    const handleCancel = () => {
        callback(null);
        onClose();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormChange = (e) => {
        const newFormData = new FormData(e.target.form);
        setFormData(newFormData);
    };

    return (
        <div id="customPrompt" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span id="closePrompt" className="close" onClick={onClose}>&times;</span>
                <p id="promptMessage">{message}</p>
                {!isForm && <input type="text" id="promptInput" value={inputValue} onChange={handleInputChange} />}
                {isForm && <div id="formContainer" dangerouslySetInnerHTML={{ __html: formContent }} onChange={handleFormChange}></div>}
                <button id="promptOk" onClick={handleOk}>OK</button>
                <button id="promptCancel" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CustomPrompt;