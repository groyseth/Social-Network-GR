// const { model } = require('mongoose');

const router = require('express').Router();
const {
 getThoughts,
 getSingleThought,
 createThought ,
 deleteThought,
 createReaction,
 deleteReaction
}= require('../../controller/thoughtController')

router.route('/').get(getThoughts).post(createThought);


router.route('/:userId').get(getSingleThought);

router.route('/:userId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;