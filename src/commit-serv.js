/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyCommitService', factory);
    
    factory.$inject = ['$q', '$http'];
    
    function factory($q, $http){
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
            var $URI = "//api.datary.io/";
            $URI = (namespace)?
                        $URI.concat(namespace + "/")
                        :$URI;
            $URI = (namespace)?
                        $URI.concat(commit + "?branch=true")
                        :$URI.concat("/branch");
            
            return (
                $http
                    .get($URI)
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
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
            var $URI = "//api.datary.io/";
            $URI = (namespace)?
                        $URI.concat(namespace + "/")
                        :$URI;
            $URI = (namespace)?
                        $URI.concat(commit + "?tree=true")
                        :$URI.concat("/tree");
            
            return (
                $http
                    .get($URI)
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
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
