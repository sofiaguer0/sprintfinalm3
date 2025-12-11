import express from "express";
import { connectDB } from "./config/dbConfig.mjs";
import paisRoutes from "./routes/paisRoutes.mjs";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

//config motor de vistas ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//configurar express layout
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Servir archivos estaticos para CSS/JS del frontend
app.use(express.static(path.join(__dirname, "public")));

// Conectar a MongoDB
connectDB();

// Ruta principal
app.get("/", (req, res) => {
  res.redirect("/");
});

// Rutas de la API
app.use("/api", paisRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
});
