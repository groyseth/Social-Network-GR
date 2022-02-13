const connection = require('../config/connection');
const { User } = require('../models/user');
const getUserData = require('./userData.json');

console.log(getUserData);
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // await Post.deleteMany({});
  // await User.deleteMany({});

  const users = getUserData;

  // for (let i = 0; i < 20; i++) {
  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];

  //   users.push({
  //     first,
  //     last,
  //     age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
  //   });
  // }

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);
});