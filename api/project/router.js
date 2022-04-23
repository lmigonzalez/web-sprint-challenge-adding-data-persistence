const router = require("express").Router();

const Project = require("./model");

router.get("/", (req, res, next) => {
  Project.getProjects()

    .then((projects) => {
      res.status(200).json(projects);
    })

    .catch((err) => {
      next({
        status: 404,
        message: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const newProject = req.body;

  Project.addProject(newProject)

    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      next({
        message: err.message,
      });
    });
});

// router.use((err, req, res, next)=>{
// 	res.use(500).json({
// 		customMessage: 'something went wrong!!!',
// 		message: err.message,
// 		stack: err.stack,
// 	})
// })

module.exports = router;
