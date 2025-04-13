from fastapi import APIRouter, Query, Path
from typing import Optional
from controllers.controllers import (
    get_player_stats as fetch_player_stats,
    get_player_stat_by_id as fetch_player_stat_by_id,
    get_distinct_positions as fetch_distinct_positions,
    get_distinct_seasons as fetch_distinct_seasons,
    get_distinct_opponents as fetch_distinct_opponents,
    get_distinct_game_types as fetch_distinct_game_types,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["player_stats"]
)








# Get all player stats with pagination and filtering
@router.get("/player-stats", summary="Get all player stats")
async def get_all_player_stats(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Number of items per page"),
    player_name: Optional[str] = Query(None, description="Filter by player name"),
    position: Optional[str] = Query(None, description="Filter by position"),
    opponent: Optional[str] = Query(None, description="Filter by opponent"),
    season: Optional[str] = Query(None, description="Filter by season"),
    game_type: Optional[str] = Query(None, description="Filter by game type"),
    stat_category: Optional[str] = Query(None, description="Filter by stat category")
):
    return await fetch_player_stats(
        page=page,
        page_size=page_size,
        player_name=player_name,
        position=position,
        opponent=opponent,
        season=season,
        game_type=game_type,
        stat_category=stat_category
    )







# Get a player stat by ID
@router.get("/player-stats/{id}", summary="Get a player stat by ID")
async def get_player_stat_by_id(id: str = Path(..., description="The ID of the player stat to retrieve")):
    return await fetch_player_stat_by_id(id)







# Get distinct values for dropdowns
@router.get("/player-stats/distinct/positions", summary="Get all distinct positions")
async def get_distinct_positions():
    return await fetch_distinct_positions()






@router.get("/player-stats/distinct/seasons", summary="Get all distinct seasons")
async def get_distinct_seasons():
    return await fetch_distinct_seasons()




@router.get("/player-stats/distinct/opponents", summary="Get all distinct opponents")
async def get_distinct_opponents():
    return await fetch_distinct_opponents()




@router.get("/player-stats/distinct/game-types", summary="Get all distinct game types")
async def get_distinct_game_types():
    return await fetch_distinct_game_types()