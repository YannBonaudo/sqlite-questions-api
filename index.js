const express = require("express");
const app = express();
const port = 3000;

// Require the questions routes
require("./routes/questions-route.js")(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
