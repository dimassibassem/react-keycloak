const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const memoryStore = new session.MemoryStore();
const jwt = require('jsonwebtoken');
const app = express();
const keycloak = new Keycloak({store: memoryStore,});
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
    secret: '7S8QkOGiUTgtmOtsgsAxtBG5uKmgsgBK',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(keycloak.middleware());

app.get('/api/auth', keycloak.protect(), function (req, res) {
    try {
        res.redirect(`http://localhost:5173`);
    } catch (err) {
        res.json(err);
    }
});

app.get('/api/me', keycloak.protect(), function (req, res) {
    try {
        const token = req.kauth.grant.access_token.token;
        const {
            name,
            preferred_username,
            given_name,
            family_name,
            email
        } = jwt.decode(token);

        res.json({
            name,
            preferred_username,
            given_name,
            family_name,
            email
        });
    } catch (err) {
        res.json(err);
    }
});

app.listen(3000, function () {
    console.log('Server started on http://localhost:3000');
})
