'use strict';
require('dotenv').config();
const knex = require ('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const qry = knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .first()
  .toQuery();

console.log(qry);

function searchByProduceName(searchTerm) {
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
  
searchByProduceName('holo');

function paginateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
  
paginateProducts(2);

function getProductsWithImages() {
  knexInstance
    .select('product_id', 'name', 'price', 'category', 'image')
    .from('amazong_products')
    .whereNotNull('image')
    .then(result => {
      console.log(result);
    });
}
  
getProductsWithImages();

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw('now() - \'?? days\'::INTERVAL', days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result);
    });
}
  
mostPopularVideosForDays(30);

// Assignment drills begin below this point

//1:  Get all items that contain text

function searchByText(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

searchByText('steak');

//2: Get all items paginated

function paginateItems(pageNumber) {
  const perPage = 6;
  const offset = perPage * (pageNumber - 1);
  knexInstance
    .select('id', 'name', 'price', 'category')
    .from('shopping_list')
    .limit(perPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

paginateItems(3);

//3: Get all items added after date

function addedAfterDate(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'category')
    .from('shopping_list')
    .where('date_added', '>', knexInstance.raw('now() - \'?? days\':: INTERVAL', daysAgo))
    .then(result => {
      console.log(result);
    });
}

addedAfterDate(4);

//4: Get total cost for each category

function totalCost() {
  knexInstance
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

totalCost();