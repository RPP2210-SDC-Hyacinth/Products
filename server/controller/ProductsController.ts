const query = require('../database/query');

interface Products {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

const products = async () => {
  try {
    let data = await query.getProducts();
    let products: Products[] = data.rows;
    console.log('_____Products: ' ,products);
    return products;
  } catch(error: any) {
    throw new Error(`Unable to retrieve products do to the following error ${error}`);
  }
}

interface Features {
  feature: string,
  value: string
}

interface OneProduct {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number,
  features: Features[]
}

const oneProduct = async (product_id: number) => {
  try {
    let data = await query.getOneProduct(product_id);
    let product: OneProduct = data.rows[0];
    console.log(`_____Product ${product_id}: `, product);
    return product;
  } catch(error: any) {
    throw new Error(`Unable to retrieve data for product ${product_id} do to the following error ${error}`);
  }
}

interface Skus {
  [key: string]: {
    quantity: number,
    size: string
  }
}

interface Photos {
  thumbnail_url: string,
  url: string
}

interface Styles {
  style_id: string,
  name: string,
  original_price: string,
  sale_price: string,
  'defult?': boolean,
  photos: Photos[],
  skus: Skus[]
}

interface ProductStyles {
  product_id: string,
  results: Styles[]
}

const styles = async (product_id: number) => {
  try {
    let data = await query.getStyles(product_id);
    let productStyles: ProductStyles = data.rows;
    let styles = {
      'product_id': product_id,
      'results': productStyles
    }
    console.log(`_____Styles for Product ${product_id}: `, styles);
    return styles;
  } catch(error) {
    throw new Error(`Unable to retrieve styles data for product ${product_id} do to the following error ${error}`);
  }
}

const related = async (product_id: number) => {
  try {
    let data = await query.getRelatedProducts(product_id);
    let relatedProducts = data.rows[0]['array_agg'];
    console.log(`_____Related Products for Product ${product_id}: `, relatedProducts);
    return relatedProducts;
  } catch(error) {
    throw new Error(`Unable to retrieve relate products due to this error: ${error}`)
  }
}

module.exports = {
  products,
  oneProduct,
  styles,
  related
}