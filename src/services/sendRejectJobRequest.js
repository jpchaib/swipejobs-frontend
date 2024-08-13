const apiUrl = process.env.REACT_APP_SWIPEJOBS_API_BASE_URL;

export const sendRejectJobRequest = async (workerId, jobId) => {
    try {
        const response = await fetch(`${apiUrl}worker/${workerId}/job/${jobId}/reject`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (!json || typeof json !== "object") {
            throw new Error("Invalid JSON response format");
        }

        return json;
    } catch (error) {
        console.error("Failed to fetch matches:", error);
        throw error;
    }
};
