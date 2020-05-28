const express = require('express');
const Router = express.Router();
const pool = require('../database');


Router.get('/',(req,res)=>{
    res.send('citas');
    console.log("la cita")
});

// Mostrando datos de cita reservada
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar cita con id: "+ req.params.id)

    const Id_Usuario= req.params.id
    const queryString = `SELECT c.Fecha, c.Inicio,c.Final,c.Estatus,bar.Nombre as barberia,
    s.Nombre as servicio, u.Nombres as Barbero FROM citas as c 
    INNER JOIN servicios as s on c.Id_Servicio = s.IdServicio 
    INNER JOIN barberos as b on c.Id_Barbero = b.IdBarbero
    INNER JOIN usuario as u on u.idUsuario = b.Id_Usuario
    INNER JOIN barberias as bar on c.Id_Barberia = bar.IdBarberia where c.Id_Usuario=?`
    pool.query(queryString, [Id_Usuario],(err, rows, fields) => {
        if(err){
            console.log("Cita" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Cita Seleccionado")
        res.json(rows)
    })
});

//(SELECT u.Nombre FROM usuario as u where u.idUsuario=?)
Router.get('/get/', (req, res) => {
    console.log("Seleccionar servicio con id: "+ req.params.id)

    const Id_Barberia= req.params.id
    const queryString = "SELECT * FROM barber.citas;"
    pool.query(queryString, [Id_Barberia],(err, rows, fields) => {
        if(err){
            console.log("Servicio" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Servicio Seleccionado")
        res.json(rows)
    })
});




//agregando citas
Router.post('/add', async (req, res) =>{

    console.log("Tratando agregar cita ..")
    console.log("Fecha: "+ req.body.Fecha)
    console.log("Inicio "+ req.body.Inicio)
    console.log("Final: "+ req.body.Final)
    console.log("Usuario: "+ req.body.Id_Usuario)
    console.log("Servicio: "+ req.body.Id_Servicio)
    console.log("Barberia: "+ req.body.Id_Barberia)
    console.log("Barbero: "+ req.body.Id_Barbero)
    console.log("EStatus: "+ req.body.Estatus)
 
    const Fecha = req.body.Fecha
    const Inicio = req.body.Inicio
    const Final = req.body.Final
    const Id_Usuario = req.body.Id_Usuario
    const Id_Servicio = req.body.Id_Servicio
    const Id_Barberia = req.body.Id_Barberia
    const Id_Barbero = req.body.Id_Barbero 
    const Estatus = req.body.Estatus 

     const queryString = "INSERT INTO citas (Fecha,Inicio,Final,Id_Usuario, Id_Servicio, Id_Barberia,Id_Barbero,Estatus) VALUES (?,?,?,(SELECT idUsuario FROM usuario WHERE Nombres = ?),(SELECT IdServicio FROM servicios WHERE Nombre = ?),?,(SELECT IdBarbero FROM barberos WHERE Id_Usuario = (SELECT idUsuario FROM usuario WHERE Nombres =?)),?) "
     pool.query(queryString, [Fecha,Inicio,Final,Id_Usuario, Id_Servicio, Id_Barberia,Id_Barbero,Estatus], (err, results, fields) =>{
         if (err){
             console.log("Error cita: "+ err)
             res.sendStatus(500)
             return
         }

         console.log("Se agrego cita con id: ", results.insertId);
         res.json('ok');
        res.end() 
        
     } )

     
});


Router.post('/addd', async (req, res) =>{

    console.log("Tratando agregar cita ..")
    console.log("Fecha: "+ req.body.Fecha)
    console.log("Inicio "+ req.body.Inicio)
    console.log("Final: "+ req.body.Final)
    console.log("Usuario: "+ req.body.Id_Usuario)
    console.log("Servicio: "+ req.body.Id_Servicio)
    console.log("Barberia: "+ req.body.Id_Barberia)
    console.log("Barbero: "+ req.body.Id_Barbero)
    console.log("EStatus: "+ req.body.Estatus)
 
    const Fecha = req.body.Fecha
    const Inicio = req.body.Inicio
    const Final = req.body.Final
    const Id_Usuario = req.body.Id_Usuario
    const Id_Servicio = req.body.Id_Servicio
    const Id_Barberia = req.body.Id_Barberia
    const Id_Barbero = req.body.Id_Barbero 
    const Estatus = req.body.Estatus 

     const queryString = "INSERT INTO citas (Fecha,Inicio,Final,Id_Usuario, Id_Servicio, Id_Barberia,Id_Barbero,Estatus) VALUES (?,?,?,(SELECT idUsuario FROM usuario WHERE Nombres = ?),(SELECT IdServicio FROM servicios WHERE Nombre = ? AND Id_Barberia="+Id_Barberia+"),?,(SELECT IdBarbero FROM barberos WHERE Id_Usuario = (SELECT idUsuario FROM usuario WHERE Nombres =?)),?) "
     pool.query(queryString, [Fecha,Inicio,Final,Id_Usuario, Id_Servicio, Id_Barberia,Id_Barbero,Estatus], (err, results, fields) =>{
         if (err){
             console.log("Error cita: "+ err)
             res.sendStatus(500)
             return
         }

         console.log("Se agrego cita con id: ", results.insertId);
         res.json('ok');
        res.end() 
        
     } )
});

module.exports=Router;