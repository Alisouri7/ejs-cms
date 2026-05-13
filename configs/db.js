const mongoose = require('mongoose');


(async () => {
        await mongoose.connect('mongodb://localhost:27017/cms-ejs')
        console.log('DB connected')
})()