require('dotenv').config();
const express = require ("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); 

const authRoutes = require('./routes/authRoute')
const invoiceRoutes = require('./routes/invoiceRoute')


const app = express();


// Middleware to handle CORS 

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-type", "Authorization"],
    })
)

// Connect Database
connectDB();

// Middleware 

app.use(express.json()); 

// Routes here 
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);


// start server
const PORT = process.env.PORT || 5000;
app.listen (PORT, ()=> console.log(`Server Running on port ${PORT}`))