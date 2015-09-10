/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DySearchFactory', factory );
    
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
            //----- Validacion y defaults
            var $CATEGORY = (category)?
                category.toString()
                : "users";
            var $PATH = (path)?
                path.toString()
                : "username";
            var $HINT = (hint)?
                pattern.toString()
                : ".*";
            var $LIMIT = (limit)?
                limit.toString()
                : "25";
            var $OFFSET = (offset)?
                offset.toString()
                : "0";
            
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
                            //console.log("eoeoeo 89", r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );//END return
        };
    }
})();