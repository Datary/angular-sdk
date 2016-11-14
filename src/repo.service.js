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
                $http.get(baseApiUrl + "repos/" + repo)
                    .then(function(r) {
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
                describeRepo(repo)
                    .then(function(r){
                            return ( new WorkingDirService(r.workingDir).describe() );
                        }
                    ).then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
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
                    .then(function(r){
                            return ( new CommitService(r.apex.commit, repo).retrieveFiletree() );
                        }
                    ).then(function(r){
                            return (r); 
                        }
                    ).catch(function(e){
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
            var URI = baseApiUrl + "repos/" + repo + '/readme';
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
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveLicenseFromRepo(repo){
            var URI = baseApiUrl + "repos/" + repo + '/license';
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(
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
            var URI = baseApiUrl + "repos/" + repo + '/heads';
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
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveTagsFromRepo(repo){
            var URI = baseApiUrl + "repos/" + repo + '/tags';
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
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveRefsFromRepo(repo){
            var URI = baseApiUrl + "repos/" + repo + '/refs';
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    );
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
            if (repo || modifiers) URI += "/?";
            if (repo) URI += "namespace=" + repo + "&";
            if (modifiers) { 
                for(var key in modifiers){
                    URI += key + "=" + modifiers[key] +"&"
                } 
            }
            
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
         * 
         * @param 
         * 
         * @return 
         */
        function commitIndexOnRepo(details, repo){
            var URI = baseApiUrl + "repos/" + repo + "/index";
            return (
                $http.post(URI, details)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
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
            var URI = baseApiUrl + "repos/" + repo + "/readme";
            return (
                $http.put(URI, readme)
                    .then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
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
            var URI = baseApiUrl + "repos/" + repo;
            return (
                $http.put(URI, details)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
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
            var URI = baseApiUrl + "repos/" + repo;
            return (
                $http.delete(URI)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();