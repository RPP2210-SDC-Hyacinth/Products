import { Response, Request } from 'express';
const express = require('express');
const axios = require('axios');
const router = express.Router();
const query = require('../controller/query');

interface Products {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

router.get('/', async (req: Request, res: Response) => {
  console.log('product')
  try {
    let data = await query.getProducts();
    let products: Products[] = data.rows;
    // console.log(products);
    res.send(products)
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
    let data = await query.getOneProduct(req.params.product_id);
    let product: OneProduct = data.rows;
    console.log(product)
    res.send(req.params.product_id);
  } catch (error: any) {
    let errorMessage = `Unable to retrieve products due to some internal error:, ${error}`
    res.status(500).send(errorMessage);
  }
});

router.get('/:product_id/styles', (req: Request, res: Response) => {
  console.log('product')
});

router.get('/:product_id/related', (req: Request, res: Response) => {
  console.log('product')
});

module.exports = router