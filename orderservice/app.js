const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const orders = [];

app.post('/orders', async (req, res) => {
  const { custName, restName, items } = req.body;

  try {
      const cust = (await axios.get(`http://localhost:3001/custarray/${custName}`)).data;
      const rest = (await axios.get(`http://localhost:3002/resarray/${restName}`)).data;
      const menu = rest.menuitem || "";
      const unavailable = items && !menu.toLowerCase().includes(items.toLowerCase());

      if (unavailable) {
          return res.status(400).json({ err: `Unavailable: ${items}` });
      }
      const order = { 
          id: orders.length + 1, 
          custName, 
          restName, 
          items, 
          status: 'Placed', 
          createdAt: new Date() 
      };

      orders.push(order);
      res.json(order);

  } catch (err) {
      res.status(400).json({ err: err.response?.data?.err || 'Error fetching customer/restaurant' });
  }
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ err: 'Not found' });
    res.json(order);
});

app.get('/orders', (req, res) => res.json(orders));

const PORT = 3003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
