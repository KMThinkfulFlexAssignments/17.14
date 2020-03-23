'use strict';

const ShoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },
  getById(knex, id) {
    return knex.from('shopping_list').select('*').where('id', id).first();
  },
  deleteItem(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete();
  },
};

module.exports = ShoppingListService;