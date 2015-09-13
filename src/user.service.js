/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyUserService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
        return function(id){
            this._id = id;
            this.describe = function(){
                return describeUser(id);
            };
            this.retrieveRepos = function(){
                return retrieveReposFromUser(id);
            };
            this.retrieveUnrestritedAccessRepos = function(){
                return retrieveUnrestritedAccessReposFromUser(id);
            };
            this.retrieveRestritedAccessRepos = function(){
                return retrieveRestritedAccessReposFromUser(id);
            };
            this.retrieveActivity = function(){
                return retrieveActivityFromUser(id);
            };
            this.retrievePublicActivity = function(){
                return retrievePublicActivityFromUser(id);
            };
            this.retrieveSessions = function(){
                return retrieveSessionsFromUser(id);
            };
            this.createRepo = function(repo){
                return createRepoForUser(repo, id);
            };
            this.updateProfile = function(profile){
                return updateProfileOfUser(profile, id);
            };
            this.changeUsername = function(username){
                return changeUsernameOfUser(username, id);
            };
            this.changePassword = function(oldPassword, newPassword){
                return changePasswordOfUser(oldPassword, newPassword, id);
            };
            this.remove = function(){
                return removeUser(id);
            };
        };
        
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function describeUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user)
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveReposFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/repos")
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos publicos y comerciales del
         * usuario a la API.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveUnrestritedAccessReposFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/unrestrictedAccessRepos")
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos privados del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveRestrictedAccessReposFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/restrictedAccessRepos")
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveActivityFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/activity")
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrievePublicActivityFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/publicActivity")
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
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveSessionsFromUser(user){
            return (
                $http
                    .get(dyBaseApiUrl + user + "/sessions")
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
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function createRepoForUser(repo, user){
            return  (
                $http
                    .post(dyBaseApiUrl + user + '/repos', repo )
                    .then(
                        function(r){
                            //devuelvo el _id de repo agregado
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {Object} profile:
         * 
         * @return 
         */
        function updateProfileOfUser(profile, user){
            return (
                $http
                    .put(dyBaseApiUrl + user, profile)
                    .then(
                        function(r){
                            return (r);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} username:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changeUsernameOfUser(username, user){
            return (
                $http
                    .put(dyBaseApiUrl + user + "/username", username)
                    .then(
                        function(r){
                            return (r);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} oldPassword:
         * @param {String} newPassword:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changePasswordOfUser(oldPassword, newPassword, user){
            //body de la request 
            var $_BODY = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            
            return (
                $http
                    .put(dyBaseApiUrl + user + "/password", $_BODY)
                    .then(
                        function(r){
                            return (r);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {} devuelvo el _id del user eliminado 
         */
        function removeUser(user){
            return (
                $http
                    .delete(dyBaseApiUrl + user)
                    .then(
                        function(r){
                            return (user);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();