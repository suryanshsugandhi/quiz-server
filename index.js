const 
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT = process.env.PORT || 3000,
    api = require('./routes/api'),
    app = express();

app.use(cors());
app.use(bodyParser.json())
app.use('/api',api)

app.get('/', (req, res)=>{
    res.send('Nothing here. Try using /api routes on POST')
})

app.listen(PORT, (req, res)=>{
    console.log("Server running on localhost:" + PORT)
})