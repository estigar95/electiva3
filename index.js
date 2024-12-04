const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routers/indexRouter"); // se importa 
const clienteRouter = require('./routers/clienteRouter'); // se importa
const conceptoUsoRouter = require('./routers/conceptoUsoRouter');
const reglasAsignacionRouter = require('./routers/reglasAsignacionRouter');
const vencimientoPuntosRouter = require('./routers/vencimientoPuntosRouter');
const usoPuntosRouter = require('./routers/usoPuntosRouter');
const bolsaPuntosRouter = require('./routers/bolsaPuntosRouter');
const segmentosRouter=require('./routers/segmentosRouter');


//settings
app.set("port", 3000 || 3001);

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
app.use('/segmento',segmentosRouter);
app.use('/segmento_cliente',segmentosRouter);

//config
app.listen(app.get("port"), () => {
  console.log("server listen on port:", app.get("port"));
});
