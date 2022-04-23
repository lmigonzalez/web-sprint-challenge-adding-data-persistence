const db = require('../../data/dbConfig')


async function getTasks(){
	
	let tasks = await db('tasks')
	let projects = await db('projects')
	
	
	const newTasks = []
	
	
	let num = 0
	tasks.map((element, index)=>{

		if(element.task_completed === 0){
			element.task_completed = false
		}
		else if(element.task_completed === 1){
			element.task_completed = true
		}
		newTasks.push({
			task_description: element.task_description,
			task_notes: element.task_notes,
			task_completed: element.task_completed,
			project_name: projects[num].project_name,
			project_description: projects[num].project_description,
		
		})

		num = index
	})
	
	return newTasks


}



async function addTask(newTask){

	let task = await db('tasks').insert(newTask)
	.then(([task_id])=>{
		return db('tasks')
		.where('task_id', task_id).first()
	})

	if(task.task_completed === 0){
		task.task_completed = false
	}
	else if(task.task_completed === 1){
		task.task_completed = true
	}

	const createdProject = {

		task_description: task.task_description,
		task_notes: task.task_notes,
		task_completed: task.task_completed,
	}

	return createdProject
	
}

module.exports = {getTasks, addTask}