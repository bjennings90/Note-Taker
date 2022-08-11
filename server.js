const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const { application } = require('express');
const { resolve } = require('path');
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});
app.post('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
    const json = JSON.parse(data);
    json.push({
        title: req.body.title,
        text: req.body.text,
        id: Date.now()
    })
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(json))
    res.send(json)
});
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params
    const data = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
    let json = JSON.parse(data);
    json = json.filter ((item) => item.id != id)
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(json))
    res.send(json)
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
}) 
app.listen(4000, () => {
    console.log("listening on port 4000");
})