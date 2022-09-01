const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
process.env["NODE_CONFIG_DIR"] = __dirname + "/src/config";
const config = require('config');
const mongoose = require('mongoose');

const auth = require('./src/routes/auth.routes')
const content = require('./src/routes/content.routes')
const upload = require('./src/routes/upload.routes')

const app = express();
app.use(express.json({ extended: true }))
app.use(cors())
app.use('/uploads', express.static('uploads'));

const PORT = config.get('port') || 5000;

app.use('/api/content', content);
app.use('/api/upload', upload); 
app.use('/api/auth', auth);

// app.use('/', (req, res) =>{
//    res.status(200).json('academy server application')
// })

async function start (){
   try{
      await mongoose.connect(config.get('mongoUrl'), {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
   }catch(e){
      console.log(`Server Error ${e.message}`);
      process.exit(1);
   }
}

start();