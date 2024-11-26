const express=require("express")
const cors=require("cors")
const userRouter=require("./controllers/userRouter")
const widgetRouter=require("./controllers/widgetRouter")
const { seedWidgets } = require("./models/seed");

const app=express()
const port =8085;

app.use(express.json())
app.use(cors())

seedWidgets();

app.use("/api/users",userRouter)
app.use("/api/widget",widgetRouter)


app.listen(port, ()=>{
    console.log("Server running on",port)
})

