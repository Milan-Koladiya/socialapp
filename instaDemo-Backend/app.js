const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
dotenv.config();

// require('./config/config');
const connectDb = require("./config/config");

const userRoute = require("./Routes/userRoutes");
const port = process.env.PORT;
const database_Url = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors())
// app.use(
//   cors({
//     origin: "*",
//   })
// );

//db connection
connectDb(database_Url);

app.get("/", (req, res) => {
  console.log("API CALLEDD");
  return res.json({ data: "hello home" });
});
// app.get("/home", (req, res) => {
//   console.log("API CALLEDD");
//   return res.json({ data: "hello home" });
// });


//load Route
app.use('/',userRoute);

//static file
app.use(express.static("public"));

//
// app.use('/user/post',express.static('public/post'));
// app.post('/create',async(req,res)=>{

//   res.json("done");
//   console.log(req.body);
//   let data = new Model_user(req.body);
//   let result = await data.save();
//   console.log("result",result);
// })
app.listen(port);
