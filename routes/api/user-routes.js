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
} = require('../../controllers/user-controller');

//main default route options for getting, and posting
router.route('/').get(getAllUsers).post(createUser);
//route options for user by ID which includes get, put and delete
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
//route options for friend based activity routes
router.route("/:userId/friends/friendId").post(addFriend).delete(deleteFriend);

//export the router
module.exports = router;