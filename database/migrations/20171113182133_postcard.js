
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('postcard', (table) => {
    table.increments('id').notNullable()
    table.string('code').unique().notNullable()
    table.float('latitude')
    table.float('longitude')
    table.uuid('uuid').unique().notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('postcard')
};
