/******************************************************************************
 * @description 
 * Algunas convenciones: 
 * El valor devuelto por peticiones de informacion (que por lo mismo se apoyan
 * en `http request` de tipo GET) es logicamente un `object` con tal informacion
 * El valor devuelto por peticiones de eliminacion o actualizacion de un nodo 
 * (apoyadas en metodos PUT y DELETE) devuelven el _id del nodo eliminado 
 * o actualizado. 
 * El valor de peticiones que realizan agregacion de elementos a otros nodos
 * (usando POST por tanto) devuelven el valor del nodo creado.
 * El valor de peticones list* es un array de `ObjectIds`, es decir, los 
 * objetos a que representan no han sido `populados`. 
 * 
 *****************************************************************************/
(function(){
    angular
        .module('dySdk', [])
        .constant('dyBaseApiUrl', "https://datary-apiserver-rtm-us1-a.azurewebsites.net/");
})();