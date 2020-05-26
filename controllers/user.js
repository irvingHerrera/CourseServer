const bcrypt = require('bcrypt-nodejs');
//const jwt = require('');
const User = require('../models/user');

function signUp(req, res) {
    const user = new User();

    const { name, lastname, email, password, repeatPassword } = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;

    if (!password || !repeatPassword ) {
        res.status(404).send({ message: 'Las contraeñas son obligatorias' });
    } else {
        if(password !== repeatPassword) {
            res.status(404).send({ message: 'Las contraeñas no son iguales ' });
        } else {
            bcrypt.hash(password, null, null, function(err, hash){
                if(err) {
                    res.status(500).send({ message: 'Erro al encriptar la contraseña' });
                } else {
                    user.password = hash;
                    user.save((err, userStore) => {
                        if(err) {
                            res.status(500).send({ message: 'El usuario ya existe', erro: err });
                        } else {
                            if(!userStore) {
                                res.status(404).send({ message: 'Erro al crear el usuario' });
                            } else {
                                res.status(200).send({ message: 'usuario creado', user: userStore });
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = {
    signUp
};