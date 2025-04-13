from fastapi import HTTPException
from typing import Optional
from bson import ObjectId
from database.database import db
from fastapi.encoders import jsonable_encoder

# Get collection
player_stats_collection = db.player_stats

# Helper function to convert MongoDB document to response format
def convert_doc_id(doc):
    if doc.get("_id"):
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

# Get all player stats with filtering and pagination
async def get_player_stats(
    page: int = 1,
    page_size: int = 10,
    player_name: Optional[str] = None,
    position: Optional[str] = None,
    opponent: Optional[str] = None,
    season: Optional[str] = None,
    game_type: Optional[str] = None,
    stat_category: Optional[str] = None
):
    # Calculate skip for pagination
    skip = (page - 1) * page_size
    
    # Build filter query
    query = {}
    
    if player_name:
        query["playerName"] = {"$regex": player_name, "$options": "i"}
    
    if position:
        query["position"] = position
    
    if opponent:
        query["opponent"] = opponent
    
    if season:
        query["season"] = season
    
    if game_type:
        query["gameType"] = game_type
    
    # Add stat category filtering
    if stat_category:
        if stat_category == "passing":
            query["$or"] = [{"passingYards": {"$gt": 0}}, {"passingTDs": {"$gt": 0}}]
        elif stat_category == "rushing":
            query["$or"] = [{"rushingYards": {"$gt": 0}}, {"rushingTDs": {"$gt": 0}}]
        elif stat_category == "receiving":
            query["$or"] = [{"receptions": {"$gt": 0}}, {"receivingYards": {"$gt": 0}}]
        elif stat_category == "defense":
            query["$or"] = [
                {"tackles": {"$gt": 0}}, 
                {"sacks": {"$gt": 0}}, 
                {"interceptions": {"$gt": 0}}
            ]
        elif stat_category == "special-teams":
            query["position"] = {"$in": ["K", "P"]}
    
    # Count total documents that match the query
    total = player_stats_collection.count_documents(query)
    
    # Get results with pagination
    cursor = player_stats_collection.find(query).skip(skip).limit(page_size)
    results = list(cursor)
    
    # Convert ObjectId to string
    for item in results:
        convert_doc_id(item)
    
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "results": results
    }
    
    
    
    
    
    

# Get a player stat by ID
async def get_player_stat_by_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = player_stats_collection.find_one({"_id": ObjectId(id)})
    if not result:
        raise HTTPException(status_code=404, detail="Player stat not found")
    
    return convert_doc_id(result)







# Get distinct values for dropdowns (helpful for frontend)
async def get_distinct_positions():
    positions = player_stats_collection.distinct("position")
    return positions

async def get_distinct_seasons():
    seasons = player_stats_collection.distinct("season")
    return seasons

async def get_distinct_opponents():
    opponents = player_stats_collection.distinct("opponent")
    return opponents

async def get_distinct_game_types():
    game_types = player_stats_collection.distinct("gameType")
    return game_types