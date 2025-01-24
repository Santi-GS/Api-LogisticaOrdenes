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

// Obtener todas las órdenes con filtros avanzados
router.get('/ordenes/buscar', async (req, res) => {
    try {
        const { destino, fechaInicio, fechaFin, estado } = req.query;
        const filtro = {};

        if (destino) filtro.destino = { $regex: destino, $options: 'i' };
        if (estado) filtro.estado = estado;

        if (fechaInicio || fechaFin) {
            filtro.fecha_creacion = {};
            if (fechaInicio) {
                const inicio = new Date(fechaInicio);
                if (isNaN(inicio.getTime())) {
                    return res.status(400).send({ mensaje: 'Fecha de inicio inválida' });
                }
                filtro.fecha_creacion.$gte = inicio;
            }
            if (fechaFin) {
                const fin = new Date(fechaFin);
                if (isNaN(fin.getTime())) {
                    return res.status(400).send({ mensaje: 'Fecha de fin inválida' });
                }
                filtro.fecha_creacion.$lte = fin;
            }
        }

        const ordenes = await Orden.find(filtro);
        res.status(200).send({ mensaje: 'Búsqueda realizada', ordenes });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar las órdenes', error: error.message });
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

// Cambiar estado de una orden
router.patch('/ordenes/:id/estado', async (req, res) => {
    try {
        const { nuevoEstado } = req.body;

        // Validar estado
        const estadosValidos = ['Pendiente', 'En tránsito', 'Entregado'];
        if (!estadosValidos.includes(nuevoEstado)) {
            return res.status(400).send({ mensaje: 'Estado no válido. Estados válidos: Pendiente, En tránsito, Entregado' });
        }

        // Actualizar el estado de la orden
        const ordenActualizada = await Orden.findByIdAndUpdate(
            req.params.id,
            { estado: nuevoEstado },
            { new: true, runValidators: true }
        );

        if (!ordenActualizada) {
            return res.status(404).send({ mensaje: 'Orden no encontrada' });
        }

        res.status(200).send({ mensaje: 'Estado actualizado', orden: ordenActualizada });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el estado', error: error.message });
    }
});


module.exports = router;

