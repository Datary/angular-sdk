/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('DyMemberService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
        return function(id){
            this._id = id;
            this.describe = function(){
                return describeMember(id);
            };
            this.retrieveRepos = function(){
                return retrieveReposFromMember(id);
            };
            this.retrieveDisclosedRepos = function(){
                return retrieveDisclosedReposFromMember(id);
            };
            this.retrievePrivateRepos = function(){
                return retrievePrivateReposFromMember(id);
            };
            this.retrieveActivity = function(){
                return retrieveActivityFromMember(id);
            };
            this.retrievePublicActivity = function(){
                return retrievePublicActivityFromMember(id);
            };
            this.retrieveSessions = function(){
                return retrieveSessionsFromMember(id);
            };
            this.createRepo = function(repo){
                return createRepoForMember(repo, id);
            };
            this.updateProfile = function(profile){
                return updateProfileOfMember(profile, id);
            };
            this.changeUsername = function(username){
                return changeUsernameOfMember(username, id);
            };
            this.changePassword = function(oldPassword, newPassword){
                return changePasswordOfMember(oldPassword, newPassword, id);
            };
            this.remove = function(){
                return removeMember(id);
            };
        };
        
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function describeMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member)
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
        function retrieveReposFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/repos")
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
        function retrieveDisclosedReposFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/disclosedRepos")
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
        function retrievePrivateReposFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/privateRepos")
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
        function retrieveActivityFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/activity")
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
        function retrievePublicActivityFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/publicActivity")
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
        function retrieveSessionsFromMember(member){
            return (
                $http
                    .get(dyBaseApiUrl + member + "/sessions")
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
        function createRepoForMember(repo, member){
            return  (
                $http
                    .post(dyBaseApiUrl + member + '/repos', repo )
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
        function updateProfileOfMember(profile, member){
            return (
                $http
                    .put(dyBaseApiUrl + member, profile)
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
        function changeUsernameOfMember(username, member){
            return (
                $http
                    .put(dyBaseApiUrl + member + "/username", member)
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
        function changePasswordOfMember(oldPassword, newPassword, member){
            //body de la request 
            var $BODY = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            
            return (
                $http
                    .put(dyBaseApiUrl + member + "/password", $BODY)
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
        function removeMember(member){
            return (
                $http
                    .delete(dyBaseApiUrl + member)
                    .then(
                        function(r){
                            return (member);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();