export function renderizarPais(pais) {
  return {
    ID: pais._id,
    Pais: pais.pais,
    "Nombre oficial": pais.nombreOficial,
    Capital: pais.capital,
    Habitantes: pais.habitantes,
    Gini: pais.gini,
    Region: pais.region,
    Subregion: pais.subRegion,
    Lenguajes: pais.lenguajes,
    "Latitud y longitud": pais.latitudLongitud,
    Area: pais.area,
    "Zonas Horarias": pais.zonasHorarias,
    "Paises vecinos": pais.paisesVecinos,
    Creador: pais.creador,
  };
}

export function renderizarPaises(paises) {
  return paises.map((pais) => renderizarPais(pais));
}
