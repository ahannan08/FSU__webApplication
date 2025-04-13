import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the MongoDB URI from the environment variables
MONGO_URI = os.getenv("MONGO_URI")


# Connect to MongoDB using the URI
client = MongoClient(MONGO_URI)
db = client["FSU-DATA"]

# Create a collection for player stats
player_stats_collection = db.player_stats

def init_db():
    # Check if collection already has data
    if player_stats_collection.count_documents({}) == 0:
        # Load sample data from JSON file
        current_dir = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(current_dir, "data.json")
        
        try:
            with open(json_path, "r") as f:
                sample_data = json.load(f)
                
            # Insert sample data
            player_stats_collection.insert_many(sample_data)
            print("Database initialized with sample data from data.json")
        except Exception as e:
            print(f"Error initializing database: {e}")
    else:
        print("Database already contains data. Skipping initialization.")

if __name__ == "__main__":
    init_db()