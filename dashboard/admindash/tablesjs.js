console.log("Welcome to employee list ")
console.log("-------------------------")
// retrieve the data form the data base  ( Emplogin  ) ----> EmpTable 
///dataarray;

var emptablebody = document.getElementById("emplistrow");
loaddata();

function loaddata() {
    let loopcount = localStorage.getItem("rowcount");
    for (var i = 0; i <= loopcount; i++) {
        console.log( typeof  dataarray[i].Empid);
        var row = document.createElement("tr");
        let name = dataarray[i].Empname;
        let email=dataarray[i].Empmail;
        let Empid=dataarray[i].EmployeeID;
        let Empd= dataarray[i].Empassword;



        row.innerHTML = "<td>" + name + "</td>    <td>"+ Empid+"</td>    <td>"+email +"</td>    <td>"+Empd +"</td>";
        emptablebody.append(row);

    }
}