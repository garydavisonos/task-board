/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing data.
  await knex("cards").del();
  await knex("lists").del();

  // Insert 3 lists.
  const listIds = await knex("lists")
    .insert([{ label: "List 1" }, { label: "List 2" }, { label: "List 3" }])
    .returning("id");

  const ids = Array.isArray(listIds[0]) ? listIds[0] : listIds;
  const cards = [];

  ids.forEach((id, index) => {
    const base = index * 3 + 1;
    cards.push(
      {
        label: `Card ${base}`,
        description: `Description for Card ${base}`,
        list_id: id.id || id,
        deadline: new Date(Date.now()),
      },
      {
        label: `Card ${base + 1}`,
        description: `Description for Card ${base + 1}`,
        list_id: id.id || id,
        deadline: new Date(Date.now()),
      },
      {
        label: `Card ${base + 2}`,
        description: `Description for Card ${base + 2}`,
        list_id: id.id || id,
        deadline: new Date(Date.now()),
      }
    );
  });

  // Insert cards
  await knex("cards").insert(cards);
};
