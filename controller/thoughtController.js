// const { populate } = require('../models/thoughts');
const {Thoughts, User} = require('../models');
// const User = require('../models/user');


module.exports = {
    
    getThoughts(req, res) {
        Thoughts.find()



            // .select('__v')
            .populate('reaction')
            // .populate('userId')
            .then(async (reaction) => {

                return res.json(reaction);
            })
           
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.userId })
            // .select('-__v')
              .populate('reaction')

            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });

    },
    
    createThought(req, res) {
        const arr = []
        Thoughts.create(req.body)
            .then((dbUserData) => {
                arr.push(dbUserData);
               return User.findOneAndUpdate({username: req.body.username}, {$push: {thoughts: dbUserData._id}})
                
            })
            .then((userData) => {
                arr.push(userData);
                
                res.json(arr)})
            .catch((err) => res.status(500).json(err));
    },
    // (req.params.friendId, {$push:{friends: req.params.userId}}))

    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.userId })
        //   .then((video) =>
        //     !video
        //       ? res.status(404).json({ message: 'No video with this id!' })
        //       : User.findOneAndUpdate(
        //           { videos: req.params.videoId },
        //           { $pull: { videos: req.params.videoId } },
        //           { new: true }
        //         )
        //   )
          .then((user) =>
            !user
              ? res
                  .status(404)
                 
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

      createReaction(req, res) {
        
                Thoughts.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reaction: req.body } },
                    { runValidators: true, new: true }
                  )
                 
                .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },


    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((video) =>
            !video
              ? res.status(404).json({ message: 'No video with this id!' })
              : res.json(video)
          )
          .catch((err) => res.status(500).json(err));
      },
    

};

