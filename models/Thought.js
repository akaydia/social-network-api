const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must enter a thought',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: 'You must enter a username',
        },
        reactions: [ReactionSchema.schema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;