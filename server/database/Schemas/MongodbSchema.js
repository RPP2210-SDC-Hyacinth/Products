const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/posts', () => {
  console.log('connected to mongodb through docker');
});

let SKUSchema = mongoose.Schema({
  quantity: Number,
  size: String,
});

let photosSchema = mongoose.Schema({
  thumbnail_url: String,
  url: String
});

let featuresSchema = mongoose.Schema({
  feature: String,
  value: Number
});

let stylesSchema = mongoose.Schema({
  name: String,
  original_price: Number,
  sale_price: Number,
  default?: Boolean,
  SKU: SKUSchema,
  photos: photosSchema
});

let ProductsSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: featuresSchema,
  styles: stylesSchema

});

