angular.module("ConsultantApp").factory("factoryTest", function($http, $q) {
		var getAllConsultants = function(){
            var deferred = $q.defer();
            $http({
                method: "GET",
                url:"/consultants"   
            }).then(function(consultants) {
                console.log("les consultants: ", consultants);
                deferred.resolve(consultants);
            }).catch(function(error) {
                console.log("l'erreur est: ", error);
                deferred.reject("Sorry, probleme pour recuperer les consultatns: ", error);
            });

           return deferred.promise;
        }

        var uploadFileAndSave = function(){
            var deferred = $q.defer();
            $http({
                method: "POST",
                url:"/"   
            }).then(function() {
                console.log("fichier load success ");
                deferred.resolve("fichier22 load success ");
            }).catch(function(error) {
                console.log("l'erreur fichier: ", error);
                deferred.reject("Sorry, probleme pour recuperer les consultants: ", error);
            });

           return deferred.promise;
        }

        var getConsultant = function(id){
             var deferred = $q.defer();
             var url = "/consultants/"+id;
            $http({
                method: "GET",
                url:url   
            }).then(function(consultant) {
                console.log("le consultant est ", consultant);
                deferred.resolve(consultant);
            }).catch(function(error) {
                console.log("l'erreur consultant: ", error);
                deferred.reject("Sorry, probleme pour recuperer le consultant: ", error);
            });

           return deferred.promise;
            
        }

        var deleteConsultant = function(id){
             var deferred = $q.defer();
             var url = "/delete/"+id;
            $http({
                method: "GET",
                url:url   
            }).then(function(data) {
                console.log("le consultant est supp", data);
                deferred.resolve(data);
            }).catch(function(error) {
                console.log("l'erreur consultant supp: ", error);
                deferred.reject("Sorry, probleme pour supprimer le consultant: ", error);
            });
           return deferred.promise;
        }
        
        return {
			//afficher tous les consultants
                getAllConsultants: getAllConsultants,
            //Upload et sauvegarde des consultants via fichier
                uploadFileAndSave : uploadFileAndSave,
			// afficher un consultant
                getConsultant : getConsultant,
            //delete
                deleteConsultant : deleteConsultant,
            //update 
               // editConsultant : editConsultant

           

            //create new consultant
		}
	});

