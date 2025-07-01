const express = require('express');
const app = express();
app.use(express.json());

const resarray= [
    { id:1,
      name: 'The restaurant1',
      Location: 'Islamabad' ,
      menuitem: 'Pasta'
    },

    { id:2,
      name: 'The restaurant2',
      Location: 'Islamabad' ,
      menuitem: 'tea'
    },

   
    { id:3,
      name: 'The restaurant3',
      Location: 'Islamabad' ,
      menuitem: 'roll'
    },
];

const findres = (name) => resarray.find(restaurant => restaurant.name.toLowerCase() === name.toLowerCase());

//getting restaurant
app.get('/resarray', (req, res) => res.json(resarray));

//getting restaurnat by name
app.get('/resarray/:name', (req, res) => {
    const restaurant = findres(req.params.name);
    if (!restaurant) return res.status(404).json({ error: 'restaurant not found' });
    res.json(restaurant);
});

//adding restaurants
app.post('/restaurant', (req, res) => {
  let myrestaurant={}
  myrestaurant.id=req.body.id,
  myrestaurant.name=req.body.name,
  myrestaurant.Location=req.body.Location
  resarray.push(myrestaurant)
 
res.send(resarray);
 
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` API running on port ${PORT}`));
