
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('postcard', (table) => {
    table.increments('id').notNullable()
    table.string('code').notNullable()
    table.float('latitude')
    table.float('longitude')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('postcard')
};
