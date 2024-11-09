import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:5236",  // Adjust the path based on your API routes
    withCredentials: true,
});

export default newRequest;




