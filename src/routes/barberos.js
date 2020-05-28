const express = require('express');
const Router = express.Router();
const pool = require('../database');


Router.get('/',(req,res)=>{
    res.send('barberos');
    console.log("funcionando")
});

Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar barbero con id: "+ req.params.id)

    const Id_Barberia= req.params.id
    const queryString = "SELECT u.Nombres FROM usuario AS u INNER JOIN barberos as bar ON u.IdUsuario = bar.Id_Usuario INNER JOIN barberias as b ON bar.Id_Barberia = b.IdBarberia WHERE Id_Barberia=?"
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

//agregando servicios
Router.post('/add', async (req, res) =>{

    console.log("Tratando de agregar servicio..")
    console.log("Nombre: "+ req.body.Nombre)
    console.log("Precio: "+ req.body.Precio)
    console.log("tiempo: "+ req.body.Tiempo)
    console.log("Barberia: "+ req.body.Id_Barberia)
 
    const Nombre = req.body.Nombre
    const Precio = req.body.Precio
    const Tiempo = req.body.Tiempo
    const Id_Barberia = req.body.Id_Barberia

    const queryString = "INSERT INTO servicios (Nombre, Precio, tiempo, Id_barberia) VALUES (?,?,?,(SELECT IdBarberia FROM barberias WHERE Nombre = ?)) "
    pool.query(queryString, [Nombre, Precio, Tiempo, Id_Barberia], (err, results, fields) =>{
        if (err){
            console.log("Error servicio: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego servicio con id: ", results.insertId);
        res.json('ok');
        res.end() 
        
    } )
});

module.exports=Router;