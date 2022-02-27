//requirements for the thought functionality, you need moment.js, mongoose schema, abd reaction schema
const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

//create the schema for the thought post
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250
    },
    createTime: {
        type:Date,
        default: Date.now,
        get: (createTimeVal) => moment(createTimeVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type:String,
        required:true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id:false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;