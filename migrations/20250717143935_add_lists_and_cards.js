/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("lists", (table) => {
      table.increments("id").primary();
      table.string("label").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .then(() =>
      knex.schema.createTable("cards", (table) => {
        table.increments("id").primary();
        table
          .integer("list_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("lists")
          .onDelete("CASCADE");
        table.string("label").notNullable();
        table.text("description");
        table.boolean("completed").defaultTo(false);
        table.timestamp("deadline").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cards")
    .then(() => knex.schema.dropTableIfExists("lists"));
};
