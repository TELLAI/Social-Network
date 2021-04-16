const UserModel = require("../models/user.models");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password'); 
    // on selectionne toutes les infos de chaque user sauf le password
    
    res.status(200).json(users)
}

module.exports.userInfo = async (req, res) => {
    console.log(req.params);
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id)

    const users = await UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err)
    }).select("-password");
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          await UserModel.findByIdAndUpdate(
              {_id : req.params.id},
              {
                  $set : {
                      bio : req.body.bio
                  }
              },
              {
                  new : true , upsert : true, setDefaultsOnInsert : true
              },
              (err, docs) => {
                  if (!err) return res.send(docs)
                  if(err) return res.status(500).send({message: err})
              }
          )
      } catch (err) {
          return res.status(500).json({message: err})
      }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          await UserModel.remove({_id : req.params.id}).exec()
          res.status(200).send({message: "Succefully deleted"});
      } catch(err) {
          return res.status(500).json({message: err})
      }
};

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          // on ajoute l'id de la personne que l'on veut follow sur la liste des id following
        await UserModel.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { following: req.body.idToFollow } }, // idToFollow c'est l'id sur lequel on clique et que l'on veut follow
          { new: true, upsert: true },
          (err, docs) => {
            if (!err) res.status(201).json(docs);
            else return res.status(400).json(err);
          }
        );
        // inversement on ajoute l'id de la personne qui veut nous follow sur la liste de nos followers
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet : { followers : req.params.id}},
            { new: true, upsert: true},
            (err, docs) => {
                // if (!err) res.status(201).json(docs)
                if (err) return res.status(400).json(err);
            }
        )
      }catch (err) {
          return res.status(500).json({message : err})
      }
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
    return res.status(400).send("ID unknown : " + req.params.id);

      try {
        // on ajoute l'id de la personne que l'on veut follow sur la liste des id following
        await UserModel.findByIdAndUpdate(
          req.params.id,
          { $pull: { following: req.body.idToUnFollow } }, // idToFollow c'est l'id sur lequel on clique et que l'on veut follow
          { new: true, upsert: true },
          (err, docs) => {
            if (!err) res.status(201).json(docs);
            else return res.status(400).json(err);
          }
        );
        // inversement on ajoute l'id de la personne qui veut nous follow sur la liste de nos followers
        await UserModel.findByIdAndUpdate(
          req.body.idToUnFollow,
          { $pull: { followers: req.params.id } },
          { new: true, upsert: true },
          (err, docs) => {
            // if (!err) res.status(201).json(docs)
            if (err) return res.status(400).json(err);
          }
        );
      } catch (err) {
        return res.status(500).json({ message: err });
      }
};

