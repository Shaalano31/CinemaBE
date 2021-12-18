const userModel = require("../models/userModel");


exports.getUser = async(req,res) => {

    const user = await userModel
    .find({firstName: "Khaled123"})
    .select({firstName: 1, lastName: 1});

    res.status(200).json({
        status: 'success',
        data: JSON.parse(JSON.stringify(user))
    });

  };