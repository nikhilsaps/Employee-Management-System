console.log("welcome to punch with selfie page ")

//code  to work with camera 
// Get the necessary HTML elements
const video = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvasElement');

// Get the user media (camera) and display it in the video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing the camera.', error);
    });

//Function to capture the image
function captureImage() {
    canvas.style.display = "block";
    // Draw the current video frame onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL
    const imageData = canvas.toDataURL('image/png');

    // Open the image in a new window/tab

}

// Add click event listener to the capture button
captureButton.addEventListener('click', captureImage);

////create  a table /database timesheet for  timesheet 
var request = indexedDB.open("TimeSheet", 1);
// Create the object store
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("emptime", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("EmployeeID", "EmployeeID", { unique: false });

    objectStore.createIndex("PunchIn", "PunchIn", { unique: false });
    objectStore.createIndex("PunchOut", "PunchOut", { unique: false });


};

function addtime(EmployeeID,PunchIn,PunchOut) {
  var request = indexedDB.open("TimeSheet", 1);
  request.onsuccess = function (event) {
      var db = event.target.result;
      var transaction = db.transaction(["emptime"], "readwrite");
      var objectStore = transaction.objectStore("emptime");
      var user = { EmployeeID: EmployeeID, PunchIn:PunchIn, PunchOut:PunchOut};
      var request = objectStore.add(user);
      request.onsuccess = function (event) {
          console.log("time added ");
              };
      request.onerror = function (event) {
          console.log("failed  ");
      };
  };
}

