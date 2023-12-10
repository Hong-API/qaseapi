const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5501' }))

// Middleware to parse incoming request body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Token = "67fb1f9b0dd6a3e292e1fa4c9752d1af3f1ea0a787ca95f698f5b8883af5d40d";

app.get('/', async (req, res) => {
    axios.get('https://api.qase.io/v1/plan/RPP?limit=100&offset=0', {
        headers: {
            Token: Token,
        }
    }).then((response) => { res.json({ data: response.data }) }).catch((err) => { res.send(err) });
})

app.post('/add', (req, res) => {
    const { title, plan_id, environment_id, token } = req.body;
    axios.post('https://api.qase.io/v1/run/RPP', { title, plan_id, environment_id }, {
        headers: {
            Token: token
        }
    })
        .then(function (response) {
            console.log(response.data);
            res.status(200).json({ message: 'Success' });
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error');
        });
})

app.get('/author', (req, res) => {
    res.status(200).json({
        data: {
            Senghong: "67fb1f9b0dd6a3e292e1fa4c9752d1af3f1ea0a787ca95f698f5b8883af5d40d",
            // Sopha: "38c77aaeb9d5e0dfcaf99627a74e70949b3e668ad2fed73a1845bd6ac7ae7f22"
        }
    })
})

app.get('/env', (req, res) => {
    axios.get('https://api.qase.io/v1/environment/RPP?limit=10&offset=0', {
        headers: {
            Token: Token
        }
    }).then((response) => { res.json({ data: response.data }) }).catch((err) => { res.send(err) });
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})


