const router = require('express').Router()

const Resource = require('./model')

router.get('/', (req, res, next)=>{
	Resource.getResources()
	.then(resource =>{
		res.status(200).json(resource)
	})
	.catch(next)

	// res.status(201).json('hello')
})




router.use((err, req, res, next)=>{
	res.use(500).json({
		customMessage: 'something went wrong!!!',
		message: err.message,
		stack: err.stack,
	})
})

module.exports= router
