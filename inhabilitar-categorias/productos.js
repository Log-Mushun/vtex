const axios = require('axios');

async function disableAllProducts(baseUrl, appKey, appToken) {
  try {
    const headers = {
      'X-VTEX-API-AppKey': appKey,
      'X-VTEX-API-AppToken': appToken,
      'Content-Type': 'application/json'
    };

    let from = 0;
    const to = 49; // Productos por página
    let totalProcessed = 0;
    const totalProducts = 3548;

    while (from < totalProducts) {
      console.log(`Procesando productos del ${from + 1} al ${Math.min(from + to, totalProducts)} de ${totalProducts}`);
      
      // 1. Obtener productos con paginación
      const response = await axios.get(
        `${baseUrl}/api/catalog_system/pub/products/search?_from=${from}&_to=${from + to}`, 
        { headers }
      );
      const products = response.data;

      // 2. Desactivar cada producto
      for (const product of products) {
        try {
          const body = {
            ...product,
            isActive: false
          };

          await axios.put(
            `${baseUrl}/api/catalog/pvt/product/${product.id}`, 
            body,
            { headers }
          );
          totalProcessed++;
          console.log(`Producto ${product.id} desactivado (${totalProcessed}/${totalProducts})`);
        } catch (error) {
          console.error(`Error al desactivar producto ${product.id}:`, error.response?.data || error.message);
        }
      }

      from += to;
    }

    console.log(`Proceso completado. Total de productos procesados: ${totalProcessed}`);
  } catch (error) {
    console.error('Error general:', error.response?.data || error.message);
  }
}

// Uso
const baseUrl = 'https://internalinterview.vtexcommercestable.com.br';
const appKey = 'vtexappkey-internalinterview-ABPOIP';
const appToken = 'NOXSQGIHGHDODMQPNGXUGQIASRPUHSRICJTYKUKXAIRFUQUDSEPHIBEYJGSKYBONPVSDHTOZCYGATGYVRHFMJOSLMYWKIRDIJUPFXSPAAVFRSGBARRYLOSHLOIPDMTWB';

disableAllProducts(baseUrl, appKey, appToken);