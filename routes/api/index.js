//require express router, and the user and thought routes in main logic
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//use the routes for users and thoughts
router.use('/users', userRoutes);
//router.use('/thoughts', thoughtRoutes);

//export the module router
module.exports = router;