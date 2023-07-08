function consultarClima() {
  const ciudad = document.getElementById('ciudad').value;
  const API_KEY = '4bf1509cee1e4724d3843ad1a486e86f';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    })
    .then(data => {
      // Mostrar resultado en la tabla
      const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
      const fila = tabla.insertRow();
      fila.insertCell().innerHTML = data.name;
      fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      fila.insertCell().innerHTML = data.weather[0].description;
    })
    .catch(error => {
      console.error('Error al consultar el clima', error);
    });
}

function consultarClimas() {
  const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
  const API_KEY = '4bf1509cee1e4724d3843ad1a486e86f';
  Promise.all(ciudades.map(ciudad => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
    }))
    .then(data => {
      // resultados
      const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
      data.forEach(ciudad => {
        const fila = tabla.insertRow();
        fila.insertCell().innerHTML = ciudad.name;
        fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML = ciudad.weather[0].description;
      });
    })
    .catch(error => {
      console.error('Error al consultar el clima', error);
    });
}
// Limpiar tablas
function limpiarTabla() {
  var tabla = document.getElementById("tabla-clima-body"); // Reemplaza "miTabla" con el ID de tu tabla
  
  while (tabla.hasChildNodes()) {
    tabla.removeChild(tabla.firstChild);
  }
}

setInterval(function() {
  var elemento = document.getElementById("elemento");
  if (elemento.classList.contains("background-a")) {
    elemento.classList.remove("background-a");
    elemento.classList.add("background-b");
  } else {
    elemento.classList.remove("background-b");
    elemento.classList.add("background-a");
  }
}, 3000);
