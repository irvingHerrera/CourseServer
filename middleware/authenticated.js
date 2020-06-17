const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = 'bASIX#123';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene cabecera de Autentication.' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);

        if(payload.exo <= moment.unix()) {
            return res.status(404).send({ message: 'El token ha expirado' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'El token es invalido' });
    }

    req.user = payload;
    next();
}