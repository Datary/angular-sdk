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
    
    function factory($q, $http, DyConnectionService, DySearchFactory, DyUserService, 
            DyRepoService, DyWorkingDirService, DyCommitService, DyTreeService, 
            DyLumpService, DyHeadService, DyTagService){
        return {
            connection: function(){
                return (new DyConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return DySearchFactory(category, path, pattern, limit, offset);
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