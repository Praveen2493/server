const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");




exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;


        const existUser = await User.findOne({email});

        if (existUser) {
            return res.status(400).json({
                success:false,
                message:"User already exist",
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password,
            password: hashPassword,
        });

        res.status(200).json({
            success:true,
            message:"User Register Successfully",
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}




exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;


        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"Invalid Credentails",
            });
        }

        const isMatch = await bcrypt.compare(
            password, user.password
        );

        if (!isMatch) {
            res.status(400).json({
                success:false,
                message:"Invalid Credentails",
            });
        }

       console.log(process.env.JWT_SECRET); 
       
      const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "30d"
            }
            );

        res.status(200).json({
            success:true,
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
            res.status(400).json({
                success: false,
               message: error.message,
            })
    }
};