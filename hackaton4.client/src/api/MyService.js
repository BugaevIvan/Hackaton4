import axios from "axios";

export default class MyService {
    static async CheckProfile(data) {
        try {
            const response = await axios.get(`http://localhost:5170/api/Auth/Login?Username=${data.username}&Password=${data.pass}`);
            return response.status === 200;
        } catch (error) {
            console.error(error);
        }
    }
    static async GetPasses() {
        try {
            const response = await axios.get("http://localhost:5170/api/Pass/GetPasses");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    static async GetPass(passId) {
        try {
            const response = await axios.get(`http://localhost:5170/api/Pass/GetPass/${passId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    static async PostPass(accommodation) {
        try {
            const response = await axios.post("https://localhost:5170/api/Accommodation/PostAccommodation", { ...accommodation, capacity: Number(accommodation.capacity) });
            return response.data;
        } catch (error) {
            console.log(error)
            return "Error in PostPass:" + (error.response?.data || error.message);
        }
    }
    static async UpdatePass(pass) {
        try {
            const response = await axios.put(`http://localhost:5170/api/Pass/UpdatePass`, { ...pass });
            return response.data;
        } catch (error) {
            return "Error in PostPass:" + (error.response?.data || error.message);
        }
    }
}
