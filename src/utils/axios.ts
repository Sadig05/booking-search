import axios from "axios";

const baseUrl = 'http://localhost:3004'


const instance = axios.create({baseURL :baseUrl });

export default instance;