const Order = require('../../domain/entities/order.entity');

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    async createOrder(orderData) {
        const total = this.calculateTotal(orderData);

        const orderEntity = new Order(
            null,                           // id lo pone Mongo
            orderData.product,
            orderData.description,
            orderData.quantity,
            orderData.price,
            orderData.discount,
            total,
            orderData.status || 'PENDING'
        );

        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const total = this.calculateTotal(orderData);

        const orderEntity = new Order(
            id,
            orderData.product,
            orderData.description,
            orderData.quantity,
            orderData.price,
            orderData.discount,
            total,
            orderData.status || 'PENDING'
        );

        return this.orderRepository.update(id, orderEntity);
    }

    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }

    calculateTotal(orderData) {
        const quantity = Number(orderData.quantity) || 0;
        const price = Number(orderData.price) || 0;
        const discount = Number(orderData.discount) || 0;
        const subtotal = quantity * price;
        const total = subtotal - discount;

        return total >= 0 ? total : 0;
    }
}

module.exports = OrderService;
