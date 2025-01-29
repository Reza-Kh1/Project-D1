import axios from "axios";
const fetchChatCompany = async () => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { data } = await axios.get(`chat?companyId=${idProfile}`);
    return data;
};
const fetchApprovedChatCompany = async () => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { data } = await axios.get(`chat?companyId=${idProfile}&approved=true`);
    return data;
};
const fetchSingleChat = async (id?: number) => {    
    if (!id) return
    const { data } = await axios.get(`chat?id=${id}`);
    return data;
};

export {
    fetchChatCompany,
    fetchApprovedChatCompany,
    fetchSingleChat
};