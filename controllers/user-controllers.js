//require the models folder for the Object we need
const { User, Thought } = require('../models');

//declare a variable for an object of functions for user controller

const userController = {
    //get request for all users
    getAllUsers(req,res) {
        User.find({}).select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //get request for a user based on ID
    getUserById({ params }, res) {
        User.findOne({_id: params.id }).populate([
            {path: 'thoughts', select: "-__v"},
            {path: 'friends', select: "-__v"}
        ]).select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: `There is no user with id ${params.id}`});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    //post new user
    // example data
    //{
    //    "username": "lernantino",
    //    "email": "lernantino@gmail.com"
    //  }
    createUser ({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    //update a user based on ID
    // example data
    //{
    //    "username": "lernantino",
    //    "email": "lernantino@gmail.com"
    //  }

    updateUser({params,body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: `there is no user with id:${params.id}`});
                return;
            }
            res.json(userData);
        }).catch(err => res.status(400).json(err));
    },

    //delete a user based on ID
    deleteUser({ params }, res) {
        //first delete the user
        User.findOneAndDelete({_id:params.id})
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: `no user found with id ${params.id}`});
                return;
            }

            //then remove the user from any friends profiles
            User.updateMany(
                {_id: {$in: userData.friends}},
                {$pull: {friends: params.id}}
            )
            .then(() => {
                //remove any comments from that user
                Thought.deleteMany({username: userData.username})
                .then(()=> {
                    res.json({message: 'Successfully deleted user'})
                }).catch(err => res.status(400).json(err))

            }).catch(err => res.status(400).json(err))

        }).catch(err => res.status(400).json(err))
    },


    //post request for adding friends at /api/users/:userId/friends/:friendId
    addFriend({params}, res) {
        //add friend ID to the userID friend list
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true, runValidators:true}
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: `There is no user with ID: ${params.userId}`});
                return;
            }
            //add the user IUD to the friend ID list
            User.findOneAndUpdate(
                {_id: params.friendId},
                {$addToSet: {friends: params.userId}},
                {new: true, runValidators:true}
            )
            .then(userData2 => {
                if(!userData2) {
                    res.status(404).json({message: `there is no user with ID: ${params.friendId}`});
                    return;
                }
                res.json(userData);
            }).catch(err => res.json(err));

        }).catch(err => res.json(err));
    },

    //delete a friend at /api/users/:userId/friends/:friendId
    deleteFriend({params} , res) {
        //remove friendId from the userId list
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends:params.friendId}},
            {new:true,runValidators:true}
        ).then(userData => {
            if(!userData){
                res.status(404).json({message: `No user found with ID: ${params.userId}`})
                return;
            }
            //remove the userId from the friend Id list
            User.findOneAndUpdate(
            {_id: params.friendId},
            {$pull: {friends:params.userId}},
            {new:true,runValidators:true}
            )
            .then(userData2 => {
                if(!userData2){
                    res.status(404).json({message: `There is no user found with ${params.friendId}`})
                    return;
                }
                res.json({message: 'Successfully deleted friend'});
            }).catch(err => res.json(err))
        }).catch(err => res.json(err));
    }






}

module.exports = userController;