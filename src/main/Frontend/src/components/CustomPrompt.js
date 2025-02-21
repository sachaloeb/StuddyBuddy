import React from "react";

const CustomPrompt = ({ message, isForm, formContent, onConfirm, onCancel }) => {
    return (
        <div id="customPrompt" className="modal">
            <div className="modal-content">
                <span id="closePrompt" className="close" onClick={onCancel}>&times;</span>
                <h2>{message}</h2>
                {isForm ? (
                    <div id="formContainer">
                        {formContent}
                    </div>
                ) : (
                    <>
                        <p id="promptMessage"></p>
                        <input type="text" id="promptInput"/>
                    </>
                )}
                <button id="promptOk" onClick={() => onConfirm(document.getElementById("addTaskForm"))}>OK</button>
                <button id="promptCancel" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CustomPrompt;