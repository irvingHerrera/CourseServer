const Menu = require('../models/menu');

function addMenu(req, res) {
    const { title, url, order, active } = req.body;
    const menu = new Menu();
    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    menu.save((err, createMenu) => {
        if(err) {
            res.status(500).send({ message: 'Erro del servidor' });
        } else {
            if(!createMenu) {
            res.status(404).send({ message: 'Erro al crear el menu' });
            } else {
            res.status(200).send({ message: 'Menu creado correctamente.' });
            }
        }
    })
}

function getMenu(req, res) {
    Menu.find().then(menus => {
        if(!menus) {
            res.status(404).send({ message: 'No se han encontrado los menus' })
        } else {
            res.status(200).send({ menus });
        }
    })
    
}

module.exports = {
    addMenu,
    getMenu
};