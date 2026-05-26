import axios from "axios";

const BASE_URL = "http://localhost:8080/api/certificates";

export const generateIndigency = async (data: any): Promise<Blob> => {
    const response = await axios.post(
        `${BASE_URL}/indigency`,
        data,
        {
            responseType: "blob"
        }
    );

    return response.data;
};