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
    
    factory.$inject = ['$q', '$http', 'DyConnectionService', 'DySearchService', 
                    'DyUserService', 'DyRepoService', 'DyWorkingDirService', 
                    'DyCommitService', 'DyTreeService', 'DyLumpService'];
    
    function factory($q, $http, DyConnectionService, DySearchService, DyUserService, 
            DyRepoService, DyWorkingDirService, DyCommitService, DyTreeService, 
            DyLumpService){
        return {
            connection: function(){
                return (new DyConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return DySearchService(category, path, pattern, limit, offset);
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
            commit: function(id, namespace){
                return (new DyCommitService(id, namespace));
            },
            tree: function(id){
                return (new DyTreeService(id));
            },
            lump: function(id){
                return (new DyLumpService(id));
            }
        };
    }
})();