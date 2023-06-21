console.log("welcome to admin dashboard\n-------------------------------------");

if (localStorage.getItem("rowcount") == null) {
    document.getElementById("empcount").innerText = "0";
} else {
    document.getElementById("empcount").innerText = localStorage.getItem("rowcount");
}