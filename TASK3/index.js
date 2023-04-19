const express = require("express");
const mongoose = require("mongoose");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require("./routes/userRoutes")

app.use("/users", userRoutes)

mongoose.connect('mongodb://localhost:27017/task3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection to MongoDB successful!');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.listen(3000, function (err) {
    if (err) {
        console.log(err)
        console.log("Something Went Wrong....")
    }
    else {
        console.log("Server Connected at port number 3000")
    }
})