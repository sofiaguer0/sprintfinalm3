import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
  pais: { type: String, required: true },
  nombreOficial: { type: String, required: true },
  capital: { type: [String], required: true },
  habitantes: { type: Number, required: true },
  gini: { type: Number, default: null },
  region: { type: String, default: "Desconocido" },
  subRegion: { type: String, default: "Desconocido" },
  lenguajes: { type: [String], default: [] },
  latitudLongitud: { type: [Number], default: [] },
  area: { type: Number, required: true },
  zonasHorarias: { type: [String], default: [] },
  paisesVecinos: { type: [String], default: [] },
  creador: { type: String, default: "Aguero Sofia Luciana" },
});

const Pais = mongoose.model("Pais", paisSchema, "Grupo-19");
export default Pais;
