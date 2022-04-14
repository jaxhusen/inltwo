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

app.get("/", (req, res) => {
    res.render("home")
})

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

app.listen(8000, () => {
    console.log("http://localhost:8000")
})