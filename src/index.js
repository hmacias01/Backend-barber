const express = require ('express');
// const morgan =require ('morgan');
const bodyParser = require("body-parser");
var cors = require('cors');

//initialiacion
var app = express();
app.use(bodyParser.json());
app.use(cors());


//setting
app.set('port', process.env.PORT || 443);


//middelewares
//  app.use(morgan('dev'));
//  app.use(express.urlencoded({extended:false}));
//  app.use(express.json());

//global variables
// app.use((req,res,next)=>{
// next();
// })

//declarando routes
app.use(require('./routes'));
const authentificationRoutes = require("./routes/authentification");
const usuarioBarber = require("./routes/usuarioBarber");
const BaberiasRoutes = require("./routes/barberias");
const servicios = require("./routes/servicios");
const Barberos = require("./routes/barberos");
const Citas = require("./routes/citas");



// usando routes
app.use("/usuario",authentificationRoutes);
app.use("/barberias",BaberiasRoutes);
app.use("/servicios",servicios);
app.use("/barberos",Barberos);
app.use("/citas",Citas);
app.use("/usuarioBarber",usuarioBarber)

// app.use('/links',require('./routes/links'));

//public




//starting the server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})