//require the router
const router = require('express').Router();

//create an object to hold all the functions in the user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

//main default route options for getting, and posting
router
.route('/')
.get(getAllUsers, (req,res) => {
    res.json();
})
.post(createUser, (req,res) => {
    res.json();
});
//route options for user by ID which includes get, put and delete
router
.route('/:id')
.get(getUserById,(req,res)=> {
    res.json();
})
.put(updateUser,(req, res)=> {
    res.json();
})
.delete(()=> {});

//route options for friend based activity routes
router
.route("/:userId/friends/friendId")
.post((addFriend)=>{})
.delete((deleteFriend)=> {});

//export the router
module.exports = router;