const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes.js');
const dataset=require('./dataset.json');

 
const app = express();

 
app.use(bodyParser.json());
app.get('/api/dataset', (req, res) => {
    res.json(dataset);
});
 
app.use('/api', routes);  

 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
