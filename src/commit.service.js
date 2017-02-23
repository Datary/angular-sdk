/*******************************************************************************
 * @fileOverview Un comentario sobre el fichero
 * @author pekebuda
 * @copyright Datary 2015-2016
 * 
 ******************************************************************************/
angular.module('dy.sdk')
    .service('dy.sdk.commit', service);

service.$inject = [
    '$q', 
    '$http', 
    'dy.sdk.baseApiUrl'
];

function service($q, $http, baseApiUrl){       
    /**
     * @public 
     * @instance
     * @memberOf Commit
     * @description 
     * La llamada devuelve un objeto con la info de un commit, 
     * es decir, con campos 
     * 
     * @param {String} commit - Sha1 del commit que se consulta.
     * @param {String} [namespace] 
     * 
     * @return {String} Info del directorio.
     */
    function describeCommit(commit, namespace){
        var URI = baseApiUrl + "commits/" + commit;
        if (namespace) URI += "?namespace=" + namespace;
        
        return (
            $http.get(URI)
                .then(function(r){
                        return (r.data);
                    }
                ).catch(function(e){
                        return $q.reject(e);
                    }
                )
        );
    }
    
    
    
    /**
     * @private
     * @instance 
     * @memberOf Commit
     * @description 
     * Recupera un historial de modificaciones (commits) a partir de un 
     * cierto momento
     */
    function retrieveBranchFromCommit(commit, namespace){
        var URI = baseApiUrl + "commits/" + commit + "/branch";
        if (namespace) URI += "?namespace=" + namespace;
        
        return (
            $http.get(URI)
                .then(function(r){
                        return (r.data);
                    }
                ).catch(function(e){
                        return $q.reject(e);
                    }
                )
        );
    }
    
    
    
    /**
     * @private
     * @instance
     * @memberOf Commit
     * @description 
     * Se realiza la peticion de la info del `tree` correspondiente 
     * a un commit, y se almacena en una variable.
     * 
     * @return {Object} `info` del tree 
     */
    function retrieveFiletreeFromCommit(commit, namespace){
        var URI = baseApiUrl + "commits/" + commit + "/filetree";
        if (namespace) URI += "?namespace=" + namespace;
        
        return (
            $http.get(URI)
                .then(function(r){
                        return (r.data);
                    }
                ).catch(function(e){
                        return $q.reject(e);
                    }
                )
        );
    }



    /**
     * @description
     * Genera una instancia de tipo Commit
     * @class Commit
     * @param  {String} guid      [description]
     * @param  {String} namespace [description]
     */
    function Commit(guid, namespace){
        this.guid = guid;
        this.namespace = namespace;
        
        this.describeCommit = function(){
            return describeCommit(guid, namespace);
        };
        this.retrieveBranch = function(){
            return retrieveBranchFromCommit(guid, namespace);
        };
        this.retrieveFiletree = function(){
            return retrieveFiletreeFromCommit(guid, namespace);
        };
    }



    return Commit;
}