exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('userAccount', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email') // adds a string column
            .unique() // which has to be unique
            .notNullable() // and is required
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('userAccount') // drop table when reverting
};