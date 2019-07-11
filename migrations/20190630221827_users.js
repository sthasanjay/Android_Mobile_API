exports.up = function(knex, Promise) {
    return knex.schema
          .createTable('user', function(table) {
              table.increments('id');
              table.string('fname', 255).notNullable();
              table.string('lname', 255).notNullable();
              table.string('email',255).notNullable();
              table.string('phone',255).notNullable();
              table.string('username', 255).notNullable();
              table.string('password', 255).notNullable();
          })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user')
  };
  
