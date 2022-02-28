const { User, Thought, Reaction} = require('../models');
const { findOneAndDelete } = require('../models/User');

//create the object for all the routes functions
const thoughtController = {

//get the thoughts at /api/thoughts
getAllThoughts(req,res) {
    Thought.find({})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thoughtData => res.json(thoughtData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
},

//get thought by ID at /api/thoughts/:id
getThoughtById({params}, res) {
    Thought.findOne({_id: params.id})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: 'There is no thought with that ID'});
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    }); 

    
},


//post a thought at /api/thoughts
// example data
//{
//    "thoughtText": "Here's a cool thought...",
//    "username": "lernantino",
//    "userId": "5edff358a0fcb779aa7b118b"
//  }

createThought({body}, res) {
    Thought.create(body)
    .then(thoughtData => {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {thoughts:thoughtData._id}},
            {new:true}
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: `there is no user found with this id: ${params.userId}`});
                return;
            }
            res.json(userData);
        }).catch(err => res.json(err));
    }).catch(err => res.json(err));
},


//put request to update a thought at /api/thoughts/:id
// example data
//{
//    "thoughtText": "Here's a cool thought...",
//    "username": "lernantino",
//    "userId": "5edff358a0fcb779aa7b118b"
//  }

updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.id},
        body,
        {new:true}
    )
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: `there is no message with that id number: ${params.id}`});
            return;
        }
        res.json(thoughtData);
    }).catch(err => res.status(400).json(err));
},

//delete request to remove a thought based on ID at /api/thoughts/:id
deleteThought({params}, res) {
    //delete the thought from the database
    Thought.findOneAndDelete({_id:params.id})
    then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: `there is no message with that id number: ${params.id}`});
            return;
        }

        //delete any refernce  in users thought array
        User.findOneAndUpdate(
            {username: thoughtData.username},
            {$pull: {thoughts: params.id}}
            )
            .then(()=>{
                res.json({message: 'Successfully Removed the thought'});
            })
            .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
},


//post a reaction to a thought at /api/thoughts/:id/reactions
addReaction({params,body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$addToSet: {reactions: body}},
        {new:true, runValidators:true}
    )
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message:`there is no thought with ID: ${params.thoughtId}`});
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.status(500).json(err));
},


//delete request to remove a reaction based on ID at /api/thoughts/:id/reactions
//request should include a reactionId
deleteReaction({params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: body.reactionId } } },
        { new: true, runValidators: true }   
    )
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: `there is no thought with this ID`});
            return;
        }
        res.json({message: 'successfully removed reaction to the thought'});
    })
    .catch(err => res.status(500).json(err));
},







}

module.exports = thoughtController;