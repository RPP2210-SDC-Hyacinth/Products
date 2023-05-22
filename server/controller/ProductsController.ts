import { Response, Request } from 'express';
const express = require('express');
const axios = require('axios');
const router = express.Router();
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
    let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
    return errorMessage;
  }
}

// router.get('/', async (req: Request, res: Response) => {
//   console.log('product')
//   try {
//     let data = await query.getProducts();
//     let products: Products[] = data.rows;
//     console.log(products);
//     res.send(products)
//   } catch(error: any) {
//     let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
//     res.status(500).send(errorMessage);
//   }
// });

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
    let product: OneProduct = data.rows;
    console.log(`_____Product ${product_id}: ` ,product);
    return product;
  } catch(error: any) {
    let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
    console.log(errorMessage);
    return errorMessage;
  }
}

// router.get('/:product_id', async (req: Request, res: Response) => {
//   try {
//     let data = await query.getOneProduct(req.params.product_id);
//     let product: OneProduct = data.rows;
//     console.log(product)
//     res.send(product);
//   } catch (error: any) {
//     let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
//     res.status(500).send(errorMessage);
//   }
// });

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
    let styles: ProductStyles = data.rows;
    console.log(`_____Styles for Product ${product_id}: `, styles);
    return styles;
  } catch(error) {
    let errorMessage = `Error retrieving styles: ${error}`;
    return errorMessage;
  }
}

// router.get('/:product_id/styles', async (req: Request, res: Response) => {
//   console.log('productStyles')
//   try {
//     let data = await query.getStyles(req.params.product_id);
//     let styles: ProductStyles = data.rows;
//     console.log(styles);
//     res.send(styles);
//   } catch(error) {
//     res.send(error);
//     console.log('Error retrieving styles:', error)
//   }
// });

const related = async (product_id: number) => {
  try {
    let data = await query.getRelatedProducts(product_id);
    let relatedProducts = data.rows;
    console.log(`_____Related Products for Product ${product_id}: `, relatedProducts);
  } catch(error) {
    console.log('Error retrieving related product');
  }
}

// router.get('/:product_id/related', async (req: Request, res: Response) => {
//   console.log('related');
//   try {
//     let data = await query.getRelatedProducts(req.params.product_id);
//     res.send(data.rows);
//   } catch(error) {
//     console.log('Error retrieving related product');
//   }
// });

module.exports = {
  products,
  oneProduct,
  styles,
  related
}