document.getElementById('boton-cargar-api').addEventListener('click', async (e) => {

    e.preventDefault();

    try {
            const response = await fetch('/api/api-insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            });

            const data = await response.json();

            console.log('DATA:', data);

            if (response.ok) {
                
                await Swal.fire({
                    title: '¡Paises cargados!',
                    text: `Los paises se cargaron exitosamente.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    timer: 2500,
                    timerProgressBar: true
                });

                window.location.href = '/api/dashboard';

            } else {

                await Swal.fire({
                    title: 'Error',
                    text: data.mensaje || 'Error al crear los paises desde API.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });

            }
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
                title: 'Error de conexión',
                text: 'Por favor, intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

        }

});