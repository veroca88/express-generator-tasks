const express = require('express');
const router  = express.Router();
//to save info
const Task = require('../../models/Task.model') //models/Task.model <--- that name is the same of the file on the left inside models folder

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
    res.redirect(`/task-details/${taskFromDB._id}`)    
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

//View details of task
//apartir de colon : "taskId" <-- eso es cualquier variable que queremos crear y paramos a esa variable lo que queramos
//esto esta conectado a task-list.hbs
router.get('/task-details/:taskId', (req, res, next) => {
  //how we find in our database
  Task.findById(req.params.taskId)
  .then(taskFromDB => {
    const data = {
      pageTitle: taskFromDB.title + " Details",
      task: taskFromDB
    };
    res.render('task-views/task-details', data);
  })
  .catch(err => next(err));
})


module.exports = router;