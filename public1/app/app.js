var app = angular.module("ConsultantApp", ['ngRoute'])


    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                    templateUrl: "/views/list.html",
                    controller: "ListConsultantCtrl",
                    resolve: {
                        Mesconsultants: function(ConsultantsSvce) {
                            return ConsultantsSvce.getConsultants();
                        }
                    }
            })
            .when("/new/consultant", {
                controller: "NewConsultantCtrl",
                templateUrl: "/views/consultant-form.html"
            })
            .when("/consultants/:id", {
                controller: "EditConsultantCtrl",
                templateUrl: "/views/consultant.html"
            })
            .when("/upload", {
                controller: "UploadFileCtrl",
                templateUrl: "/views/list.html"
            })
            .when("/uploadFile", {
                controller: "FileCtrl",
                templateUrl: "/views/upload-form.html"
            })
            .when("/error", {
                controller: "FileCtrl",
                templateUrl: "/views/errors/no-data.html"
            })
            .otherwise({
                redirectTo: "/"
            })
})

