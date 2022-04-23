const db = require('../../data/dbConfig')

function getResources(){
	
	return db('projects')
	
}


module.exports = {getResources, }