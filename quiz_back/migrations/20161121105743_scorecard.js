exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('scoreCard', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('score');
        table.boolean('recent_score');
        table.integer('user_id') // adds a string column
            .notNullable() // and is required
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('scoreCard') // drop table when reverting
};