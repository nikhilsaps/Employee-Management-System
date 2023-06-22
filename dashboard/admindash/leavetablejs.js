const request = indexedDB.open('LeaveTrack', 1);

// Handle database open success
request.onsuccess = function (event) {
  const db = event.target.result;

  // Start a transaction and specify the object store to use
  const transaction = db.transaction(['empleave'], 'readonly');
  const objectStore = transaction.objectStore('empleave');

  // Retrieve all records from the object store
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function (event) {
    const records = event.target.result;

    // Generate table rows dynamically based on the retrieved records
    const tableBody = document.getElementById('table-body');

    function generateTableRows(data) {
      tableBody.innerHTML = '';

      data.forEach(function (record) {
        const row = document.createElement('tr');

        const empIdCell = document.createElement('td');
        empIdCell.textContent = record.EmployeeID;
        row.appendChild(empIdCell);

        const empNameCell = document.createElement('td');
        empNameCell.textContent = record.Empname;
        row.appendChild(empNameCell);

        const empDateCell = document.createElement('td');
        empDateCell.textContent = record.date;
        row.appendChild(empDateCell);

        const punchInCell = document.createElement('td');
        punchInCell.textContent = record.reason;
        row.appendChild(punchInCell);

        const punchOutCell = document.createElement('td');
        punchOutCell.textContent = record.note;
        row.appendChild(punchOutCell);




        const approveCell = document.createElement('td');
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Approve';
        approveButton.classList.add('btn', 'btn-success');
        approveButton.addEventListener('click', function () {

          alert("leave is Approved")
          approveLeave(record.empid, record.date);
        });
        approveCell.appendChild(approveButton);
        row.appendChild(approveCell);



        tableBody.appendChild(row);
      });
    }

    // Initial generation of table rows
    generateTableRows(records);

    // Function to filter table rows based on date
    function filterTableRows() {
      const filterInput = document.getElementById('date-filter');
      const filterValue = filterInput.value;
    
      let filteredRecords = records;
    
      if (filterValue) {
        filteredRecords = records.filter(function (record) {
          return record.date === filterValue;
        });
      }
    
      generateTableRows(filteredRecords);
    }

    // Attach event listener to the date filter input
    const filterInput = document.getElementById('date-filter');
    filterInput.addEventListener('change', filterTableRows);
  };

  // Handle errors
  getAllRequest.onerror = function (event) {
    console.error('Error retrieving records:', event.target.error);
  };

  // Complete the transaction
  transaction.oncomplete = function (event) {
    db.close();
  };
};

// Handle database open errors
request.onerror = function (event) {
  console.error('Database error:', event.target.error);
};
