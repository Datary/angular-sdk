/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
angular
    .module('dySdk')
    .factory('DyTree', tree);

tree.$inject = ['$q', '$http'];

function tree($q, $http){
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