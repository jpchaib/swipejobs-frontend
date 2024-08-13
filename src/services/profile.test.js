import { getProfile } from "./profile";
import fetchMock from "jest-fetch-mock";
const apiUrl = process.env.REACT_APP_SWIPEJOBS_API_BASE_URL;

fetchMock.enableMocks();

describe("getProfile", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("should return profile data when fetch is successful and response is valid JSON", async () => {
        const mockData = { firstName: "John", lastName: "Doe" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await getProfile(1);
        expect(result).toEqual(mockData);
        expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}worker/1/profile`);
    });

    it("should throw an error when fetch fails (network error)", async () => {
        fetchMock.mockRejectOnce(new Error("Network error"));

        await expect(getProfile(1)).rejects.toThrow("Network error");
    });

    it("should throw an error when response status is not OK", async () => {
        fetchMock.mockResponseOnce("", { status: 404 });

        await expect(getProfile(1)).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an error when response is not valid JSON", async () => {
        fetchMock.mockResponseOnce(2);

        await expect(getProfile(1)).rejects.toThrow("Invalid JSON response format");
    });

    it("should throw an error when response is not an object", async () => {
        fetchMock.mockResponseOnce(JSON.stringify("Not an object"));

        await expect(getProfile(1)).rejects.toThrow("Invalid JSON response format");
    });
});
