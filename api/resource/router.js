const router = require('express').Router()

const Resource = require('./model')

router.get('/', (req, res, next)=>{
	Resource.getResources()
	.then(resource =>{
		res.status(200).json(resource)
	})
	.catch(err=>{
		next({
			status: 404, message: err,
		})
	})
})


router.post('/', (req, res, next)=>{
	const newResource = req.body

	Resource.addResource(newResource)
	.then(newResource=>{
		res.status(201).json(newResource)
	})
	.catch(err=>{
		next({
			message: err.message,
		})
	})
})




// router.use((err, req, res, next)=>{
// 	res.use(500).json({
// 		customMessage: 'something went wrong!!!',
// 		message: err.message,
// 		stack: err.stack,
// 	})
// })

module.exports= router
