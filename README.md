# 🌎 Sistema de Gestión de Países de América

Aplicación web para gestionar información de países americanos que hablan español, utilizando datos de la API REST Countries.

---

## 📋 Objetivos del Proyecto

- Consumir datos desde una API externa (REST Countries)
- Procesar y filtrar países con idioma español
- Almacenar datos en MongoDB con estructura limpia
- Implementar CRUD completo con validaciones en backend
- Mostrar dashboard interactivo con estadísticas y paginación
- Exportar datos a formato CSV

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución 
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM (Modelo de Datos Orientado a Objetos) para MongoDB
- **Express-Validator** - Validaciones en backend

### Frontend
- **EJS** - Motor de plantillas
- **Tailwind CSS** - Framework CSS
- **SweetAlert2** - Alertas elegantes
- **JavaScript** - Interactividad

## Otras herramientas:

- express-ejs-layouts - Codigo más limpio 
- express-validator - Valida los datos que recibe del servidor

- ---

## 📂 Estructura del Proyecto
```
sprintfinal/
├── src/
│   ├── config/
│   │   └── dbConfig.mjs          # Configuración de MongoDB
│   ├── controllers/
│   │   └── paisController.mjs    # Controladores
│   ├── models/
│   │   └── Pais.mjs              # Modelo de datos
│   ├── node-modules/             # Modulos de node
│   ├── public/                   # Carpeta de archivos estáticos
│   │    └── addPais.js
│   │    └── dashboard.js
│   │    └── editPais.js
│   │    └── index.js 
│   ├── repositories/
│   │   └── PaisRepository.mjs    # Acceso a datos
│   │   └── IRepository.mjs       # Manejo de errores
│   ├── routes/
│   │   └── paisRoutes.mjs        # Rutas de la API
│   ├── services/
│   │   └── paisService.mjs       # Lógica de negocio
│   ├── validations/
│   │   ├── validationRules.js    # Reglas de validación
│   │   └── errorMiddleware.js    # Middleware de errores
│   ├── views/
│   │   ├── layouts/
│   │   │   └── layout.ejs        # Layout principal
│   │   ├── partials/
│   │   │   ├── navbar.ejs        # Barra de navegación
│   │   │   └── footer.ejs        # Pie de página
│   │   ├── addPais.ejs           # Formulario de creación
│   │   ├── dashboard.ejs         # Dashboard principal
│   │   └── editarPais.ejs        # Formulario de edición
│   │   └── index.ejs             # Pagina Principal
│   │   └── responseView.mjs      # Renderiza los datos
│   └── app.mjs                   # Punto de entrada
├── package-lock.json
├── package.json
└── README.md
```

---

## ⚙️ Instalación y Configuración

### Requisitos Previos
- Node.js (versión 16 o superior)
- MongoDB (local o Atlas)
- Git

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/sofiaguer0/sprintfinalm3.git
cd sprintfinal
```

### Paso 2: Instalar dependencias
```bash
npm install
```
## Paso 3: Ejecutar la aplicación en la terminal
```bash
cd src
node app.mjs
```

El servidor estará disponible en: `http://localhost:3000/api`

---

## 🚀 Uso de la Aplicación

### 1. Primera vez: Cargar países desde la API

Visita el INDEX: `http://localhost:3000/api` y oprime el boton Cargar API

Esto descargará los países de REST Countries, los filtrará (solo español) y los guardará en MongoDB, redirigiendote al Dashboard.

### 2. Ver el Dashboard

Visita: `http://localhost:3000/api/dashboard`

Aquí podrás:
- Ver todos los países
- Ver estadísticas (población total, área total, promedio Gini)
- Editar países
- Eliminar países
- Exportar a CSV

### 3. Exportar datos

Haz clic en el botón "📥 Exportar CSV" en el dashboard para descargar todos los datos.

---

## ✅ Validaciones Implementadas

### Validaciones de Backend (Express-Validator)

**Al crear/editar un país:**
- ✅ Nombre del país: 3-90 caracteres
- ✅ Nombre oficial: 3-90 caracteres
- ✅ Capital: al menos una
- ✅ Población: número mayor a 0
- ✅ Gini: número entre 0 y 100 (opcional)
- ✅ Área: número mayor a 0
- ✅ Lenguajes: al menos uno
- ✅ Coordenadas: formato [latitud, longitud]
- ✅ Zonas horarias: formato UTC±HH:MM

