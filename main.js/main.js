document.addEventListener('DOMContentLoaded', function () {
    const formEnvio = document.querySelector('#formEnvio');
    const inputPesoEnvio = document.querySelector('#inputPesoEnvio');
    const resultadoDiv = document.querySelector('#resultado');
    let montoFinal = 0;

    formEnvio.addEventListener('submit', function (e) {
        e.preventDefault();

        const pesoEnvio = parseFloat(inputPesoEnvio.value);
        const precioPorEnvio1k = 100;
        const porcentajeDescuento = 20;

        if (isNaN(pesoEnvio) || pesoEnvio <= 0) {
            resultadoDiv.innerHTML = "El valor ingresado no es válido. Por favor, recargue la página e ingrese el peso del envío nuevamente.";
            return;
        }

        const montoInicial = precioPorEnvio1k * pesoEnvio;
        montoFinal = aplicarDescuento(montoInicial, porcentajeDescuento);

        resultadoDiv.innerHTML = `El precio del envío es: $${montoFinal.toFixed(2)}.`;

        const cuotasForm = document.querySelector('#cuotasForm');
        cuotasForm.style.display = 'block';
    });

    const cuotasForm = document.querySelector('#cuotasForm');
    const inputCuotas = document.querySelector('#inputCuotas');
    const cuotasResultadoDiv = document.querySelector('#cuotasResultado');

    cuotasForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const cuotasElegidas = parseInt(inputCuotas.value);
        const precioPorCuota = montoFinal / cuotasElegidas;

        cuotasResultadoDiv.innerHTML = `Has elegido pagar en ${cuotasElegidas} cuotas de $${precioPorCuota.toFixed(2)} cada una.`;
    });

    function aplicarDescuento(montoInicial, porcentajeDescuento) {
        if (montoInicial > 3) {
            const montoADescontar = montoInicial * (porcentajeDescuento / 100);
            const montoFinal = montoInicial - montoADescontar;
            return montoFinal;
        } else {
            return montoInicial;
        }
    }

    const formDirEnvio = document.querySelector('#formDirEnvio');
    const inputNombrecompleto = document.querySelector('#inputNombrecompleto');
    const inputMail = document.querySelector('#inputMail');
    const inputDireccion = document.querySelector('#inputDireccion');
    const inputLocalidad = document.querySelector('#inputLocalidad');
    const divGuardado = document.querySelector('#guardado');
    const denvios = JSON.parse(localStorage.getItem('denvios')) || [];

    class DireccionEnvio {
        constructor({ nombreCompleto, mail, direccion, localidad }) {
            this.nombreCompleto = nombreCompleto;
            this.mail = mail;
            this.direccion = direccion;
            this.localidad = localidad;
        }
    }

    formDirEnvio.onsubmit = e => {
        e.preventDefault();

        const nombreCompleto = inputNombrecompleto.value;
        const mail = inputMail.value;
        const direccion = inputDireccion.value;
        const localidad = inputLocalidad.value;

        const direccionEnvio = new DireccionEnvio({ nombreCompleto, mail, direccion, localidad });

        guardarDireccionEnvio(direccionEnvio);

        cargarMapa(direccion, localidad);
    };

    function guardarDireccionEnvio(direccionEnvio) {
        denvios.push(direccionEnvio);
        localStorage.setItem('denvios', JSON.stringify(denvios));
        mostrarguardado(direccionEnvio);
    }

    function mostrarguardado(direccionEnvio) {
        divGuardado.textContent = 'Dirección guardada: ' + direccionEnvio.direccion;

        const confirmarCompraBtn = document.querySelector('#confirmarCompraBtn');
        confirmarCompraBtn.style.display = 'block';
        confirmarCompraBtn.addEventListener('click', function () {
            confirmarCompra();
        });
    }

    function cargarMapa(direccion, localidad) {
        const mapaDiv = document.getElementById('mapa');
        const apiKey = 'AIzaSyA962LWQL7rzQMW-rx3NK35oWvVklCLEJI';

        const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${direccion},${localidad}&zoom=15&size=600x300&markers=${direccion},${localidad}&key=${apiKey}`;

        const mapaImg = document.createElement('img');
        mapaImg.src = apiUrl;



        mapaDiv.innerHTML = '';
        mapaDiv.appendChild(mapaImg);
    }

    function confirmarCompra() {
        Swal.fire({
            title: '¿Quiere confirmar su envío?',
            text: "Asegúrese de que sus datos sean correctos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Envío Confirmado',
                    'Este llegará en las próximas 48 horas',
                    'success'
                );

                divGuardado.textContent = '';

                const mapaDiv = document.getElementById('mapa');
                mapaDiv.innerHTML = '';

                inputNombrecompleto.value = '';
                inputMail.value = '';
                inputDireccion.value = '';
                inputLocalidad.value = '';

                inputPesoEnvio.value = '';

                resultadoDiv.innerHTML = '';

                cuotasForm.style.display = 'none';
                const confirmarCompraBtn = document.querySelector('#confirmarCompraBtn');
                confirmarCompraBtn.style.display = 'none';
            }
        });
    }

});



