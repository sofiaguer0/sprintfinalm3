import express from "express";

import {
  indexController,
  vistaDashboardController,
  insertarPaisesAPIController,
  eliminarPaisController,
  mostrarFormularioAgregarController,
  crearPaisController,
  mostrarFormularioEditarController,
  actualizarPaisController,
} from "../controllers/paisController.mjs";
import { validarPais, validarId } from "../validations/validationRules.js";
import { handleValidationErrors } from "../validations/errorMiddleware.js";

const router = express.Router();


// Rutas de la API
router.get("/", indexController);
router.get("/dashboard", vistaDashboardController);
router.get("/pais/nuevo", mostrarFormularioAgregarController);
router.get("/editar/:id", mostrarFormularioEditarController);

// Rutas de la API para insertar/actualizar/eliminar
router.post("/api-insert", insertarPaisesAPIController);
router.post(
  "/crearPais",
  validarPais(),
  handleValidationErrors,
  crearPaisController
);

router.put(
  "/actualizarPais/:id",
  validarId(),
  validarPais(),
  handleValidationErrors,
  actualizarPaisController
);

router.delete(
  "/eliminarPais/:id",
  validarId(),
  handleValidationErrors,
  eliminarPaisController
);

export default router;
