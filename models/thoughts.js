// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

// ---

// validate({
    //     validator: 'isLength',
    //     arguments: [3, 50],
    //     message: 'Name should be between 3 and 50 characters'
    // },
const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')


const thoughtSchema = new Schema(
  {
    thoughtText: {
         type: String,
          required: true,
          maxlength: 280,
          
          },
          
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: time => new Date(time).toLocaleDateString()    
         },
    username: {
      type: String,
      required: true,
    },
   userId: {
    
      type: Schema.Types.ObjectId,
      ref: 'User',
      // default: 0,
    
   },
    
    
    reaction: [reactionSchema]
   
  },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    },
  );
  
  
  thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
      return this.reaction?.length;
});
    
  // })
// })
// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;


// validate({
//     validator: 'isLength',
//     arguments: [3, 50],
//     message: 'Name should be between 3 and 50 characters'
// },