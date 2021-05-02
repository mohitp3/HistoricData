const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8000;

/**
 * ConnectDB mongoDB
 */
connectDB();


app.use(morgan('tiny'));  //logging request

//parse request to body parser
app.use(bodyParser.urlencoded({extended:true}));


//view engine
app.set("view engine","ejs")

//loading assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/images',express.static(path.resolve(__dirname,"assets/images")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routes 

app.use('/', require('./server/routes/router'))

app.listen(PORT,()=>console.log(`server is running on 
http://localhost:${PORT}
`));

