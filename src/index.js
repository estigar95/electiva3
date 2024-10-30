const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./routers/indexRouter");
const clienteRouter = require('./routers/clienteRouter');
const conceptoUsoRouter = require('./routers/conceptoUsoRouter');
const reglasAsignacionRouter = require('./routers/reglasAsignacionRouter');

//settings
app.set("port", process.env.PORT || 3001);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

//middleware
app.use(morgan("dev"));
app.use(cors());

//routes
app.use(indexRouter);
app.use('/clientes', clienteRouter);
app.use('/conceptos-uso', conceptoUsoRouter);
app.use('/reglas_asignacion', reglasAsignacionRouter);

//config
app.listen(app.get("port"), () => {
  console.log("server listen on port:", app.get("port"));
});
