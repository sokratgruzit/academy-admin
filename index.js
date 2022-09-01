const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
process.env["NODE_CONFIG_DIR"] = __dirname + "/src/config";
const config = require('config');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const auth = require('./src/routes/auth.routes')
const content = require('./src/routes/content.routes')
const upload = require('./src/routes/upload.routes')

const app = express();
app.use(express.json({ extended: true }))
app.use(cors())
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.use('/api/content', content);
app.use('/api/upload', upload);
app.use('/api/auth', auth);

console.log(process.env.SECRET_KEY)
// app.use('/', (req, res) =>{
//    res.status(200).json('academy server application')
// })
app.get("/api/test", (req, res) => {
   res.send("test");
});

app.use(express.static(path.join(__dirname, "./admin/build")));

//  app.get("*", function (_, res) {
//    res.sendFile(
//      path.join(__dirname, "./admin/build/index.html"),
//      function (err) {
//        if (err) {
//          res.status(500).send(err);
//        }
//      } 
//    );
//  }); 

async function start() {
   try {
      await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
   } catch (e) {
      console.log(`Server Error ${e.message}`);
      process.exit(1);
   }
}

start();