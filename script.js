function logMemoryUsage(message) {
    const memoryInfo = tf.memory();
    console.log(message, memoryInfo.numBytes / (1024 * 1024), 'MB');
}
// Función para crear un tensor aleatorio de 10x10
function crearTensorAleatorio() {
// Generar un tensor aleatorio de 10x10 con números enteros del 1 al 9
    const tensor = tf.randomUniform([10, 10], 1, 10, 'int32');
    return tensor;
}
// Función para mostrar la matriz resultado como una tabla HTML
function mostrarMatrizComoTabla(matriz) {
matriz.array().then(array => {
    const matrizResultadoDiv = document.getElementById('matrizResultado');
    const tabla = document.createElement('table');
    tabla.className = 'table'; // Agrega la clase Bootstrap 'table' para darle estilo a la tabla

    for (let i = 0; i < array.length; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < array[i].length; j++) {
            const valor = array[i][j];
            const celda = document.createElement('td');
            celda.textContent = valor;
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    matrizResultadoDiv.innerHTML = ''; // Limpia el contenido previo
    matrizResultadoDiv.appendChild(tabla);
});
}
// Función para realizar la multiplicación
function realizarMultiplicacion() {
    // Inicializar variables
    let totalMemoryUsed = 0;
    let iterations = 0;
    let matrizResultado;

    while (totalMemoryUsed < 4 * 1024 * 1024) {
        if(iterations == 0) {
            var tensorAleatorio = crearTensorAleatorio();
            var tensorAleatorio2 = crearTensorAleatorio();
            matrizResultado = tf.matMul(tensorAleatorio, tensorAleatorio2);
            matrizResultado.print();
        }else {
            matrizResultado = tf.matMul(tensorAleatorio, matrizResultado);
            matrizResultado.print();
        }
        iterations++;
        // Actualizar la memoria total utilizada
        const memoryInfo = tf.memory();
        totalMemoryUsed = memoryInfo.numBytes;
        // Mostrar información sobre la memoria
        logMemoryUsage(`Después de la iteración ${iterations}:`);
    }
    // Mostrar la matriz resultante y el número de iteraciones final
    const matrizResultadoDiv = document.getElementById('titulo');
    const titulo = document.createElement('h2');
    titulo.textContent = 'Matriz Resultado';
    matrizResultadoDiv.appendChild(titulo);

    mostrarMatrizComoTabla(matrizResultado);
    const numIteracionesDiv = document.getElementById('numIteraciones');
    numIteracionesDiv.innerText = `Número de Iteraciones: ${iterations}`;

    logMemoryUsage("Antes de liberar la memoria:");
    tf.dispose(tensorAleatorio); // Liberar el tensor 'tensorAleatorio'
    tf.dispose(tensorAleatorio2); // Liberar el tensor 'tensorAleatorio2'
    tf.dispose(matrizResultado); // Liberar el tensor 'matrizResultado'
    }
realizarMultiplicacion()
// Liberar memoria después de alcanzar los 12 MB
logMemoryUsage("Después de un tiempo transcurrido:");       