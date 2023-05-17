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
    console.log('trying to query')
    let result = await pool.query('SELECT * FROM products');
    return result;
  } catch (error: any) {
    console.dir(error);
    console.log('Unable to retrieve products:', error.message );
  }
};

const getOneProduct = async (id: number) => {
  try {
    console.log('trying to query');
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
      GROUP BY p.id`,
      [id]
    )
    return result;
  } catch(error) {
    console.log('Unable to retrieve product:', error );
  }
};

const getStyles = async (id: number) => {
  try {
    let query =
    `SELECT s.id AS style_id,
    s.name,
    s.original_price,
    s.sale_price,
    s.default_style,
      json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) AS photos,
      json_object_agg(sk.size, json_build_object('quantity', sk.quantity, 'size', sk.size)) AS skus
    FROM Styles s
    LEFT JOIN SKUs sk ON s.id = sk.styleId
    LEFT JOIN Photos p ON s.id = p.styleId
    WHERE s.product_id = $1
    GROUP BY s.id;`;

    let result = await pool.query(query);
    return result;
  } catch(error) {
    console.log('Unable to retrieve product' );
  }
};

const getRelatedProducts = async (id: number) => {

};

module.exports = {
  getProducts,
  getOneProduct,
  getStyles,
  getRelatedProducts
}