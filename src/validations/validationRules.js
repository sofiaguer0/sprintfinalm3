import { body, param } from "express-validator";

// Validaciones para crear un pais
export const validarPais = () => [
  body("pais")
    .notEmpty()
    .withMessage("El nombre del pais es requerido")
    .trim() //sacar espacios al inicio y final
    .isLength({ min: 3, max: 90 })
    .withMessage("El nombre del pais debe tener entre 3 y 90 caracteres"),

  body("nombreOficial")
    .notEmpty()
    .withMessage("El nombre oficial es requerido")
    .trim()
    .isLength({ min: 3, max: 90 })
    .withMessage("El nombre oficial debe tener entre 3 y 90 caracteres"),

  body("capital")
    .isArray({ min: 1 })
    .withMessage("Las capitales deben ser un array con al menos un elemento")
    //verificar que los elementos son strings
    .custom((capitales) => {
      if (!capitales.every((capital) => typeof capital === "string")) {
        throw new Error("Todas las capitales deben ser strings");
      }
      return true;
    }),

  body("capital.*") // * significa que el validador se aplica a cada elemento del array
    .notEmpty()
    .withMessage("Las capitales no pueden estar vacías")
    .trim()
    .isLength({ min: 3, max: 90 })
    .withMessage("Cada capital debe tener entre 3 y 90 caracteres"),

  body("habitantes")
    .notEmpty()
    .withMessage("La cantidad de habitantes es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad de habitantes debe ser un número entero positivo")
    .toInt(),

  body("gini")
  //opcional, pero si existe debe ser un número entre 0 y 100
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage("Gini debe ser un número entre 0 y 100")
    .toFloat(),  

  body("region").optional().trim(),

  body("subRegion").optional().trim(),

  body("lenguajes")
    .isArray({ min: 1 })
    .withMessage("Debes enviar al menos un lenguaje")
    //verificar que los elementos son strings
    //y que no sean vacíos
    .custom((lenguajes) => {
      if (!lenguajes.every((l) => typeof l === "string")) {
        throw new Error("Todos los lenguajes deben ser strings");
      }
      if (!lenguajes.every((l) => l.trim().length > 0)) {
        throw new Error("Los lenguajes no pueden estar vacíos");
      }
      return true;
    }),


    
  body("lenguajes.*")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Cada lenguaje debe tener al menos 1 caracter"),

  body("latitudLongitud")
    .optional()
    .isArray({ min: 2, max: 2 })
    .withMessage("La latitud y longitud debe ser un array de 2 elementos"),

  body("latitudLongitud.*") 
    .isFloat()
    .withMessage("La latitud y longitud deben ser números")
    .toFloat(),

  body("area")
    .notEmpty()
    .withMessage("El area es requerida")
    .isFloat({ min: 0.01 })
    .withMessage("El area debe ser un número positivo")
    .toFloat(),

  body("zonasHorarias")
    .optional()
    .custom((zonasHorarias) => {
      if (!zonasHorarias.every((zona) => typeof zona === "string")) {
        throw new Error("Todas las zonas horarias deben ser strings");
      }
      return true;
    }),

  body("zonasHorarias.*")
    .notEmpty()
    .withMessage("Las zonas horarias no pueden estar vacías")
    .trim(),


  body("paisesVecinos")
    .optional()
    .isArray()
    .withMessage("Los países vecinos deben ser un array"),

  body("paisesVecinos.*") 
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Cada código debe tener exactamente 3 caracteres")
    .isUppercase()
    .withMessage("Los códigos deben estar en mayúsculas"),

  body("creador").optional().trim(),
];

// Validaciones para IDs
export const validarId = () => [
  param("id").isMongoId().withMessage("ID inválido"),
];
