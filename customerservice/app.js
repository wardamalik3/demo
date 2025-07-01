const express = require('express');
const app = express();
app.use(express.json());

const custarray= [
    { id:1,
      name: 'The customer1',
      menuitem: 'Pasta' 
    },

    { id:2,
      name: 'The customer2',
      menuitem: 'coffee' 
    },

   
    { id:3,
      name: 'The customer3',
      menuitem: 'biryani' 
    },
];

const findcustomer = (name) => custarray.find(customer => customer.name.toLowerCase() === name.toLowerCase());


//getting customer
app.get('/custarray', (req, res) => res.json(custarray));

//getting restaurnat by name
app.get('/custarray/:name', (req, res) => {
    const customer = findcustomer(req.params.name);
    if (!customer) return res.status(404).json({ error: 'customer not found' });
    res.json(customer);
});

//customer registration
app.post('/customer', (req, res) => {
  let mycustomer={}
  mycustomer.id=req.body.id,
  mycustomer.name=req.body.name,
  mycustomer.menuitem=req.body.menuitem
  custarray.push(mycustomer)
 
res.send(custarray);
 
});

//updating cutsomer preference
app.put('/custarray/:name/upgrade', (req, res) => {
  const customer = custarray.find(c => c.name.toLowerCase() === req.params.name.toLowerCase());
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  customer.menuitem = req.body.menuitem || customer.menuitem;
  res.json(customer);
});
 


app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(` API running on port ${PORT}`));
