const express = require('express');
// const fs = require('fs');
const chalk = require('chalk');
const morgan = require('morgan');


const app = express();
const indexFile = `${ __dirname }/index.html`;
const PORT = process.env.PORT || 3000; //variable de entorno

//Middleware
app.use(morgan('dev'))

//Route
app.get('/', (request, response) => {
    console.log('We are on home route')
    response.sendFile(indexFile);
});

app.get('/muktek', (request, response) => {
    response.send('MUKTEK');
});

//404

app.use((request, response) => {
    const ERROR = {
        message: '404. Not Found.'
    };
response
    .status(404)
    .json(ERROR);
});

//500

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send('Something broke!')
});


//Running
app.listen(PORT, () => {
    const formatedMessage = chalk.green(`Node server running on PORT: ${ PORT }`);
    console.log(formatedMessage);
});