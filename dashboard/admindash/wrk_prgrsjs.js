console.log("welcome to workprogress ");
console.log(dataarray);


//crating row in this page 

var empwrkprglist = document.getElementById("empwrkprgrlist");
loadwrkdata();

function loadwrkdata(){
    let loopcount = localStorage.getItem("rowcount");
    for (var i = 0; i <= loopcount; i++) {
       
        var row = document.createElement("tr");
        let name = dataarray[i].Empname;
        let Empid=dataarray[i].EmployeeID;
        var  prjpri;
        var  percentprj;
        var  projectname;
        var statusprj;

        if (dataarray[i].ProjPriority == "") {
            prjpri = parseInt(0);
        }
        else{
            prjpri= parseInt(dataarray[i].ProjPriority);
        }
        
        if (dataarray[i].ProjProg == "") {
            percentprj = parseInt(0);
        }
        else{
            percentprj= parseInt(dataarray[i].ProjProg );
        }
        if (dataarray[i].Empproject == "") {
            projectname = "none";
        }
        else{
            projectname= dataarray[i].Empproject;
        }
        if(dataarray[i].ProjProg == ""){
            statusprj= "no project";
        }
        else if(parseInt(dataarray[i].ProjProg) == 100){
            statusprj="Completed"
        }
        else{
            statusprj="In Progress"
        }



        row.innerHTML = `<td>${Empid}</td><td>${name}</td><td>    <span class="text-warning">${priystar(prjpri)}</span></td><td>${statusprj}</td><td>    <div class="progress">        <div class="progress-bar" role="progressbar" style="width: ${percentprj}%;" aria-valuenow="80" aria-valuemin="0"            aria-valuemax="100">${percentprj}%</div></div></td><td>    <a href="#" data-toggle="tooltip" data-placement="top" title="Additional info">        <i class="fas fa-info-circle"></i>       ${projectname}    </a></td>`;
        empwrkprglist.append(row);

    }
}

function priystar(count){
    var  star ="" ;
        for(let i =0;i<count;i++){
            star=star+"&#9733;";
        }
    return star;
}

