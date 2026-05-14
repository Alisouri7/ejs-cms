const express = require('express');
const path = require('path');
const courseRouter = require('./routes/course');

require('./configs/db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/style', express.static(path.join(__dirname, 'public', 'style')));
app.use('/fonts', express.static(path.join(__dirname, 'public', 'fonts')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));


app.use('/courses', courseRouter);




app.listen(4002, () => {
    console.log('server run on port 4002!')
})