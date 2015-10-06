/*******************************************************************************
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
 * https://github.com/johnpapa/angular-styleguide#style-y091
 * https://github.com/johnpapa/angular-styleguide#naming
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('Datary', factory);
    
    factory.$inject = ['$q', '$http', 'DyConnectionService', 'DySearchService', 
                    'DyMemberService', 'DyRepoService', 'DyWorkingDirService', 
                    'DyCommitService', 'DyTreeService', 'DyLumpService'];
    
    function factory($q, $http, DyConnectionService, DySearchService, DyMemberService, 
            DyRepoService, DyWorkingDirService, DyCommitService, DyTreeService, 
            DyLumpService){
        return {
            connection: function(){
                return (new DyConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return DySearchService(category, path, pattern, limit, offset);
            },
            member: function(id){
                return (new DyMemberService(id));
            },
            repo:function(id){
                return (new DyRepoService(id));
            },
            workingDir: function(id){
                return (new DyWorkingDirService(id));
            },
            commit: function(id, namespace){
                return (new DyCommitService(id, namespace));
            },
            tree: function(id){
                return (new DyTreeService(id));
            },
            lump: function(id){
                return (new DyLumpService(id));
            }
        };
    }
})();