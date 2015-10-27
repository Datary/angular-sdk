/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('commitService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(id, namespace){
            this._id = id;
            this.namespace = namespace;
            
            this.retrieveBranch = function(){
                return retrieveBranchFromCommit(id, namespace);
            };
            this.retrieveFiletree = function(){
                return retrieveFiletreeFromCommit(id, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         */
        function retrieveBranchFromCommit(commit, namespace){
            var $URI = baseApiUrl;
            $URI = (namespace)?
                        $URI.concat(namespace + "/")
                        :$URI;
            $URI = (namespace)?
                        $URI.concat(commit + "?branch=true")
                        :$URI.concat(commit + "/branch");
            
            return (
                $http
                    .get($URI)
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )//END then
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de la info del `tree` correspondiente 
         * a un commit, y se almacena en una variable.
         * 
         * @return {} devuelvo la `info` del tree 
         */
        function retrieveFiletreeFromCommit(commit, namespace){
            //construyo progresivamente la URI
            var $URI = baseApiUrl;
            $URI = (namespace)?
                        $URI.concat(namespace + "/")
                        :$URI;
            $URI = (namespace)?
                        $URI.concat(commit + "?filetree=true")
                        :$URI.concat(commit + "/filetree");
            
            return (
                $http
                    .get($URI)
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )//END then
            );//END return
        }
    }
})();