from pymongo import MongoClient

# --- 1. Your Data ---
bed_data = [
    { 
        "room": "101A", "wing": "ICU", "patient": "Amit Patel", "status": "occupied", "notes": "Critical",
        "id": "P001", "dob": "1985-05-20", "age": 39, "sex": "Male", "doctor": "Dr. Gupta",
        "admission": "2025-10-28", "diagnosis": "Myocardial Infarction", "allergies": "Penicillin" 
    },
    { 
        "room": "101B", "wing": "ICU", "patient": "Sunita Rao", "status": "occupied", "notes": "Stable",
        "id": "P002", "dob": "1992-11-10", "age": 32, "sex": "Female", "doctor": "Dr. Sharma",
        "admission": "2025-10-27", "diagnosis": "Pneumonia", "allergies": "None" 
    },
    { "room": "102A", "wing": "ICU", "patient": "N/A", "status": "available", "notes": "Ready", "id": None},
    { 
        "room": "205", "wing": "Cardiology", "patient": "Rajesh Kumar", "status": "occupied", "notes": "Post-Op",
        "id": "P003", "dob": "1968-01-30", "age": 57, "sex": "Male", "doctor": "Dr. Gupta",
        "admission": "2025-10-25", "diagnosis": "CABG", "allergies": "None" 
    },
    { "room": "206", "wing": "Cardiology", "patient": "N/A", "status": "cleaning", "notes": "Discharge 10 AM", "id": None },
    { 
        "room": "310", "wing": "Surgery", "patient": "Vikram Singh", "status": "occupied", "notes": "Pre-Op",
        "id": "P004", "dob": "1977-07-15", "age": 48, "sex": "Male", "doctor": "Dr. Chen",
        "admission": "2025-10-29", "diagnosis": "Appendicitis", "allergies": "Latex" 
    },
    { "room": "311", "wing": "Surgery", "patient": "N/A", "status": "available", "notes": "Ready", "id": None},
    { 
        "room": "401", "wing": "Maternity", "patient": "Meera Iyer", "status": "occupied", "notes": "Labor",
        "id": "P005", "dob": "1995-02-05", "age": 30, "sex": "Female", "doctor": "Dr. Sharma",
        "admission": "2025-10-29", "diagnosis": "Active Labor", "allergies": "None" 
    }
]

staff_data = [
    { "id": "S001", "name": "Dr. Rohan Gupta", "role": "Doctor", "department": "Cardiology", "shift": "Day (8am - 8pm)", "status": "On Shift" },
    { "id": "S002", "name": "Dr. Priya Sharma", "role": "Doctor", "department": "Maternity", "shift": "Day (8am - 8pm)", "status": "On Shift" },
    { "id": "S003", "name": "Dr. David Chen", "role": "Doctor", "department": "Surgery", "shift": "Day (8am - 8pm)", "status": "On Shift" },
    { "id": "S004", "name": "Dr. Alok Verma", "role": "Doctor", "department": "ICU", "shift": "Night (8pm - 8am)", "status": "On Call" },
    { "id": "S005", "name": "Anita Desai", "role": "Nurse", "department": "ICU", "shift": "Day (7am - 7pm)", "status": "On Shift" },
    { "id": "S006", "name": "Sanjay Patil", "role": "Nurse", "department": "ICU", "shift": "Day (7am - 7pm)", "status": "On Shift" },
    { "id": "S007", "name": "Deepa Mehta", "role": "Nurse", "department": "Cardiology", "shift": "Day (7am - 7pm)", "status": "On Shift" },
    { "id": "S008", "name": "Ravi Kumar", "role": "Nurse", "department": "Surgery", "shift": "Day (7am - 7pm)", "status": "On Shift" },
    { "id": "S009", "name": "Lakshmi Nair", "role": "Nurse", "department": "Maternity", "shift": "Day (7am - 7pm)", "status": "On Shift" },
    { "id": "S010", "name": "Vikram Solanki", "role": "Nurse", "department": "ICU", "shift": "Night (7pm - 7am)", "status": "Off Duty" },
    { "id": "S011", "name": "Pooja Bhatt", "role": "Nurse", "department": "Cardiology", "shift": "Night (7pm - 7am)", "status": "Off Duty" },
]

# --- 2. Connection ---
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)

db = client['health_dashboard']
patients_collection = db['patients']
staff_collection = db['staff']

try:
    # --- 3. Clear and Insert ---
    patients_collection.delete_many({})
    staff_collection.delete_many({})
    print("Cleared existing data...")

    patients_collection.insert_many(bed_data)
    staff_collection.insert_many(staff_data)
    print("Successfully seeded the database!")

except Exception as e:
    print(f"An error occurred (Is MongoDB running?): {e}")

finally:
    client.close()