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
    Menu.find()
    .sort({ order: 'asc' })
    .exec((err, menus) => {
        if(err) {
            res.status(500).send({ message: 'Error del servidor' })
        } else {
            if(!menus) {
                res.status(404).send({ message: 'No se han encontrado los menus' })
            } else {
                res.status(200).send({ menus });
            }
        }
    });
    
}

function updateMenu(req, res) {
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
        if(err) {
            res.status(500).send({ message: 'Error del servidor' });
        } else {
            if(!menuUpdate) {
                res.status(404).send({ message: 'No se a encontrado ningun menu' });
            } else {
                res.status(200).send({ message: 'Menu actualizado correctamente' });
            }
        }
    });
}

function activateMenu(req, res) {
    const { id } = req.params;
    const { active } = req.body;

    Menu.findByIdAndUpdate(id, {active}, (err, menuUpdate) => {
        if(err) {
            res.status(500).send({ message: 'Error del servidor' });
        } else {
            if(!menuUpdate) {
                res.status(404).send({ message: 'No se a encontrado ningun menu' });
            } else {
                res.status(200).send({ message: `Menu ${active ? 'activado' : 'desactivado'} correctamente` });
            }
        }
    });
}

module.exports = {
    addMenu,
    getMenu,
    updateMenu,
    activateMenu
};