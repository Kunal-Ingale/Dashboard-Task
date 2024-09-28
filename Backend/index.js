const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const transactionsRouter = require('./Routes/transactions')
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:["https://dekstop-task-api.vercel.app/"],
        methods:["GET"],
        credentials:true
    }
));
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected to MongoDB'))
.catch(console.error)

app.use('/api/transactions', transactionsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
