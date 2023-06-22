const request = indexedDB.open('TimeSheet', 1);

// Handle database open success
request.onsuccess = function(event) {
  const db = event.target.result;

  // Start a transaction and specify the object store to use
  const transaction = db.transaction(['emptime'], 'readonly');
  const objectStore = transaction.objectStore('emptime');

  // Retrieve all records from the object store
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function(event) {
    const records = event.target.result;

    // Generate table rows dynamically based on the retrieved records
    const tableBody = document.getElementById('table-body');

    function generateTableRows(data) {
      tableBody.innerHTML = '';

      data.forEach(function(record) {
        const row = document.createElement('tr');

        const empIdCell = document.createElement('td');
        empIdCell.textContent = record.empId;
        row.appendChild(empIdCell);

        const empNameCell = document.createElement('td');
        empNameCell.textContent = record.empname;
        row.appendChild(empNameCell);

        const empDateCell = document.createElement('td');
        empDateCell.textContent = record.date;
        row.appendChild(empDateCell);

        const punchInCell = document.createElement('td');
        punchInCell.textContent = record.punchIn;
        row.appendChild(punchInCell);

        const punchOutCell = document.createElement('td');
        punchOutCell.textContent = record.punchOut;
        row.appendChild(punchOutCell);

        tableBody.appendChild(row);
      });
    }

    // Initial generation of table rows
    generateTableRows(records);

    // Function to filter table rows based on date
    function filterTableRows() {
      const filterInput = document.getElementById('date-filter');
      const filterValue = filterInput.value;

      const filteredRecords = records.filter(function(record) {
        return record.date === filterValue;
      });

      generateTableRows(filteredRecords);
    }

    // Attach event listener to the date filter input
    const filterInput = document.getElementById('date-filter');
    filterInput.addEventListener('input', filterTableRows);
  };

  // Handle errors
  getAllRequest.onerror = function(event) {
    console.error('Error retrieving records:', event.target.error);
  };

  // Complete the transaction
  transaction.oncomplete = function(event) {
    db.close();
  };
};

// Handle database open errors
request.onerror = function(event) {
  console.error('Database error:', event.target.error);
};
