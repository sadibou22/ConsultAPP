angular.module("ConsultantApp").factory("consultantFactory", ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/consultants');
			},
			post : function() {
				return $http.post('/upload');
			}
			// afficher un consultant


            //update 


            //delete
		}
	}]);


/*
function ($http)
{
    /*var Consultants =     [
                        {nom: 'dupont2', prenom: 'pierre'},
                        {nom: 'dupont', prenom: 'paul'},
                        {nom: 'dupont', prenom: 'jacques'},
                        {nom: 'dupont', prenom: 'alice'}
                    ];
    var getAllConsultant = function() 
    {
        return Consultants;
    };

    
    return {
        getAllConsultant: getAllConsultant
        
    };*
    //Tous les consultants
     var getAllConsultant = function() 
    {
        return Consultants;
    };
    //consultant by id
     var getAllConsultantById = function() 
    {
        return Consultants;
    };

    return{
        getAllConsultant: getAllConsultant,
        getAllConsultantById: getAllConsultantById,
    }*

    

}
*/