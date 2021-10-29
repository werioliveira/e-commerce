require('dotenv').config();
const User = require('../model/User');
const CryptoJS = require('crypto-js');

module.exports = {
    async put(req, res) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PWD_SECRET,
            ).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async get(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAllUsers(req, res) {
        const query = req.query.new;
        try {
            const users = query
                ? User.find().sort({ _id: -1 }).limit(1)
                : await User.find();
            const { password, ...others } = users;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async stats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: 1 },
                    },
                },
            ]);
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
