const conexionPromesa = require('../db/database')

//Selecciona todos
const getEmployees = async (req,res)=> {

    try {  // MANEJO DE ERRORES
        const conexion = await conexionPromesa;
        const [rows] =  await conexion.query('SELECT * FROM employee')
          
        res.json({
          rows
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        })
    }
 
}


// Seleccionamos por ID
const getEmployeesById = async(req,res) => {

    try {
    
        const {id} = req.params
        const conexion = await conexionPromesa; 
        const [rows] = await conexion.query('SELECT * FROM employee WHERE id=?', [id])
    
           // Verifica si se encontraron resultados
           if (rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
    
       res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        })
    }



}

//Crear empleado
const createEmployees = async(req,res)=> {
    const {name, salary} = req.body

    try {
    const conexion = await conexionPromesa; // hay que agregar esto sino no funciona la consulta
    const [rows] = await conexion.query('INSERT INTO employee (name,salary) VALUES (?,?)', [name,salary]) 

    res.send({
        id: rows.insertId,
        name,
        salary
})

    } catch (error) {
    return res.status(500).json({
        message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
    })
    }

}


//Actualizar empleado
const updateEmployees = async(req,res)=> {

    const {id} = req.params;
    const {name,salary} = req.body


    try {

        conexion = await conexionPromesa

    // se utiliza el patch en las rutas.
   //quiero actualizar name y salario, mientras que el ID sea..  // IFNULL si no voy a actualizar el nombre, deja el nombre como esta, lo mismo con salary. 
        const [result] =  await conexion.query('UPDATE employee set name = IFNULL (?, name),  salary= IFNULL(?,salary) where id= ?', [name, salary, id])
   
       // Verifica cuántas filas fueron afectadas
       if (result.affectedRows === 0) { // Si las filas no fueron afectadas, es porque no existe ese empleado.
           return res.status(404).json({ message: "Empleado no encontrado" });
       }
   
       // PARA VER EL empleado actualizado hay que hacer otra consulta SQL
       const [rows] = await conexion.query('SELECT * FROM employee where  id = ?', [id])    
   
       res.json(rows[0]) // me manda un objeto json. 
   
    } catch (error) {
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        })
    }

}


//ELIMINAR empleado.
const deleteEmployees = async(req,res)=> {
try {
    const {id} = req.params
    const conexion = await conexionPromesa;
    const [result] = await conexion.query('DELETE FROM employee where id = ?', [id])

    // Verifica cuántas filas fueron afectadas
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({
        msg: "Empleado eliminado correctamente."
    })

} catch (error) {
     return res.status(500).json({
        message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
     })
}

}

module.exports= {
    getEmployees,
    getEmployeesById,
    createEmployees,
    updateEmployees,
    deleteEmployees
}