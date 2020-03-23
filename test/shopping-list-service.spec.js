'use strict';
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Articles service object', function() {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Fish tricks',
      price: '13.10',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Not Dogs',
      price: '4.99',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: true,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Bluffalo Wings',
      price: '5.50',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    }
  ];

  before(() => {
    db= knex({
      client: 'pg',
      connection:process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  this.afterEach(() => db('shopping_list').truncate());

  after(() => {
    db.destroy();
  });

  context('Given \'shopping_list\' has data', () => {
    //UPDATE, DELETE GO HERE
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });

    it('getAllItems() resolves all items from \'shopping_list\' table', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });   
    });

    it('getById() resolves an item by id from \'shopping_list\' table', () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId -1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            date_added: thirdTestItem.date_added,
            checked: thirdTestItem.checked,
            category: thirdTestItem.category
          });
        });
    });
  });

  context('Given \'shopping_list\' has no data', () => {
    //CREATE GOES HERE
  });
});