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

app.set("views", "./views");
app.set("view engine", "pug");

class Producto {
  constructor(title, price, thumbnail, id) {
    (this.title = title), (this.price = price), (this.thumbnail = thumbnail);
    this.id = productos.length + 1;
  }
}
const productos = [];

// GEt que renderiza el index
router.get("/", (req, res) => {
  res.render("index.pug", {});
});

// GEt para ver todos los productos
router.get("/productos/lista", (req, res) => {
  if (productos.length != []) {
    res.status(201).render("listProduct.pug", {
      listaproductos: productos,
      listExists: true,
    });
  } else {
    res.status(400).json({
      ok: false,
      msg: "No hay productos cargados",
    });
  }
});

// POST para agregar productos
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

// GEt para ver productos segun ID
router.get("/productos/lista/:id", (req, res) => {
    let params = req.params;
    console.log(params);
    let id = params.id;
    let produId = productos.find((x) => x.id == id);
    if (produId != undefined) {
      res.json(produId);
    } else {
      res.status(400).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }
  });

  // DELETE para borrar productos
router.delete("/productos/borrar/:title", (req, res) => {
    let params = req.params;
    let title = params.title;
    let produId = productos.find((x) => x.title == title);
    console.log(produId);
    if (produId != undefined) {
      let delet = productos.splice(title - 1, 1);
      res.status(201).json({
        ok: true,
        msg: `producto eliminado ${delet}`,
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "No se puedo eliminat producto",
      });
    }
  });