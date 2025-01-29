import axios from "axios";
const fetchRateExpert = async (val: boolean) => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    let url = `score?expertId=${idProfile}`
    if (val === true) {
        url = `score?expertId=${idProfile}&last=true`
    }
    const { data } = await axios.get(url);
    return data;
};
export {
    fetchRateExpert
};