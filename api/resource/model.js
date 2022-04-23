const db = require('../../data/dbConfig')

function getResources(){
	
	return db('resources')
	
}

async function addResource(newResource){

	let resource = await db('resources').insert(newResource)
	.then(([resource_id])=>{
		return db('resources')
		.where('resource_id', resource_id).first()
	})

	return resource

}


module.exports = {getResources, addResource }