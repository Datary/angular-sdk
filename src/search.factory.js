/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .factory('dy.sdk.search', factory );
    
    factory.$inject = [
        '$q', 
        '$http', 
        'dy.sdk.baseApiUrl'
    ];
    
    function factory($q, $http, baseApiUrl){
        return function(category, path, hint, limit, offset){
            /////// DEFAULTS
            var CATEGORY = (category)? category.toString() : "members";
            var PATH = (path)? path.toString() : "username";
            var HINT = (hint)? hint.toString() : ".*";
            var LIMIT = (limit)? limit.toString() : "25";
            var OFFSET = (offset)? offset.toString() : "0";
            
            /////// VALIDACION
            
            /////// Request build
            var URI =  baseApiUrl + "search";
            URI += "/" + CATEGORY;
            URI += "?path=" + PATH;
            URI += "&hint=" + HINT;
            URI += "&limit=" + LIMIT;
            URI += "&offset=" + OFFSET;
            
            /////// REQUEST
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
        };
    }
})();