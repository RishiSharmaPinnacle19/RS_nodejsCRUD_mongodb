
const express = require('express');
// express package 
const userRoutes = require('./routes/userRouter'); 
// path of router
const { mongoose } = require('mongoose');
//  mongoose package to connect mongodb

// mongoose.connect('mongodb://127.0.0.1:27017/userManagement', function (err){
//     if(err) throw err;
//     console.log("ongoDB is connected");
// })


// mongodb is connect and ready to use
mongoose.connect('mongodb://127.0.0.1:27017/userManagement')
  .then(() => {
    console.log("MongoDB is connected"); 
    //connected
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message); // its show err if not connected
  });

// mongoose.connect('mongodb://127.0.0.1:27017/userManagement');


// async function connect() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/userManagement');
//         console.log("MongoDB is connected");
//     } catch (err) {
//         console.error("MongoDB connection error:", err.message);
//     }
// }

const app = express();

// Middleware for parsing JSON
app.use(express.json());


app.use('/', userRoutes);
// '/' its root path of app

const port = 9200; // port to run server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
