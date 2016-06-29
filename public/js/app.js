var app = angular.module("ConsultantApp", ['ngRoute'])


    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListConsultantCtrl",
                resolve: {
                    Mesconsultants: function(ConsultantsSvce) {
                        return ConsultantsSvce.getContacts();
                    }
                }
            })
            .when("/new/consultant", {
                controller: "NewConsultantCtrl",
                templateUrl: "consultant-form.html"
            })
            .when("/consultants/:id", {
                controller: "EditConsultantCtrl",
                templateUrl: "consultant.html"
            })
            .when("/upload", {
                controller: "UploadFileCtrl",
                templateUrl: "list.html"
            })
            .when("/uploadFile", {
                controller: "FileCtrl",
                templateUrl: "upload-form.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("ConsultantsSvce", function($http) {
        this.getContacts = function() {
            return $http.get("/consultants").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding consultants.");
                });
        }
        /*this.saveConsultant = function(contact) {
            return $http.post("/consultants", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating consultant.");
                });
        }*/
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
        this.getContact = function(id) {
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
    })
    .controller("ListConsultantCtrl", function(Mesconsultants, $scope, ConsultantsSvce, $location) {
        $scope.consultants = Mesconsultants.data;

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
                var consultantUrl = "#/" ;//+ doc.data._id;
                $location.path(consultantUrl);
            }, function(response) {
                alert(response);
            });
        }
         /*$scope.saveConsultant = function(consultant) {
            ConsultantsSvce.createConsultant(consultant);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
             var consultantUrl = "/consultants/" + consultant._id;
            $location.path(consultantUrl);
        }*/
    })
    .controller("UploadFileCtrl", function($scope, $location, ConsultantsSvce) {
        $scope.back = function() {
            $location.path("#/");
        }
         /*$scope.saveData = ConsultantsSvce.UploadSaveConsultant().then(function(doc) {
                var contactUrl = "#/" 
                $location.path(contactUrl);
                console.log(doc);
                alert(doc);
            }, function(response) {
                alert(response);
            });*/
       $scope.saveData = function() {
            ConsultantsSvce.UploadSaveConsultant().then(function(doc) {
                var contactUrl = "#/" 
                $location.path(contactUrl);
                console.log(doc);
                //alert(doc);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("FileCtrl", function() {
       /* $scope.back = function() {
            $location.path("#/");
        }
         /*$scope.saveData = ConsultantsSvce.UploadSaveConsultant().then(function(doc) {
                var contactUrl = "#/" 
                $location.path(contactUrl);
                console.log(doc);
                alert(doc);
            }, function(response) {
                alert(response);
            });*
       $scope.saveData = function() {
            ConsultantsSvce.UploadSaveConsultant().then(function(doc) {
                var contactUrl = "#/" 
                $location.path(contactUrl);
                console.log(doc);
                //alert(doc);
            }, function(response) {
                alert(response);
            });
        }*/
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















/*var app = angular.module("ConsultantApp", ['ngRoute'])


    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListConsultantCtrl",
                resolve: {
                    Mesconsultants: function(ConsultantsSvce) {
                        return ConsultantsSvce.getContacts();
                    }
                }
            })
            .when("/new/consultant", {
                controller: "NewConsultantCtrl",
                templateUrl: "consultant-form.html"
            })
            .when("/consultants/:id", {
                controller: "EditConsultantCtrl",
                templateUrl: "consultant.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("ConsultantsSvce", function($http) {
        this.getContacts = function() {
            return $http.get("/consultants").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding consultants.");
                });
        }
       /* this.createContact = function(contact) {
            return $http.post("/contacts", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating contact.");
                });
        }*/
     /*   this.getContact = function(id) {
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
            return $http.put(url, consultant._id).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this consultant.");
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

    })
    .controller("ListConsultantCtrl", function(Mesconsultants, $scope) {
        $scope.consultants = Mesconsultants.data;

        $scope.sortType = 'nom';
        $scope.sortReverse = false;
        $scope.searchCompetencies = '';

        $scope.removeConsultant = function (index) {
            $scope.consultants.splice(index, 1);
        };
    })
    .controller("NewConsultantCtrl", function($scope, $location, ConsultantsSvce) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveContact = function(contact) {
            ConsultantsSvce.createContact(contact).then(function(doc) {
                var contactUrl = "/consultants/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
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
    }); */