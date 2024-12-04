const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./routers/indexRouter");
const clienteRouter = require('./routers/clienteRouter');
const conceptoUsoRouter = require('./routers/conceptoUsoRouter');
const reglasAsignacionRouter = require('./routers/reglasAsignacionRouter');
const vencimientoPuntosRouter = require('./routers/vencimientoPuntosRouter');
const usoPuntosRouter = require('./routers/usoPuntosRouter');
const bolsaPuntosRouter = require('./routers/bolsaPuntosRouter');
const gamificacionRouter = require('./routers/gamificacion');
const promocionRouter = require('./routers/promocion');
const integracionRouter = require('./routers/integracionRouter');

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
app.use('/vencimiento_puntos', vencimientoPuntosRouter);
app.use('/uso_puntos', usoPuntosRouter);
app.use('/bolsa_puntos', bolsaPuntosRouter);
app.use('/gamificacion', gamificacionRouter);
app.use('/promo', promocionRouter);
app.use('/integracion', integracionRouter);

//config
app.listen(app.get("port"), () => {
  console.log("server listen on port:", app.get("port"));
});
