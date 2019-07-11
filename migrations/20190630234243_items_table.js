
    exports.up = function(knex, Promise) {
        return knex.schema
              .createTable('items', function(table) {
                  table.increments('id');
                  table.string('name', 255).notNullable();
                  table.double('price', 255).notNullable();
                  table.string('imageName', 255).notNullable();
                  table.string('module', 255).notNullable();
                  table.string('size',255).notNullable();
                  table.string('ram',255).notNullable();
                  table.string('rom',255).notNullable();
                  table.string('os',255).notNullable();
                  table.string('fcamera',255).notNullable();
                  table.string('bcamera',255).notNullable();
              })
      };
      
      exports.down = function(knex, Promise) {
        return knex.schema.dropTable('items')
      };
      
  

