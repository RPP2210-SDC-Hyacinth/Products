const pkg = require('pg');
const path = require('path');
const dotenv = require('dotenv');

const { Pool } = pkg;

dotenv.config({path: path.resolve(__dirname, '../../.env')});

interface poolType {
  user: string | undefined,
  host: string,
  database: string | undefined,
  port: number | undefined,
  password: number | undefined,
  idleTimeoutMillis: number
};

const poolConfig: poolType= {
  user: process.env.NAME,
  host: 'localhost',
  database: process.env.NAME,
  port: process.env.DB_PORT as any,
  password: process.env.DB_PASSWORD as any,
  idleTimeoutMillis: 30000
};


const pool = new Pool(poolConfig);

const getProducts = async () => {
  try {
    console.log('Attempting to retrieve 10 products for');
    let result = await pool.query('SELECT * FROM products LIMIT 10');
    return result;
  } catch (error: any) {
    throw new Error(`Unable to retrieve products do to the following error ${error}`);
  }
};

const getOneProduct = async (id: number) => {
  try {
    console.log('Attempting to retrieve data for: ', id);
    let result = await pool.query(
      `SELECT
       p.id,
       p.name,
       p.slogan,
       p.description,
       p.category,
       p.default_price,
      json_agg(jsonb_build_object('feature', f.feature, 'value', f.value)) as feature
      FROM Products p
      JOIN Features f ON p.id = f.product_id
      WHERE p.id = $1
      GROUP BY p.id
      LIMIT 10`,
      [id]
    );

    return result;
  } catch(error) {
    throw new Error(`Unable to retrieve data for product ${id} do to the following error ${error}`);
  }
};

const getStyles = async (id: number) => {
  try {
    console.log('Attempting to retrieve styles for: ', id);
    let query =
    `SELECT
    s.id AS style_id,
    s.name,
    s.original_price,
    s.sale_price,
    s.default_style,
      json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) AS photos,
      json_object_agg(sk.id, json_build_object('quantity', sk.quantity, 'size', sk.size)) AS skus
    FROM Styles s
    LEFT JOIN SKUs sk ON s.id = sk.styleId
    LEFT JOIN Photos p ON s.id = p.styleId
    WHERE s.product_id = $1
      AND sk.id IS NOT NULL
    GROUP BY s.id
    LIMIT 10;`;

    let result = await pool.query(query, [id]);
    return result;
  } catch(error) {
    throw new Error(`Unable to retrieve styles data for product ${id} do to the following error ${error}`);
  }
};

const getRelatedProducts = async (id: number) => {
  try {
    console.log('Attempting to retrieve related products for: ', id);
    let query =
    `SELECT array_agg(related_product_id)
    FROM Related r
    WHERE current_product_id = $1
    LIMIT 10;`;
    let result = await pool.query(query, [id]);
    return result;
  } catch(error) {
    throw new Error(`Unable to retrieve relate products due to this error: ${error}`)
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  getStyles,
  getRelatedProducts
}