/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DySearchFactory', factory );
    
    factory.$inject = ['$q', '$http'];
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function factory($q, $http){
        return function(category, path, pattern, limit, offset){
            //----- Validacion y defaults
            var $CATEGORY = (category)?
                category.toString
                : "users";
            var $PATH = (path)?
                path.toString
                : "username";
            var $PATTERN = (pattern)?
                pattern.toString
                : "*";
            var $LIMIT = (limit)?
                limit.toString
                : "10";
            var $OFFSET = (offset)?
                offset.toString
                : "0";
            
            //----- Request build
            $URI =  "/" + $CATEGORY +
                    "?" + "path=" + $PATH +
                    "&" + "pattern=" + $PATTERN +
                    "&" + "limit=" + $LIMIT +
                    "&" + "offset=" + $OFFSET;
            
            //----- Request
            return (
                $http
                    .get("//api.datary.io/search" + $URI)
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