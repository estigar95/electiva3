const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./routers/indexRouter");
const authRoutes = require("./routers/authRouter");
const listaRouter = require("./routers/listaRouter");


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
app.use("/api/auth", authRoutes);
app.use("/api/", listaRouter);

//config
app.listen(app.get("port"), () => {
  console.log("server listen on port:", app.get("port"));
});
