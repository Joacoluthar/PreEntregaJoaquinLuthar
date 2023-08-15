function saludar() {
    alert("Bienvenidos a Total Evios! Recibimos tu paquete y lo enviamos a todo el pais");
    alert("Tenemos los mejores precios desde $100 por envio")
    console.log("Bienvenidos a Total Evios! Recibimos tu paquete y lo enviamos a todo el pais");
}
saludar();

const precioPorEnvio1k = 100
const kilosPorEnvio = parseFloat(prompt('Ingrese el kilaje de su envio, los envios mayores a 3K tendran 20% de descuento'))
while (isNaN(kilosPorEnvio)) {
    kilosPorEnvio = alert('El valor ingresado no es válido. Recargue la pagina e ingrese el kilaje de su envio nuevamente.');
}
function alplicarDescuento(montoInicial, porcentajeDescuento) {

    if (kilosPorEnvio < 1) {
        alert("No as ingresado el kilaje de tu envio")
    } if (kilosPorEnvio > 3) {
        const montoADescontar = montoInicial / 100 * porcentajeDescuento
        const montoFinal = montoInicial - montoADescontar
        alert('El precio del producto con descuento es: $' + montoFinal);
    } else {
        alert('El precio de su envio es: $' + montoInicial)
    }
    return montoFinal
}


const porcentajeDescuento = 20
const montoInicial = precioPorEnvio1k * kilosPorEnvio

const montoFinal = alplicarDescuento(montoInicial, porcentajeDescuento)