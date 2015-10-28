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
    
    factory.$inject = ['$q', '$http', 'ConnectionService', 'searchFactory', 
                    'MemberService', 'RepoService', 'WorkingDirService', 
                    'CommitService', 'TreeService', 'LumpService'];
    
    function factory($q, $http, ConnectionService, searchFactory, 
                    MemberService, RepoService, WorkingDirService,
                    CommitService, TreeService, LumpService){
        return {
            connection: function(){
                return (new ConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return searchFactory(category, path, pattern, limit, offset);
            },
            member: function(id){
                return (new MemberService(id));
            },
            repo:function(id){
                return (new RepoService(id));
            },
            workingDir: function(id){
                return (new WorkingDirService(id));
            },
            commit: function(id, namespace){
                return (new CommitService(id, namespace));
            },
            tree: function(id){
                return (new TreeService(id));
            },
            lump: function(id){
                return (new LumpService(id));
            }
        };
    }
})();