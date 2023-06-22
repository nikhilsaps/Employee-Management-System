// Button click listeners
document.getElementById("button1").addEventListener("click", function () {
    buttonClicked(1);
    console.log("Creating User Database table ");
    localStorage.setItem("patternofid", 2023060);
    localStorage.setItem("rowcount", 0);
    // Open the database
    var request = indexedDB.open("Emplogin", 1);
    // Create the object store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("EmpTable", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("EmployeeID", "EmployeeID", { unique: false });
        objectStore.createIndex("Empmail", "Empmail", { unique: false });
        objectStore.createIndex("Empname", "Empname", { unique: false });
        objectStore.createIndex("Empassword", "Empassword", { unique: false });
        objectStore.createIndex("Empproject", "Empproject", { unique: false });
        objectStore.createIndex("ProjProg", "ProjProg", { unique: false });
        objectStore.createIndex("ProjPriority", "ProjPriority", { unique: false });
        objectStore.createIndex("Overtime", "Overtime", { unique: false });
        objectStore.createIndex("Leave", "Leave", { unique: false });
    };
    // Insert a userrity
    var request = indexedDB.open("TimeSheet", 1);
    // Create the object store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("emptime", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("EmployeeID", "EmployeeID", { unique: false });
        objectStore.createIndex("Date", "Date", { unique: false });
        objectStore.createIndex("empname", "empname", { unique: false });
        
        objectStore.createIndex("PunchIn", "PunchIn", { unique: false });
        objectStore.createIndex("PunchOut", "PunchOut", { unique: false });


    };

});

document.getElementById("button2").addEventListener("click", function () {
    buttonClicked(2);
    adduser1();
    adduser2();
    adduser3();

});

document.getElementById("button3").addEventListener("click", function () {
    buttonClicked(3);
    
    addtime('2023-06-07 09:00:00', '2023-06-07 17:00:00', 'EMP001');
    addtime('2023-06-08 09:00:00', '2023-06-08 18:00:00', 'EMP002');







});

document.getElementById("button4").addEventListener("click", function () {
    buttonClicked(4);
});

document.getElementById("button5").addEventListener("click", function () {
    buttonClicked(5);
});

// Button click handler function
function buttonClicked(buttonNumber) {
    console.log("Button " + buttonNumber + " clicked!");
    // Your code logic here
}

function adduser1() {
    let empid = (parseInt(localStorage.getItem("patternofid")) + 1).toString()
    console.log(empid);


    addUser(empid, "nikhil@example.com", "nikhil", "password123", "CSGO", "25", "3", "", "");
    rowcount = localStorage.getItem("rowcount");
    rowcount = parseInt(rowcount) + 1;
    localStorage.setItem("patternofid", empid);
    localStorage.setItem("rowcount", rowcount);

}
function adduser2() {
    let empid = (parseInt(localStorage.getItem("patternofid")) + 1).toString()
    console.log(empid);


    addUser(empid, "jane@example.com", "Jane Smith", "securepass", "dante", "45", "5", "", "");
    rowcount = localStorage.getItem("rowcount");
    rowcount = parseInt(rowcount) + 1;
    localStorage.setItem("patternofid", empid);
    localStorage.setItem("rowcount", rowcount);

}
function adduser3() {
    let empid = (parseInt(localStorage.getItem("patternofid")) + 1).toString()
    console.log(empid);


    addUser(empid, "surya@example.com", "surya", "123456", "iul", "85", "4", "", "");
    rowcount = localStorage.getItem("rowcount");
    rowcount = parseInt(rowcount) + 1;
    localStorage.setItem("patternofid", empid);
    localStorage.setItem("rowcount", rowcount);

}

function addUser(EmployeeID, Empmail, Empname, Empassword, Empproject, ProjProg, ProjPriority, Overtime, Leave) {
    var request = indexedDB.open("Emplogin", 1);
    request.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction(["EmpTable"], "readwrite");
        var objectStore = transaction.objectStore("EmpTable");
        var user = { EmployeeID: EmployeeID, Empmail: Empmail, Empname: Empname, Empassword: Empassword, Empproject: Empproject, ProjProg: ProjProg, ProjPriority: ProjPriority, Overtime: Overtime, Leave: Leave };
        var request = objectStore.add(user);
        request.onsuccess = function (event) {
            console.log("Employee added to the database");
            location.reload();
        };
        request.onerror = function (event) {
            console.log("Error adding user to the database");
        };
    };
}

function addtime(EmployeeID,Date,PunchIn,PunchOut) {
    var request = indexedDB.open("TimeSheet", 1);
    request.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction(["emptime"], "readwrite");
        var objectStore = transaction.objectStore("emptime");
        var user = { EmployeeID: EmployeeID,Date:Date, PunchIn:PunchIn, PunchOut:PunchOut};
        var request = objectStore.add(user);
        request.onsuccess = function (event) {
            console.log("time added ");
                };
        request.onerror = function (event) {
            console.log("failed  ");
        };
    };
  }
  