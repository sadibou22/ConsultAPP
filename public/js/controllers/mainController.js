angular.module("ConsultantApp").controller("listConsultantCtrl", function ($scope, consultantFactory, factoryTest,$routeParams){
   /* consultantFactory.get()
        .success(function(data) {
            $scope.consultantList = data;
            console.log(data);
        });

    consultantFactory.post()
        .success(function() {
            //$scope.loading = 'Succeeesssssss';
            alert('load succeesssss...')
        });*/

   /* consultantFactory.get(id)
        .success(function(data) {
            $scope.consultant = data;
            console.log(data);
        });*/


  //test factory
  //Tous les consultant
  var promise = factoryTest.getAllConsultants();
  //si OK
  promise.then(function(consultants) {
      $scope.consultantList = consultants.data;
      console.log('ici',consultants.data)
  }).catch(function(error) {
      
  })

  //Upload et sauvegarde des consultants via fichier


//un consultant
/*var p = factoryTest.getConsultant($routeParams.id);
  //si OK
  p.then(function(consultant) {
     // $scope.consultantList = consultants.data;
     console.log($routeParams.id)
  }).catch(function(error) {
      
  })*/

//
})
//un consultant
.controller("ConsultantDeatilCtrl", function ($scope, factoryTest, $routeParams){
 var id =$routeParams.id;
 console.log('mon id:',id);

var promise = factoryTest.getConsultant(id);
  //si OK
  promise.then(function(consultant) {
     $scope.consultant = consultant.data;
     console.log('mon c:',consultant.data);
  }).catch(function(error) {
      
  })

//
})
.controller("deleteConsultantCtrl", function ($scope, factoryTest, $routeParams){
    var id =$routeParams.id;
    console.log('test 1 id: ',id);
        /*$scope.deleteConsultant = function (id) {
            factoryTest.deleteConsultant(id)
                .success(function (data) {
                console.log('fine..delete'); 
                })
        }
    */
    
   // $scope.deleteConsultant = factoryTest.deleteConsultant(id);
   // console.log('test mon id: ',id);

    
        /*$scope.deleteConsultant = factoryTest.deleteConsultant(IDBIndex);
        //si OK
        promise.then(function() {
            //$scope.consultant = consultant.data;
            console.log('mon delete succees:');
        }).catch(function(error) {
        })
        */
        //success-upload
 $scope.test = '';
        //delete
  var promise = factoryTest.deleteConsultant(id);
  //si OK
  promise.then(function(data) {
      $scope.data = data;
      //console.log('ici',data.data)
  }).catch(function(error) {
      
    })
       
})
.controller("uploadCtrlFile", function ($scope, factoryTest, $routeParams){
    
        console.log('success-upload');
       
})

.controller("uploadCtrl", function ($scope, factoryTest, $routeParams){
    
        console.log('success-upload fine');
       
})

.controller("editConsultantCtrl", function ($scope, factoryTest, $routeParams){
    
        console.log('edit fine');
        $scope.title = 'Mon titre tra'

       
})