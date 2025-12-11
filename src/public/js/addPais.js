let contadoresArray = {
    capital: 0,
    lenguajes: 0,
    zonasHorarias: 0,
    paisesVecinos: 0
};


// Agregar items a arrays
function añadirItem(tipo, valor) {
    const contenedor = document.getElementById(`${tipo}Contenedor`);
    const id = contadoresArray[tipo]++;

    const div = document.createElement("div");
    div.className = "array-input-grupo";
    div.id = `${tipo}-${id}`;

    // ⚡ Detectamos si es zonasHorarias
    if (tipo === "zonasHorarias") {

        // Select + o -
        const selectSigno = `
            <select name="zonaSigno[]" class="select-signo">
                <option value="+">UTC+</option>
                <option value="-">UTC-</option>
            </select>
        `;

        // Select de horas
        // Incluye cada media hora
        const horarios = [
            "00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30",
            "04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30",
            "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
            "12:00","12:30","13:00","13:30","14:00"
        ];

        let opcionesHorarios = horarios.map(h => `<option value="${h}">${h}</option>`).join("");

        const selectHora = `
            <select name="zonaHora[]" class="select-hora">
                ${opcionesHorarios}
            </select>
        `;

        div.innerHTML = `
            ${selectSigno}
            ${selectHora}
            <button type="button" class="boton-remover" onclick="quitarItem('${tipo}', ${id})">
                Eliminar
            </button>
        `;

    } else {
        // 📌 comportamiento normal para otros arrays
        div.innerHTML = `
            <input type="text" name="${tipo}[]">
            <button type="button" class="boton-remover" onclick="quitarItem('${tipo}', ${id})">
                Eliminar
            </button>
        `;
    }

    contenedor.appendChild(div);
}


