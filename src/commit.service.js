/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyCommitService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
        return function(id, namespace){
            this._id = id;
            this.namespace = namespace;
            
            this.retrieveBranch = function(){
                return retrieveBranchFromCommit(id, namespace);
            };
            this.retrieveTree = function(){
                return retrieveTreeFromCommit(id, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         */
        function retrieveBranchFromCommit(commit, namespace){
            var $URI = dyBaseApiUrl;
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
        function retrieveTreeFromCommit(commit, namespace){
            //construyo progresivamente la URI
            var $URI = dyBaseApiUrl;
            $URI = (namespace)?
                        $URI.concat(namespace + "/")
                        :$URI;
            $URI = (namespace)?
                        $URI.concat(commit + "?tree=true")
                        :$URI.concat(commit + "/tree");
            
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
        
        
        
        // /**************************************************************
        //  * @description 
        //  */
        // function retrieveFullTreeFromCommit(commit){
        //     return (
        //         $http
        //             .get('//api/' + commit + '?action=retrieveTree')
        //             .then(function(r){
        //                     //logueo
        //                     console.log(r);
        //                     //devuelvo la `info` del tree 
        //                     return (r.data);
        //                 }
        //             )
        //     );
        // }
    }
})();