/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyTagService', factory);
    
    factory.$inject = ['$q', '$http'];
    
    //https://github.com/johnpapa/angular-styleguide#style-y024
    function factory($q, $http){
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
                    .get('//api.datary.io/' + tag + '/branch')
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
