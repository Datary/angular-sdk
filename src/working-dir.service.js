/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular.module('dy.sdk')
        .service('WorkingDirService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl', 'ConnectionService', 'Upload'];
    
    function service($q, $http, baseApiUrl, ConnectionService, Upload){
        return function(guid){
            this.guid = guid;
            this.describe = function (){
                return describeWorkingDir(guid);
            };
            this.listChanges = function (){
                return listChangesOnWorkinDir(guid);
            };
            this.retrieveFiletree = function (){
                return retrieveFiletreeOfWorkingDir(guid);
            };
            this.stageChange = function(change){
                return stageChangeOnWorkingDir(change, guid);
            };
            this.unstageChange = function(change){
                return unstageChangeFromWorkingDir(change, guid);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function describeWorkingDir(workingDir){
            var URI = baseApiUrl + "workingDirs/" + workingDir;
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function listChangesOnWorkinDir(workingDir){
            var URI = baseApiUrl + "workingDirs/" + workingDir + "/changes";
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function retrieveFiletreeOfWorkingDir(workingDir){
            var URI = baseApiUrl + "workingDirs/" + workingDir + "/filetree";
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * El tipo de cambio mas complejo operativamente es el 'add'. En 
         * estos supuestos, 
         * 
         * 
         * @param {Object} change: info sobre el cambio. Esta compuesto 
         * de las siguientes propiedades:
         * #action: ["add", "modify", "rename", "remove"]
         * #filtype: "file" o "folder"
         * #basename: nombre del fichero (no se permite al igual
         * que en Git, agregar una carpeta sin contenido). Esto es,
         * `pathname` == `dirname` + '/' + `basename`.
         * #dirname: directorio en que se guarda el archivo
         * #content: variable segun `action` y `filetype`.
         * En general, 
         * sera un String que contiene el dataset a almacenar. Es un 
         * String ya que es un objeto JSON serializado, !!!!! 
         * #pattern: ["dataset", "datainfo", "dataschema"]
         * @param {ObjectId} workingDir: _id del WorkingDir al que se 
         * agrega el change. 
         * 
         * @return {} devuelvo el _id de workingDir
         */
        function stageChangeOnWorkingDir(change, workingDir){
            var URI = baseApiUrl + "workingDirs/" + workingDir + '/changes';
            
            //############ ADD
            var DATA_AS_OBJ = {};
            var DATA_AS_BUFFER;
            if (change.action === "add"){
                if (change.filemode === 40000) {
                    return (
                        $http.post(URI, change)
                            .then(function(r){
                                    return (r);
                                }
                            ).catch(function(e){
                                    return $q.reject(e);
                                }
                            )
                    );
                } else if (typeof change.content === "object" && !(change.content instanceof File)) {
                    //no se require transformacion alguna
                    //sera el backend el que parsee lo stringified por angular http trasform
                    //http://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
                    return (
                        $http.post(URI, change)
                            .then(function(result){
                                    return (result);
                                }
                            ).catch(function(reason){
                                    return $reject(reason);
                                }
                            )
                    );
                } else if (typeof change.content === "string") {
                    try {
                        DATA_AS_OBJ = JSON.parse(change.content);
                    } catch (e) {
                        return $q.reject(new Error("Imported file does not conforms to JSON format"));
                    }
                    change.content = DATA_AS_OBJ;
                    return (
                        $http.post(URI, change)
                            .then(function(result){
                                    return (result);
                                }
                            ).catch(function(reason){
                                    return $reject(reason);
                                }
                            )
                    );
                } else if (typeof change.content === "object" && change.content instanceof File) {
                    /////// Parse and Upload to Datary
                    if (change.content.size < 10*1024*1024 ) {
                        var READER = new FileReader();
                        var DEFERRED = $q.defer();
                        //configuracion del Reader
                        READER.onload = function(){
                            DATA_AS_BUFFER = READER.result;
                            try {
                                DATA_AS_OBJ = JSON.parse(DATA_AS_BUFFER);
                            } catch (e) {
                                return DEFERRED.reject(new Error("Imported file does not conforms to JSON format"));
                            }
                            change.content = DATA_AS_OBJ;
                            ($http.post(URI, change)
                                .then(function(result){
                                        DEFERRED.resolve(result.status);
                                    }
                                ).catch(function(reason){
                                        DEFERRED.reject(reason);
                                    }
                                )
                            );
                        };
                        //read in the dataset file as a text string.
                        READER.readAsText(change.content, "UTF-8");
                        //
                        return DEFERRED.promise;
                    /////// Direct Upload to Datary
                    } else {
                        return (
                            Upload.upload(
                                {
                                    method: 'POST',
                                    url: baseApiUrl + workingDir + '/changes',
                                    //headers: "",
                                    fields: {
                                        action: change.action,
                                        filetype: change.filetype,
                                        dirname: change.dirname,
                                        basename: change.basename,
                                        content: null,              //el content esta en file
                                        pattern: change.pattern
                                    },
                                    //!!!!IMPORTANTE
                                    file: change.content,           //es de tipo File
                                }
                            )
                        );
                    
                    }//END (change.content.size)
                }//END (typeof change.content)
            
            
            
            //############ MODIFY, RENAME, DELETE
            } else {
                return (
                    $http.post(URI, change)
                        .then(function(r){
                                return (r);
                            }
                        ).catch(function(e){
                                return $q.reject(e);
                            }
                        )
                );
            }//END (change.action)
        }//END stageChangeOnWorkingDir
        
        
        
        /***************************************************************
         * @description
         * Funcion que realiza la subida directa del `dataset` del 
         * `user` a AWS S3 sin pasar por el backend, para lo que 
         * requiere haber obtenido previamente una firma valida de 
         * dicha peticion, pues de otro modo AWS rechazaria la solicitud.
         * 
         * Upload.upload() carga a traves de `fields` datos complementarios 
         * que en un 'form' tradicional se corresponde con los inputs. Son 
         * datos exigidospor AWS
         * 
         * @vid http://aws.amazon.com/articles/1434/
         * @vid https://github.com/danialfarid/angular-file-upload [for more options (headers, withCredentials...)]
         * 
         * @param {File} file:
         */
        function uploadFileToS3(file){
            // Construccion de la `solicitud de firma`
            var REQUEST = {
                operation: "importFile",
                basename: file.name,
                contentType: (file.type === null || file.type === '')? 'application/octet-stream' : file.type,
            };
            
            // Firma y Subidas
            var CONNECTION = new ConnectionService();
            return (
                CONNECTION.signRequest(REQUEST)
                    .then(function(result){
                            return (
                                //@vid 
                                Upload.upload(
                                    {
                                        method: 'POST',
                                        url: 'https://'+ result.bucket +'.s3.amazonaws.com/',
                                        //headers: "",
                                        fields: {
                                            key: result.key,                            //the key to store the file on S3
                                            AWSAccessKeyId: result.AwsAccessKeyId,
                                            acl: result.acl,
                                            policy: result.b64Policy,                   //base64-encoded json policy
                                            signature: result.signature,                //base64-encoded signature based on policy string
                                            'Content-Type': result.contentType,
                                        },
                                        file: file,
                                    }
                                )
                            );
                        }
                    ).catch(function(reason){
                            return reason;
                        }
                    )
            );
        }//END uploadFileToS3
        
        
        
        /***********************************************************************
         * @description
         * 
         * @param {ObjectId} change:
         * @param {ObjectId} workingDir:
         */
        function unstageChangeFromWorkingDir(change, workingDir){
            return (
                listChangesOnWorkinDir
                    .then(function(result){
                        }
                    ).catch(function(reason){
                        }
                    ).then(
                        function(result){
                            var CHANGES = result;
                            var URI = baseApiUrl + "workingDirs/" + workingDir + "/changes"
                            return (
                                $http.put(URI, CHANGES)
                                    .then(function(result){
                                            return (result);
                                        }
                                    ).catch(function(reason){
                                            return (reason);
                                        }
                                    )
                            );
                        }
                    )
            );
        }
    
    }
})();