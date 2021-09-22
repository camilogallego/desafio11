import express from "express";

const app = express();
const PORT = 8080;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));

app.set("view engine", "ejs");

class Producto {
  constructor(title, price, thumbnail, id) {
    (this.title = title), (this.price = price), (this.thumbnail = thumbnail);
    this.id = productos.length + 1;
  }
}
const productos = [];

// GEt que renderiza el index
router.get("/", (req, res) => {
  res.render("pages/index", { productos });
});

router.post("/productos/guardar", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const nuevoProducto = new Producto(title, price, thumbnail);
  if (title && price && thumbnail && nuevoProducto) {
    productos.push(nuevoProducto);
    console.log(`post request a api/productos/guardar con producto`);
    console.log(nuevoProducto);
    res.status(201).json({
      ok: true,
      msg: `Nuevo producto agregado`,
      producto: nuevoProducto,
    });
  } else {
    res.status(400).json({
      ok: false,
      msg: "Complete todos los datos",
    });
  }
});
