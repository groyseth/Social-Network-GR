// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
         type: String,
          required: true,
           unique: true, 
           trim: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
             validator(v) { 
                 return /(.+)@(.+){2,}.(.+){2,}/.test(v);},
                 message: props => `${props.value} is not a email!` },
         },
    thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
    ],
  },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  // Create a virtual property `upvoteCount` that gets the amount of comments per user
  userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
      return this.friends;
});
    
  // })
// })
// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

const User = model('User', userSchema);

module.exports = User;