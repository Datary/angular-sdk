/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('Datary', factory);
    
    factory.$inject = ['$q', '$http', 'ConnectionService', 'searchFactory', 
                    'MemberService', 'RepoService', 'WorkingDirService', 
                    'CommitService', 'TreeService', 'DatasetService'];
    
    function factory($q, $http, ConnectionService, searchFactory, 
                    MemberService, RepoService, WorkingDirService,
                    CommitService, TreeService, DatasetService){
        return {
            connection: function(){
                return (new ConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return searchFactory(category, path, pattern, limit, offset);
            },
            member: function(guid){
                return (new MemberService(guid));
            },
            repo:function(guid){
                return (new RepoService(guid));
            },
            workingDir: function(guid){
                return (new WorkingDirService(guid));
            },
            commit: function(guid, namespace){
                return (new CommitService(guid, namespace));
            },
            tree: function(guid, namespace){
                return (new TreeService(guid, namespace));
            },
            dataset: function(guid, namespace){
                return (new DatasetService(guid, namespace));
            }
        };
    }
})();