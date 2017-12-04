
exports.up = function(knex, Promise) {
  return knex.schema.table('postcard', function(table) {
    table.string('text')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('postcard', function(table) {
    table.dropColumn('text')
  })
};
