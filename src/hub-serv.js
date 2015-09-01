/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyHubService', factory );
    
    factory.$inject = ['$q', '$http'];
    
    function factory($q, $http){
        return function(){
            this.listUsers = function(){
                return listUsers();
            };
            this.listRepos = function(){
                return listRepos();
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function listUsers(){
            return (
                $http
                    .get("//api.datary.io/oracle/listUsers")
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
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function listRepos(){
            return (
                $http
                    .get("//api.datary.io/oracle/listRepos")
                    .then(
                        function(r){
                            //console.log(r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();
