//create the module and name it scotchapp
var scotchApp = angular.module('scotchApp', ['ngRoute']);
//configure out routes
scotchApp.config(function ($routeProvider) {
    $routeProvider
    //route for the home page
    .when('/', {
        templateUrl: 'home.html',
        controller: 'mainController'
    })
    //route for the about page
    .when('/about', {
        templateUrl: 'about.html',
        controller: 'aboutController'
    })
    //route for the course(home) page
    .when('/course', {
        templateUrl: 'home.html',
        controller: 'mainController'
    })
    //route for the Trainer page
    .when('/trainer', {
        templateUrl: 'Trainer.html',
        controller: 'trainerController'
    })
    //route for the contact page
    .when('/contact', {
        templateUrl: 'contact.html',
        controller: 'contactController'
    })
    .when('/login', {
        templateUrl: 'TrainerLogin.html',
        controller:'loginController'
    })
    .when('/register', {
        templateUrl: 'Registration/AddMaster.html',
        controller:'registrationController'
    })
    .when('/trainerPersonal', {
        templateUrl: 'Registration/AddPersonalDetails.html',
        controller:'personalController'
    })
    .when('/education', {
        templateUrl: 'Registration/AddEdnDetails.html',
        controller:'ednController'
    })
    .when('/work', {
        templateUrl: 'Registration/AddWorkDetails.html',
        controller:'workController'
    })
    .when('/trainingExp', {
        templateUrl: 'Registration/AddTrainingDetails.html',
        controller:'trainingExpController'
    })
    .when('/skills', {
        templateUrl: 'Registration/AddSkills.html',
        controller:'skillsController'
    })
        
    .when('/dotnet', {
        templateUrl: 'dotnet.html',
        controller: 'dotnetController'
    });
});
//create controller and inject angular $scope
scotchApp.controller('mainController', function ($scope,$rootScope,$http) {
    //create a message to display in our view
    //$scope.navbarCollapsed = true;
    $scope.message = 'Welcome to Learning your life skills';
    $rootScope.tn = sessionStorage.TrainerName;
    console.log($rootScope.tn);
  
    
    
});

scotchApp.controller('aboutController', function ($scope) {
    $scope.message = 'World of Learning';
});

scotchApp.controller('trainerController', function ($scope,$http) {
    $scope.message = 'List of Top Trainers';
    $scope.TrainerSkills = {
        FirstName: '',
        LastName: '',
        Designation: '',
        Course: ''
    };
    GetTrainerDetails();
    function GetTrainerDetails() {

        var parameters = {
            keyword: ''
        };
        var config = {
            params: parameters
        };

        $http.get('/Home/ShowTrainerDetails', config)
        .success(function (data, status, headers, config) {
            $scope.TrainerSkills = data;
           
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });
    }
});

scotchApp.controller('contactController', function ($scope) {
    $scope.message = 'this is the message from contact controller';
});
scotchApp.controller('loginController', function ($scope,$rootScope,$http) {
    $scope.message = "Welcome to Login Page";
    $scope.TrainerName= '';
    $scope.login = function () {

        var parameters = {
            keyword: $scope.TrainerEmail
        };
        var config = {
            params: parameters
        };

        $http.get('/Trainer/GetUser', config)
        .success(function (data, status, headers, config) {
            $scope.Details = data;
            sessionStorage.TrainerId = data.TrainerId
            $rootScope.query = sessionStorage.TrainerId;

            sessionStorage.TrainerName = data.TrainerName;
            $rootScope.tn = sessionStorage.TrainerName;
            console.log($rootScope.tn);

            $scope.TrainerName = data.TrainerName;
          
            $rootScope.msg = "Welcome  " + sessionStorage.TrainerName;
            var url = 'index.html';
            window.location = url;
            
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });
    };
});
scotchApp.controller('registrationController', function ($scope,$rootScope, registerService) {
    $scope.addTrainer = true;
    
    $scope.addData = function () {   
        var TrainerMaster = {
            
            TrainerId: $scope.TrainerId,
            TrainerName: $scope.TrainerName,
            TrainerEmail: $scope.TrainerEmail,
            TrainerPassword:$scope.TrainerPassword
        }
    var addDataPost =registerService.post(TrainerMaster);
    addDataPost.then(function (msg) {
        sessionStorage.TrainerId = msg.data.TrainerId;
        $rootScope.query = sessionStorage.TrainerId;
        sessionStorage.TrainerName = msg.data.TrainerName;
        $rootScope.TrainerName = sessionStorage.TrainerName;
        alert(msg.data.TrainerId);
        alert(sessionStorage.TrainerId);

        $scope.addTrainer = false;
    }, function () {
        alert('Error in adding record');
    });
    
}
});


