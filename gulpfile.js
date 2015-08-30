/******************************************************************************
 * This file is used to build dySDK from `src/*`
 *
 * Installation:
 * 1. Install Gulp (`npm install -g gulp`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where gulpfile.js is)
 *
 * Result:
 * building dySDK will create files:
 *  - dist/dySDK.js
 *  - dist/dySDK.min.js
 *
 * See http://
 ******************************************************************************/
var gulp            = require('gulp')
,   jshint          = require('gulp-jshint')
,   concat          = require('gulp-concat')
,   uglify          = require('gulp-uglify')
,   aws             = require('aws')
;



//############ CONFIG
var $SRC_FILES = ["src/*.js"];
//ficheros ordenados 
var $ORD_SRC_FILES = [
    "src/main.js",
    "src/token-interceptor.js",
    "src/api.js",
    "src/oracle-serv.js",
    "src/connection-serv.js",
    "src/user-serv.js",
    "src/repo-serv.js",
    "src/working-dir-serv.js",
    "src/commit-serv.js",
    "src/tree-serv.js",
    "src/lump-serv.js",
    "src/tag-serv.js",
    "src/head-serv.js",
];
var $DIST_FOLDER = "./dist/";



//############ TASKS
/******************************************************************************
* @name lint
* @type task
* @description
*/
gulp
    .task(
        'lint', 
        [],
        function(){
            console.log("@@@ Running Lint Task @@@");
            gulp
                .src($SRC_FILES)
                .pipe(jshint("./.jshintrc"))
                .pipe(jshint.reporter('default'));
        }//END task lint
);



/******************************************************************************
* @name distify
* @type task
* @description
* Conjunto de actividades destinadas a preparar los archivos para un entorno 
* de produccion; es decir, a crear las versiones `dist` de los archivos usados 
* en la aplicacion. 
*/
gulp
    .task(
        'distify', 
        [],
        function(){
            console.log("@@@ Running Distify task @@@");
            
            //----- concateno los components del modulo y minifico
            try {
                gulp
                    .src($ORD_SRC_FILES)
                    //.pipe(concat("dy-sdk-angular.min.js"))
                    //.pipe(uglify())
                    .pipe(concat("dy-sdk-angular.js"))
                    .pipe(
                        gulp.dest($DIST_FOLDER)
                    );
            } catch(err) {
                throw new Error("Error on @Vanilla JS");
            }
        }
    );