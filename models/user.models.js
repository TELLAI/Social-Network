const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type : String,
            required : true,
            minLength : 3,
            maxLength: 55,
            unique: true,
            trim : true // le trim permet de supprimer le espaces a la fin du mot .
        },
        email: {
            type : String,
            required : true,
            validate : [isEmail], // isEmail est une fonction de la librairie validator pour valider les email elle renvoie false ou true.
            lowercase : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
            max: 1024,
            minLength: 6,
        },
        bio: {
            type : String,
            max : 1024,
        },
        followers : {
            type : [String]
        },
        following : {
            type : [String]
        },
        likes : {
            type : [String]
        }
    },
    {
        timestamps : true,
    }
)
const userModel = mongoose.model("user", userSchema);

module.export = userModel;