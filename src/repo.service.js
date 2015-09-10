/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyRepoService', service );
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl', 'DyWorkingDirService', 'DyCommitService'];
    
    function service($q, $http, dyBaseApiUrl, DyWorkingDirService, DyCommitService){
        return function(id){
            this._id = id;
            this.describe = function(){
                return describeRepo(id);
            };
            this.retrieveWorkingDir = function(){
                return retrieveWorkingDirFromRepo(id);
            };
            this.retrieveApexTree = function(){
                return retrieveApexTreeFromRepo(id);
            };
            this.retrieveReadme = function(){
                return retrieveReadmeFromRepo(id);
            };
            this.retrieveLicense = function(){
                return retrieveLicenseFromRepo(id);
            };
            this.retrieveHeads = function(){
                return retrieveHeadsFromRepo(id);
            };
            this.retrieveTags = function(){
                return retrieveTagsFromRepo(id);
            };
            this.retrieveObject = function(object, modifier){
                return retrieveObjectFromRepo(object, modifier, id);
            };
            this.commitIndex = function(details){
                return commitIndexOnRepo(details, id);
            };
            this.updateDetails = function(details){
                return updateDetailsOfRepo(details, id);
            };
            this.remove = function(){
                return removeRepo(id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {}
         */
        function describeRepo(repo){
            return (
                $http
                    .get(dyBaseApiUrl + repo)
                    .then(
                        function(r) {
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * A tal fin se realizan las operaciones:
         * # Consulta la informacion del repositorio, entre la que 
         * se encuentra el campo `workingDir`, cuyo valor es el _id de 
         * dicho `workingDir`.
         * # Se lanza una consulta sobre el `workingDir` cuyo _id
         * se obtuvo en el paso anterior.
         * 
         * @return {Promise}: 
         */
        function retrieveWorkingDirFromRepo(repo){
            return (
                //obtengo info del `repo` (eo, _id del working_dir)
                describeRepo(repo)
                    .then(
                        function(r){
                            //console.log("eoeoeo a", r);
                            //obtengo info del working_dir
                            return ( new DyWorkingDirService(r.workingDir).describe() );
                        }
                    )
                    .then(
                        function(r){
                            //console.log("eoeoeo b", r);
                            return (r);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )//END then
            );//END return promise
        }
        
        
        
        /**************************************************************
         * @name 
         * @description
         */
        function retrieveApexTreeFromRepo(repo){
            return ( 
                describeRepo(repo)
                    .then(
                        function(r){
                            return ( new DyCommitService(r.apex, repo).retrieveTree() );
                        }//END resolve
                    )
                    .then(
                        function(r){
                            //console.log("eoeoeo a", r);
                            return (r); 
                        },//END resolve
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveReadmeFromRepo(repo){
            return (
                $http
                    .get(dyBaseApiUrl + repo + '/readme')
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveLicenseFromRepo(repo){
            return (
                $http
                    .get(dyBaseApiUrl + repo + '/license')
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveHeadsFromRepo(repo){
            return (
                $http
                    .get(dyBaseApiUrl + repo + '/heads')
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveTagsFromRepo(repo){
            return (
                $http
                    .get(dyBaseApiUrl + repo + '/tags')
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveObjectFromRepo(object, modifier, repo){
            var $URI =  dyBaseApiUrl + repo + "/" + object;
            $URI = (modifier)?
                        $URI.concat("?" + modifier + "=true")
                        : $URI;
            
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
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function commitIndexOnRepo(details, repo){
            return (
                $http
                    .post(dyBaseApiUrl + repo + "/index", details)
                    .then(
                        function(r){
                            //console.log(r);
                            return (repo);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function updateDetailsOfRepo(details, repo){
            return (
                $http
                    .put(dyBaseApiUrl + repo, details)
                    .then(
                        function(r){
                            //console.log(r);
                            return (repo);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {} devuelvo el _id del repo 
         */
        function removeRepo(repo){
            return (
                $http
                    .delete(dyBaseApiUrl + repo)
                    .then(
                        function(r){
                            //console.log(r);
                            return (repo);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();