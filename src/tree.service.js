/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyTreeService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
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
                    .get(dyBaseApiUrl + tree)
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