import axios from "axios";

export default class MyService {
    
    static async Get(pathname) {
        try {
            var result = pathname.charAt(0).toUpperCase() + pathname.slice(1);
            const response = await axios.get(`https://localhost:5170/api/${result}/Get${result}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
        //const dict = {
        //    "accommodation":"",
        //    "tickets":"",
        //    "food":"",
        //    "changes":"",
        //    "medical":"",
        //    "questions":"",
        //    "leisure":"",
        //    "report":"",
        //}
        //if (pathname == "accommodation")
        //    return GetAccommodation()
        //if (pathname == "ticket")
        //    return GetAccommodation()
        //if (pathname == "food")
        //    return GetAccommodation()
        //if (pathname == "changes")
        //    return GetAccommodation()
        //if (pathname == "medical")
        //    return GetAccommodation()
        //if (pathname == "surveys")
        //    return GetAccommodation()
        //if (pathname == "freetime")
        //    return GetAccommodation()
        //if (pathname == "report")
        //    return GetAccommodation()
    }
    static async CheckProfile(data) {
        try {
            const response = await axios.get(`http://localhost:5170/api/Auth/Login?Username=${data.username}&Password=${data.pass}`);
            return response.status === 200;
        } catch (error) {
            console.error(error);
        }
    }
    static async GetAccommodation() {
        try {
            const response = await axios.get("https://localhost:5170/api/Accommodation/GetAccommodation");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    //static async GetAccommodation(passId) {
    //    try {
    //        const response = await axios.get(`http://localhost:5170/api/Pass/GetAccommodation/${passId}`);
    //        return response.data;
    //    } catch (error) {
    //        console.error(error);
    //    }
    //}
    static async PostAccommodation(accommodation) {
        try {
            const response = await axios.post("https://localhost:5170/api/Accommodation/PostAccommodation", { ...accommodation, capacity: Number(accommodation.capacity) });
            return response.data;
        } catch (error) {
            console.log(error)
            return "Error in PostAccommodation:" + (error.response?.data || error.message);
        }
    }
    static async UpdatePass(pass) {
        try {
            const response = await axios.put(`http://localhost:5170/api/Pass/UpdatePass`, { ...pass });
            return response.data;
        } catch (error) {
            return "Error in PostAccommodation:" + (error.response?.data || error.message);
        }
    }
}
