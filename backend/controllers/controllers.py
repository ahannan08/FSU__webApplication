from fastapi import HTTPException
from typing import Optional
from bson import ObjectId
from database.database import db
from fastapi.encoders import jsonable_encoder
from pymongo import ASCENDING, DESCENDING


# Get collection
player_stats_collection = db.player_stats

# Helper function to convert MongoDB document to response format
def convert_doc_id(doc):
    if doc.get("_id"):
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc



async def get_player_stats(
    page: int = 1,
    page_size: int = 10,
    player_name: Optional[str] = None,
    position: Optional[str] = None,
    opponent: Optional[str] = None,
    season: Optional[str] = None,
    game_type: Optional[str] = None,
    stat_category: Optional[str] = None,
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = "desc"
):
    skip = (page - 1) * page_size
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

    # Only apply stat_category filter if provided explicitly (avoid when sorting)
    if stat_category:
        or_conditions = []
        if stat_category == "passing":
            or_conditions = [{"passingYards": {"$gt": 0}}, {"passingTDs": {"$gt": 0}}]
        elif stat_category == "rushing":
            or_conditions = [{"rushingYards": {"$gt": 0}}, {"rushingTDs": {"$gt": 0}}]
        elif stat_category == "receiving":
            or_conditions = [{"receptions": {"$gt": 0}}, {"receivingYards": {"$gt": 0}}]
        elif stat_category == "defense":
            or_conditions = [{"tackles": {"$gt": 0}}, {"sacks": {"$gt": 0}}, {"interceptions": {"$gt": 0}}]
        elif stat_category == "special-teams":
            query.setdefault("position", {"$in": ["K", "P"]})
        if or_conditions:
            query["$or"] = or_conditions

    # Sort config
    sort_field = sort_by if sort_by else "_id"
    sort_dir = DESCENDING if sort_order == "desc" else ASCENDING

    total = player_stats_collection.count_documents(query)
    cursor = player_stats_collection.find(query).sort(sort_field, sort_dir).skip(skip).limit(page_size)
    results = list(cursor)

    for item in results:
        convert_doc_id(item)

    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "results": jsonable_encoder(results)
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