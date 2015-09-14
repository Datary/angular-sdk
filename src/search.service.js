/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DySearchService', factory );
    
    factory.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function factory($q, $http, dyBaseApiUrl){
        return function(category, path, hint, limit, offset){
            //----- Defaults
            var $CATEGORY = (category)?
                category.toString()
                : "members";
            var $PATH = (path)?
                path.toString()
                : "username";
            var $HINT = (hint)?
                hint.toString()
                : ".*";
            var $LIMIT = (limit)?
                limit.toString()
                : "25";
            var $OFFSET = (offset)?
                offset.toString()
                : "0";
            
            //----- Validacion
            
            //----- Request build
            $URI =  dyBaseApiUrl +
                    "search" +
                    "/" + $CATEGORY +
                    "?" + "path=" + $PATH +
                    "&" + "hint=" + $HINT +
                    "&" + "limit=" + $LIMIT +
                    "&" + "offset=" + $OFFSET;
            
            //----- Request
            return (
                $http
                    .get($URI)
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        };
    }
})();