scotchApp.controller('personalController', function ($scope, $rootScope, personalService) {
    $scope.IsNewRecord = 1;
    $rootScope.query = sessionStorage.TrainerId;
    loadRecords();
    //function to load record data
    function loadRecords() {
        var promiseGet = personalService.getTrainersPersonal();
        promiseGet.then(function (pl) {
            $scope.TrainerPersonalDetails = pl.data
        }),
        function (errorPl) {
            $log.error("failed in loading Personal details", errorPl);
        }
    }
    $scope.addPersonalData = function () {
        $scope.TrainerId = sessionStorage.TrainerId;
        var TrainerPersonalDetails = {
            TrainerPersonalId:$scope.TrainerPersonalId,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            FatherName: $scope.FatherName,
            DateOfBirth: $scope.DateOfBirth,
            Gender: $scope.Gender,
            AddressPartOne:$scope.AddressPartOne,
            AddressPartTwo:$scope.AddressPartTwo,
            City:$scope.City,
            Pincode:$scope.Pincode,
            State:$scope.State,
            Country:$scope.Country,
            PhoneOne:$scope.PhoneOne,
            PhoneTwo:$scope.PhoneTwo,
            EmailOne:$scope.EmailOne,
            EmailTwo:$scope.EmailTwo,
            TrainerId:$scope.TrainerId
        }
     
        if ($scope.IsNewRecord === 1) {

            var addPersonalPost = personalService.post(TrainerPersonalDetails);
            addPersonalPost.then(function (msg) {
                alert(msg.data.TrainerPersonalId);
                loadRecords();

            }, function (err) {
                Console.log('error in adding record' + err);
            });
        }
        else {
            //else edit the record
            var promisePut = personalService.put($scope.TrainerPersonalId, TrainerPersonalDetails);
            promisePut.then(function (pl) {
                $scope.Message = "Updated successfully";
                loadRecords();
            }, function (err) {

            });
        }
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = personalService.delete($scope.TrainerPersonalId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.clear();
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Method to Get Single Record based on TrainerEdnId
    $scope.get = function (TrainerPersonalDetails) {
        var promiseGetSingle = personalService.get(TrainerPersonalDetails.TrainerPersonalId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.TrainerPersonalId=res.TrainerPersonalId;
            $scope.FirstName = res.FirstName;
            $scope.LastName = res.LastName;
            $scope.FatherName = res.FatherName;
            $scope.DateOfBirth = res.DateOfBirth;
            $scope.Gender = res.Gender;
            $scope.AddressPartOne = res.AddressPartOne;
            $scope.AddressPartTwo = res.AddressPartTwo;
            $scope.City = res.City;
            $scope.Pincode = res.Pincode;
            $scope.State = res.State;
            $scope.Country = res.Country;
            $scope.PhoneOne = res.PhoneOne;
            $scope.PhoneTwo = res.PhoneTwo;
            $scope.EmailOne = res.EmailOne;
            $scope.EmailTwo = res.EmailTwo;
            $scope.TrainerId = res.TrainerId;
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Trainer', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.TrainerPersonalId =0;
        $scope.FirstName = "";
        $scope.LastName = "";
        $scope.FatherName = "";
        $scope.DateOfBirth = "";
        $scope.Gender = "";
        $scope.AddressPartOne = "";
        $scope.AddressPartTwo = "";
        $scope.City = "";
        $scope.Pincode = "";
        $scope.State = "";
        $scope.Country ="";
        $scope.PhoneOne = "";
        $scope.PhoneTwo = "";
        $scope.EmailOne = "";
        $scope.EmailTwo = "";
           

    }

});

scotchApp.controller('ednController', function ($scope, $rootScope, educationService) {
    $scope.IsNewRecord = 1;
    $rootScope.query = sessionStorage.TrainerId;
  
    
    loadRecords();
    //function to load record data
    function loadRecords() {
        var promiseGet = educationService.getTrainersEdn();
        promiseGet.then(function (pl) {
            $scope.TrainerEdnDetails = pl.data
        }),
        function (errorPl) {
            $log.error("failed in loading Education details", errorPl);
        }
    }
    $scope.addEducationData = function () {
        $scope.TrainerId = sessionStorage.TrainerId;
        var TrainerEdnDetails = {
            TrainerEdnId: $scope.TrainerEdnId,
            Course: $scope.Course,
            Institution: $scope.Institution,
            FromMonth: $scope.FromMonth,
            FromYear: $scope.FromYear,
            ToMonth: $scope.ToMonth,
            ToYear: $scope.ToYear,
            Grade: $scope.Grade,
            TrainerId: $scope.TrainerId
        }
        //if the flag is 1 then it is new record
        if ($scope.IsNewRecord === 1) {

            var addEdnPost = educationService.post(TrainerEdnDetails);
            addEdnPost.then(function (msg) {
                alert(msg.data.TrainerEdnId);
                loadRecords();

            }, function (err) {
                Console.log('error in adding record' + err);
            });
        }
        else {
            //else edit the record
            var promisePut = educationService.put($scope.TrainerEdnId, TrainerEdnDetails);
            promisePut.then(function (pl) {
                $scope.Message = "Updated successfully";
                loadRecords();
            }, function (err) {

            });
        }
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = educationService.delete($scope.TrainerEdnId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.clear();
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Method to Get Single Record based on TrainerEdnId
    $scope.get = function (TrainerEdnDetails) {
        var promiseGetSingle = educationService.get(TrainerEdnDetails.TrainerEdnId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.TrainerEdnId = res.TrainerEdnId;
            $scope.Course = res.Course;
            $scope.Institution = res.Institution;
            $scope.FromMonth = res.FromMonth;
            $scope.FromYear = res.FromYear;
            $scope.ToMonth = res.ToMonth;
            $scope.ToYear = res.ToYear;
            $scope.Grade = res.Grade;
            $scope.TrainerId = res.TrainerId;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Trainer', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.TrainerEdnId = 0;
        $scope.Course = "";
        $scope.Institution = "";
        $scope.FromMonth = "";
        $scope.FromYear = "";
        $scope.ToMonth = "";
        $scope.ToYear = "";
        $scope.Grade = "";
            
    }
});
scotchApp.controller('workController', function ($scope, $rootScope, workService) {
    $scope.IsNewRecord = 1;
    $rootScope.query = sessionStorage.TrainerId;
    loadRecords();
    //function to load record data
    function loadRecords() {
        var promiseGet = workService.getTrainersWork();
        promiseGet.then(function (pl) {
            $scope.TrainerWorkDetails = pl.data
        }),
        function (errorPl) {
            $log.error("failer in loading Work details", errorPl);
        }
    }
    $scope.AddWorkData = function () {
        $scope.TrainerId = sessionStorage.TrainerId;
        var TrainerWorkDetails = {
            TrainerWorkId:$scope.TrainerWorkId,
            Designation:$scope.Designation,
            Organization:$scope.Organization,
            FromMonth:$scope.FromMonth,
            FromYear:$scope.FromYear,
            ToMonth:$scope.ToMonth,
            ToYear:$scope.ToYear,
            Description:$scope.Description,
            TrainerId:$scope.TrainerId
    }
        //if the flag is 1 then it is new record
        if ($scope.IsNewRecord === 1) {

            var addWorkPost = workService.post(TrainerWorkDetails);
            addWorkPost.then(function (msg) {
                alert(msg.data.TrainerWorkId);
                loadRecords();

            }, function (err) {
                Console.log('error in adding record' + err);
            });
        }
        else {
            //else edit the record
            var promisePut = workService.put($scope.TrainerWorkId, TrainerWorkDetails);
            promisePut.then(function (pl) {
                $scope.Message = "Updated successfully";
                loadRecords();
            }, function (err) {

            });
        }
    }


    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = workService.delete($scope.TrainerWorkId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.clear();
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Method to Get Single Record based on TrainerEdnId
    $scope.get = function (TrainerWorkDetails) {
        var promiseGetSingle = workService.get(TrainerWorkDetails.TrainerWorkId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.TrainerWorkId = res.TrainerWorkId;
            
            $scope.Designation = res.Designation;
            $scope.Organization = res.Organization;
            $scope.FromMonth = res.FromMonth;
            $scope.FromYea = res.FromYear;
            $scope.ToMonth = res.ToMonth;
            $scope.ToYear = res.ToYear;
            $scope.Description = res.Description;
            $scope.TrainerId = res.TrainerId;
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Trainer', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.TrainerWorkId = 0;
        $scope.Designation = "";
        $scope.Organization = "";
        $scope.FromMonth = "";
        $scope.FromYear = "";
        $scope.ToMonth = "";
        $scope.ToYear = "";
        $scope.Description = "";

    }
});

scotchApp.controller('trainingExpController', function ($scope, $rootScope, trainingExpService) {
    $scope.IsNewRecord = 1;
    $rootScope.query = sessionStorage.TrainerId;
    loadRecords();
    //function to load record data
    function loadRecords() {
        var promiseGet = trainingExpService.getTrainersTraining();
        promiseGet.then(function (pl) {
            $scope.TrainerTrainingDetails = pl.data
        }),
        function (errorPl) {
            $log.error("failer in loading Experience details", errorPl);
        }
    }
    $scope.AddTrainingData = function () {
        $scope.TrainerId = sessionStorage.TrainerId;
        var TrainerTrainingDetails = {
            TrainerTrainID:$scope.TrainerTrainID,
            Course:$scope.Course,
            Organization:$scope.Organization, 
            FromMonth:$scope.FromMonth,  
            FromYear:$scope.FromYear,      
            ToMonth:$scope.ToMonth,      
            ToYear:$scope.ToYear,    
            Description:$scope.Description,
            TrainerId: $scope.TrainerId
          }
        //if the flag is 1 then it is new record
        if ($scope.IsNewRecord === 1) {

            var addTrainingPost = trainingExpService.post(TrainerTrainingDetails);
            addTrainingPost.then(function (msg) {
                alert(msg.data.TrainerTrainID);
                loadRecords();

            }, function (err) {
                Console.log('error in adding record' + err);
            });
        }
        else {
            //else edit the record
            var promisePut = trainingExpService.put($scope.TrainerTrainID, TrainerTrainingDetails);
            promisePut.then(function (pl) {
                $scope.Message = "Updated successfully";
                loadRecords();
            }, function (err) {

            });
        }
    }



    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = trainingExpService.delete($scope.TrainerTrainID);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.clear();
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Method to Get Single Record based on TrainerEdnId
    $scope.get = function (TrainerTrainingDetails) {
        var promiseGetSingle = trainingExpService.get(TrainerTrainingDetails.TrainerTrainID);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.TrainerTrainID = res.TrainerTrainID;

            $scope.Course = res.Course;
            $scope.Organization = res.Organization;
            $scope.FromMonth = res.FromMonth;
            $scope.FromYear = res.FromYear;
            $scope.ToMonth = res.ToMonth;
            $scope.ToYear = res.ToYear;
            $scope.Description = res.Description;
            $scope.TrainerId = res.TrainerId;
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Trainer', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.TrainerTrainID = 0;
        $scope.Course = "";
        $scope.Organization = "";
        $scope.FromMonth = "";
        $scope.FromYear = "";
        $scope.ToMonth = "";
        $scope.ToYear = "";
        $scope.Description = "";

    }




});

scotchApp.controller('skillsController', function ($scope, $rootScope, skillsService) {
    $scope.IsNewRecord = 1;
    $rootScope.query = sessionStorage.TrainerId;
    loadRecords();
    //function to load record data
    function loadRecords() {
        var promiseGet = skillsService.getTrainersSkills();
        promiseGet.then(function (pl) {
            $scope.TrainerSkillsDetails = pl.data
        }),
        function (errorPl) {
            $log.error("failer in loading Skills details", errorPl);
        }
    }
    $scope.AddSkillsData = function () {
        $scope.TrainerId = sessionStorage.TrainerId;
        var TrainerSkillsDetails = {
            TrainerSkillsId:$scope.TrainerSkillsId,
            SkillOne:$scope.SkillOne,
            SkillTwo:$scope.SkillTwo,
            SkillThree:$scope.SkillThree,
            DomainOne:$scope.DomainOne,
            DomainTwo:$scope.DomainTwo,
            DomainThree:$scope.DomainThree,
            LanguagesOne:$scope.LanguagesOne,
            LanguagesTwo:$scope.LanguagesTwo,
            LanguagesThree:$scope.LanguagesThree,
            Description:$scope.Description,
            ProjectOne:$scope.ProjectOne,
            ProjectTwo:$scope.ProjectTwo,
            ProjectThree:$scope.ProjectThree,
            TrainerPhotoUrl:$scope.TrainerPhotoUrl,
            TrainerProfileUrl:$scope.TrainerProfileUrl,
            TrainerId: $scope.TrainerId
        }
        //if the flag is 1 then it is new record
        if ($scope.IsNewRecord === 1) {

            var addSkillsPost = skillsService.post(TrainerSkillsDetails);
            addSkillsPost.then(function (msg) {
                alert(msg.data.TrainerSkillsId);
                loadRecords();

            }, function (err) {
                Console.log('error in adding record' + err);
            });
        }
        else {
            //else edit the record
            var promisePut = skillsService.put($scope.TrainerSkillsId, TrainerSkillsDetails);
            promisePut.then(function (pl) {
                $scope.Message = "Updated successfully";
                loadRecords();
            }, function (err) {

            });
        }
    }



    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = skillsService.delete($scope.TrainerSkillsId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.clear();
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Method to Get Single Record based on TrainerEdnId
    $scope.get = function (TrainerSkillsDetails) {
        var promiseGetSingle = skillsService.get(TrainerSkillsDetails.TrainerSkillsId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.TrainerSkillsId = res.TrainerSkillsId;
            $scope.SkillOne = res.SkillOne;
            $scope.SkillTwo = res.SkillTwo;
            $scope.SkillThree = res.SkillThree;
            $scope.DomainOne = res.DomainOne;
            $scope.DomainTwo = res.DomainTwo;
            $scope.DomainThree = res.DomainThree;
            $scope.LanguagesOne = res.LanguagesOne;
            $scope.LanguagesTwo = res.LanguagesTwo;
            $scope.LanguagesThree = res.LanguagesThree;
            $scope.Description = res.Description;
            $scope.ProjectOne = res.ProjectOne;
            $scope.ProjectTwo = res.ProjectTwo;
            $scope.ProjectThree = res.ProjectThree;
            $scope.TrainerPhotoUrl = res.TrainerPhotoUrl;
            $scope.TrainerProfileUrl = res.TrainerProfileUrl;
            $scope.TrainerId = res.TrainerId;
          
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Trainer', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.TrainerSkillsId = 0;
        $scope.SkillOne = "";
        $scope.SkillTwo = "";
        $scope.SkillThree = "";
        $scope.DomainOne = "";
        $scope.DomainTwo = "";
        $scope.DomainThree = "";
        $scope.LanguagesOne = "";
        $scope.LanguagesTwo = "";
        $scope.LanguagesThree = "";
        $scope.Description = "";
        $scope.ProjectOne = "";
        $scope.ProjectTwo = "";
        $scope.ProjectThree = "";
        $scope.TrainerPhotoUrl = "";
        $scope.TrainerProfileUrl = "";
       

    }


});

scotchApp.controller('dotnetController', function ($scope) {
});




























