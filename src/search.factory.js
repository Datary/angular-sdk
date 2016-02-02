/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('searchFactory', factory );
    
    factory.$inject = ['$q', '$http', 'baseApiUrl'];
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function factory($q, $http, baseApiUrl){
        return function(category, path, hint, limit, offset){
            /////// Defaults
            var CATEGORY = (category)? category.toString() : "members";
            var PATH = (path)? path.toString() : "username";
            var HINT = (hint)? hint.toString() : ".*";
            var LIMIT = (limit)? limit.toString() : "25";
            var OFFSET = (offset)? offset.toString() : "0";
            
            /////// Validacion
            
            /////// Request build
            var URI =  baseApiUrl + "search";
            URI += "/" + CATEGORY;
            URI += "?" + "path=" + PATH;
            URI += "&" + "hint=" + HINT;
            URI += "&" + "limit=" + LIMIT;
            URI += "&" + "offset=" + OFFSET;
            
            /////// Request
            return (
                $http
                    .get(URI)
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