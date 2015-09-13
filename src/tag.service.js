/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyTagService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
        return function(id){
            this._id = id;
            this.retrieveBranch = function(){
                return retrieveBranchFromTag(id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los commits que integran la `branch`
         * de un cierto `tag` y se almacena.
         * 
         * @return {}:
         */
        function retrieveBranchFromTag(tag){
            return (
                $http
                    .get(dyBaseApiUrl + tag + '/branch')
                    .then(
                        function(r){
                            console.log(r);
                            //devuelvo el array de `commits`
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();