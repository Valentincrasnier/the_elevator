angular.module("elevator", []).
controller("ElevatorCtrl", ["$scope", function($scope) {
    // Object representing the car
    var car = $scope.car = {
        active: function(n) {
            return this.floor == n;
        },
        state: function() {
            return (this.occupied ? "Occpd " : "Empty ") + (this.open ? "OPEN" : "STOP");
        },
        canOpen: function(n) {
            return this.active(n) && !this.occupied && !this.open;
        },
        openDoor: function(shouldAlert = true) {
            if (!this.open) {
                this.open = true;
            } else if (shouldAlert) {
                alert("The door is already opened");
            }
        },
        closeDoor: function(shouldAlert = true) {
            if (this.open) {
                this.open = false;
            } else if (shouldAlert) {
                alert("The door is already closed");
            }
        },
        stepIn: function() {
            this.openDoor(false);
            this.occupied = true;
            this.closeDoor();
        },
        stepOut: function() {
            this.openDoor(false);
            this.occupied = false;
        },
        call: function(n) {
            if (!this.occupied) {
                this.closeDoor(false);
                this.floor = n;
            } else {
                alert("The car is full");
            }
        },
        floor: 3,
        open: false,
        occupied: false
    };

    // Object representing the control panel in the car
    $scope.panel = {
        press: function(n) {
            if ($scope.car.occupied) {
                $scope.car.closeDoor(false);
                $scope.car.floor = n;
            } else {
                alert("Nobody can press this button");
            }
        },
    };

    // Floors
    $scope.howManyFloors = 10;

    function generateFloors() {
        var floors = $scope.floors = [];
        for (var i = Number($scope.howManyFloors); i > 0; i--) floors.push({
            title: i
        });
        floors.push({
            title: "G"
        });

        floors.forEach(function(floor, n) {
            floor.n = n;
            floor.open = false;
        });
    }
    generateFloors();

    $scope.$watch('howManyFloors', () => {
      if($scope.howManyFloors <= 0) $scope.howManyFloors = 1;
      generateFloors();
      if(car.floor > $scope.howManyFloors) {
        car.floor = 0;
      }
    });
}]);
