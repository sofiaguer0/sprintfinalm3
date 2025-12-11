import paisesRepository from "../repositories/PaisRepository.mjs";

// Crea una instancia del repositorio para acceder a sus métodos
const repo = new paisesRepository();

// Métodos para obtener los datos de la API
// Llama al repositorio que maneja la logica de la API
export async function obtenerPaisesAPI() {
  return await repo.obtenerDesdeApi();
}

//Inserta multiples paises en la base de datos
//Recibe un array de objetos con los datos de los paises y los guarda en MongoDB
export async function insertarPaisesApi(paisesData) {
  return await repo.insertarDesdeApi(paisesData);
}

//Obtiene una lista de todos los paises guardados en la base de datos
export async function obtenerTodosLosPaises() {
  return await repo.obtenerTodos();
}

//Obtiene un pais específico por su ID
export async function obtenerPaisPorId(id) {
  return await repo.obtenerPorId(id);
}

//Busca un pais por un atributo y un valor
export async function buscarPaisPorAtributo(atributo, valor) {
  return await repo.buscarPorAtributo(atributo, valor);
}

export async function crearPais(paisData) {
  return await repo.crear(paisData);
}

export async function actualizarPais(id, paisData) {
  return await repo.actualizar(id, paisData);
}

export async function eliminarPais(id) {
  return await repo.eliminar(id);
}
