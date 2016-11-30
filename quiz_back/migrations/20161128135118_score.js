
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('scoreHistory', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('user_score');
        table.boolean('recent_score_flag');
        table.integer('userAccount_id').notNullable();       
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('scoreHistory') // drop table when reverting
};
