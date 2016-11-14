/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .service('ConnectionService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(){
            this.signUp = function(user){
                return signUp(user);
            };
            this.activate = function(credentials){
                return activate(credentials);
            };
            this.signIn = function(credentials){
                return signIn(credentials);
            };
            this.recover = function(email){
                return recover(email);
            };
            this.reset = function(credentials){
                return reset(credentials);
            };
            this.signOut = function(){
                return signOut();
            };
            this.signRequest = function(request){
                return signRequest(request);
            };
        };
        
        
        
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
                $http.post(baseApiUrl + "connection/signUp", user)
                    .then( function(r){return (r.data) })
                    .catch( function(e){return $q.reject(e)} )
            );
        }
        
        
        /**************************************************************
         * @name activate
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function activate(credentials){
            return (
                $http.post(baseApiUrl + "connection/activate", credentials)
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
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
                $http.post(baseApiUrl + "connection/signIn", credentials)
                    .then(function(r){
                            var TOKEN = null;
                            //busco token en headers
                            if (r.headers('X-Set-Token')) {
                                TOKEN = r.headers('X-Set-Token');   //!!headers(..), no headers[..]
                                return TOKEN;
                            //busco token en el body
                            } else if (r.data && r.data.authToken) {
                                TOKEN = r.data.authToken;
                                return TOKEN;
                            } else {
                                console.log("Could not parse token from HTTP reponse.");
                                return $q.reject(e);
                            }
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @name recover
         * @type method
         * @description 
         * 
         * @param {String} email:
         * 
         * @return 
         */
        function recover(email){
            return (
                $http.post(baseApiUrl + "connection/recover", {email: email})
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @name reset
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function reset(credentials){
            return (
                $http.post(baseApiUrl + "connection/reset", credentials)
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @name signOut
         * @type method
         * @description 
         */
        function signOut(){
            return (
                $http.get(baseApiUrl + "connection/signOut")
                    .then( function(r){return r.status} )
                    .catch( function(e){return $q.reject(e)} )
            );
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
            var URI = baseApiUrl + "connection/signRequest";
            URI += "&operation=" + request.operation;
            URI += "&basename=" + request.basename;
            URI += "&contentType=" + request.contentType;
            return (
                $http.get(URI)
                    .then(function(r){return (r.data)})
                    .catch(function(e){return $q.reject(e)})
            );
        }
    }
})();