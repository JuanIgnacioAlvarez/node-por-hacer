const fs = require('fs');
//const { require } = require('yargs');

let listadoporhacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoporhacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });


}

const cargarDB = () => {

    try {
        listadoporhacer = require('../db/data.json');
    } catch (error) {
        listadoporhacer = [];
    }




}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoporhacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoporhacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoporhacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoporhacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoporhacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoporhacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoporhacer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}