// Eliminar items de arrays
function quitarItem(tipo, id) {
    const contenedorAux = document.getElementById(`${tipo}Contenedor`);
    const itemsAux = contenedorAux.querySelectorAll('.array-input-grupo');

    if(tipo === 'capital' && itemsAux.length === 1){
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debe existir al menos una capital.',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    if(tipo === 'lenguajes' && itemsAux.length === 1){
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debe existir al menos un lenguaje.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    const element = document.getElementById(`${tipo}-${id}`);

    if (element) {
        element.remove();
    }
}


function marcarErrores(errores) {
    console.log('🔴 ERRORES RECIBIDOS:', errores);
    
    // Limpiar errores previos
    document.querySelectorAll(".error-msg").forEach(e => e.remove());
    document.querySelectorAll(".input-error").forEach(i => i.classList.remove("input-error"));

    if (!errores || errores.length === 0) return;

    errores.forEach(err => {
        console.log('📌 Buscando campo:', err.campo || err.path);  // ← Ver qué campo busca
        
        let input = null;
          let campo = err.campo || err.path;
        console.log('📌 Campo recibido:', campo);

        // Normalizar campos tipo capital.0 → capital[]
        campo = campo.replace(/\.\d+$/, "[]");

        console.log('✔ Campo normalizado:', campo);

      
        

        // Buscar el input por diferentes métodos
        if (campo === 'capital[]' || campo === 'capital') {
            input = document.querySelector('#capital');
        } else if (campo === 'lenguajes[]' || campo === 'lenguajes') {
            input = document.querySelector('#lenguajes');
        } else if (campo === 'nombrePais' || campo === 'pais') {
            input = document.querySelector('#nombrePais');
        } else if (campo === 'nombreOficial') {
            input = document.querySelector('#nombreOficial');
        } else if (campo === 'habitantes') {
            input = document.querySelector('#habitantes');
        } else if (campo === 'gini') {
            input = document.querySelector('#gini');
        } else if (campo === 'region') {
            input = document.querySelector('#region');
        } else if (campo === 'subregion' || campo === 'subRegion') {
            input = document.querySelector('#subregion');
        } else if (campo === 'latitud' || campo.includes('latitudLongitud')) {
            input = document.querySelector('#latitud');
        } else if (campo === 'longitud') {
            input = document.querySelector('#longitud');
        } else if (campo === 'area') {
            input = document.querySelector('#area');
        } else if (campo === 'zonasHorarias[]' || campo === 'zonasHorarias') {
            input = document.querySelector('#zonasHorariasContenedor');
        } else if (campo.startsWith('paisesVecinos')) {
    input = document.querySelector('#paisesVecinosContenedor');
        } else if (campo === 'creador') {
            input = document.querySelector('#creador');
        } else {
            // Intentar encontrar por name o id
            input = document.querySelector(`#${campo}`) || 
                    document.querySelector(`[name="${campo}"]`);
        }

        console.log('🎯 Input encontrado:', input);  // ← Ver si lo encuentra

        if (!input) {
            console.warn(`❌ No se encontró input para el campo: ${campo}`);
            return;
        }

        // Marcar el input con error
        input.classList.add("input-error");
        input.style.border = "2px solid red";  // ← Forzar con inline style para test
        console.log('✅ Clase agregada a:', input);

        // Crear mensaje de error
        const mensaje = document.createElement("p");
        mensaje.className = "error-msg";
        mensaje.textContent = err.mensaje || err.msg;
        mensaje.style.color = "red";
        mensaje.style.fontSize = "0.875rem";

        // Insertar el mensaje
        input.insertAdjacentElement("afterend", mensaje);
    });
}



// Manejar envío del formulario
document.getElementById('paisForm').addEventListener('submit', async (e) => {
    e.preventDefault();

   

        const pais = {

            pais: document.getElementById('nombrePais').value.trim(),
            nombreOficial: document.getElementById('nombreOficial').value.trim(),
            capital: [],
            habitantes: parseInt(document.getElementById('habitantes').value),
            gini: parseFloat(document.getElementById('gini').value),
            region: document.getElementById('region').value.trim(),
            subRegion: document.getElementById('subregion').value.trim(),
            lenguajes: [],
            latitudLongitud: [
                parseFloat(document.getElementById('latitud').value),
                parseFloat(document.getElementById('longitud').value)
            ],
            area: parseFloat(document.getElementById('area').value),
            zonasHorarias: [],
            paisesVecinos: [],
            creador: document.getElementById('creador').value.trim(),
        };

        document.querySelectorAll('input[name="capital[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.capital.push(input.value.trim());
            }
        });

        document.querySelectorAll('input[name="lenguajes[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.lenguajes.push(input.value.trim());
            }
        });

        const signos = document.querySelectorAll('select[name="zonaSigno[]"]');
        const horas = document.querySelectorAll('select[name="zonaHora[]"]');

        signos.forEach((select, i) => {
            const signo = select.value;
            const hora = horas[i].value;
            pais.zonasHorarias.push(`UTC${signo}${hora}`);
        });
        
        document.querySelectorAll('input[name="paisesVecinos[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.paisesVecinos.push(input.value.trim());
            }
        });

        console.log('PAIS:', pais);
        
        
        // Deshabilitar botón al crear para evitar doble envío y mostrar texto "creando"
        const enviarBoton = document.querySelector('.boton-agregar');
        enviarBoton.disabled = true;
        enviarBoton.textContent = 'Creando...';

        try {
            const response = await fetch('/api/crearPais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pais)
            });

            const data = await response.json();

            console.log('DATA:', data);

         if (response.ok) {
    await Swal.fire({
        title: '¡País creado!',
        text: `El país ${pais.pais} se creó exitosamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 2500,
        timerProgressBar: true
    });
    window.location.href = '/api/dashboard';
} else {
    // Si hay errores de validación
    if (data.errores && data.errores.length > 0) {
        marcarErrores(data.errores);
        
        // Mostrar resumen de errores en SweetAlert
        const listaErrores = data.errores.map(e => `• ${e.mensaje || e.msg}`).join('<br>');
        await Swal.fire({
            title: 'Errores de validación',
            html: listaErrores,
            icon: 'error',
            confirmButtonText: 'Corregir'
        });
    } else {
        await Swal.fire({
            title: 'Error',
            text: data.mensaje || 'Error al crear el país.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

    enviarBoton.disabled = false;
    enviarBoton.textContent = 'Crear País';
}
} catch (error) {
    console.error('Error:', error);
    await Swal.fire({
        title: 'Error de conexión',
        text: 'Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });

    enviarBoton.disabled = false;
    enviarBoton.textContent = 'Crear País';
}

});

// Agregar un poder por defecto al cargar
window.addEventListener('DOMContentLoaded', () => {
    añadirItem('capital');
    añadirItem('lenguajes');
});