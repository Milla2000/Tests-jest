const express = require ('express');
const bodyParser = require('body-parser');
const { projectrouter } = require('./Routes/projectRoutes');
const { employeerouter } = require('./Routes/employeeRoutes');

const app  = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/project', projectrouter);
app.use('/employee' , employeerouter );

app.use((err, req, res, next)=>{
    // res.json({Error: err})
    console.log(err.message);
})

app.listen(4500, ()=>{
    console.log('Server running on port 4500');
}) 