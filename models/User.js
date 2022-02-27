//create a schema require from mongoose
const { Schema, model } = require('mongoose');

//create a new user schema
const userSchema = new Schema({
    //username needs to be unique, required, and trim any whitespace
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    //email needs to be unique, and have match validation for structure
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;