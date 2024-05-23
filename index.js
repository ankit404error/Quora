const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
 
let posts = [
{
    id : uuidv4(),
    username : "apnacollege",
    content: "I love coding!"
},
{
    id : uuidv4(),
    username : "Ankit",
    content: "I want to be a greatest coder of all time!"
},
{
    id : uuidv4(),
    username : "Aryan",
    content: "I want to becomen trader!"
},
{
    id : uuidv4(),
    username : "Aditya",
    content: "I love NCC!"
}
];

app.get("/",(req,res)=>{
    res.send(`The Port : <b>${port}</b> is working ! fine`);
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts:posts});
})

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
})

app.post("/posts",(req,res) =>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newCont = req.body.content;
    post.content = newCont;
    console.log(newCont);
    
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})


app.listen(port ,  () => {
    console.log(`listening to port http://localhost:${port}`);
})