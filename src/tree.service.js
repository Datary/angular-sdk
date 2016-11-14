/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .service('TreeService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid, namespace){
            this.guid = guid;
            this.namespace = namespace;
            
            this.describe = function(){
                return describeTree(guid, namespace);
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
        function describeTree(tree, namespace){
            var URI = baseApiUrl + "trees/" + tree;
            if (namespace) URI += "?namespace=" + namespace;
            
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();