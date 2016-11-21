/*******************************************************************************
 * @module member
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .service('dy.sdk.member', service);
    
    service.$inject = [
        '$q', 
        '$http', 
        'dy.sdk.baseApiUrl'
    ];
    
    function service($q, $http, baseApiUrl){
        return function(guid){
            this.guid = guid;
            this.describe = function(){
                return describeMember(guid);
            };
            this.retrieveRepos = function(){
                return retrieveReposFromMember(guid);
            };
            this.retrieveActivity = function(){
                return retrieveActivityFromMember(guid);
            };
            this.retrieveSessions = function(){
                return retrieveSessionsFromMember(guid);
            };
            this.createRepo = function(repo){
                return createRepoForMember(repo, guid);
            };
            this.updateProfile = function(profile){
                return updateProfileOfMember(profile, guid);
            };
            this.changeUsername = function(username){
                return changeUsernameOfMember(username, guid);
            };
            this.changePassword = function(oldPassword, newPassword){
                return changePasswordOfMember(oldPassword, newPassword, guid);
            };
            this.remove = function(){
                return removeMember(guid);
            };
            this.removeSession = function(session){
                return removeSessionFromMember(session, guid);
            };
        };
        
        
        
        
        /**************************************************************
         * Foobar
         * @module member
         * 
         * 
         */
        function describeMember(member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me"
            else URI += "members/" + member;

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
         * Realiza la peticion de los repos del usuario a la
         * API, y se almacena en una variable.
         * @module member
         * 
         * 
         */
        function retrieveReposFromMember(member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/repos"
            else URI += "members/" + member + "/repos";

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
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * @module member
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveActivityFromMember(member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/activity"
            else URI += "members/" + member + "/activity";

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
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveSessionsFromMember(member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/sessions"
            else URI += "members/" + member + "/sessions";

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
        function createRepoForMember(repo, member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/repos"
            else URI += "members/" + member + "/repos";

            return  (
                $http.post(URI, repo)
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
         * @param {Object} profile:
         * 
         * @return 
         */
        function updateProfileOfMember(profile, member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me"
            else URI += "members/" + member;

            return (
                $http.put(URI, profile)
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
         * @param {String} username:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changeUsernameOfMember(username, member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/username"
            else URI += "members/" + member + "/username";

            return (
                $http.put(URI, member)
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
         * @param {String} oldPassword:
         * @param {String} newPassword:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changePasswordOfMember(oldPassword, newPassword, member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me/password"
            else URI += "members/" + member + "/password";
            var BODY = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            
            return (
                $http.put(URI, BODY)
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
         * @return {} devuelvo el _id del user eliminado 
         */
        function removeMember(member){
            member = member || "me";
            var URI = baseApiUrl;
            if (member === "me") URI += "me"
            else URI += "members/" + member;

            return (
                $http.delete(URI)
                    .then(function(r){
                            return (member);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
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
                retrieveSessionsFromMember(me)
                    .then(
                        function(result){
                            //indice de la session que desea eliminarse
                            var INDEX = result.map( function(e){return e.jti} ).indexOf(session);
                            //elimino la session correspondiente al jti
                            result.splice(INDEX, 1);
                            //genero el array de sessiones tal cual debe almacenarse
                            var ARR = result.map(function(e, i, a){return e.encoding;});
                            return ARR;
                        },
                        function(reason){
                            return ($q.reject(e));
                        }
                    ).then(
                        function(result){
                            var SESSIONS = result;
                            member = member || "me";
                            var URI = baseApiUrl;
                            if (member === "me") URI += "me/sessions"
                            else URI += "members/" + member + "/sessions";

                            return ($http.put(URI, SESSIONS)
                                        .then(function(result){
                                                return (result);
                                            }
                                        ).catch(function(reason){
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