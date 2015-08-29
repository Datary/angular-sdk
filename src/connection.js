/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyConnection',
        [
            '$q',
            '$http',
            Connection
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function Connection($q, $http){
    this.signIn = function(credentials){
        return signIn(credentials);
    };
    this.connect = function(){
        return connect();
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
                        //console.log("eoeoeo 189", r);
                        return (r.headers('X-Set-Token')); //!!headers(..), no headers[..]
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
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