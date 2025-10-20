db = db.getSiblingDB('api_env');

db.createCollection('envs');

// Inserta el entorno predeterminado
db.envs.insertOne({
    "name": "develop",
    "description": "dev environment"
});