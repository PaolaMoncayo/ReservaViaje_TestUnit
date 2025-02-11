# **ReservaViaje - Pruebas Unitarias** 🏝️✨

## 🚀 **Descripción de la Aplicación**
ReservaViaje es una plataforma diseñada para facilitar la búsqueda, reserva y cancelación de viajes de manera rápida y segura. 🌐💼 Con una interfaz intuitiva y procesos optimizados, garantizamos una experiencia de usuario excepcional. 

## 🛠️ **Tecnologías Utilizadas**
- **Frontend desarrollado en React** ⚛️
- **Pruebas unitarias con Unit.js** ✅
- **Autenticación y seguridad implementadas** 🔐

## 📌 **Características Principales**
1. **Búsqueda de viajes** ✈️📅  
2. **Reserva de viajes** 🏨💳  
3. **Cancelación de reservas** ❌🛑  
4. **Notificaciones de confirmación** 📩🔔  
5. **Gestión de pagos segura** 🔒💰  

## 📊 **Casos de Prueba con Unit.js** 🧪⚙️

### ✔️ **Test: Búsqueda de viajes**
**📍 Descripción**: Se prueba que el sistema retorne correctamente los viajes disponibles según criterios de búsqueda.  

**🔧 Herramientas**: Unit.js  

**🎯 Criterios de aceptación**: Se debe recibir un array con resultados válidos.  

**📝 Ejemplo:**  
```javascript
const test = require('unit.js');
const { buscarViajes } = require('../src/services/viajeService');

describe('Prueba de búsqueda de viajes', function() {
    it('Debe devolver un array con viajes', async function() {
        const resultado = await buscarViajes({ destino: 'París', fecha: '2025-07-15' });
        test.array(resultado).isNotEmpty();
    });
});
