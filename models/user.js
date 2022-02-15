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

// console.log(reaction);
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
          return /(.+)@(.+){2,}.(.+){2,}/.test(v);
        },
        message: props => `${props.value} is not a email!`
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // default: 0,
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
// console.log(userSchema);

userSchema
  .virtual('friendCount')

  .get(function () {
    return this.friends?.length;
  });


// postSchema.virtual('commentCount').get(function () {
//   return this.comments.length;
// });

const User = model('User', userSchema);

module.exports = User;