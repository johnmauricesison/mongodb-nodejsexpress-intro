const express = require('express');
const Product = require('./product');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Inventory')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.get('/products', async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).json({ message: 'Successfully retrieved data', products: products });
      }
      catch(err)
      {
        res.status(500).json({ error: err.message });
      }
});

app.post('/products', async (req, res) => {

    try
    {
      const { name, category, quantity } = req.body;
      const newProduct = new Product({ name, category, quantity });
      const product = await newProduct.save();
      res.status(201).json(product);
    }
    catch(err)
    {
      res.status(500).json({ error: err.message });
    }

});

app.get('/products/:id', async (req, res) => {

    try
    {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    }
    catch(err)
    {
      res.status(500).json({ error: err.message });
    }
  
});

app.put('/products/:id', async (req, res) => {

    try
    {
      const productId = req.params.id;
      const { name, category, quantity } = req.body;

      const product = await Product.findByIdAndUpdate(productId, { name, category, quantity }, { new: true });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);

    } catch(err)
    {
      res.status(500).json({ error: err.message });
    }
});

app.delete('/products/:id', async (req, res) => {

    try
    {
      const productId = req.params.id;
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });

    } catch(err)
    {
      res.status(500).json({ error: err.message });
    }
});


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}.`));