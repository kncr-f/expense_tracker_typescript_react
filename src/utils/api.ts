import axios from "axios";

function aaa(arg: any) {
    if (!arg) {
        const bbb = "";
        return bbb;
    }
    return arg;
}

const token = aaa(localStorage.getItem("token"));

export default axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
        Authorization: token,
    },
});
