require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const api = require("./api.js")

const app = express()


app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}))
app.set("view engine", "hbs")

app.get("/", async (req, res) => {
    const homeResponse = await api.getHome()
    const home = homeResponse.data
    res.render("home", {home})
})

//get all pages
app.get("/pages", async (req, res) => {
    const pagesResponse = await api.getPages()
    const pages = pagesResponse.data
    res.render("pages", {pages})
})

//get all posts
app.get("/posts", async (req, res) => {
    let page = parseInt(req.query.page)
    console.log({ page })

    if (isNaN(page)) {
        page = 1
    }

        const getPostsResponse = await api.getPosts(page)
        const numberOfPages = parseInt(getPostsResponse.headers['x-wp-totalpages'])
        console.log(getPostsResponse.headers)
        const posts = getPostsResponse.data

        const nextPageNumber = page + 1
        const prevPageNumber = page - 1
        const pageMinus = page > 1
        const pagePlus = page < numberOfPages

        res.render("posts", { posts, nextPageNumber, prevPageNumber, page , pageMinus, pagePlus})
    
})

app.listen(8000, () => {
    console.log("http://localhost:8000")
})



/* 
app.get("/posts", async (req, res) => {

    // /posts?page=3
    let page = parseInt(req.query.page) // value = 3
    console.log({ page })

    if (isNaN(page)) {
        page = 1
    }


    //trycatch 
    try{
        if (page < 1) {
            return page = 1,
            prevPageNumber = hidden
        }
        else if (page > 3) {
            return page = 3,
            nextPageNumber = hidden
        }}
    catch {
            console.log("TRALALLALA")
        }

        const getPostsResponse = await api.getPosts(page)
        //console.log(getPostsResponse.headers)
        const posts = getPostsResponse.data

        const nextPageNumber = page + 1
        const prevPageNumber = page - 1

        res.render("posts", { posts, nextPageNumber, prevPageNumber, page })
    
})
*/