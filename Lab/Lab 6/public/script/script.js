const app = angular.module("appHTML",[]);

app.controller("FormController", function($scope){
    $scope.name="Khym";
    console.log($scope.name);
});


app.controller("ListController",ListController);

function ListController( $scope,$http) { 
        $http.get("/api/posts").then(function(response){
            console.log(response.data);
            $scope.listData = response.data.data;
        })
}