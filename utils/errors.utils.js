module.exports.signUpErrors = (err) => {
    let errors = {pseudo: "", email : "", password : ""}
    if(err.message.includes("password")){
        errors.password = "Le mot de passe doit contenir 6 caractères au minimum"
    }
    if(err.code === 11000) {
        if (err.keyPattern.email) {
          errors.email = "Cet email est déjà enregistré";
        }
        if (err.keyPattern.pseudo) {
          errors.pseudo = "Pseudo incorrect ou dèjà pris";
        }
    }
    return errors
};

module.exports.signInErrors = (err) => {
    let errors = {email: "", password: ""}
        if (err.message.includes("password")) {
          errors.password =
            "Le mot de passe ne correspond pas";
        }
        if (err.message.includes("email")) {
            errors.email = "Cet email est inconnu ";
        }
        return errors;
}

module.exports.uploadErrors = (err) => {
    let errors = { format : "", maxSize : ""};

    if (err.message.includes("invalid file")){
        errors.format = "Format incompatible";
    }
    if (err.message.includes("max size")){
        errors.maxSize = "La taille de l'image est supérieur à 500Ko"
    }
    return errors
}
