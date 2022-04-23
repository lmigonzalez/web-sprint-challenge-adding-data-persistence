/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema
    .createTable("projects", (table) => {
      //projects
      //project_id
      //project_name
      //project_description
      //project_completed

      table.increments("project_id");
      table.string("project_name", 64);
      table.string("project_description");
      table.integer("project_completed", 0);
    })
    .createTable("resources", (table) => {
      //resources
      //resource_id
      //resource_name
      //resource_description

      table.increments("resource_id");
      table.string("resource_name", 64)
		.unique();
      table.string("resource_description");

    })
    .createTable("tasks", (table) => {
      //tasks
      //task_id
      //task_description
      //task_notes
      //task_completed
	    //------
 	 //project_id --required and points to an actual project_id in the projects table


      table.increments("task_id");
      table.string("tasks_description");
      table.string("task_notes");
      table.integer("task_completed", 0);
	  table.integer("project_id")
		.unsigned()
		.notNullable()
		.references("project_id")
		.inTable("projects")
    })

	.createTable("project_resources", (table) =>{

		table.integer("resource_id")
			.unsigned()
			.notNullable()
			.references("resource_id")
			.inTable("resources")

		table.integer("project_id")
		.unsigned()
		.notNullable()
		.references("project_id")
		.inTable("projects")

		table.primary("resource_id", "project_id")
	})


  //project_resources --connects a resource and a project,
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
	return knex.schema
		.dropTableIfExists("project_resources")
		.dropTableIfExists("tasks")
		.dropTableIfExists("resources")
		.dropTableIfExists("projects")

};
