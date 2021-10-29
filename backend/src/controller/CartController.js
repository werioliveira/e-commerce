require('dotenv').config();
const Cart = require('../model/Cart');

module.exports = {
    async post(req, res) {
        const newCart = new Cart(req.body);
        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async put(req, res) {
        try {
            const updateCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(updateCart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async delete(req, res) {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json('Cart deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async get(req, res) {
        try {
            const cart = await Cart.findOne({ userId: req.params.id });

            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAll(req, res) {
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
