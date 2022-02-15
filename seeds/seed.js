const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
// const reactionSchema = require('../models/reaction')
const  {userData}  = require('./userData');
const {thoughtData} = require('./thoughtData');
const {reactionData} = require('./reaction');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});
  await Thoughts.deleteMany({});
  // await reactionData.deleteMany({});



  console.log(thoughtData);
  console.log(userData);
console.log(reactionData);


  await User.insertMany(userData)
  await Thoughts.insertMany(thoughtData, [reactionData]);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
