/* agregar un producto al carrito */
function agregarProductoAlCarrito(nombreProducto, precioProducto) {
    const carrito = document.getElementById('carrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const cantidadInput = document.getElementById(`cantidad${nombreProducto.replace(/\s+/g, '')}`);
    const cantidad = parseInt(cantidadInput.value);

    const productoElement = document.createElement('div');
    productoElement.textContent = `${cantidad} x ${nombreProducto} - Precio total: $${(precioProducto * cantidad).toFixed(2)}`;
    carrito.appendChild(productoElement);

    /* Actualizar el total del carrito */
    let total = parseFloat(totalCarrito.textContent);
    total += precioProducto * cantidad;
    totalCarrito.textContent = total.toFixed(2);

    /* Mostrar una alerta de producto(s) agregado(s) al carrito */
    alert(`${cantidad} Agregado/s.`);

    // Guardar la cantidad en el almacenamiento local
    const carritoGuardado = obtenerCarrito();
    carritoGuardado[nombreProducto] = carritoGuardado[nombreProducto] ? carritoGuardado[nombreProducto] + cantidad : cantidad;
    guardarCarrito(carritoGuardado);

    // Restaurar las cantidades de los productos desde el carrito guardado en el almacenamiento local
    const cantidadGuardada = carritoGuardado[nombreProducto] || 0;
    if (cantidadGuardada) {
        cantidadInput.value = cantidadGuardada;
    }
}

function obtenerCarrito() {
    const carritoGuardadoJSON = localStorage.getItem('carrito');
    return carritoGuardadoJSON ? JSON.parse(carritoGuardadoJSON) : {};
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
    /* Obtener elementos del DOM */
    const agregarBotones = document.getElementsByClassName('agregar');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const verCarrito = document.getElementById('verCarrito');
    const comprarBtn = document.getElementById('comprar');
    const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
    
    /* agregar un producto al carrito */
    for (const boton of agregarBotones) {
        boton.addEventListener('click', () => {
            const nombreProducto = boton.dataset.producto;
            const precioProducto = parseFloat(boton.dataset.precio);
            agregarProductoAlCarrito(nombreProducto, precioProducto);
        });
    }

    
    /* mostrar la ventana modal del carrito */
    verCarrito.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    /* cerrar la ventana modal del carrito */
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    /* comprar los productos */
    comprarBtn.addEventListener('click', () => {
        alert('Gracias por tu compra');
        modal.style.display = 'none';
        const carrito = document.getElementById('carrito');
        const totalCarrito = document.getElementById('totalCarrito');
        carrito.textContent = '';
        totalCarrito.textContent = '0';
    });

    /* vaciar el carrito */
    vaciarCarritoBtn.addEventListener('click', () => {
        const confirmacion = confirm('¿Estás seguro de que deseas vaciar el carrito?');
        if (confirmacion) {
            const carrito = document.getElementById('carrito');
            const totalCarrito = document.getElementById('totalCarrito');
            carrito.textContent = '';
            totalCarrito.textContent = '0';
            localStorage.removeItem('carrito');  // Eliminar el carrito del almacenamiento local
        }
    });

    // Restaurar las cantidades de los productos al cargar la página
    const carritoGuardado = obtenerCarrito();
    for (const nombreProducto in carritoGuardado) {
        const cantidadInput = document.getElementById(`cantidad${nombreProducto.replace(/\s+/g, '')}`);
        cantidadInput.value = carritoGuardado[nombreProducto];
    }
});
