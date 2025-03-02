const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv');
const voicerouter = require('./routes/voice');
const restaurantRoutes = require('./routes/restaurants');
const locationroutes = require('./routes/;ocation.route');
dotenv.config()


const Port = process.env.PORT || 8000
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req,res)=>{
    res.send('Hey This is home route')
})

app.use('/api/restaurants', restaurantRoutes)
app.use("/api/voice", voicerouter);
app.use('/api/location', locationroutes)





app.listen(Port,async()=>{
    try {
        console.log(`server at http://localhost:${Port}`)
    } catch (error) {
        console.log(`server connection error ${error}`)
    }
})