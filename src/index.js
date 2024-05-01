const express = require('express')
const app = express();


const {PORT} = require('./db/config')
const employeesRoutes = require('../src/routes/employees')

//comnexion db
const  conexion = require('../src/db/database')




app.use(express.json())
app.use('/api', employeesRoutes)

// si la ruta no existe.
app.use((req,res,next)=> {
res.status(404).json({
    msessage: "Ruta no encontrada"
})
})

app.listen(PORT,()=> {
    console.log('Escuchando en el puerto ',PORT)
})