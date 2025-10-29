document.addEventListener('DOMContentLoaded', function () {

    // --- NEW: Detailed Patient Data ---
    // This array now drives both Bed Management and Reports
    const bedData = [
        { 
            room: '101A', wing: 'ICU', patient: 'Amit Patel', status: 'occupied', notes: 'Critical',
            id: 'P001', dob: '1985-05-20', age: 39, sex: 'Male', doctor: 'Dr. Gupta',
            admission: '2025-10-28', diagnosis: 'Myocardial Infarction', allergies: 'Penicillin' 
        },
        { 
            room: '101B', wing: 'ICU', patient: 'Sunita Rao', status: 'occupied', notes: 'Stable',
            id: 'P002', dob: '1992-11-10', age: 32, sex: 'Female', doctor: 'Dr. Sharma',
            admission: '2025-10-27', diagnosis: 'Pneumonia', allergies: 'None' 
        },
        { 
            room: '102A', wing: 'ICU', patient: 'N/A', status: 'available', notes: 'Ready',
            id: null
        },
        { 
            room: '205', wing: 'Cardiology', patient: 'Rajesh Kumar', status: 'occupied', notes: 'Post-Op',
            id: 'P003', dob: '1968-01-30', age: 57, sex: 'Male', doctor: 'Dr. Gupta',
            admission: '2025-10-25', diagnosis: 'CABG', allergies: 'None' 
        },
        { 
            room: '206', wing: 'Cardiology', patient: 'N/A', status: 'cleaning', notes: 'Discharge 10 AM',
            id: null 
        },
        { 
            room: '310', wing: 'Surgery', patient: 'Vikram Singh', status: 'occupied', notes: 'Pre-Op',
            id: 'P004', dob: '1977-07-15', age: 48, sex: 'Male', doctor: 'Dr. Chen',
            admission: '2025-10-29', diagnosis: 'Appendicitis', allergies: 'Latex' 
        },
        { 
            room: '311', wing: 'Surgery', patient: 'N/A', status: 'available', notes: 'Ready',
            id: null
        },
        { 
            room: '401', wing: 'Maternity', patient: 'Meera Iyer', status: 'occupied', notes: 'Labor',
            id: 'P005', dob: '1995-02-05', age: 30, sex: 'Female', doctor: 'Dr. Sharma',
            admission: '2025-10-29', diagnosis: 'Active Labor', allergies: 'None' 
        }
    ];

    // --- Sidebar Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentWrapper = document.getElementById('content-wrapper');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        contentWrapper.classList.toggle('sidebar-collapsed');
    });
    
    // Auto-collapse sidebar on smaller screens initially
    if (window.innerWidth <= 768) {
         sidebar.classList.add('collapsed');
         contentWrapper.classList.add('sidebar-collapsed');
    }

    // --- Page Navigation Logic ---
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const pageSections = document.querySelectorAll('.page-section');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Remove 'active' from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // 2. Add 'active' to the clicked item
            item.classList.add('active');

            // 3. Get the target page ID from data-page attribute
            const targetPageId = 'page-' + item.getAttribute('data-page');

            // 4. Hide all page sections
            pageSections.forEach(section => section.classList.remove('active'));

            // 5. Show the target page section
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // 6. Close sidebar on mobile after navigation
            if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
            }
        });
    });

    // --- Chart.js Initializations ---

    // 1. Bed Occupancy Chart
    const bedCtx = document.getElementById('bedOccupancyChart');
    if (bedCtx) {
        new Chart(bedCtx, {
            type: 'doughnut',
            data: {
                labels: ['ICU', 'Cardiology', 'Surgery', 'Maternity', 'General'],
                datasets: [{
                    label: 'Beds Occupied',
                    data: [18, 45, 30, 22, 49],
                    backgroundColor: [
                        '#ef4444', // Red
                        '#0a4d9c', // Deep Blue
                        '#f59e0b', // Amber
                        '#10b981', // Emerald
                        '#007bff'  // Bright Blue
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }

    // 2. ER Wait Time Chart
    const erCtx = document.getElementById('erWaitTimeChart');
    if (erCtx) {
        new Chart(erCtx, {
            type: 'line',
            data: {
                labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'],
                datasets: [
                    {
                        label: 'Wait Time (min)',
                        data: [15, 12, 25, 45, 32, 28],
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Target',
                        data: [30, 30, 30, 30, 30, 30],
                        borderColor: '#ef4444',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutes'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
    
    // 3. Analytics Admissions Chart
    const analyticsCtx = document.getElementById('analyticsAdmissionsChart');
    if (analyticsCtx) {
         new Chart(analyticsCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Simplified labels
                datasets: [
                    {
                        label: 'Admissions',
                        data: [310, 345, 320, 350],
                        backgroundColor: '#007bff',
                        barPercentage: 0.5,
                    },
                    {
                        label: 'Discharges',
                        data: [300, 330, 315, 340],
                        backgroundColor: '#10b981',
                        barPercentage: 0.5,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: false },
                    y: { stacked: false, beginAtZero: true }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // --- Populate Bed Management Table ---
    const bedTableBody = document.getElementById('bed-table-body');
    
    function populateBedTable() {
        if (!bedTableBody) return;
        bedTableBody.innerHTML = ''; // Clear existing table

        bedData.forEach(bed => {
            const row = document.createElement('tr');
            
            // Add data attributes to the row for the modal
            if (bed.id) {
                row.classList.add('clickable-patient');
                // Store all bed data on the row element
                Object.keys(bed).forEach(key => {
                    row.dataset[key] = bed[key];
                });
            }
            
            row.innerHTML = `
                <td>${bed.room}</td>
                <td>${bed.wing}</td>
                <td>${bed.patient}</td>
                <td><span class="status ${bed.status}">${bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}</span></td>
                <td>${bed.notes}</td>
            `;
            bedTableBody.appendChild(row);
        });
    }

    // --- NEW: Patient Modal Logic ---
    const modal = document.getElementById('patient-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPatientName = document.getElementById('modal-patient-name');
    const modalPatientDetails = document.getElementById('modal-patient-details');

    function openPatientModal(data) {
        modalPatientName.textContent = data.patient || 'Patient Details';
        modalPatientDetails.innerHTML = `
            <div class="detail-item"><strong>Patient ID</strong> <span>${data.id}</span></div>
            <div class="detail-item"><strong>Date of Birth</strong> <span>${data.dob} (Age: ${data.age})</span></div>
            <div class="detail-item"><strong>Sex</strong> <span>${data.sex}</span></div>
            <div class="detail-item"><strong>Room</strong> <span>${data.room} (${data.wing})</span></div>
            <div class="detail-item"><strong>Admitting Doctor</strong> <span>${data.doctor}</span></div>
            <div class="detail-item"><strong>Admission Date</strong> <span>${data.admission}</span></div>
            <div class="detail-item" style="grid-column: 1 / -1;"><strong>Diagnosis</strong> <span>${data.diagnosis}</span></div>
            <div class="detail-item" style="grid-column: 1 / -1;"><strong>Allergies</strong> <span>${data.allergies}</span></div>
        `;
        modal.style.display = 'block';
    }

    function closePatientModal() {
        modal.style.display = 'none';
    }

    // Event listener for bed table (using event delegation)
    if (bedTableBody) {
        bedTableBody.addEventListener('click', (e) => {
            const row = e.target.closest('tr.clickable-patient');
            if (!row) return; // Didn't click a valid row
            openPatientModal(row.dataset);
        });
    }

    // Event listeners for closing the modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closePatientModal);
    }
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closePatientModal();
        }
    });

    // --- NEW: Report Page Logic ---
    const reportTableBody = document.getElementById('report-table-body');
    const reportTableHeaders = document.querySelectorAll('#report-table th.sortable');
    let currentSort = { key: 'patient', order: 'asc' };

    // Filter for only occupied beds
    const reportData = bedData.filter(bed => bed.status === 'occupied');

    function populateReportTable() {
        if (!reportTableBody) return;
        
        // Sort data
        const sortedData = [...reportData].sort((a, b) => {
            let valA = a[currentSort.key];
            let valB = b[currentSort.key];
            
            if (valA < valB) return currentSort.order === 'asc' ? -1 : 1;
            if (valA > valB) return currentSort.order === 'asc' ? 1 : -1;
            return 0;
        });
        
        reportTableBody.innerHTML = ''; // Clear table
        sortedData.forEach(bed => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bed.patient}</td>
                <td>${bed.id}</td>
                <td>${bed.room}</td>
                <td>${bed.diagnosis}</td>
                <td>${bed.doctor}</td>
            `;
            reportTableBody.appendChild(row);
        });
    }

    // Sorting event listeners
    reportTableHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const sortKey = th.dataset.sortKey;
            
            // Remove old sorting classes
            reportTableHeaders.forEach(h => h.classList.remove('sorted-asc', 'sorted-desc'));

            if (currentSort.key === sortKey) {
                currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.key = sortKey;
                currentSort.order = 'asc';
            }
            
            // Add new sorting class
            th.classList.add(currentSort.order === 'asc' ? 'sorted-asc' : 'sorted-desc');
            
            populateReportTable();
        });
    });

    // --- NEW: Settings Page Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme in localStorage
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Profile form
    document.getElementById('profile-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name').value;
        alert(`Profile saved for ${userName}!`);
        // In a real app, you'd send this to a server.
    });


    // --- Initial Data Population ---
    populateBedTable();
    populateReportTable();
    
    // Set initial sort indicator on report table
    document.querySelector(`#report-table th[data-sort-key="${currentSort.key}"]`)?.classList.add('sorted-asc');
});