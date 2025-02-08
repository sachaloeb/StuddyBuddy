const API_URL = "http://localhost:3002/api";

export const fetchWithAuth = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${API_URL}/${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};
