const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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
        picture : {
            type : String,
            default : "./uploads/profil/random-user.png"
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

// play funcion before save into display: "block"
// cette fonction nous permet d'encrypter le password avec le module bcrypt
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;