from pydantic import BaseModel
from typing import Optional

class PlayerStat(BaseModel):
    playerName: str
    position: str
    opponent: str
    gameType: str
    location: str
    date: str
    season: str
    result: str
    passingYards: int
    passingTDs: int
    passingInt: int
    rushingYards: int
    rushingTDs: int
    receptions: int
    receivingYards: int
    receivingTDs: int
    tackles: int
    sacks: float
    interceptions: int
    fieldGoals: Optional[str] = None
    extraPoints: Optional[str] = None
