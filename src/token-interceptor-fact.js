/*******************************************************************************
 * @description
 * https://docs.angularjs.org/api/ng/service/$http
 * Se inyecta en las `apps`, no en los `controllers` particulares
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('$$$tokenInterceptor', interceptor);

interceptor.$inject = ['$q', '$location', '$window'];

function interceptor($q, $location, $window){
    return {
        'request': function(config){
            //https://docs.angularjs.org/api/ng/service/$http#usage
            //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
            //config.withCredentials = false
            config.headers = config.headers || {};
            if (
                $window.localStorage.authToken 
                && $window.localStorage.authToken !== "undefined"
                && $window.localStorage.authToken !== "null"
            ) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.authToken;
            }
            return config;
        },
        'response': function(response){
            switch (response.status) {
                case 300:   //Multiple Choices
                case 301:   //Moved Permanently
                    console.log("Successful API call. Redirecting.");
                    break;
                case 200:   //OK
                case 201:   //Created
                case 204:   //No content
                    console.log("Successful API call.");
                    break;
                default:
                    console.log("Successful API call.");
                    break;
            }
            return response;
        },
        //4xx y 5xx (no 3xx)
        'responseError': function(response){
            switch (response.status) {
                case 401:   //Unauthorized 
                case 403:   //Forbidden
                    console.log("Unsuccessful API call. Authentication/Authorization failed.");
                    break;
                case 404:   //Not found
                    console.log("Unsuccessful API call. Document not found.");
                    break;
                default:
                    console.log("Unsuccessful API call.");
                    break;
            }
            
            /**
             * Se devuelve el contenido de la respuesta(response.data), 
             * que normalmente, por tratarse de una peticion erronea, 
             * se habra implementado en el controller correspondiente 
             * como un JSON con propiedades, entre otras, como 
             * httpStatusCode, rejectionCode... lo que permite un 
             * tratamiento granular de la Promise.
             */
            response.data = response.data || {};    //prevents null if no content is returned
            return $q.reject(response.data);
        }
    };//END return
}