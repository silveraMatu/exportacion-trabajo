import express from 'express'
import { data } from './database.js';

//declaramos el puerto 4000 como una constante.
const PORT = 4000;

const app = express()

//Establecemos una respuesta cuando el usuario realize una peticion GET
app.get('/api/characters', (req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
})

//Si el usuario quiere buscar a un personaje por su id
app.get('/api/characters/:id', (req, res) => {
  //Especificamos un parametro de ruta para filtrar personajes
  const { id } = req.params;
  const idNumber = Number(id);
  let character;
  const items = data.items;

  //Si no es un number mandamos un error 404 (Not found)
  if(isNaN(idNumber)){
        res.status(400).json({
        message: "Invalid parameter: ID must be a number",
        error: "Bad Request",
        statusCode: 400
      })
  }else{//En caso de que la id sea valida recorremos el array de items en busca de un elemento con un id que coincida
    for(let i = 0; i < items.length; i++){
      if(items[i].id === idNumber){
        character = items[i];
        break
      }
    }
  }

  if(!character){ //Si characters es undefined retorna error 400
      return res.status(400).json({
        message: "Character ID not found",
        error: "Bad Request",
        statusCode: 400
      })
  }
    res.status(200).json(character);
})

//Middleware para lanzar un error 404 en caso de que 
//la ruta a la que se realize una peticion
//no sea ninguna de las establecidas
app.use((req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).json({
    message: "No such file or directory'",
    error: "Not Found",
    statusCode: 404
  });
});


app.listen(PORT, ()=>{
  console.log(`Escuchando en el puerto: ${PORT}`)
})