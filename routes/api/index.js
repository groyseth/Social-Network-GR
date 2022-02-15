const router = require('express').Router();
const thoughtRoute = require('./thougthRoute');
const userRoutes = require('./userRoute');
const reactionRoute = require('./reactionRoute')

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoutes);
router.use('/reaction', reactionRoute);

module.exports = router;