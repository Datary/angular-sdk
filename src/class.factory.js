/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular.module('dy.sdk')
    .factory('dy.sdk.class', factory);

factory.$inject = [
    '$q', 
    '$http', 
    'dy.sdk.connection', 
    'dy.sdk.search', 
    'dy.sdk.member', 
    'dy.sdk.repo', 
    'dy.sdk.workdir', 
    'dy.sdk.commit', 
    'dy.sdk.tree', 
    'dy.sdk.dataset'
];

function factory($q, $http, Connection, Search, Member, Repo, Workdir, Commit, Tree, Dataset){
    return {
        connection: function(){
            return (new Connection());
        },
        search: function(category, path, pattern, limit, offset){
            return Search(category, path, pattern, limit, offset);
        },
        member: function(guid){
            return (new Member(guid));
        },
        repo:function(guid){
            return (new Repo(guid));
        },
        workdir: function(guid){
            return (new Workdir(guid));
        },
        commit: function(guid, namespace){
            return (new Commit(guid, namespace));
        },
        tree: function(guid, namespace){
            return (new Tree(guid, namespace));
        },
        dataset: function(guid, namespace){
            return (new Dataset(guid, namespace));
        }
    };
}