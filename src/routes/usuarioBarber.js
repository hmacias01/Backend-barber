const express = require('express');
const Router = express.Router();
const pool = require('../database');


Router.get('/',(req,res)=>{
    res.send('autentificacion');
});

//usuario x nombre de usuario y clave
Router.get('/get/:usuario/:clave', async (req, res) => {

    console.log("Seleccionar por usuario y clave: "+ req.params.correo)

    const Usuario= req.params.correo
    const Contraseña = req.params.clave
    
    const queryString = "SELECT u.correo AS correo, u.Password AS Password FROM usuariobarber AS u  WHERE u.correo = ? AND u.Password = ?"
    pool.query(queryString, [Usuario, Contraseña],(err, rows, fields) => {
        if(err){
            console.log("database says " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("usuario Seleccionado por su usuario y contrase­ña")
        if (rows.length > 0) {
            //res.json(rows)
            res.json({status: 'ok'});
        } else {
            //res.sendStatus(500)
            res.json({status: 'not found'})
            res.end()
        }
        
    })
});

//obteniendo id de usuario logueadi
Router.get('/get2/:id', async (req, res) => {

    console.log("Seleccionar Usuario por Id: "+ req.params.id)

    const Usuario= req.params.id
    const queryString = "SELECT u.IdUsuario FROM usuariobarber AS u where correo=?"
    pool.query(queryString, [Usuario],(err, rows, fields) => {
        if(err){
            console.log("Id" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("id seleccionado")
        res.json(rows)
        
    })
});

Router.post('/add', async (req, res) =>{

    console.log("Tratando de agregar barberia..")
    console.log("Correo: "+ req.body.Correo)
    console.log("Correo: "+ req.body.Password)
   
    const Correo= req.body.Correo
    const Password = req.body.Password
    const NumTarjeta = req.body.NumTarjeta
    const FechaExpiracion= req.body.FechaExpiracion
    const Cvv = req.body.Cvv
    

    const queryString = "INSERT INTO usuariobarber (Correo,Password,NumTarjeta,FechaExpiracion,Cvv) VALUES (?,?,?,?,?) "
    pool.query(queryString, [Correo, Password,NumTarjeta, FechaExpiracion,Cvv], (err, results, fields) =>{
        if (err){
            console.log("Error la barberia: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego Barberia con id: ", results.insertId);
        res.json('ok');
        res.end() 
        
    } )
});

module.exports=Router;