function updateEmployee(EmployeeID, updatedFields) {
    var request = indexedDB.open("Emplogin", 1);
    request.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction(["EmpTable"], "readwrite");
        var objectStore = transaction.objectStore("EmpTable");

        var index = objectStore.index("EmployeeID");
        var getRequest = index.get(EmployeeID);
        getRequest.onsuccess = function (event) {
            var user = event.target.result;

            if (user) {
                // Update specific fields with new values
                for (var field in updatedFields) {
                    if (user.hasOwnProperty(field)) {
                        user[field] = updatedFields[field];
                    }
                }

                // Put the updated user object back into the object store
                var updateRequest = objectStore.put(user);
                updateRequest.onsuccess = function (event) {
                    console.log("Employee details updated successfully");
                    // Perform any additional actions or redirect to another page
                };
                updateRequest.onerror = function (event) {
                    console.log("Error updating employee details");
                };
            } else {
                console.log("Employee not found");
            }
        };

        getRequest.onerror = function (event) {
            console.log("Error retrieving employee details");
        };
    };
}
function addthedet(){
var EmployeeID = localStorage.getItem("empidofemp");
var updatedFields = {
    ProjPriority: document.getElementById("priority").value,
    Empproject: document.getElementById("taskName").value,
    ProjProg: document.getElementById("progress").value
};

updateEmployee(EmployeeID, updatedFields);
}