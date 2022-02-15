const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  createFriend,
  removeFriend
} = require('../../controller/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);


router.route('/:userId/friends/:friendId').post(createFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);
module.exports = router;