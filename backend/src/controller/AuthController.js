require('dotenv').config();
const User = require('../model/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
module.exports = {
    async register(req, res) {
        const hashedPass = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PWD_SECRET,
        ).toString();
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        try {
            const savedUser = await newUser.save();
            return res.status(200).json(savedUser);
        } catch (err) {
            return res.status(401).json(err);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(401).json('Wrong Credentials');
            }
            // !user && res.status(401).json('Wrong Credentials')

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PWD_SECRET,
            );
            const finalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            if (finalPassword !== req.body.password) {
                return res.status(401).json('Wrong Credentials');
            }
            // finalPassword !== req.body.password && res.status(401).json('Wrong Credentials')
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                { expiresIn: '3d' },
            );
            const { password, ...rest } = user._doc;
            res.status(200).json({ rest, accessToken });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
