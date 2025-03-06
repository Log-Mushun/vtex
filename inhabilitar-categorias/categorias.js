const axios = require('axios');

async function disableAllCategories(baseUrl, appKey, appToken) {
  try {
    // Configuración de headers para autenticación
    const headers = {
      'X-VTEX-API-AppKey': appKey,
      'X-VTEX-API-AppToken': appToken,
      'Content-Type': 'application/json'
    };

    // 1. Obtener todas las categorías
    console.log('Obteniendo categorías...');
    const response = await axios.get(`${baseUrl}/api/catalog_system/pub/category/tree/3`, { headers });
    const categories = response.data;
    console.log('Categorías obtenidas:', categories);

    // 2. Función recursiva para obtener todos los IDs
    function getAllCategoryIds(categories) {
      let ids = [];
      categories.forEach(category => {
        ids.push(category.id);
        if (category.hasChildren) {
          ids = ids.concat(getAllCategoryIds(category.children));
        }
      });
      return ids;
    }

    // 3. Obtener todos los IDs
    const allIds = getAllCategoryIds(categories);
    console.log('IDs encontrados:', allIds);

    // 4. Deshabilitar cada categoría
    for (const id of allIds) {
      try {
        // Primero obtener los detalles de la categoría
        const categoryDetails = await axios.get(
          `${baseUrl}/api/catalog/pvt/category/${id}`,
          { headers }
        );

        // Crear el body con todos los datos necesarios
        const body = {
          ...categoryDetails.data,
          IsActive: false
        };

        console.log('Intentando deshabilitar categoría:', id);
        console.log('Body:', body);
        
        await axios.put(
          `${baseUrl}/api/catalog/pvt/category/${id}`, 
          body,
          { headers }
        );
        console.log(`Categoría ${id} deshabilitada`);
      } catch (error) {
        console.error(`Error al deshabilitar categoría ${id}:`, error.response?.data || error.message);
      }
    }

    console.log('Proceso completado');
  } catch (error) {
    console.error('Error general:', error.response?.data || error.message);
  }
}

// Uso
const baseUrl = 'https://internalinterview.vtexcommercestable.com.br';
const appKey = 'vtexappkey-internalinterview-ABPOIP';
const appToken = 'NOXSQGIHGHDODMQPNGXUGQIASRPUHSRICJTYKUKXAIRFUQUDSEPHIBEYJGSKYBONPVSDHTOZCYGATGYVRHFMJOSLMYWKIRDIJUPFXSPAAVFRSGBARRYLOSHLOIPDMTWB';

disableAllCategories(baseUrl, appKey, appToken);