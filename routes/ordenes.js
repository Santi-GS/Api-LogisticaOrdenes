const express = require('express');
const router = express.Router();
const Orden = require('../models/ordenModel');

// Obtener todas las órdenes
router.get('/ordenes', async (req, res) => {
    try {
        const { estado } = req.query;
        const filtro = estado ? { estado } : {};
        const ordenes = await Orden.find(filtro);
        res.status(200).send(ordenes);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener las órdenes', error });
    }
});

// Obtener una orden por ID
router.get('/ordenes/:id', async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        if (!orden) {
            return res.status(404).send({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).send(orden);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener la orden', error });
    }
});

// Crear una nueva orden
router.post('/ordenes', async (req, res) => {
    try {
        const nuevaOrden = await Orden.create(req.body);
        res.status(201).send(nuevaOrden);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al crear la orden', error });
    }
});

// Actualizar una orden por ID
router.put('/ordenes/:id', async (req, res) => {
    try {
        const ordenActualizada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ordenActualizada) {
            return res.status(404).send({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).send(ordenActualizada);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar la orden', error });
    }
});

// Eliminar una orden por ID
router.delete('/ordenes/:id', async (req, res) => {
    try {
        const ordenEliminada = await Orden.findByIdAndDelete(req.params.id);
        if (!ordenEliminada) {
            return res.status(404).send({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).send({ mensaje: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar la orden', error });
    }
});

module.exports = router;
