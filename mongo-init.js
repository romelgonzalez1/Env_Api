db = db.getSiblingDB('api_env');

db.createCollection('envs');
db.createCollection('usuarios');

// Inserta el entorno predeterminado
db.envs.insertOne({
    "name": "develop",
    "description": "dev environment"
});

db.usuarios.insertOne({
    "username": "admin",
    "password": "$2b$10$4d2avBuUwYyypKFFg8jv9uWf4bLOa1vdxQTFJvJH6J.Y5vXchWFN6"
});