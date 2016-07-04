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