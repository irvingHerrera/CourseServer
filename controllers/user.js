const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
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

function signIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({email}, (err, userStore) => {
        if(err) {
            res.status(500).send({message: 'Error del servidor'})
        } else {
            if(!userStore) {
                res.status(400).send({message: 'Usuario no encontrado'});
            } else {
                bcrypt.compare(password, userStore.password, (err, check) => {
                    if(err) {
                        res.status(500).send({message: 'Error del servidor'})
                    } else if(!check) {
                        res.status(404).send({message: 'El usuario o contraseña es incorrecta'})
                    } else {
                        if(!userStore.active) {
                            res.status(200).send({message: 'El usuario no se ha activado.'})
                        } else {
                            res.status(200).send({
                                                    token: jwt.createAccessToken(userStore), 
                                                    refreshToken: jwt.createRefreshToken(userStore), 
                                                    message: 'Token ok'
                                                });
                        }
                    }
                });
            }
        }
    })

}

function getUsers(req, res) {
    User.find().then(users => {
        if(!users) {
            res.status(404).send({ message: 'No se han encontrado usuarios' })
        } else {
            res.status(200).send({ users });
        }
    })
    
}

function getUsersActive(req, res) {
    const query = req.query;
    
    User.find({ active: query.active }).then(users => {
        if(!users) {
            res.status(404).send({ message: 'No se han encontrado usuarios' })
        } else {
            res.status(200).send({ users });
        }
    })
    
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive
};