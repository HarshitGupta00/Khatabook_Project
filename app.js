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
    
  fs.readdir("./Hissab" , (err , files)=>{
      if(err){
          console.log(err);
      }
      else{
          res.render("index" , {files:files})
      }
      
    })
}
)
app.get("/index" , (req , res)=>{
 res.render("index")
})




app.listen(3000);