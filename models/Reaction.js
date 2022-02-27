//set the requirements first
const {Schema, model, Types } = require('mongoose');
const moment = require('moment');

//create the reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionText: {
        type: String,
        required: true,
        maxlength: 250
    },
    username: {
        type:String,
        required:true
    },
    createTime: {
        type: Date,
        default: Date.now,
        get: (createTimeVal) => moment(createTimeVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id:false
});

module.exports = reactionSchema;