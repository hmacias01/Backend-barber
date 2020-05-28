const express = require('express');
const Router = express.Router();
const pool = require('../database');


Router.get('/',(req,res)=>{
    res.send('autentificacion');
});

//usuario x nombre de usuario y clave
Router.get('/get/:usuario/:clave', async (req, res) => {

    console.log("Seleccionar por usuario y clave: "+ req.params.Usuario)

    const Usuario= req.params.usuario
    const Contraseña = req.params.clave
    
    const queryString = "SELECT u.usuario AS Usuario, u.Password AS Password, r.rol AS rol FROM usuario AS u INNER JOIN roles AS r ON u.Id_rol = r.Idrol WHERE u.usuario = ? AND u.Password = ?"
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
    const queryString = "SELECT u.idUsuario FROM usuario AS u where Usuario=?"
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

    console.log("Tratando de agregar usuario..")
    console.log("Nombres: "+ req.body.Nombres)
    console.log("Apellidos: "+ req.body.Apellidos)
    console.log("Usuario: "+ req.body.Usuario)
    console.log("Contraseña: "+ req.body.Password)
    console.log("IdRol: "+ req.body.idrol)

   
    const Nombres = req.body.Nombres
    const Apellidos = req.body.Apellidos
    const Usuario = req.body.Usuario
    const Password = req.body.Password
    const correo= req.body.correo
    const Id_rol = req.body.Id_rol
    

    const queryString = "INSERT INTO usuario (Nombres, Apellidos, Usuario, Password,correo, Id_rol) VALUES (?,?,?,?,?,(SELECT Idrol FROM roles WHERE rol = ?)) "
    pool.query(queryString, [Nombres, Apellidos, Usuario, Password,correo, Id_rol], (err, results, fields) =>{
        if (err){
            console.log("Error el usuario: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego usuario con id: ", results.insertId);
        res.json('ok');
        res.end() 
        
    } )
});

module.exports=Router;