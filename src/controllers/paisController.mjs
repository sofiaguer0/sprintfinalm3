import {
  obtenerPaisesAPI,
  insertarPaisesApi,
  obtenerTodosLosPaises,
  eliminarPais,
  crearPais,
  obtenerPaisPorId,
  actualizarPais,
  buscarPaisPorAtributo,
} from "../services/paisService.mjs";
import { renderizarPais, renderizarPaises } from "../views/responseView.mjs";

// controlador pagina de inicio
//obtiene los paises de la base y renderiza la vista
export async function indexController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();

    return res.render("index", { paises, title: "Inicio - Paises" });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al obtener los paises", error: error.message });
  }
}

// controlador para insertar los paises desde la API externa
// obtiene los paises de la API y los inserta en la base de datos
export async function insertarPaisesAPIController(req, res) {
  try {
    const paises = await obtenerPaisesAPI();

    const paisesInsertados = await insertarPaisesApi(paises);

    res
      .status(201)
      .json({ mensaje: "Paises insertados correctamente", paisesInsertados });
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al insertar los paises desde la API",
        error: error.message,
      });
  }
}

// controlador para mostrar el dashboard de los paises
//obtiene los paises de la base y renderiza la vista
export async function vistaDashboardController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();

    return res.render("dashboard", { paises, title: "Listado de Paises" });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al obtener los paises", error: error.message });
  }
}

// Controlador para mostrar el formulario de agregar pais renderizando la vista
export async function mostrarFormularioAgregarController(req, res) {
  try {
    res.render("addPais", { title: "Agregar Nuevo Pais" });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al cargar el formulario", error: error.message });
  }
}

// Controlador para crear un nuevo pais
// Valida que no exista duplicado por nombre oficial y guarda en la base de datos (si pasa las validaciones)
export async function crearPaisController(req, res) {
  try {
    const { nombreOficial } = req.body;
    const existe = await buscarPaisPorAtributo("nombreOficial", nombreOficial);

    if (existe.length > 0) {
      return res
        .status(409)
        .json({ mensaje: "Ya existe un pais con ese nombre oficial" });
    }

    const nuevoPais = req.body;
    const paisCreado = await crearPais(nuevoPais);
    const paisFormateado = renderizarPais(paisCreado);
    res.status(201).json({
      mensaje: "Pais creado correctamente",
      Pais: paisFormateado,
    });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al crear el pais", error: error.message });
  }
}

//  Muestra el formulario de edición de un país
// Busca el país por ID y renderiza el formulario con los datos
export async function mostrarFormularioEditarController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (!pais) {
      return res.status(404).send({ mensaje: "Pais no encontrado" });
    }

    res.render("editarPais", { pais, title: "Editar Pais" });
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al cargar el formulario de edición",
        error: error.message,
      });
  }
}

// Controlador para actualizar un pais
// Valida que el ID existe y guarda en la base de datos (si pasa las validaciones)
export async function actualizarPaisController(req, res) {
  try {
    const { id } = req.params;
    const paisData = req.body;

    const paisActualizado = await actualizarPais(id, paisData);

    if (!paisActualizado) {
      return res
        .status(404)
        .send({ mensaje: "Pais no encontrado para actualizar" });
    }
    const paisFormateado = renderizarPais(paisActualizado);
    res.status(200).json({
      mensaje: "Pais actualizado correctamente",
      pais: paisFormateado,
    });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al actualizar el pais", error: error.message });
  }
}

// Controlador para eliminar un pais
// Valida que el ID existe y elimina de la base de datos
export async function eliminarPaisController(req, res) {
  try {
    const { id } = req.params;

    const paisEliminado = await eliminarPais(id);

    if (!paisEliminado) {
      return res
        .status(404)
        .send({ mensaje: "Pais no encontrado para eliminar" });
    }

    const paisFormateado = renderizarPais(paisEliminado);

    res.status(200).json({
      mensaje: "Pais eliminado correctamente",
      pais: paisFormateado,
    });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al eliminar el pais", error: error.message });
  }
}
