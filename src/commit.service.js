/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .service('dy.sdk.commit', service);
    
    service.$inject = [
        '$q', 
        '$http', 
        'dy.sdk.baseApiUrl'
    ];
    
    function service($q, $http, baseApiUrl){
        return function(guid, namespace){
            this.guid = guid;
            this.namespace = namespace;
            
            this.describeCommit = function(){
                return describeCommit(guid, namespace);
            };
            this.retrieveBranch = function(){
                return retrieveBranchFromCommit(guid, namespace);
            };
            this.retrieveFiletree = function(){
                return retrieveFiletreeFromCommit(guid, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * La llamada devuelve un objeto con la info de un commit, es
         * decir, con campos 
         * 
         * @param {String} tree: sha1 del commit que se consulta
         * 
         * @return {}:
         */
        function describeCommit(commit, namespace){
            var URI = baseApiUrl + "commits/" + commit;
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
        
        
        
        /**************************************************************
         * @description 
         */
        function retrieveBranchFromCommit(commit, namespace){
            var URI = baseApiUrl + "commits/" + commit + "/branch";
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
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de la info del `tree` correspondiente 
         * a un commit, y se almacena en una variable.
         * 
         * @return {} devuelvo la `info` del tree 
         */
        function retrieveFiletreeFromCommit(commit, namespace){
            var URI = baseApiUrl + "commits/" + commit + "/filetree";
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