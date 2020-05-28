const express = require('express');
const Router = express.Router();
const pool = require('../database');


Router.get('/',(req,res)=>{
    res.send('sep');
});
//Selecionar todas las barberias para mostrar en el home
Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las barberias")

    const queryString = "SELECT * FROM barberias"
    pool.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay barberias " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("barberias Seleccionados")
        res.json(rows)
    })
});

//Mostrar informacion de las barberias
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar informacion barberia: "+ req.params.id)

    const IdBarberia= req.params.id
    const queryString = "SELECT b.Nombre,b.Direccion,b.Telefono,b.CantBarbero,b.Horarios FROM barberias as b  WHERE IdBarberia=?"
    pool.query(queryString, [IdBarberia],(err, rows, fields) => {
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




Router.post('/add', async (req, res) =>{

    console.log("Tratando de agregar barberia..")
    console.log("Nombre: "+ req.body.nombre)
    console.log("Direccion: "+ req.body.direccion)

   
    const Nombre = req.body.Nombre
    const Direccion = req.body.Direccion
    const Telefono = req.body.Telefono
    const Id_Usuario = req.body.Id_Usuario
    const CantBarbero = req.body.CantBarbero
    const Horarios = req.body.Horarios


    const queryString = "INSERT INTO barberias (Nombre, Direccion,telefono,Id_Usuario,CantBarbero,Horarios) VALUES (?,?,?(SELECT IdUsuario FROM usuariobarber WHERE Id_Usuario = ?),?,?) "
    pool.query(queryString, [Nombre, Direccion, Telefono, Id_Usuario,CantBarbero, Horarios], (err, results, fields) =>{
        if (err){
            console.log("Error el Barberia: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego Barberia con id: ", results.insertId);
        res.json('ok');
        res.end() 
        
    } )
});



module.exports=Router;