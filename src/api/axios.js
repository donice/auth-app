import axios from "axios";

export default axios.create({
   baseURL: 'https://unopass-api.herokuapp.com/user'
})