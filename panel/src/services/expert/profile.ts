import axios from "axios";
const fetchProfileUser = async () => {
    const { data } = await axios.get("expert/profile");
    return data;
};
export { fetchProfileUser };