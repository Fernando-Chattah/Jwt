const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Rutas
app.get('/',(req, res) => {
    res.json({
        test: 'aplicacion funcionando'
    });
});

app.post('/api/login', (req,res) => {
    const user = {id: 3}
    const token = jwt.sign({user}, 'my_secret_token');
    res.json({
        token
    })
});

app.get('/api/protected', ensuretoken, (req,res) => {
    jwt.verify(req.token,'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
        res.json({
           text: 'protected',
           data
        })

        }
    })
    
});


function ensuretoken(req, res, next) {
    const bearerHeder = req.headers['autorization'];
    console.log(bearerHeder);
    if (typeof bearerHeder !== 'undefined') {
        const bearer = bearerHeder.split(" ");
        const bearerToken = bearer(1);
        req.token = bearerToken;
        next
    } else {
        res.sendStatus(403);
    }
}

// Configurador del Servidor
app.listen(3000, () => {
    console.log('Server on Port 3000');
});