console.log("welcome to punch with selfie page ")
document.getElementById("nameofemp").innerText=localStorage.getItem("nameofemp");

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


function punchwithselfiesubmit(){
    let  date  = document.getElementById("date").value;
    let punchin = document.getElementById("time").value;



    let  punchout =addTimeDuration(punchin);
    let  empid = localStorage.getItem("empidofemp");
    let empname = localStorage.getItem("nameofemp");

    addOrUpdateTimeSheet(date, empid,empname,punchin,punchout);

    alert("attendance  done");

}

function addOrUpdateTimeSheet(date, empId,empname, punchIn, punchOut) {
    // Open the IndexedDB database
    const request = indexedDB.open('TimeSheet', 1);
  
    // Handle database open success
    request.onsuccess = function(event) {
      const db = event.target.result;
  
      // Start a transaction and specify the object store(s) to use
      const transaction = db.transaction(['emptime'], 'readwrite');
      const objectStore = transaction.objectStore('emptime');
  
      // Check if the date already exists in the object store
      const getRequest = objectStore.get(date);
      getRequest.onsuccess = function(event) {
        const existingRecord = event.target.result;
  
        // If the date already exists, update the record
        if (existingRecord) {
          existingRecord.empId = empId;
          existingRecord.punchIn = punchIn;
          existingRecord.punchOut = punchOut;
          existingRecord.empname = empname;
  
          const updateRequest = objectStore.put(existingRecord);
          updateRequest.onsuccess = function(event) {
            console.log('Record updated successfully');
          };
          updateRequest.onerror = function(event) {
            console.error('Error updating record:', event.target.error);
          };
        }
        // If the date doesn't exist, create a new record
        else {
          const newRecord = {
            date: date,
            empId: empId,
            punchIn: punchIn,
            punchOut: punchOut,
            empname: empname
          };
  
          const addRequest = objectStore.add(newRecord);
          addRequest.onsuccess = function(event) {
            console.log('Record added successfully');
          };
          addRequest.onerror = function(event) {
            console.error('Error adding record:', event.target.error);
          };
        }
      };
  
      // Complete the transaction
      transaction.oncomplete = function(event) {
        console.log('Transaction completed');
        db.close();
      };
  
      // Handle errors
      transaction.onerror = function(event) {
        console.error('Transaction error:', event.target.error);
      };
    };
  
    // Handle database open errors
    request.onerror = function(event) {
      console.error('Database error:', event.target.error);
    };
  }
  function addTimeDuration(punchin) {
    const timeString = punchin; // Given time string
    const durationHours = 8; // Duration to add in hours
    const durationMinutes = 0; // Duration to add in minutes
  
    // Split the time string into hours and minutes
    const [hoursString, minutesString] = timeString.split(":");
    
    // Convert hours and minutes to integers
    let hours = parseInt(hoursString);
    let minutes = parseInt(minutesString);
  
    // Add the duration to hours and minutes
    hours += durationHours;
    minutes += durationMinutes;
  
    // Adjust hours and minutes if necessary
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
  
    // Format the updated time into a string representation
    const updatedTime = `${padZero(hours)}:${padZero(minutes)}`;
  
    console.log(updatedTime); 
    
    return updatedTime;// Output the updated time
  }
  
  // Function to pad a single digit number with a leading zero
  function padZero(num) {
    return num.toString().padStart(2, "0");
  }