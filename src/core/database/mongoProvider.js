const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    mongoose.set('debug', true);

    if (!mongoUri) {
        console.error('Error: MONGODB_URI no está definida en las variables de entorno.');
        process.exit(1); // Termina la aplicación si no hay URI de conexión
    }

    try {
        // La función connect devuelve una promesa.
        // Una vez resuelta, mongoose.connection está disponible globalmente.
        await mongoose.connect(mongoUri);
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1); // Sale de la aplicación si falla la conexión
    }
};

module.exports = connectDB;