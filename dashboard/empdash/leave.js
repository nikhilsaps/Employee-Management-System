console.log("welcome to leave  application page ");





var request = indexedDB.open("LeaveTrack", 1);
// Create the object store
request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("empleave", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("EmployeeID", "EmployeeID", { unique: false });
  
  objectStore.createIndex("Empname", "Empname", { unique: false });
  objectStore.createIndex("reason", "reason", { unique: false });
 
  objectStore.createIndex("date", "date", { unique: false });
  objectStore.createIndex("note", "note", { unique: false });

};
// Insert a user
function addLeave(EmployeeID,  Empname,reason, date,note ) {
  var request = indexedDB.open("LeaveTrack", 1);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["empleave"], "readwrite");
    var objectStore = transaction.objectStore("empleave");
    var user = { EmployeeID: EmployeeID,  Empname: Empname,reason:reason, date:date, note:note};
    var request = objectStore.add(user);
    request.onsuccess = function (event) {
      console.log("Employee added to the database");
      alert("applied for leave ")
    };
    request.onerror = function (event) {
      console.log("Error adding user to the database");
    };
  };
}



function leaveapply(){
    let empid = localStorage.getItem("empidofemp");
    let empname = localStorage.getItem("nameofemp");
    let reason = document.getElementById("reason").value;
    let date = document.getElementById("date").value;
    let note = document.getElementById("notes").value;

    console.log(empid,empname,date,note,reason);


    addLeave(empid,empname ,reason, date ,note)
    
}