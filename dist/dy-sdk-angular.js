/******************************************************************************
 * @description 
 * Algunas convenciones: 
 * El valor devuelto por peticiones de informacion (que por lo mismo se apoyan
 * en `http request` de tipo GET) es logicamente un `object` con tal informacion
 * El valor devuelto por peticiones de eliminacion o actualizacion de un nodo 
 * (apoyadas en metodos PUT y DELETE) devuelven el _id del nodo eliminado 
 * o actualizado. 
 * El valor de peticiones que realizan agregacion de elementos a otros nodos
 * (usando POST por tanto) devuelven el valor del nodo creado.
 * El valor de peticones list* es un array de `ObjectIds`, es decir, los 
 * objetos a que representan no han sido `populados`. 
 * 
 *****************************************************************************/
angular
    .module('dySdk', []);
/*******************************************************************************
 * @description
 * https://docs.angularjs.org/api/ng/service/$http
 * Se inyecta en las `apps`, no en los `controllers` particulares
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('$$$tokenInterceptor', interceptor);

interceptor.$inject = ['$q', '$location', '$window'];

function interceptor($q, $location, $window){
    return {
        'request': function(config){
            //https://docs.angularjs.org/api/ng/service/$http#usage
            //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
            //config.withCredentials = false
            config.headers = config.headers || {};
            if (
                $window.localStorage.authToken 
                && $window.localStorage.authToken !== "undefined"
                && $window.localStorage.authToken !== "null"
            ) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.authToken;
            }
            return config;
        },
        'response': function(response){
            switch (response.status) {
                case 300:   //Multiple Choices
                case 301:   //Moved Permanently
                    console.log("Successful API call. Redirecting.");
                    break;
                case 200:   //OK
                case 201:   //Created
                case 204:   //No content
                    console.log("Successful API call.");
                    break;
                default:
                    console.log("Successful API call.");
                    break;
            }
            return response;
        },
        //4xx y 5xx (no 3xx)
        'responseError': function(response){
            switch (response.status) {
                case 401:   //Unauthorized 
                case 403:   //Forbidden
                    console.log("Unsuccessful API call. Authentication/Authorization failed.");
                    break;
                case 404:   //Not found
                    console.log("Unsuccessful API call. Document not found.");
                    break;
                default:
                    console.log("Unsuccessful API call.");
                    break;
            }
            
            /**
             * Se devuelve el contenido de la respuesta(response.data), 
             * que normalmente, por tratarse de una peticion erronea, 
             * se habra implementado en el controller correspondiente 
             * como un JSON con propiedades, entre otras, como 
             * httpStatusCode, rejectionCode... lo que permite un 
             * tratamiento granular de la Promise.
             */
            response.data = response.data || {};    //prevents null if no content is returned
            return $q.reject(response.data);
        }
    };//END return
}
/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y091
 * https://github.com/johnpapa/angular-styleguide#naming
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('$$$api', api);

api.$inject = ['$q', '$http', 'DyConnection', 'DyOracle', 'DyUser',
                'DyRepo', 'DyWorkingDir', 'DyCommit', 'DyTree', 'DyLump',
                'DyHead', 'DyTag'];