**Comportamiento ante datos inválidos:**
1. El backend valida con `express-validator`
2. Si hay errores, devuelve JSON con lista de errores
3. El frontend marca los campos en rojo
4. Muestra mensajes específicos debajo de cada campo
5. El usuario puede corregir y reenviar

---
### Ejemplo: Crear un País

1. **Cliente** envía POST con JSON a `/api/paises`
2. **Ruta** recibe la petición
3. **Validación** verifica los datos con `express-validator`
4. Si hay errores → devuelve 400 con lista de errores
5. Si es válido → pasa al **Controlador**
6. **Controlador** llama al **Servicio**
7. **Servicio** procesa la lógica de negocio
8. **Repositorio** interactúa con MongoDB
9. **Modelo** define la estructura de datos
10. Respuesta exitosa → 201 con el país creado

---

## 📝 Funciones Principales del Código

### Controladores (paisController.mjs)
Es el archivo que recibe las peticiones del navegador y decide qué hacer:

- indexController: muestra la página de inicio
- insertarPaisesAPIController: descarga y guarda países desde la API externa
- vistaDashboardController: muestra todos los países
- mostrarFormularioAgregarController: muestra la página para crear un pais
- crearPaisController: guarda un nuevo país
- mostrarFormularioEditarController: muestra la página para editar un pais
- actualizarPaisController: modifica un país existente
- eliminarPaisController: borra un país

Servicios (paisesService.mjs)

Son funciones intermedias que actúan como puente entre los controladores y el repositorio. Se encargan de manejar la lógica de negocio para evitar que los controladores queden cargados de código.

### Repositorio (PaisRepository.mjs)
Acá están todas las consultas a MongoDB:

- obtenerDesdeApi(): consulta la API de REST Countries y filtra solo los países de América con español
- insertarDesdeApi(): guarda todos los países traídos desde la API de REST Countries y la guarda en la BD MongoDB
- obtenerTodos(): trae todos los países
- obtenerPorId(id): trae un país específico
- buscarPorAtributo(atributo, valor): trae un país en específico filtrado por el atributo y su valor
- crear(paisData): guarda un nuevo país
- actualizar(id, paisData): actualiza un país
- eliminar(id): elimina un país


---

Modelo (Pais.mjs)
Define cómo se estructura un país en la base de datos:

{
  pais: "Argentina",
  nombreOficial: "República Argentina",
  capital: ["Buenos Aires"],
  habitantes: 45376763,
  gini: 42.9,
  region: "Americas",
  subRegion: "South America",
  lenguajes: ["Spanish"],
  latitudLongitud: [-34, -64],
  area: 2780400,
  zonasHorarias: ["UTC-03:00"],
  paisesVecinos: ["BOL", "BRA", "CHL", "PRY", "URY"],
  creador: "Aguero Sofia Luciana"
}

---

## 🧪 Casos Límite y Manejo de Errores

### Caso 1: Datos Inválidos
- **Input:** Nombre con 1 carácter
- **Resultado:** Campo se marca en rojo, mensaje de error visible
- **Comportamiento:** No se guarda en BD, usuario puede corregir

### Caso 2: País Duplicado
- **Input:** Intentar crear país que ya existe
- **Resultado:** Error 400, mensaje específico
- **Comportamiento:** Se sugiere editar el existente

### Caso 3: Conexión a MongoDB Falla
- **Input:** MongoDB no disponible
- **Resultado:** Error 500, mensaje "Error de conexión"
- **Comportamiento:** Servidor registra el error, usuario ve mensaje amigable

### Caso 4: API REST Countries No Responde
- **Input:** Cargar países cuando API está caída
- **Resultado:** Error capturado, mensaje claro
- **Comportamiento:** No afecta países ya guardados

### Caso 5: Campo Opcional Vacío
- **Input:** Dejar "Gini" vacío
- **Resultado:** Se guarda como `null`
- **Comportamiento:** Validación pasa, se muestra "N/A" en dashboard

---

## 👥 Autor

**Sofia Luciana Aguero**  
Grupo 19 - Modulo 3
