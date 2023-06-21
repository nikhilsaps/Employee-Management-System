console.log("welcome to admin dashboard\n-------------------------------------");

console.log("Creating User Database table ");
 
// Open the database
var request = indexedDB.open("userlogin", 1);
// Create the object store
request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("EmployeeID", "EmployeeID", { unique: true });
  objectStore.createIndex("Empname", "Empname", { unique: false });
  objectStore.createIndex("Empassword", "Empassword", { unique: false });
};
// Insert a user
function addUser(EmployeeID, Empname, Empassword) {
  var request = indexedDB.open("userlogin", 1);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");
    var user = { EmployeeID: EmployeeID, Empname: Empname, Empassword: Empassword };
    var request = objectStore.add(user);
    request.onsuccess = function (event) {
      console.log("User added to the database");
      alert("User added to database ");
      location.reload();
    };
    request.onerror = function (event) {
      console.log("Error adding user to the database");
    };
  };
}


