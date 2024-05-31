const { User } = require("../models/models")

const registerUser = async (req, res) => {
    const password = req.body.password
    const username = req.body.username

    let newUser = new User()

    newUser.username = username
    newUser.setPassword(password)
    try{
        await newUser.save()
        res.status(200).json({message: "User registered successfully"})
    } catch(error)  {
        res.status(400).json({message: error})
    }

}

const getUser = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const user = await User.findOne({username: username})
        if(user == null){
            res.status(400).json({message: "User not found"})
        } else{
            if(user.validPassword(password)){
                res.status(200).json({user: user})
            }else{
                res.status(400).json({message: "Wrong Credentials"})
            }
        }
    } catch(error) {
        res.status(500).json({message: error})
    }
}

const deleteUser = async (req, res) => {
    const user_id = req.params.user_id
    try{
        const user = await User.deleteOne({_id: user_id})
        if(user)
            res.status(200).json({message: "User deleted successfully"})
        else
            res.status(400).json({message: "User not found"})
    }catch(error){
        res.status(500).json({message: "Server Error", error: error})
    }
}

module.exports = {
    registerUser, getUser, deleteUser
}