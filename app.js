const { render } = require('ejs');
const express = require('express');
const app = express();
const fs = require('node:fs');
const path = require('path')
app.set("view engine" , "ejs");



app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/" , (req , res)=>{
    fs.readdir(`./Files`, function(err , files){
        res.render("index" , {files});
    })
})

app.get("/createPage" , (req , res)=>{

  res.render("create" )
  
})
app.post("/create" , (req , res)=>{
    const today = new Date(); // Get the current date

    const day = String(today.getDate()).padStart(2, '0'); // Get the day (2 digits)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (2 digits)
    const year = today.getFullYear(); // Get the year
    const fn = (`${day}-${month}-${year}`);

  fs.writeFile(`./Files/${fn}` , req.body.input , function(err){
    if(err) return res.send("Something Went Wrong");
    res.redirect("/");
  })

  
})
app.get("/show/:filename" , (req , res)=>{

    fs.readFile(`./Files/${req.params.filename}` , "utf-8" ,  function(err , data){
      if(err) return res.send("Something Went Wrong")
        res.render("show" , {data , filename: req.params.filename});
    })
})

app.get("/edit/:filename" , (req , res)=>{
    
    fs.readFile(`./Files/${req.params.filename}` , "utf-8" ,  function(err , data){
      if(err) return res.send("Something Went Wrong")
        res.render("edit" , {data , filename: req.params.filename});
    })
})
app.get("/delete/:filename" , (req , res)=>{
    
    fs.unlink(`./Files/${req.params.filename}` ,   function(err){
      if(err) return res.send("Something Went Wrong")
        res.redirect("/")
    })
})
app.post("/update/:filename" , (req , res)=>{
    
    fs.writeFile(`./Files/${req.params.filename}` , req.body.filedata ,  function(err){
      if(err) return res.send("Something Went Wrong")
       res.redirect("/")
    })
})
app.listen(3000);