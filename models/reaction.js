// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`
// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query





const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: time => new Date(time).toLocaleDateString()
    },
  })
module.exports = reactionSchema;