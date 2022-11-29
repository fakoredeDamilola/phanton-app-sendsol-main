import axios from "axios";

const Axios = axios.create({
    baseURL: "https://public-api.solscan.io/account/",
});

Axios.interceptors.request.use((request) => {
    // document.querySelector(".loading-bg").style.display = "flex";
    return request;
});

Axios.interceptors.response.use(
    (response) => {
        // document.querySelector(".loading-bg").style.display = "none";

        return response;
    },
    (error) => {
        // document.querySelector(".loading-bg").style.display = "none";
        throw error;
    }
);

export default Axios;
