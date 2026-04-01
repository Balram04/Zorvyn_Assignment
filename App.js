const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

    app.get('/health', (req, res) => {
        res.send('zorvyn_assignment is healthy!');
    });


const PORT = process.env.PORT;
app.listen(PORT, () => {    
console.log(`Server is running on port ${PORT}`)
 });

  