//require the router function
const router = require('express').Router();
//create an object of functions that will be called on when interacting with the applications routes
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

//route options for the main api route, which is getting all thoughts, and creating a thought

router
.route('/')
.get(getAllThoughts, (req,res) => {
  res.json();
})
.post(createThought, (req,res) => {
  res.json()
});

//route options for anything based on a thoughts ID
router
.route("/:id")
.get(getThoughtById,(req,res) => {
  res.json();
})
.put(updateThought, (req,res) => {
  res.json()
})
.delete(deleteThought, (req,res) => {
  res.json()
});

//route options or reactions

router
.route('/:thoughtId/reactions/')
.post(addReaction, (req,res) => {
  res.json()
})
.delete(deleteReaction, (req,res) => {
  res.json()
});

//export the router
module.exports = router;