angular.module("ConsultantApp").service("ConsultantsSvce", ['$http', '$location',function($http, $location) {
		
        this.getConsultants = function() {
            return $http.get("/consultants").
                then(function(response) {
                    if(response.data.length == 0) {
                        console.log("Failed to get consultants.");
                        $location.path("/error");
                    }
                    else{
                        console.log('test nice', response);
                        //consultants = null;
                        //res.redirect('http://localhost:8080/#/error');
                        return response;
                    }
                    
                }, function(response) {
                    alert("Error finding consultants.");
                    console.log("Error finding consultants.",response);
                });
        }
        this.UploadSaveConsultant = function() {
            var url = "/upload";
            return $http.post(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error saving data file.");
                    //console.log("test rest",response);
                });
        }
        this.getConsultant = function(id) {
            var url = "/consultants/" + id;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this consultant.");
                });
        }
        this.editConsultant= function(consultant) {
            var url = "/consultants/" + consultant._id;
            console.log(consultant._id);
            return $http.put(url, consultant).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this consultant.");
                    console.log(response);
                });
        }

        this.createConsultant= function(consultant) {
            var url = "/consultant";
            //console.log(consultant._id);
            return $http.post(url, consultant).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error create this consultant.");
                    console.log(response);
                });
        }

        this.deleteConsultant = function(consultantId) {
            var url = "/consultants/" + consultantId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this consultant.");
                    console.log(response);
                });
        }
	}]);

