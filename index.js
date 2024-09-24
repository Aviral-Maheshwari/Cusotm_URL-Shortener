const express= require ('express');
const {connectToMongoDB} = require ('./connect');
const urlRoute = require("./routes/url");
const app= express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(
    ()=> console.log("MongoDB Connected")
);
app.use("/url",urlRoute);
app.use(express.json());

app.listen(PORT,()=> console.log("Server Started"));