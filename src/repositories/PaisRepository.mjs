import Pais from "../models/Pais.mjs";
import IRepositoryPais from "./IRepository.mjs";

class paisesRepository extends IRepositoryPais {
  // Obtener países desde la API externa (REST Countries)
  async obtenerDesdeApi() {
    try {
      //peticion a la API
      const response = await fetch(
        "https://restcountries.com/v3.1/region/americas"
      );
      const data = await response.json();

      // Filtrar solo países con idioma español y mapearlos al modelo local
      const paisesConEsp = data
        .filter((pais) => pais.languages && pais.languages.spa)
        //convierte el formato de la api al modelo local
        .map((pais) => {
          // Normalizar GINI (calcular el promedio de los valores de los distintos años)
          let giniNormalizado = null;

          if (pais.gini && Object.keys(pais.gini).length > 0) {
            //extrae todos los valores
            const valores = Object.values(pais.gini);
            //sumar los valores
            const suma = valores.reduce((acc, val) => acc + val, 0);
            //calcular promedio
            giniNormalizado = suma / valores.length;
          }

          // Transformar formato API → formato del modelo Pais
          return {
            pais: pais.name.nativeName.spa.common || pais.name.common,
            nombreOficial:
              pais.name.nativeName.spa.official || pais.name.official,
            capital: pais.capital || [],
            habitantes: pais.population,
            gini: giniNormalizado,
            region: pais.region,
            subRegion: pais.subregion,
            lenguajes: pais.languages ? Object.values(pais.languages) : [],
            latitudLongitud: pais.latlng || [],
            area: pais.area,
            zonasHorarias: pais.timezones || [],
            paisesVecinos: pais.borders || [],
            creador: "Aguero Sofia Luciana",
          };
        });

      return paisesConEsp;
    } catch (error) {
      console.error("ERROR al obtener paises de API:", error);
      throw error;
    }
  }

  // Insertar países desde API evitando duplicados (upsert)
  async insertarDesdeApi(paisesData) {
    const operaciones = paisesData.map((pais) => ({
      updateOne: {
        // Buscar coincidencias por nombre oficial y creador
        filter: {
          nombreOficial: pais.nombreOficial,
          creador: "Aguero Sofia Luciana",
        },
        // Solo insertar si no existe
        //solo establece valores si no existen datos anteriores dupicados
        update: { $setOnInsert: pais },
        //que es upsert: si existe lo ignora, si no existe lo inserta
        upsert: true,
      },
    }));

    // BulkWrite = eficiente para insertar muchos documentos en una operación
    return await Pais.bulkWrite(operaciones);
  }

  async obtenerTodos() {
    return await Pais.find({ pais: { $exists: true } });
  }

  async obtenerPorId(id) {
    return await Pais.findById(id);
  }

  // Buscar por cualquier atributo dinámicamente
  async buscarPorAtributo(atributo, valor) {
    // Detectar tipo real del atributo (String, Number, etc.) desde el schema
    const tipo = Pais.schema.path(atributo)?.instance;

    // Adaptar el valor al tipo correcto
    let filtroValor;
    if (tipo === "Number") {
      filtroValor = Number(valor); // convertir texto a número
    } else {
      // Regex (expresion regular) para coincidencia exacta e insensible a mayúsculas
      // ^...$ = coincidencia exacta (no subcadenas)
      // "i" = case insensitive ("Argentina" = "argentina" = "ARGENTINA")
      filtroValor = new RegExp(`^${valor}$`, "i");
    }

    // Búsqueda dinámica: { [atributo]: valor }
    const doc = await Pais.find({ [atributo]: filtroValor });

    return doc;
  }

  async crear(paisData) {
    const nuevoPais = new Pais(paisData);
    return await nuevoPais.save();
  }

  async actualizar(id, paisData) {
    return await Pais.findByIdAndUpdate(id, paisData);
  }

  async eliminar(id) {
    return await Pais.findByIdAndDelete(id);
  }
}

export default paisesRepository;
