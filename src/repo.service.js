/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('RepoService', service );
    
    service.$inject = ['$q', '$http', 'baseApiUrl', 'WorkingDirService', 'CommitService'];
    
    function service($q, $http, baseApiUrl, WorkingDirService, CommitService){
        return function(guid){
            this.guid = guid;
            this.describe = function(){
                return describeRepo(guid);
            };
            this.retrieveWorkingDir = function(){
                return retrieveWorkingDirFromRepo(guid);
            };
            this.retrieveApexFiletree = function(){
                return retrieveApexFiletreeFromRepo(guid);
            };
            this.retrieveReadme = function(){
                return retrieveReadmeFromRepo(guid);
            };
            this.retrieveLicense = function(){
                return retrieveLicenseFromRepo(guid);
            };
            this.retrieveHeads = function(){
                return retrieveHeadsFromRepo(guid);
            };
            this.retrieveTags = function(){
                return retrieveTagsFromRepo(guid);
            };
            this.retrieveRefs = function(){
                return retrieveRefsFromRepo(guid);
            };
            this.retrieveObject = function(object, modifiers){
                return retrieveObjectFromRepo(object, guid, modifiers);
            };
            this.commitIndex = function(details){
                return commitIndexOnRepo(details, guid);
            };
            this.updateReadme = function(readme){
                return updateReadmeOfRepo(readme, guid);
            };
            this.updateDetails = function(details){
                return updateDetailsOfRepo(details, guid);
            };
            this.remove = function(){
                return removeRepo(guid);
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
                    .get(baseApiUrl + repo)
                    .then(
                        function(r) {
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
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
                            return ( new WorkingDirService(r.workingDir).describe() );
                        }
                    )
                    .then(
                        function(r){
                            return (r);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @name 
         * @description
         */
        function retrieveApexFiletreeFromRepo(repo){
            return ( 
                describeRepo(repo)
                    .then(
                        function(r){
                            return ( new CommitService(r.apex.commit, repo).retrieveFiletree() );
                        }
                    )
                    .then(
                        function(r){
                            return (r); 
                        },
                        function(e){
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
        function retrieveReadmeFromRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo + '/readme')
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
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveLicenseFromRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo + '/license')
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
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveHeadsFromRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo + '/heads')
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
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveTagsFromRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo + '/tags')
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
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveRefsFromRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo + '/refs')
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
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {Object} modifiers:
         * 
         * @return 
         */
        function retrieveObjectFromRepo(object, repo, modifiers){
            var URI =  baseApiUrl + object;
            if (repo || modifiers) { URI += "/?" }
            if (repo) { URI += "namespace=" + repo + "&"}
            if (modifiers) { for(var key in modifiers){URI += key + "=" + modifiers[key] +"&"} }
            
            return (
                $http
                    .get(URI)
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
                    .post(baseApiUrl + repo + "/index", details)
                    .then(
                        function(r){
                            return (repo);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} readme: 
         * 
         * @return 
         */
        function updateReadmeOfRepo(readme, repo){
            return (
                $http
                    .put(baseApiUrl + repo + "/readme", readme)
                    .then(
                        function(r){
                            return (r);
                        },
                        function(e){
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
                    .put(baseApiUrl + repo, details)
                    .then(
                        function(r){
                            return (repo);
                        },
                        function(e){
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
                    .delete(baseApiUrl + repo)
                    .then(
                        function(r){
                            return (repo);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();