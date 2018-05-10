import express from 'express';

let app = express();

app.get('/*', (req, resp) => {
    resp.send('Hello world!!');
});

app.listen(3000, () => console.log('Running on localhost:3000'));