const restar = require('./exportacion-defecto.cjs')
const operaciones = require('./exportacion-nombrada.cjs');

console.log(restar(5, 4))
console.log(operaciones.sumar(5, 4))
console.log(operaciones.multiplicar(5, 4))
console.log(operaciones.dividir(5, 4))
