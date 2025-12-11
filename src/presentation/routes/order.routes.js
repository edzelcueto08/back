const { Router } = require('express');
const OrderController = require('../controller/order.controller');

// Inyección de dependencias
const OrderService = require('../../application/use-cases/order.service');
const OrderMongoRepository = require('../../infrastructure/repositories/database/mongo/order.mongo.repository');

const orderRepository = new OrderMongoRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gestión de órdenes
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', async (req, res, next) => {
  try {
    await orderController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    await orderController.getById(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', async (req, res, next) => {
  try {
    await orderController.create(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualizar una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Orden actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.put('/:id', async (req, res, next) => {
  try {
    await orderController.update(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Eliminar una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       204:
 *         description: Orden eliminada correctamente
 *       404:
 *         description: Orden no encontrada
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await orderController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
