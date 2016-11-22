exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('question', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('question_description');
        table.string('correct_answer');
        table.integer('question_complexity');
        table.string('options');
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('question') // drop table when reverting
};
