// const { populate } = require('../models/thoughts');
const {Thoughts, User} = require('../models');
// const User = require('../models/user');

// const reactionCount = async () =>
//     Thought.aggregate()
//         .count("reactionCount")


//         .then((numberOfStudents) => numberOfStudents);

//     const reactionCount = async (reactionId) =>
// Thought.aggregate([
//     {
//         $unwind: { path: '$reaction' },
//     },
//     {
//         $group:
//         {
//             _id: reactionId,
//             reactionNumber: { $max: "$reaction.reactionId" }
//         }
//     },
// ]);






module.exports = {
    // getThoughts(req, res) {
    //     Thought.find()
    //     .then(async (react) => {
    //         const reactionObj = {
    //           react,
    //           reactionCount: await reactionCount(),
    //         };
    //         return res.json(reactionObj);
    //         // .then((users) => res.json(users))
    //         // .catch((err) => res.status(500).json(err));
    //     },
    // },
    getThoughts(req, res) {
        Thoughts.find()



            // .select('__v')
            // .populate
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
            .select('-__v')
            //   .populate('Thoughts')

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
    // create a new user
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

};

