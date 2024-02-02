document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar mensajes de error o informativos
    function mostrarMensaje(mensaje) {
        alert(mensaje);
    }

    // Función para obtener el nombre del usuario
    function obtenerNombre() {
        let nombre = document.getElementById("nombreInput").value.trim();

        if (nombre === "") {
            mostrarMensaje("Por favor, ingrese un nombre válido.");
            return null;
        }

        return nombre;
    }

    // Función para manejar la adición de ventas
    function manejarAgregarVenta() {
        let ventaInput = document.getElementById("ventaInput");
        let venta = parseFloat(ventaInput.value);

        if (!isNaN(venta)) {
            let comisiones = JSON.parse(localStorage.getItem("comisiones")) || [];
            comisiones.push(venta);
            localStorage.setItem("comisiones", JSON.stringify(comisiones));
            mostrarDetalles(comisiones);
        } else {
            mostrarMensaje("Por favor, ingrese una venta válida.");
        }

        ventaInput.value = "";
    }

    // Función para calcular la suma total de comisiones
    function calcularSuma(comisiones) {
        let suma = 0;

        for (let i = 0; i < comisiones.length; i++) {
            suma += comisiones[i];
        }

        return suma;
    }

    // Función para mostrar los detalles de ventas y comisión
    function mostrarDetalles(comisiones) {
        let nombre = obtenerNombre();

        if (nombre && comisiones && comisiones.length > 0) {
            let suma = calcularSuma(comisiones);
            let comision = suma * 0.30;

            document.getElementById("detallesVentas").textContent = "Las ventas ingresadas fueron: $" + comisiones.join(", $");
            document.getElementById("sumaTotal").textContent = "La suma total de sus ventas es: $" + suma;
            document.getElementById("comision").textContent = "La comisión que usted cobrará es de: $" + comision.toFixed(2);
            document.getElementById("mensajeFinal").textContent = "¡Muchas gracias, " + nombre + ", por usar nuestros servicios!";
        } else {
            mostrarMensaje("No se ingresaron comisiones o nombre.");
        }
    }

    // Función para limpiar datos y reiniciar para otro usuario
    function limpiarDatos() {
        localStorage.removeItem("comisiones");
        document.getElementById("nombreInput").value = "";
        document.getElementById("detallesVentas").textContent = "";
        document.getElementById("sumaTotal").textContent = "";
        document.getElementById("comision").textContent = "";
        document.getElementById("mensajeFinal").textContent = "";
    }

    // Event listener para el botón de ingresar nombre
    document.getElementById("agregarNombreBtn").addEventListener("click", function() {
        mostrarDetalles([]);
    });

    // Event listener para el botón de agregar venta
    document.getElementById("agregarVentaBtn").addEventListener("click", function() {
        manejarAgregarVenta();
    });

    // Event listener para el botón de salir y limpiar datos
    document.getElementById("limpiarBtn").addEventListener("click", function() {
        limpiarDatos();
    });
});

