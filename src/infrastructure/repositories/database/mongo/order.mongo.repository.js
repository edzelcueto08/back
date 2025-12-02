const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {

    async getAll() {
        const orders = await OrderModel.find();
        return orders.map(o => new Order(
            o._id.toString(),
            o.product,
            o.description,
            o.quantity,
            o.price,
            o.discount,
            o.total,
            o.status
        ));
    }

    async getById(id) {
        const o = await OrderModel.findById(id);
        if (!o) return null;

        return new Order(
            o._id.toString(),
            o.product,
            o.description,
            o.quantity,
            o.price,
            o.discount,
            o.total,
            o.status
        );
    }

    async create(orderEntity) {
        const created = await OrderModel.create({
            product:     orderEntity.product,
            description: orderEntity.description,
            quantity:    orderEntity.quantity,
            price:       orderEntity.price,
            discount:    orderEntity.discount,
            total:       orderEntity.total,
            status:      orderEntity.status
        });

        return new Order(
            created._id.toString(),
            created.product,
            created.description,
            created.quantity,
            created.price,
            created.discount,
            created.total,
            created.status
        );
    }

    async update(id, orderEntity) {
        const updated = await OrderModel.findByIdAndUpdate(
            id,
            {
                product:     orderEntity.product,
                description: orderEntity.description,
                quantity:    orderEntity.quantity,
                price:       orderEntity.price,
                discount:    orderEntity.discount,
                total:       orderEntity.total,
                status:      orderEntity.status
            },
            { new: true }
        );

        if (!updated) return null;

        return new Order(
            updated._id.toString(),
            updated.product,
            updated.description,
            updated.quantity,
            updated.price,
            updated.discount,
            updated.total,
            updated.status
        );
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;
