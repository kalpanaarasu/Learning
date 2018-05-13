scotchApp.service('registerService', function ($http) {
    this.post = function (TrainerMaster) {

        var response = $http({
            method: "post",
            url: "/api/Registration",
            data: TrainerMaster
        });

        return response;
    }
});

scotchApp.service('personalService', function ($http) {
    this.post = function (TrainerPersonalDetails) {
        var response = $http({
            method: "post",
            url: "/api/TrainerPersonal",
            data: TrainerPersonalDetails
        });
        console.log('response:' + response);
        return response;
    }

    //get single record
    this.get = function (TrainerPersonalId) {
        return $http.get("/api/TrainerPersonal/" + TrainerPersonalId);
    }
    //get all record
    this.getTrainersPersonal = function () {
        return $http.get("/api/TrainerPersonal");

    }
    //update the record
    this.put = function (TrainerPersonalId, TrainerPersonalDetails) {
        var request = $http({
            method: "put",
            url: "/api/TrainerPersonal/" + TrainerPersonalId,
            data: TrainerPersonalDetails
        });
        return request;
    }

    //delete the record

    this.delete = function (TrainerPersonalId) {
        var request = $http({
            method: "delete",
            url: "/api/TrainerPersonal/" + TrainerPersonalId
        });
        return request;
    }
});


scotchApp.service('educationService', function ($http) {
    //create new
    this.post = function (TrainerEdnDetails) {
        var response = $http({
            method: "post",
            url: "/api/TrainerEducation",
            data: TrainerEdnDetails
        })
        return response;
    }
    //get single record
    this.get = function (TrainerEdnId) {
        return $http.get("/api/TrainerEducation/" + TrainerEdnId);
    }
    //get all record
    this.getTrainersEdn = function () {
        return $http.get("/api/TrainerEducation");

    }
    //update the record
    this.put = function (TrainerEdnId, TrainerEdnDetails) {
        var request = $http({
            method: "put",
            url: "/api/TrainerEducation/" + TrainerEdnId,
            data: TrainerEdnDetails
        });
        return request;
    }

    //delete the record

    this.delete = function (TrainerEdnId) {
        var request = $http({
            method: "delete",
            url: "/api/TrainerEducation/" + TrainerEdnId
        });
        return request;
    }

});

scotchApp.service('workService', function ($http) {
    this.post = function (TrainerWorkDetails) {
        var response = $http({
            method: "post",
            url: "/api/TrainerWork",
            data: TrainerWorkDetails
        })
        return response;
    }
    //get single record
    this.get = function (TrainerWorkId) {
        return $http.get("/api/TrainerWork/" + TrainerWorkId);
    }
    //get all record
    this.getTrainersWork = function () {
        return $http.get("/api/TrainerWork");

    }
    //update the record
    this.put = function (TrainerWorkId, TrainerWorkDetails) {
        var request = $http({
            method: "put",
            url: "/api/TrainerWork/" + TrainerWorkId,
            data: TrainerWorkDetails
        });
        return request;
    }

    //delete the record

    this.delete = function (TrainerWorkId) {
        var request = $http({
            method: "delete",
            url: "/api/TrainerWork/" + TrainerWorkId
        });
        return request;
    }
});

scotchApp.service('trainingExpService', function ($http) {
    this.post = function (TrainerTrainingDetails) {
        var response = $http({
            method: "post",
            url: "/api/TrainingTraining",
            data: TrainerTrainingDetails
        })
        return response;
    }
    //get single record
    this.get = function (TrainerTrainID) {
        return $http.get("/api/TrainingTraining/" + TrainerTrainID);
    }
    //get all record
    this.getTrainersTraining = function () {
        return $http.get("/api/TrainingTraining");

    }
    //update the record
    this.put = function (TrainerTrainID, TrainerTrainingDetails) {
        var request = $http({
            method: "put",
            url: "/api/TrainingTraining/" + TrainerTrainID,
            data: TrainerTrainingDetails
        });
        return request;
    }

    //delete the record

    this.delete = function (TrainerTrainID) {
        var request = $http({
            method: "delete",
            url: "/api/TrainingTraining/" + TrainerTrainID
        });
        return request;
    }
});
scotchApp.service('skillsService', function ($http) {
    this.post = function (TrainerSkillsDetails) {
        var response = $http({
            method: "post",
            url: "/api/TrainerSkills",
            data: TrainerSkillsDetails
        })
        return response;
    }
     //get single record
    this.get = function (TrainerSkillsId) {
        return $http.get("/api/TrainerSkills/" + TrainerSkillsId);
    }
    //get all record
    this.getTrainersSkills = function () {
        return $http.get("/api/TrainerSkills");

    }
    //update the record
    this.put = function (TrainerSkillsId, TrainerSkillsDetails) {
        var request = $http({
            method: "put",
            url: "/api/TrainerSkills/" + TrainerSkillsId,
            data: TrainerSkillsDetails
        });
        return request;
    }

    //delete the record

    this.delete = function (TrainerSkillsId) {
        var request = $http({
            method: "delete",
            url: "/api/TrainerSkills/" + TrainerSkillsId
        });
        return request;
    }
});