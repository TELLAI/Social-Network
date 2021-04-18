const PostModel = require("../models/post.model");
const UserModel = require("../models/user.models");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }else {
            console.log("Error to get data : " + err);
        }
    }).sort({ createdAt : -1}) // pour afficher les post les plus récents ainsi on inverse l'ordre etablie par le resultat de la requete
}
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId : req.body.posterId,
        message : req.body.message,
        video : req.body.video,
        likers : [],           // A la création les commentaires et likes sont vides c logique
        comments : [],         // On va les remplir plutard
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    }catch(err){
        return res.status(400).send(err)
    }
};

module.exports.updatePost = (req, res) => {
if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  
  const updatedRecord = {
      message: req.body.message
  }

  PostModel.findByIdAndUpdate(
      req.params.id, { $set: updatedRecord}, { new: true },
      (err, docs) => {
          if (!err) {
              res.send(docs);
          }else {
              console.log("Update Error : " + err);
          }
      }
  )

};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

     PostModel.findByIdAndRemove(
         req.params.id,
         (err, docs) =>{
             if(!err){
                 res.send(docs);
             }else{
                 console.log("Delete Error : " + err);
             }
         }
     )
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          await PostModel.findByIdAndUpdate(
              req.params.id,
              {
                  $addToSet: { likers: req.body.id }
                },
                { new: true },
                (err, docs) => {
                    if (err){
                        return res.status(400).send(err);
                    }
                }
          );
          await UserModel.findByIdAndUpdate(
              req.body.id,
              {
                  $addToSet: { likes : req.params.id }
              },
              { new: true },
              (err, docs) => {
                  if (!err) {
                    res.send(docs);
                  }else {
                      return res.status(400).send(err);
                  }
              }
          )
      }catch(err) {
          return res.status(400).send(err);
      }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          await PostModel.findByIdAndUpdate(
              req.params.id,
              {
                  $pull: { likers : req.body.id}
              },
              { new: true, upsert: true },
              (err, docs) => {
                    if (err){
                        return res.status(400).send(err)
                    }
              }
          )

          await UserModel.findOneAndUpdate(
              req.body.id,
              {
                  $pull: { likes: req.params.id}
              },
              {new: true, upsert: true},
              (err, docs) => {
                  if (!err){
                       res.send(docs)
                  }else {
                    return  res.status(400).send(err)
                  }
              }
          )
      }catch (err) {
          return res.status(400).send(err)
      }

};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          return PostModel.findByIdAndUpdate(req.params.id, 
            {
            $push: {
              comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text : req.body.text, 
                timestamp : new Date().getTime() // lui affecter la date du moment où le commentaire a été posté
              },
            }      
          },
          {new : true},
          (err, docs) => {
              if (!err) {
                  return res.send(docs)
              }else {
                  return res.status(400).send(err)
              }
          });
      }catch(err){
          return res.status(400).send(err)
      }
};

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
        return PostModel.findById(
            req.params.id,
            (err, docs)=> {
                const theComment = docs.comments.find((comment) => {
                    return comment._id.equals(req.body.commentId)
                })
                // console.log(theComment.text)
                if(!theComment) {
                    return res.status(404).send('Comment not found')
                }
                else {
                    theComment.text = req.body.text;
                }

                return docs.save((err) => {
                    if(!err){
                        return res.status(200).send(docs);
                    }else {
                        return res.status(500).send(err);
                    }
                })

            }
        )
      }catch(err){
          return res.status(400).send(err);
      }
};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      try {
          return PostModel.findByIdAndUpdate(
              req.params.id,
              {
                  $pull : {
                      comments : {
                        _id : req.body.commentId
                      }
                    }
              }, 
              {new: true},
              (err, docs) =>{
                  if(!err) return res.send(docs)
                  else return res.status(400).send(err)
              }
          );
      }catch(err){
          return res.status(400).send(err);
      }
};