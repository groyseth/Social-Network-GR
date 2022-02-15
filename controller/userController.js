const User = require('../models/user');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('Thoughts')
      
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) =>  {
        console.log(err);
        res.status(500).json(err)
      });
      
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // create a friend
  createFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, {$push:{friends: req.params.friendId}})
    .then((dbFriendData) => User.findByIdAndUpdate(req.params.friendId, {$push:{friends: req.params.userId}}))
    .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)});
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { friends: req.params.friendId }  },
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
//work on casscade delete



  
