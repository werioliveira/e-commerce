require('dotenv').config();
const Order = require('../model/Order');

module.exports = {
    async post(req, res) {
        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async put(req, res) {
        try {
            const updateOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(updateOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async delete(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json('Order deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async get(req, res) {
        try {
            const orders = await Order.findOne({ OrderId: req.params.id });

            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async monthIncome(req, res) {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
      
        try {
          const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
              $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" },
              },
            },
          ]);
          res.status(200).json(income);

        } catch (err) {
          res.status(500).json(err);
        }
    },
};
