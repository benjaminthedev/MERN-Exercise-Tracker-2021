const router = require('express').Router();

//Mongo Model That We Created in ../models/user.model.js
let User = require('../models/user.model');

router.route('/').get((req, res)=> {
    //User.find() is a Mongoose Method
    User.find()
    //Returns a promise in JSON format - then get all the users in JSON format
    .then(users => res.json(users))
    //if error return status 400 with err message
    .catch(err => res.status(400).json('Error' + err));
});


//This is for the post requests 
router.route('/add').post((req, res) => {
    //New username is assigned to the username const 
  const username = req.body.username;
    //Creat a new instance of user using newUser
  const newUser = new User({username});
    //Finally then it is saved into the database with the .save() method
  newUser.save()
    //Then return user is added
    .then(() => res.json('User added!'))
    //Again if an error - return status code 400 and message
    .catch(err => res.status(400).json('Error: ' + err));
});
//export the router
module.exports = router;