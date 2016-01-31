/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('TreeService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid){
            this.guid = guid;
            this.describe = function(){
                return describeTree(guid);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * La llamada devuelve un objeto con la info de un tree, es
         * decir, con campos 
         * 
         * @param {String} tree: sha1 del tree que se consulta
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
            );
        }
    }
})();