# Datary SDK for AngularJS apps

```
npm install
```  

Es preciso configurar las variables de entorno, entre ellas:
http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Configuring_the_SDK_in_Node_js  
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY


## Convenciones 

Algunas convenciones: 
* El valor devuelto por peticiones de informacion (que por lo mismo se apoyan
* en `http request` de tipo GET) es logicamente un `object` con tal informacion
* El valor devuelto por peticiones de eliminacion o actualizacion de un nodo 
* (apoyadas en metodos PUT y DELETE) devuelven el _id del nodo eliminado 
o actualizado. 
* El valor de peticiones que realizan agregacion de elementos a otros nodos
* (usando POST por tanto) devuelven el valor del nodo creado.
* El valor de peticones list* es un array de `ObjectIds`, es decir, los 
* objetos a que representan no han sido `populados`. 


## Styling

* https://github.com/johnpapa/angular-styleguide#style-y091
* https://github.com/johnpapa/angular-styleguide#naming