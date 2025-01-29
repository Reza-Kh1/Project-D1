import axios from "axios";
const fetchProfileCompany = async () => {
    const { data } = await axios.get(`company/profile`);
    return data;
};
export { fetchProfileCompany };