function api($q, $http, DyConnection, DyOracle, DyUser, DyRepo, DyWorkingDir, DyCommit, DyTree, DyLump, DyHead, DyTag){
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyOracle',
        [
            '$q',
            '$http',
            oracleFactory
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function oracleFactory($q, $http){
    
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyConnection',
        [
            '$q',
            '$http',
            Connection
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function Connection($q, $http){
    this.signIn = function(credentials){
        return signIn(credentials);
    };
    this.connect = function(){
        return connect();
    };
    this.signOut = function(){
        return signOut();
    };
    this.signUp = function(user){
        return signUp(user);
    };
    this.signRequest = function(request){
        return signRequest(request);
    };
    
    
    
    /**************************************************************
     * @name signIn
     * @type method
     * @description 
     * logueo todo el payload (data, status, headers, config)
     * 
     * @param {Object} credentials:
     * 
     * @return {promise}: 
     */
    function signIn(credentials){
        return (
            $http
                .post("//api.datary.io/connection/signIn?provider=datary", credentials)
                .then(
                    function(r){
                        //console.log("eoeoeo 189", r);
                        return (r.headers('X-Set-Token')); //!!headers(..), no headers[..]
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return
    }
    
    
    
    /**************************************************************
     * @name signOut
     * @type method
     * @description 
     */
    function signOut(){
        return (
            $http
                .get("//api.datary.io/connection/signOut")
                .then(
                    function(r){
                        //console.log("eoeoeo 89", r);
                        return r.status;
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return
    }
    
    
    
    /**************************************************************
     * @name signUp
     * @type method
     * @description 
     * 
     * @param {Object} credentials:
     * 
     * @return 
     */
    function signUp(user){
        return (
            $http
                .post("//api.datary.io/connection/signUp", user)
                .then(
                    function(r){
                        //console.log("eoeoeo 89", r);
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
     * 
     * @param {Object} request:
     * provider: s3, catalyst
     * operation: retrieve, add 
     * 
     * @return 
     */
    function signRequest(request){
        return (
            $http
                .get("//api.datary.io/connection/signRequest"
                        + "&operation=" 
                        + request.operation 
                        + "&basename=" 
                        + request.basename 
                        + "&contentType="
                        + request.contentType)
                .then(
                    function(r){
                        //console.log("eoeoeo 89", r);
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return
    }
}
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('dyRepo',
        [
            '$q',
            '$http',
            repo
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function repo($q, $http){
    
    return function(id){
        this._id = id;
        this.describe = function(){
            return describeRepo(id);
        };
        this.retrieveWorkingDir = function(){
            return retrieveWorkingDirFromRepo(id);
        };
        this.retrieveApexTree = function(){
            return retrieveApexTreeFromRepo(id);
        };
        this.retrieveReadme = function(){
            return retrieveReadmeFromRepo(id);
        };
        this.retrieveLicense = function(){
            return retrieveLicenseFromRepo(id);
        };
        this.retrieveHeads = function(){
            return retrieveHeadsFromRepo(id);
        };
        this.retrieveTags = function(){
            return retrieveTagsFromRepo(id);
        };
        this.commitIndex = function(details){
            return commitIndexOnRepo(details, id);
        };
        this.updateDetails = function(details){
            return updateDetailsOfRepo(details, id);
        };
        this.remove = function(){
            return removeRepo(id);
        };
    };
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return {}
     */
    function describeRepo(repo){
        return (
            $http
                .get('//api.datary.io/' + repo)
                .then(
                    function(r) {
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
     * A tal fin se realizan las operaciones:
     * # Consulta la informacion del repositorio, entre la que 
     * se encuentra el campo `workingDir`, cuyo valor es el _id de 
     * dicho `workingDir`.
     * # Se lanza una consulta sobre el `workingDir` cuyo _id
     * se obtuvo en el paso anterior.
     * 
     * @return {Promise}: 
     */
    function retrieveWorkingDirFromRepo(repo){
        return (
            //obtengo info del `repo` (eo, _id del working_dir)
            describeRepo(repo)
                .then(
                    function(r){
                        //console.log("eoeoeo a", r);
                        //obtengo info del working_dir
                        return (describeWorkingDir(r.workingDir));
                    }
                )
                .then(
                    function(r){
                        //console.log("eoeoeo b", r);
                        return (r);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )//END then
        );//END return promise
    }
    
    
    
    /**************************************************************
     * @name 
     * @description
     */
    function retrieveApexTreeFromRepo(repo){
        return ( 
            describeRepo(repo)
                .then(
                    function(r){
                        return (retrieveTreeFromCommit(r.apex));
                    }//END resolve
                )
                .then(
                    function(r){
                        //console.log("eoeoeo a", r);
                        return (r); 
                    },//END resolve
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );//END return
    }
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los `heads` de un repositorio 
     * a la API, y se almacena en una variable
     */
    function retrieveReadmeFromRepo(repo){
        return (
            $http
                .get('//api.datary.io/' + repo + '/readme')
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
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los `heads` de un repositorio 
     * a la API, y se almacena en una variable
     */
    function retrieveLicenseFromRepo(repo){
        return (
            $http
                .get('//api.datary.io/' + repo + '/license')
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
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los `heads` de un repositorio 
     * a la API, y se almacena en una variable
     */
    function retrieveHeadsFromRepo(repo){
        return (
            $http
                .get('//api.datary.io/' + repo + '/heads')
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
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los `tags` de un repositorio 
     * a la API, y se almacena en una variable
     */
    function retrieveTagsFromRepo(repo){
        return (
            $http
                .get('//api.datary.io/' + repo + '/tags')
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
        );
    }
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function commitIndexOnRepo(details, repo){
        return (
            $http
                .post('//api.datary.io/' + repo + "/index", details)
                .then(
                    function(r){
                        //console.log(r);
                        return (repo);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function updateDetailsOfRepo(details, repo){
        return (
            $http
                .put('//api.datary.io/' + repo, details)
                .then(
                    function(r){
                        //console.log(r);
                        return (repo);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return {} devuelvo el _id del repo 
     */
    function removeRepo(repo){
        return (
            $http
                .delete('//api.datary.io/' + repo)
                .then(
                    function(r){
                        //console.log(r);
                        return (repo);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
}
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('$$$api',
        [
            '$q',
            '$http',
            workingDir
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function workingDir($q, $http){
    
    return function(id){
        this._id = id;
        this.describe = function (){
            return describeWorkingDir(id);
        };
        this.stageChange = function(change){
            return stageChangeOnWorkingDir(change, id);
        };
    };
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param {ObjectId} workingDir: _id del WorkingDir del que se 
     * solicita informacion
     * 
     * @return {} devuelvo un objeto con la info 
     */
    function describeWorkingDir(workingDir){
        return (
            $http
                .get('//api.datary.io/' + workingDir)
                .then(
                    function(r){
                        //console.log("eoeoeo 23", r);
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param {Object} change: info sobre el cambio. Esta compuesto 
     * de las siguientes propiedades:
     *  #action: ["add", "modify", "rename", "remove"]
     *  #filtype: "file" o "folder"
     *  #basename: nombre del fichero (no se permite al igual
     * que en Git, agregar una carpeta sin contenido). Esto es,
     * `pathname` == `dirname` + '/' + `basename`.
     *  #dirname: directorio en que se guarda el archivo
     *  #content: variable segun `action` y `filetype`. En general, 
     * sera un String que contiene el dataset a almacenar. Es un 
     * String ya que es un objeto JSON serializado, !!!!! 
     *  #pattern: ["dataset", "datainfo", "dataschema"]
     * @param {ObjectId} workingDir: _id del WorkingDir al que se 
     * agrega el change. 
     * 
     * @return {} devuelvo el _id de workingDir
     */
    function stageChangeOnWorkingDir(change, workingDir){
        return (
            $http
                .post('//api.datary.io/'+ workingDir + '/changes', change)
                .then(
                    function(r){
                        //console.log("eoeoeo 43", r);
                        return (r.status);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
}
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyCommit',
        [
            '$q',
            '$http',
            commit
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyTree',
        [
            '$q',
            '$http',
            treeFactory
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function treeFactory($q, $http){
    
    return function(id){
        this._id = id;
        this.describe = function(){
            return describeTree(id);
        };
    };
    
    
    
    /**************************************************************
     * @description 
     * La llamada devuelve un objeto con la info de un tree, es
     * decir, con campos _id y entries, que es un array de entradas.
     * 
     * @param {ObjectId} tree: _id del tree que se consulta
     * 
     * @return {}:
     */
    function describeTree(tree){
        return (
            $http
                .get('//api.datary.io/' + tree)
                .then(
                    function(r){
                        //console.log("eoeoeo 90", r);
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyLump',
        [
            '$q',
            '$http',
            lumpFactory
        ]
    );



function lumpFactory($q, $http){
    
    return function(id){
        this._id = id;
        this.retrieveContentPreview = function(){
            return retrieveContentPreviewFromLump(id);
        };
        this.retrieveContentExtract = function(){
            return retrieveContentExtractFromLump(id);
        };
        this.retrieveContentWhole = function(){
            return retrieveContentWholeFromLump(id);
        };
    };
    
    
    
    /**************************************************************
     * @description 
     * 
     * @param {ObjectId} lump: _id del lump que se consulta
     * 
     * @return {}:
     */
    function retrieveContentPreviewFromLump(lump){
        return (
            $http
                .get('//api.datary.io/' + lump + 'preview')
                .then(
                    function(r){
                        //console.log("eoeoeo 33",r);
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
     * @param {ObjectId} lump: _id del lump que se consulta
     * 
     * @return {}:
     */
    function retrieveContentExtractFromLump(lump){
        return (
            $http
                .get('//api.datary.io/' + lump + '/extract')
                .then(
                    function(r){
                        //console.log("eoeoeo 13", r);
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
     * @param {ObjectId} lump: _id del lump que se consulta
     * 
     * @return {}:
     */
    function retrieveContentWholeFromLump(lump){
        return (
            $http
                .get('//api.datary.io/' + lump + '/whole')
                .then(
                    function(r){
                        //console.log("eoeoeo 31", r);
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
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyTag',
        [
            '$q',
            '$http',
            Tag
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function Tag($q, $http){
    this._id = id;
    this.retrieveBranch = function(){
        return retrieveBranchFromTag(id);
    };
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los commits que integran la `branch`
     * de un cierto `tag` y se almacena.
     * 
     * @return {}:
     */
    function retrieveBranchFromTag(tag){
        return (
            $http
                .get('//api.datary.io/' + tag + '/branch')
                .then(
                    function(r){
                        console.log(r);
                        //devuelvo el array de `commits`
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
}
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyHead',
        [
            '$q',
            '$http',
            Head
        ]
    );



//https://github.com/johnpapa/angular-styleguide#style-y024
function Head($q, $http){
    this._id = id;
    this.retrieveBranch = function(){
        return retrieveBranchFromHead(id);
    };
    
    
    
    /**************************************************************
     * @description 
     * Se realiza la peticion de los commits que integran la `branch`
     * de un cierto `head` y se almacena.
     * 
     * @return {}:
     */
    function retrieveBranchFromHead(head){
        return (
            $http
                .get('//api.datary.io/' + head + '/branch')
                .then(
                    function(r){
                        console.log(r);
                        //devuelvo el array de `commits`
                        return (r.data);
                    },
                    function(e){
                        //console.log("eoeoeo 89", e);
                        return $q.reject(e);
                    }
                )
        );
    }
}