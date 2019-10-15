const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

// Connection with remote database
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-yb0sy.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar body da requisição (para criação)

app.use(express.json());
app.use(routes);

app.listen(3333);
