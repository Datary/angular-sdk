/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y091
 * https://github.com/johnpapa/angular-styleguide#naming
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('Datary', factory);
    
    factory.$inject = ['$q', '$http', 'DyConnectionService', 'DySearchFactory', 
                    'DyUserService', 'DyRepoService', 'DyWorkingDirService', 
                    'DyCommitService', 'DyTreeService', 'DyLumpService', 
                    'DyHeadService', 'DyTagService'];
    
    function factory($q, $http, DyConnection, DyOracle, DyUser, DyRepo, DyWorkingDir, DyCommit, DyTree, DyLump, DyHead, DyTag){
         return {
            connection: function(){
                return (new DyConnectionService());
            },
            search: function(){
                return DySearchFactory;
            },
            user: function(id){
                return (new DyUserService(id));
            },
            repo:function(id){
                return (new DyRepoService(id));
            },
            workingDir: function(id){
                return (new DyWorkingDirService(id));
            },
            commit: function(id){
                return (new DyCommitService(id));
            },
            tree: function(id){
                return (new DyTreeService(id));
            },
            lump: function(id){
                return (new DyLumpService(id));
            },
            head: function(id){
                return (new DyHeadService(id));
            },
            tag: function(id){
                return (new DyTagService(id));
            },
        };
    }
})();
