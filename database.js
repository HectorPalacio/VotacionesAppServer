const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/votaciones';
// const MONGODB_URI = 'mongodb://192.168.1.2/votaciones';
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('Database is connected')).catch(err => console.log(err));