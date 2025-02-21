import React, {useState, useEffect, useRef} from "react";
import "../index.css";

const CustomPrompt = ({ message, onClose, isForm = false, formContent = "" }) => {
    const [inputValue, setInputValue] = useState("");
    const formContainerRef = useRef(null);

    useEffect(() => {
        // Focus management when the component is mounted
        setTimeout(() => {
            if (isForm && formContainerRef.current) {
                const firstInput = formContainerRef.current.querySelector("input, textarea, select");
                if (firstInput) firstInput.focus();
            } else {
                document.getElementById("promptInput")?.focus();
            }
        }, 100);

        // Handle keyboard events
        const handleKeyDown = (event) => {
            if (event.key === "Enter") handleOk();
            if (event.key === "Escape") handleCancel();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isForm]);

    const handleOk = () => {
        const formData = isForm
            ? new FormData(formContainerRef.current.querySelector("form"))
            : inputValue;
        onClose(formData);
    };

    const handleCancel = () => {
        onClose(null);
    };

    return (
        <div id="customPrompt" className="modal">
            <div className="modal-content">
                <span id="closePrompt" className="close" onClick={handleCancel}>&times;</span>
                <p id="promptMessage">{message}</p>
                {!isForm ? (
                    <input
                        id="promptInput"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                ) : (
                    <div ref={formContainerRef} dangerouslySetInnerHTML={{ __html: formContent }} />
                )}
                <div id="formContainer"></div>
                <button id="promptOk" onClick={handleOk}>OK</button>
                <button id="promptCancel" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CustomPrompt;