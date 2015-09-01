/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyCommitService', commit);

commit.$inject = ['$q', '$http'];

function commit($q, $http){
    return function(id){
        this._id = id;
        this.retrieveBranch = function(){
            return retrieveBranchFromCommit(id);
        };
        this.retrieveTree = function(){
            return retrieveTreeFromCommit(id);
        };
    };
    
    
    
    /**************************************************************
     * @description 
     */
    function retrieveBranchFromCommit(commit){
        return (
            $http
                .get("//api.datary.io/" + commit + "/branch")
                .then(
                    function(r){
                        //console.log(r);
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return
    }
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de la info del `tree` correspondiente 
     * a un commit, y se almacena en una variable.
     * 
     * @return {} devuelvo la `info` del tree 
     */
    function retrieveTreeFromCommit(commit){
        return (
            $http
                .get("//api.datary.io/" + commit + "/tree")
                .then(
                    function(r){
                        //console.log(r);
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return
    }
    
    
    
    // /**************************************************************
    //  * @description 
    //  */
    // function retrieveFullTreeFromCommit(commit){
    //     return (
    //         $http
    //             .get('//api/' + commit + '?action=retrieveTree')
    //             .then(function(r){
    //                     //logueo
    //                     console.log(r);
    //                     //devuelvo la `info` del tree 
    //                     return (r.data);
    //                 }
    //             )
    //     );
    // }
}