# Utiliser une image Python légère
FROM python:3.11-slim

# Définir le dossier de travail
WORKDIR /app

# Copier et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Exposer le port de FastAPI
EXPOSE 8000

# Lancer FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
