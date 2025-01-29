import axios from "axios";
const fetchgetEmployment = async () => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { data } = await axios.get(`employment?companyId=${idProfile}`);
    return data;
};
export { fetchgetEmployment };