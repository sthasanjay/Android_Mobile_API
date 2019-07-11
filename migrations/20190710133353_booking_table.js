exports.up = function(knex, Promise) {
    return knex.schema
          .createTable('booking', function(table) {
              table.increments('id');
              table.integer('itemid').notNullable();
              table.integer('userid').notNullable();
              table.integer('quantity').notNullable();
              table.double('price', 255).notNullable();
          })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('booking')
  };
  
