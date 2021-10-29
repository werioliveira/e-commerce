require('dotenv').config();
const Product = require('../model/Product');

module.exports = {
    async post(req, res) {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async put(req, res) {
        try {
            const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(updateProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async delete(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Product deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async get(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAllProducts(req, res) {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try {
            let products;
            if (qNew) {
                products = await Product.find()
                    .sort({ createdAt: -1 })
                    .limit(1);
            } else if (qCategory) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    },
                });
            } else {
                products = await Product.find();
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
