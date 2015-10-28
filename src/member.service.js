/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('MemberService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
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
            this.removeSession = function(session){
                return removeSessionFromMember(session, id);
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
                    .get(baseApiUrl + member)
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
                    .get(baseApiUrl + member + "/repos")
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
                    .get(baseApiUrl + member + "/disclosedRepos")
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
                    .get(baseApiUrl + member + "/privateRepos")
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
                    .get(baseApiUrl + member + "/activity")
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
                    .get(baseApiUrl + member + "/publicActivity")
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
                    .get(baseApiUrl + member + "/sessions")
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
                    .post(baseApiUrl + member + '/repos', repo )
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
                    .put(baseApiUrl + member, profile)
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
                    .put(baseApiUrl + member + "/username", member)
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
                    .put(baseApiUrl + member + "/password", $BODY)
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
                    .delete(baseApiUrl + member)
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
        
        
        
        /***********************************************************************
         * @description 
         * Realiza una peticion con un Array consistente en todos los JWT (en 
         * sentido estricto, sus codificaciones segun la norma de la ITF) que 
         * desean conservarse. Para ello genera una lista resultado de sustraer
         * de los token del usuario aquel que desea eliminarse y que le es 
         * pasado como argumento (identificado por su jti)
         * 
         * @param {String} session: jti representativo del JWT que desea eliminarse
         * 
         * 
         * @return {}:
         */
        function removeSessionFromMember(session, member){
            return (
                retrieveSessionsFromMember
                    .then(
                        ///////////
                        function(result){
                            //indice de la session que desea eliminarse
                            var INDEX = result
                                            .map(function(e, i, a){return e.jti;})
                                            .indexOf(session);
                            
                            //elimino la session correspondiente al jti
                            result.splice(INDEX, 1);
                            
                            //genero el array de sessiones tal cual debe almacenarse
                            var ARR = result.map(function(e, i, a){return e.encoding;});
                            return ARR;
                        },
                        //////////
                        function(reason){
                            return ($q.reject(e));
                        }
                    ).then(
                        //////////
                        function(result){
                            var SESSIONS = result;
                            return ($http
                                        .put(baseApiUrl + member + "/sessions", SESSIONS)
                                        .then(
                                            function(result){
                                                return (result);
                                            },
                                            function(reason){
                                                return (reason);
                                            }
                                        )
                            );
                        }
                    )
            );
        }
    }
})();