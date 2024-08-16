const apiUrl = process.env.REACT_APP_SWIPEJOBS_API_BASE_URL;

export const getProfile = async (workerId) => {
    try {
        delay(5000);
        const response = await fetch(`${apiUrl}worker/${workerId}/profile`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        delay(5000);
        const json = await response.json();

        if (!json || typeof json !== "object") {
            throw new Error("Invalid JSON response format");
        }

        return json;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
    }
};

function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
