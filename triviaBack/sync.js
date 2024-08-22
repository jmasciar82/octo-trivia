require('dotenv').config(); // Cargar las variables de entorno

const { MongoClient } = require('mongodb');

// Configuración de MongoDB Atlas
const atlasUri = process.env.MONGO_URI;
const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

// Configuración de MongoDB Local
const localUri = process.env.MONGO_LOCAL_URI;

console.log('MongoDB Atlas URI:', atlasUri);  // Verifica que se está leyendo correctamente
console.log('MongoDB Local URI:', localUri);   // Verifica que se está leyendo correctamente

async function syncData() {
    const atlasClient = new MongoClient(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const localClient = new MongoClient(localUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Conectar a MongoDB Atlas
        await atlasClient.connect();
        const atlasCollection = atlasClient.db(databaseName).collection(collectionName);
        const atlasDocs = await atlasCollection.find().toArray();

        // Conectar a MongoDB Local
        await localClient.connect();
        const localCollection = localClient.db(databaseName).collection(collectionName);

        // Insertar datos en MongoDB Local
        await localCollection.deleteMany({}); // Opcional: Limpiar la colección local
        await localCollection.insertMany(atlasDocs);

        console.log('Datos sincronizados correctamente');
    } catch (error) {
        console.error('Error durante la sincronización:', error);
    } finally {
        await atlasClient.close();
        await localClient.close();
    }
}

// Ejecutar la sincronización
syncData();
