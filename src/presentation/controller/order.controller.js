class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    getAll = async (req, res) => {
        const orders = await this.orderService.getAllOrders();
        res.status(200).json(orders);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const order = await this.orderService.getOrderById(id);

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    }

    create = async (req, res) => {
        const orderData = req.body;
        const newOrder = await this.orderService.createOrder(orderData);
        res.status(201).json(newOrder);
    }

    update = async (req, res) => {
        const { id } = req.params;
        const orderData = req.body;
        const updatedOrder = await this.orderService.updateOrder(id, orderData);

        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.orderService.deleteOrder(id);
        res.status(204).send(); 
    }
}

module.exports = OrderController;
