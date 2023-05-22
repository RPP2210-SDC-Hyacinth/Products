import { Response, Request } from 'express';
const express = require('express');
const axios = require('axios');
const router = express.Router();
const ProductsController = require('../controller/ProductsController');

interface Products {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

router.get('/', async (req: Request, res: Response) => {
  console.log('products api handler')
  try {
    let data = await ProductsController.products();
    res.send(data)
  } catch(error: any) {
    let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
    res.status(500).send(errorMessage);
  }
});

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

router.get('/:product_id', async (req: Request, res: Response) => {
  try {
    let data = await ProductsController.oneProduct(req.params.product_id);
    let product: OneProduct = data.rows;
    res.send(product);
  } catch (error: any) {
    let errorMessage = `Unable to retrieve product due to some internal error:, ${error}`
    res.status(500).send(errorMessage);
  }
});

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

router.get('/:product_id/styles', async (req: Request, res: Response) => {
  console.log('productStyles')
  try {
    let data = await ProductsController.styles(req.params.product_id);
    let styles: ProductStyles = data.rows;
    res.send(styles);
  } catch(error) {
    let errorMessage = `Unable to retrieve product's styles due to some internal error:, ${error}`
    res.status(500).send(error);
  }
});

router.get('/:product_id/related', async (req: Request, res: Response) => {
  console.log('related');
  try {
    let data = await ProductsController.related(req.params.product_id);
    res.send(data.rows);
  } catch(error) {
    let errorMessage = `Unable to retrieve related proucts due to some internal error:, ${error}`
    res.status(500).send(error);
  }
});

module.exports = router