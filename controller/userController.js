const User = require('../models/user');

module.exports = {
  getUsers(req, res) {
    User.find()
      // .select('-__v')
      .populate('thoughts')
      // .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')

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
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json({message: "user created"}))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: { username: req.body.username } })
      .then((dbUserData) => res.json({message: "user updated!"}))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // app.delete('/find-one-delete/:departmentName', (req, res) => {
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res
          .status(404)
          
        : res.json({ message: 'User successfully deleted!' })
    )
        .catch((err) => res.status(500).json(err));
  },






  // create a friend
  createFriend(req, res) {
  User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } })
    .then((dbFriendData) => User.findByIdAndUpdate(req.params.friendId, { $push: { friends: req.params.userId } }))
    .then((dbUserData) => res.json({message: "friend added"}))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
},


// removeFriend(req, res) {
//   User.findOneAndUpdate(
//     { userId: req.params.userId },
//     { $pull: { friends: req.params.friendId } },
//     { runValidators: true, new: true }
//   )
//   .then((dbFriendData) => User.findOneAndUpdate(
//      req.params.friendId, 
//     { $pull: { userId: req.params.userId } }))

//     .then((friend) =>
//       !friend
//         ? res.status(404).json({ message: 'No friend with this id!' })
//         : res.json({message:"friend deleted!"})
//     )
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err)
//     });
// },

removeFriend(req, res) {
  User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
    .then((dbFriendData) => User.findByIdAndUpdate(req.params.friendId, { $pull: { friends: req.params.userId } }))
    .then((dbUserData) => res.json({message: "friend deleted"}))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
},
};
//work on casscade delete




