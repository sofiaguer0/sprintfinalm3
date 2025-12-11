import { validationResult } from "express-validator";

// Middleware para manejar resultados de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensaje: "Errores de validación",
      errores: errors.array().map((error) => ({
        campo: error.path,
        valor: error.value,
        mensaje: error.msg,
      })),
    });
  }
  next();
};
