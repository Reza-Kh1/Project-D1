import axios from "axios";
const fetchSuggestExpert = async () => {
    const dataJson = JSON.parse(localStorage.getItem("sitetest") || "").id
    if (!dataJson) return
    const { data } = await axios.get(`jobContact?companyId=${dataJson}`);
    return data;
};
const searchSuggestExpert = async (query: any) => {    
    const url = new URLSearchParams(query);
    const { data } = await axios.get(`jobContact?${url}`);
    return data;
}
export { fetchSuggestExpert, searchSuggestExpert };