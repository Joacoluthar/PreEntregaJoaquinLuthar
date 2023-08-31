function saludar() {
    alert("Bienvenidos a Total Envios! Recibimos tu paquete y lo enviamos a todo el país.");
    alert("Tenemos los mejores precios desde $100 por envío.");
    console.log("Bienvenidos a Total Envios! Recibimos tu paquete y lo enviamos a todo el país.");
}

saludar();
const precioPorEnvio1k = 100;
let kilosPorEnvio = parseFloat(prompt('Ingrese el kilaje de su envío, los envíos mayores a 3K tendrán 20% de descuento'));

function aplicarDescuento(montoInicial, porcentajeDescuento) {
    if (isNaN(montoInicial) || montoInicial <= 0) {
        alert("El valor ingresado no es válido. Recargue la página e ingrese el kilaje de su envío nuevamente.");
        return;
    }

    if (montoInicial > 3) {
        const montoADescontar = montoInicial * (porcentajeDescuento / 100);
        const montoFinal = montoInicial - montoADescontar;
        alert('El precio del envío con descuento es: $' + montoFinal.toFixed(2));
        return montoFinal;
    } else {
        alert('El precio de su envío es: $' + montoInicial.toFixed(2));
        return montoInicial;
    }
}
function mostrarOpcionesDePago(montoFinal) {
    if (isNaN(montoInicial) || montoInicial <= 0) {
        return;
    }
    const opcion = prompt("¿Deseas pagar en cuotas o al contado? (cuotas/contado)").toLowerCase();

    if (opcion === "contado") {
        alert(`Has elegido pagar al contado. El precio total es $${montoFinal.toFixed(2)}.`);
    } else if (opcion === "cuotas") {
        mostrarCuotas(montoFinal);
    } else {
        alert("Opción no válida. Por favor, elige cuotas o contado.");
    }
}


function mostrarCuotas(montoFinal) {
    const cuotasDisponibles = [3, 6, 12];
    const cuotasElegidas = parseInt(prompt("Selecciona la cantidad de cuotas (3, 6, 12):"));

    if (cuotasDisponibles.includes(cuotasElegidas)) {
        const precioPorCuota = montoFinal / cuotasElegidas;
        alert(`Has elegido pagar en ${cuotasElegidas} cuotas de $${precioPorCuota.toFixed(2)} cada una.`);
    } else {
        alert("Cantidad de cuotas no válida. Por favor, elige 3, 6 o 12 cuotas.");
    }
}

const porcentajeDescuento = 20;
const montoInicial = precioPorEnvio1k * kilosPorEnvio;
const montoFinal = aplicarDescuento(montoInicial, porcentajeDescuento);

mostrarOpcionesDePago(montoFinal);