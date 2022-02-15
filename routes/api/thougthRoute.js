// const { model } = require('mongoose');

const router = require('express').Router();
const {
 getThoughts,
 getSingleThought,
 createThought 
}= require('../../controller/thoughtController')

router.route('/').get(getThoughts).post(createThought);


router.route('/:userId').get(getSingleThought);
module.exports = router;