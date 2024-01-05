const app = require('express')();
const cors = require('cors');

const selfieRouter = require("./router/selfieRouter");

const port = 8000;

app.use(cors());
app.use('/api/v1', selfieRouter);

app.listen(port, () => {
    console.log(`API running on ${port}`)
})