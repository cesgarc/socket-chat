var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') ||  !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El Nombre y Sala son necesarios.');
}

var usuario ={
    nombre: params.get('nombre'),
    sala:params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function ( resp ) {
        console.log('Usuarios Conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Enviar Mensajes al Chat
/*socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información del Servidor cuando se desconecta un usuario
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar Cambio de Usuarios, cuando un usuario entra o sale del Chat
socket.on('listaPersonas', function(personas) {
    console.log('Servidor Lista Personas:', personas);
});

//Mensajes Privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});