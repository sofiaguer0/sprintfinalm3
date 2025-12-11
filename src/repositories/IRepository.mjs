class IRepositoryPais {
  obtenerDesdeApi() {
    throw new Error("El método 'obtenerDesdeApi' debe ser implementado.");
  }

  insertarDesdeApi() {
    throw new Error("El método 'insertarDesdeApi' debe ser implementado.");
  }

  obtenerTodos() {
    throw new Error("El método 'obtenerTodos' debe ser implementado.");
  }

  obtenerPorId(id) {
    throw new Error("El método 'obtenerPorId' debe ser implementado.");
  }

  buscarPorAtributo(atributo, valor) {
    throw new Error("El método 'buscarPorAtributo' debe ser implementado.");
  }

  crear(paisData) {
    throw new Error("El método 'crear' debe ser implementado.");
  }

  actualizar(id, paisData) {
    throw new Error("El método 'actualizar' debe ser implementado.");
  }

  eliminar(id) {
    throw new Error("El método 'eliminar' debe ser implementado.");
  }
}

export default IRepositoryPais;
