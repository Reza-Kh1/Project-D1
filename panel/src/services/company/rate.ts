import axios from "axios";
const fetchRateCompany = async (val: boolean) => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    let url = `score?companyId=${idProfile}`
    if (val === true) {
        url = `score?companyId=${idProfile}&last=true`
    }
    const { data } = await axios.get(url);
    return data;
};
export {
    fetchRateCompany
};