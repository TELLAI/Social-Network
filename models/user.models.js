const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true, // le trim permet de supprimer le espaces a la fin du mot .
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], // isEmail est une fonction de la librairie validator pour valider les email elle renvoie false ou true.
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// play funcion before save into display: "block"
// cette fonction nous permet d'encrypter le password avec le module bcrypt
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email')
}

const userModel = mongoose.model("user", userSchema);

// On crée une table user contenant les données du Schema .
// Dans l'interface mongo db la tables va s'appeler users, 
// mongo db rajoute tjr un "s" au nom de table donné dans le script.

module.exports = userModel;