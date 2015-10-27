/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('treeService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(id){
            this._id = id;
            this.describe = function(){
                return describeTree(id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * La llamada devuelve un objeto con la info de un tree, es
         * decir, con campos _id y entries, que es un array de entradas.
         * 
         * @param {ObjectId} tree: _id del tree que se consulta
         * 
         * @return {}:
         */
        function describeTree(tree){
            return (
                $http
                    .get(baseApiUrl + tree)
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();