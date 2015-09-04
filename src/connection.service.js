/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyConnectionService', service);
    
    service.$inject = ['$q', '$http'];
    
    function service($q, $http){
        return function(){
            this.signIn = function(credentials){
                return signIn(credentials);
            };
            this.signOut = function(){
                return signOut();
            };
            this.signUp = function(user){
                return signUp(user);
            };
            this.signRequest = function(request){
                return signRequest(request);
            };
        };
        
        
        
        /**************************************************************
         * @name signIn
         * @type method
         * @description 
         * logueo todo el payload (data, status, headers, config)
         * 
         * @param {Object} credentials:
         * 
         * @return {promise}: 
         */
        function signIn(credentials){
            return (
                $http
                    .post("//api.datary.io/connection/signIn?provider=datary", credentials)
                    .then(
                        function(r){
                            var $TOKEN = null;
                            //busco token en headers
                            if (r.headers('X-Set-Token')) {
                                $TOKEN = r.headers('X-Set-Token');   //!!headers(..), no headers[..]
                                return $TOKEN;
                            
                            //busco token en el body
                            } else if (r.data && r.data.authToken) {
                                $TOKEN = r.data.authToken;
                                return $TOKEN;
                            
                            } else {
                                console.log("Could not parse token from HTTP reponse.");
                                return $q.reject(e);
                            }
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )//END then
            );//END return
        }
        
        
        
        /**************************************************************
         * @name signOut
         * @type method
         * @description 
         */
        function signOut(){
            return (
                $http
                    .get("//api.datary.io/connection/signOut")
                    .then(
                        function(r){
                            //console.log("eoeoeo 89", r);
                            return r.status;
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )//END then
            );//END return
        }
        
        
        
        /**************************************************************
         * @name signUp
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function signUp(user){
            return (
                $http
                    .post("//api.datary.io/connection/signUp", user)
                    .then(
                        function(r){
                            //console.log("eoeoeo 89", r);
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
         * 
         * @param {Object} request:
         * provider: s3, catalyst
         * operation: retrieve, add 
         * 
         * @return 
         */
        function signRequest(request){
            return (
                $http
                    .get("//api.datary.io/connection/signRequest"
                            + "&operation=" 
                            + request.operation 
                            + "&basename=" 
                            + request.basename 
                            + "&contentType="
                            + request.contentType)
                    .then(
                        function(r){
                            //console.log("eoeoeo 89", r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )//END then
            );//END return
        }
    }
})();
