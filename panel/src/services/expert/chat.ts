import axios from "axios";
const fetchChatExpert = async () => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { data } = await axios.get(`chat?expertId=${idProfile}`);
    return data;
};
const fetchApprovedChatExpert = async () => {
    const idProfile = JSON.parse(localStorage.getItem("sitetest") || "").id
    const { data } = await axios.get(`chat?expertId=${idProfile}&approved=true`);
    return data;
};

export {
    fetchChatExpert,
    fetchApprovedChatExpert,
};