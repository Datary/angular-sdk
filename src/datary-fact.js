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
    
    factory.$inject = ['$q', '$http', 'DyConnectionService', 'DyOracleService', 
                    'DyUserService', 'DyRepoService', 'DyWorkingDirService', 
                    'DyCommitService', 'DyTreeService', 'DyLumpService', 
                    'DyHeadService', 'DyTagService'];
    
    function factory($q, $http, DyConnection, DyOracle, DyUser, DyRepo, DyWorkingDir, DyCommit, DyTree, DyLump, DyHead, DyTag){
         return {
            connection: function(){
                return (new DyConnection());
            },
            oracle: function(){
                return (new DyOracle());
            },
            user: function(id){
                return (new DyUser(id));
            },
            repo:function(id){
                return (new DyRepo(id));
            },
            workingDir: function(id){
                return (new DyWorkingDir(id));
            },
            commit: function(id){
                return (new DyCommit(id));
            },
            tree: function(id){
                return (new DyTree(id));
            },
            lump: function(id){
                return (new DyLump(id));
            },
            head: function(id){
                return (new DyHead(id));
            },
            tag: function(id){
                return (new DyTag(id));
            },
        };
    }
})();
