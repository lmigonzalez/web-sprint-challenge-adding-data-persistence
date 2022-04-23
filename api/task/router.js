const router = require("express").Router();

const Task = require("./model");

router.get('/', (req, res, next) => {
  Task.getTasks()

    .then(task => {
      res.status(200).json(task);
    })

    .catch((err) => {
      next({
        status: 404,
        message: err,
      });
    });
});


router.post("/", (req, res, next) => {
	const newTask = req.body;
  
	Task.addTask(newTask)

	  .then((newTask) => {
		res.status(201).json(newTask);
	  })
	  .catch((err) => {
		next({
		  message: err.message,
		});
	  });
  });

module.exports = router;
