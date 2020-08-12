const Course = require('../models/course');

function addCourse(req, res) {
    const body = req.body;
    const course = new Course(body);
    course.order = 1000;

    course.save((err, courseStored) => {
        if(err) {
            res.status(400).send({ code: 400, message: 'El curso que estas creando ya existe' });
        } else {
            if(!courseStored) {
                res.status(400).send({ code: 400, message: 'No se ha podido crear el curso' });
            } else {
                res.status(200).send({ code: 200, message: 'El curso creado correctamente' });
            }
        }
    });
}

function getCourse(req, res) {
    Course.find()
        .sort({ order: 'asc' })
        .exec((err, coursesStore) => {
            if(err) {
                res.status(500).send({ code: 500, message: 'Error del servidor' });
            } else {
                if(!coursesStore) {
                    res.status(404).send({ code: 404, message: 'No se ha encontrado ningun curso' });
                } else {
                    res.status(200).send({ code: 200, courses: coursesStore });
                }
            }
        });
}

function deleteCourse(req, res) {
    const { id } = req.params;

    Course.findByIdAndRemove(id, (err, courseDelete) => {
        if(err) {
            res.status(500).send({ code: 500, message: 'Error del servidor' });
        } else {
            if(!courseDelete) {
                res.status(404).send({ code: 404, message: 'Curso no encontrado' });
            } else {
                res.status(200).send({ code: 200, message: 'El curso ha sido eliminado correctamente' });
            }
        }
    })
}

function updateCourse(req, res) {
    const courseData = req.body;
    const { id } = req.params;

    Course.findByIdAndUpdate(id, courseData, (err, courseUpdate) => {
        if(err) {
            res.status(500).send({ code: 500, message: 'Error del servidor' });
        } else {
            if(!courseUpdate) {
                res.status(404).send({ code: 404, message: 'No se ha encontrado ningun courso' });
            } else {
                res.status(200).send({ code: 200, message: 'Curso actualizado correctamente' });
            }
        }
    })
}

module.exports = {
    addCourse,
    getCourse,
    deleteCourse,
    updateCourse
}