from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import logging
import asyncio  # Pour la gestion concurrentielle du DataFrame

# Configuration du logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.info("FastAPI démarre...")
app = FastAPI()
logger.info("FastAPI a démarré !")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines (React, localhost...)
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes HTTP (GET, POST...)
    allow_headers=["*"],  # Autorise tous les headers
)


# Nom de l'index
INDEX_NAME = "Accueil"

# Création du DataFrame global + verrou
df = pd.DataFrame(data=[[1, 2]], columns=["A", "B"])
df_lock = asyncio.Lock()

@app.get("/")
async def root():
    return {"message": "L'API fonctionne !"}

@app.post(f"/{INDEX_NAME}/Ajout_row/")
async def ajout_row():
    """
    Ajoute une ligne au DataFrame.
    """
    global df
    async with df_lock:  # Empêche les accès concurrents
        df = pd.concat([df, df], ignore_index=True)
    return {"message": "Ligne(s) ajoutée(s)", "shape": df.shape}

@app.get(f"/{INDEX_NAME}/Affichage_df")
async def affichage_df():
    """
    Renvoie le DataFrame sous forme JSON.
    """
    async with df_lock:
        return df.to_dict(orient="records")
