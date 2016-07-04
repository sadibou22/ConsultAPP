angular.module("ConsultantApp").controller("ListConsultantCtrl", function (Mesconsultants, $scope, ConsultantsSvce, $location,$routeParams){
   $scope.consultants = Mesconsultants.data;

        $scope.Compets = 
        $scope.sortType = 'nom';
        $scope.sortReverse = false;
        $scope.searchCompetencies = '';

        $scope.removeConsultant = function (index) {
            $scope.consultants.splice(index, 1);
        };

        $scope.deleteConsultant = function(consultantId) {
            var x;
            var r = confirm("Voulez-vous vraiment supprimer ce consultant ?");
            if (r == true) {
                ConsultantsSvce.deleteConsultant(consultantId);
                //x = "consultant supprimé avec succees!";
                //alert(x);
                $location.path("#/");
            }          
        }
})
.controller("NewConsultantCtrl", function($scope, $location, ConsultantsSvce) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveConsultant = function(consultant) {
            ConsultantsSvce.createConsultant(consultant).then(function(doc) {
                var consultantUrl = "#/" ;
                $location.path(consultantUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
.controller("UploadFileCtrl", function($scope, $location, ConsultantsSvce) {
        $scope.back = function() {
            $location.path("#/");
        }

       $scope.saveData = function() {
            ConsultantsSvce.UploadSaveConsultant().then(function(doc) {
                var contactUrl = "#/" 
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
.controller("FileCtrl", function() {
    })
.controller("EditConsultantCtrl", function($scope, $routeParams, ConsultantsSvce) {
        ConsultantsSvce.getContact($routeParams.id).then(function(consultant) {
            $scope.consultant = consultant.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "update-consultant-form.html";
        }

       $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveConsultant = function(consultant) {
            ConsultantsSvce.editConsultant(consultant);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

       $scope.deleteConsultant = function(consultantId) {
            ConsultantsSvce.deleteConsultant(consultantId);
        }
    });
