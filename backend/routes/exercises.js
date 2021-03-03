const router = require('express').Router(); 
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  //Converting number to a number type
  const duration = Number(req.body.duration);
  //Converting date to a date type
  const date = Date.parse(req.body.date);


  //Creates a new exercise
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  //Saves it a JSON format 
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get the unique exercise  ----ID of the exercise - Object ID Automatically created by MongoDB - get request
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Delete the unique exercise - delete request
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Update the exercise, this find the current exercise or ID and then goes ahead and updates it. 
router.route('/update/:id').post((req, res) => {
    //Get the exercise using findById
  Exercise.findById(req.params.id)
  //Then a JS promise 
    .then(exercise => {
        //Edit username etc etc
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
        //Save and update
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        //Any issues 400 status
        .catch(err => res.status(400).json('Error: ' + err));
    })
    //Catch all err 500
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;