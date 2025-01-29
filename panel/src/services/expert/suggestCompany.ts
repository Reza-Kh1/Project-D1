import axios from "axios";
const fetchSuggestCompany = async (value: any) => {
    const dataJson = JSON.parse(localStorage.getItem("sitetest") || "").id
    if (!dataJson) return
    let url = `jobContact?expertId=${dataJson}&last=${value?.last || "false"}&page=${value?.page || 1}`
    const { data } = await axios.get(url);
    return data;
};
export { fetchSuggestCompany };