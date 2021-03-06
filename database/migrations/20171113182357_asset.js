
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('asset', (table) => {
    table.increments('id').notNullable()
    table.enum('type', ['image', 'video', 'audio']).notNullable()
    table.string('url')
    table.integer('postcard_id').notNullable()
    table.foreign('postcard_id')
    table.uuid('uuid').unique().notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('postcard')
};
