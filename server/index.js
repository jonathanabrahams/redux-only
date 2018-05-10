import express from 'express';
import path from 'path';

let app = express();

app.get('/*', (req, resp) => {
    resp.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log('Running on localhost:3000'));