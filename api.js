//const { param } = require("express/lib/request")
const axios = require("axios").default


function api(){
    return axios.create({
        baseURL: process.env.BASE_URL
    })
}

module.exports.getPages = async function(){
    return await api().get("/pages")
}

module.exports.getPosts = async function (pageNumber){
    return await api().get("/posts", {
        params: {
            per_page: 1,
            page: pageNumber
        }
    })
}

module.exports.getHome = async function(){
    return await api().get("/")
}