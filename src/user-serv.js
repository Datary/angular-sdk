/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyUser', user);

user.$inject = ['$q', '$http'];

function user($q, $http){
    
    return function(id){
        this._id = id;
        this.describe = function(){
            return describeUser(id);
        };
        this.retrieveRepos = function(){
            return retrieveReposFromUser(id);
        };
        this.createRepo = function(repo){
            return createRepoForUser(repo, id);
        };
        this.updateProfile = function(profile){
            return updateProfileOfUser(profile, id);
        };
        this.changeUsername = function(username){
            return changeUsernameOfUser(username, id);
        };
        this.changePassword = function(oldPassword, newPassword){
            return changePasswordOfUser(oldPassword, newPassword, id);
        };
        this.remove = function(){
            return removeUser(id);
        };
    };
    
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function describeUser(user){
        return (
            $http
                .get('//api.datary.io/' + user)
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
    
    
    
    /**************************************************************
     * @description 
     * Realiza la peticion de los repos del usuario a la
     * API, y se almacena en una variable.
     * 
     * @param 
     * 
     * @return 
     */
    function retrieveReposFromUser(user){
        return (
            $http
                .get('//api.datary.io/' + user + "/repos")
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
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function createRepoForUser(repo, user){
        return  (
            $http
                .post('//api.datary.io/'+ user + '/repos', repo )
                .then(
                    function(r){
                        //console.log(r);
                        //devuelvo el _id de repo agregado
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
     * @param {Object} profile:
     * 
     * @return 
     */
    function updateProfileOfUser(profile, user){
        return (
            $http
                .put('//api.datary.io/' + user, profile)
                .then(
                    function(r){
                        //console.log(r);
                        return (r);
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
     * @param {String} username:
     * @param {ObjectId} user:
     * 
     * @return 
     */
    function changeUsernameOfUser(username, user){
        return (
            $http
                .put('//api.datary.io/' + user + "/username", username)
                .then(
                    function(r){
                        //console.log("eoeoeo 8", r);
                        return (r);
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
     * @param {String} oldPassword:
     * @param {String} newPassword:
     * @param {ObjectId} user:
     * 
     * @return 
     */
    function changePasswordOfUser(oldPassword, newPassword, user){
        //body de la request 
        var $_BODY = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        
        return (
            $http
                .put('//api.datary.io/' + user + "/password", $_BODY)
                .then(
                    function(r){
                        //console.log("eoeoeo 78", r);
                        return (r);
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
     * @return {} devuelvo el _id del user eliminado 
     */
    function removeUser(user){
        return (
            $http
                .delete('//api.datary.io/' + user)
                .then(
                    function(r){
                        //console.log(r);
                        return (user);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );//END return
    }
}