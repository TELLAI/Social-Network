const UserModel = require("../models/user.models")
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000; // la variable qui permet de faire expirer une session 

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
      expiresIn: maxAge,
    });
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send( {errors} )
    }
}

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge}) // le token est enregistré en cookie sur le navigateur tant que le user est connecté
        res.status(200).json({user : user._id});
    } catch (err){
        const errors = signInErrors(err)
        res.status(200).json({errors})
    }
}


module.exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge : 1});  // pour logOut le user on va juste vider le cookie de son token
    res.redirect('/');
}