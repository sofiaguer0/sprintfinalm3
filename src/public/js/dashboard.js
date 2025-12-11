// ============================
//   CONFIGURACIÓN
// ============================

let currentPage = 1;
let itemsPerPage = 10;  
const totalItems = window.paises.length;


// ============================
//   RENDER PRINCIPAL
// ============================
function renderTable() {

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const visibles = paises.slice(start, end);

    const tbody = document.getElementById("tabla-body");
    tbody.innerHTML = "";

    visibles.forEach(p => {

        const capitales = (p.capital || []).map(
            c => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs inline-block mr-1">${c}</span>`
        ).join("");

        const lenguajes = (p.lenguajes || []).map(
            l => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs inline-block mr-1">${l}</span>`
        ).join("");

        const latlng = (p.latitudLongitud || []).map(
            ll => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs inline-block mr-1">${ll}</span>`
        ).join("");

        const zonas = (p.zonasHorarias || []).map(
            z => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs inline-block mr-1">${z}</span>`
        ).join("");

        const vecinos = (p.paisesVecinos || []).length > 0
            ? p.paisesVecinos.map(v => 
                `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs inline-block mr-1">${v}</span>`
              ).join("")
            : `<span class="text-gray-400 text-xs">Sin datos</span>`;

        const row = `
          <tr class="hover:bg-gray-50">

            <td class="px-3 py-2 font-medium text-gray-900">${p.pais}</td>
            <td class="px-3 py-2">${p.nombreOficial}</td>

            <td class="px-3 py-2">${capitales}</td>

            <td class="px-3 py-2">${p.habitantes.toLocaleString()}</td>

            <td class="px-3 py-2">${p.gini ?? "—"}</td>
            <td class="px-3 py-2">${p.region}</td>
            <td class="px-3 py-2">${p.subRegion}</td>

            <td class="px-3 py-2">${lenguajes}</td>

            <td class="px-3 py-2">${latlng}</td>

            <td class="px-3 py-2">${p.area.toLocaleString()}</td>

            <td class="px-3 py-2">${zonas}</td>

            <td class="px-3 py-2">${vecinos}</td>

              <td class="px-3 py-2 text-gray-800">${p.creador || "—"}</td>

            

            <td class="px-3 py-2">
              <div class="flex gap-2">
                <a href="/api/editar/${p._id}" 
                   class="px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
                   Editar
                </a>

                <button onclick="confirmarEliminacion('${p._id}', '${p.pais}')"
                        class="px-3 py-1 text-xs border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition">
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        `;

        tbody.innerHTML += row;
    });

    // Actualizar info
    document.getElementById("info-ini").textContent = start + 1;
    document.getElementById("info-fin").textContent = Math.min(end, totalItems);

    renderPagination();
}


// ============================
//   PAGINACIÓN
// ============================
function renderPagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const cont = document.getElementById("pagination-container");

    cont.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        cont.innerHTML += `
          <button onclick="goToPage(${i})"
                  class="px-3 py-1 border rounded text-sm
                  ${i === currentPage
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'}">
            ${i}
          </button>
        `;
    }
}

function goToPage(num) {
    currentPage = num;
    renderTable();
}
function calcularTotales() {
    let totalArea = 0;
    let totalPopulation = 0;
    let giniValues = [];

    paises.forEach(p => {

        // ==== AREA ====
        if (typeof p.area === "number") {
            totalArea += p.area;
        }

        // ==== HABITANTES ====
        if (typeof p.habitantes === "number") {
            totalPopulation += p.habitantes;
        }

        // ==== GINI =====
        // Si gini es número directo
        if (typeof p.gini === "number") {
            giniValues.push(p.gini);
        }

        // Si gini es un objeto { "2019": 32.1 }
        if (p.gini && typeof p.gini === "object") {
            const year = Object.keys(p.gini)[0];
            const val = p.gini[year];
            if (typeof val === "number") {
                giniValues.push(val);
            }
        }
    });

    // ==== PROMEDIO GINI ====
    const promedioGini = giniValues.length
        ? giniValues.reduce((a, b) => a + b, 0) / giniValues.length
        : null;

    // ==== ACTUALIZAR HTML ====
    

    document.getElementById("total-population").textContent =
        totalPopulation.toLocaleString();

    document.getElementById("promedio-gini").textContent =
        promedioGini !== null ? promedioGini.toFixed(2) : "—";
        document.getElementById("total-area").textContent =
        totalArea.toLocaleString();
        
}


       
    // Ejecutar cuando cargue la página
    document.addEventListener("DOMContentLoaded", calcularTotales);

// ============================
//   ELIMINAR 
// ============================
async function confirmarEliminacion(id, nombre) {
    const result = await Swal.fire({
        title: `¿Eliminar ${nombre}?`,
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) eliminarPais(id, nombre);
}

async function eliminarPais(id, nombre) {
    try {
        const response = await fetch(`/api/eliminarPais/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            await Swal.fire("Eliminado", `Se eliminó ${nombre}`, "success");
            window.location.reload();
        } else {
            Swal.fire("Error", "No se pudo eliminar el país", "error");
        }

    } catch (e) {
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
    }
}


// ============================
//   INICIALIZAR
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});
