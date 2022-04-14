const axios = require("axios").default

console.log(process.env)


function api(){
    return axios.create({
        baseURL: process.env.BASE_URL
    })
}

module.exports.getPosts = async function (pageNumber){
    return await api().get("/posts", {
        params: {
            per_page: 3,
            page: pageNumber
        }
    })
}

