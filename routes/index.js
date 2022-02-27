//create the router
const router = require('express').Router();

//import the API routes
const apiRoutes = require('./api');

//add the custom prefix of API
router.use('/api', apiRoutes);

router.use((req,res) => {
    res.status(404).send('404 error!');
});

module.exports = router;