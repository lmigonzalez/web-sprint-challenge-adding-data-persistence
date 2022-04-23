const db = require('../../data/dbConfig')


async function getProjects(){
	
	// return  db('projects')
	let projects = await db('projects')

	const newProject = []

	projects.map((element=>{
		if(element.project_completed === 0){
			element.project_completed = false
		}
		else if(element.project_completed === 1){
			element.project_completed = true
		}
		newProject.push({
			project_name: element.project_name,
			project_description: element.project_description,
			project_completed: element.project_completed,
		})
	}))


	return newProject

	
	
}

async function addProject(newProject){

	let projects = await db('projects').insert(newProject)
	.then(([project_id])=>{
		return db('projects')
		.where('project_id', project_id).first()
	})

	if(projects.project_completed === 0){
		projects.project_completed = false
	}
	else if(projects.project_completed === 1){
		projects.project_completed = true
	}

	const createdProject = {
		project_name: projects.project_name,
		project_description: projects.project_description,
		project_completed: projects.project_completed,
	}

	


	return createdProject
	


}


module.exports = {getProjects, addProject }
