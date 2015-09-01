/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyHeadService', factory);
    
    factory.$inject = ['$q', '$http'];
    
    function factory($q, $http){
        return function(id){
            this._id = id;
            this.retrieveBranch = function(){
                return retrieveBranchFromHead(id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los commits que integran la `branch`
         * de un cierto `head` y se almacena.
         * 
         * @return {}:
         */
        function retrieveBranchFromHead(head){
            return (
                $http
                    .get('//api.datary.io/' + head + '/branch')
                    .then(
                        function(r){
                            console.log(r);
                            //devuelvo el array de `commits`
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();
