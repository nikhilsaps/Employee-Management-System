enrtyofts

function enrtyofts(){
    let date =document.getElementById("date").value;
    let punchIn =document.getElementById("punchIn").value;
    let punchOut =document.getElementById("punchOut").value;
    console.log(date,punchIn,punchOut);
}


// Open IndexedDB and create or update the time sheet
function addOrUpdateTimeSheet(date, empId, punchIn, punchOut) {
    // Open the IndexedDB database
    const request = indexedDB.open('TimeSheetDB', 1);
  
    // Handle database open success
    request.onsuccess = function(event) {
      const db = event.target.result;
  
      // Start a transaction and specify the object store(s) to use
      const transaction = db.transaction(['TimeSheetStore'], 'readwrite');
      const objectStore = transaction.objectStore('TimeSheetStore');
  
      // Check if the date already exists in the object store
      const getRequest = objectStore.get(date);
      getRequest.onsuccess = function(event) {
        const existingRecord = event.target.result;
  
        // If the date already exists, update the record
        if (existingRecord) {
          existingRecord.empId = empId;
          existingRecord.punchIn = punchIn;
          existingRecord.punchOut = punchOut;
  
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
            punchOut: punchOut
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
  