const express = require('express');
const cors = require('cors'); 

const app = express(); // create express server
const port = 8000; // specify the port
app.use(cors()); // app to use cors
app.use(express.static('./')); // serve files from the folder


// listen to the server(start server on port)
app.listen(port, () => {
    console.log(`SERVER ON PORT ${port}`);
})