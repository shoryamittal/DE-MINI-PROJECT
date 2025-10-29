from flask import Flask, render_template, jsonify
from pymongo import MongoClient
import os # We'll use this to check our templates folder

# Initialize the Flask application
app = Flask(__name__)

# --- 1. MongoDB Connection ---
# !! Make sure this URI is correct for your database !!
# (And make sure your MongoDB server is running!)
MONGO_URI = "mongodb://localhost:27017/"
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client['health_dashboard'] # Your database name
    patients_collection = db['patients'] # Your patients collection
    staff_collection = db['staff']     # Your staff collection
    print("MongoDB connected successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    print("Please make sure your MongoDB server is running.")

# --- 2. Main Route (Serves your HTML) ---
@app.route('/')
def home():
    """
    Serves the main index.html file from the 'templates' folder.
    """
    # Check if the templates folder exists
    template_folder = os.path.join(os.path.dirname(__file__), 'templates')
    if not os.path.exists(template_folder):
        return "Error: 'templates' folder not found.", 404
    if not os.path.exists(os.path.join(template_folder, 'index.html')):
         return "Error: 'index.html' not found in 'templates' folder.", 404
         
    return render_template('index.html')

# --- 3. API Endpoints (These are MISSING from your code) ---

@app.route('/api/patient-data')
def get_patient_data():
    """
    API endpoint to get all patient (bed) data from MongoDB.
    """
    try:
        patients_list = []
        for p in patients_collection.find():
            # Convert MongoDB's '_id' to a string for JSON
            p['_id'] = str(p['_id']) 
            patients_list.append(p)
        return jsonify(patients_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/staff-data')
def get_staff_data():
    """
    API endpoint to get all staff data from MongoDB.
    """
    try:
        staff_list = []
        for s in staff_collection.find():
            s['_id'] = str(s['_id']) # Convert _id to string
            staff_list.append(s)
        return jsonify(staff_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- 4. Run the App ---
if __name__ == '__main__':
    # This check is crucial
    print("Starting Flask server...")
    app.run(debug=True)