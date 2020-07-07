import axios from "axios";

const getUser = () => axios.get("/api/save");


const saveUser = data => axios.post("/api/save", data);


export { getUser, saveUser};