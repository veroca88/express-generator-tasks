const express = require('express');
const router  = express.Router();
//to save info
const Task = require('../../models/Task.model')

/* GET form page */
router.get('/form', (req, res, next) => {
  // res.render('index');
  res.render("form-views/form");
});

// POST form Input
router.post('/form-input' /*,-- this word we have to put in action form*/ , (req, res, next) => {

  //get data from the post you have to see the body
  console.log("The form info: ", req.body);

  Task.create(req.body)
  .then(taskFromDB => {
    //this help us to reloaded tha page and see the first thing 
    res.redirect("back")    
  })
  .catch(err => next(err))
})

//See what we have on our database *View Task List*
router.get("/task-list", (req, res, next) => {
  Task.find()
  .then(tasksFromDB => {
    const data = {
      pageTitle: "Task List",
      tasks: tasksFromDB
    }
    res.render('task-views/task-list', data)
  })
  .catch(err => next(err))
})


module.exports = router;