import axios from "axios";

const baseUrl = 'https://pets-show-8ajn.onrender.com'


const instance = axios.create({baseURL :baseUrl });

export default instance;