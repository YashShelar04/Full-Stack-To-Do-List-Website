const mongoURI = 'mongodb+srv://YashShelar:yashShelar@cluster0.iysmxyl.mongodb.net/';
import mongoose from 'mongoose';
mongoose.connect(mongoURI);
import TodoSchema from './Schema.js';
const Model = mongoose.model('Model', TodoSchema);
// Access the default connection
const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

export default Model