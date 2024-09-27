// Escuchar el evento click del botón de búsqueda
document.getElementById('buscar-coctel').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe
  
  const nombreCoctel = document.getElementById('nombre-coctel').value; // Obtener el valor del input

  // Verificar si se ingresó un nombre
  if (nombreCoctel) {
    
    // Hacer la solicitud a la API con el nombre del cóctel
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombreCoctel}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json(); // Parsear la respuesta como JSON
      })
      .then(data => {
        // Mostrar los resultados como tarjetas de Bootstrap
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = ''; // Limpiar los resultados anteriores

        if (data.drinks) {
          data.drinks.forEach(drink => {
            // Crear la estructura de una card de Bootstrap
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4'); // col-md-4 hace que sean 3 por fila en pantallas medianas

            card.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body">
                  <h5 class="card-title">${drink.strDrink}</h5>
                  <p class="card-text">Disfruta de esta deliciosa bebida.</p>
                  <button class="btn btn-primary" data-id="${drink.idDrink}">Ver info</button>
                </div>
              </div>
            `;
            // Agregar la card al contenedor
            resultadoDiv.appendChild(card);
            // Añadir evento de click al botón "Ver info" para mostrar el modal
            const verInfoBtn = card.querySelector('.btn');
            verInfoBtn.addEventListener('click', function() {
              const idDrink = this.getAttribute('data-id');
              mostrarModal(idDrink); // Llamar a la función para mostrar el modal
            });
          });
        } else {
          resultadoDiv.textContent = 'No se encontraron bebidas con ese nombre.';
        }
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  } else {
    alert('Por favor ingresa el nombre de un cóctel para buscar.');
  }
});


const ingredientesSelect = document.getElementById('ingredientes');

// Función para obtener los ingredientes de la API y llenar el combobox
function llenarIngredientes() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la red');
      }
      return response.json();
    })
    .then(data => {
      // Asegurarse de que los datos existen y recorrerlos
      if (data.drinks) {
        data.drinks.forEach(drink => {
          const option = document.createElement('option');
          option.value = drink.strIngredient1;
          option.textContent = drink.strIngredient1;
          ingredientesSelect.appendChild(option);
        });
      } else {
        console.log("No se encontraron ingredientes.");
      }
    })
    .catch(error => {
      console.error('Error al cargar los ingredientes:', error);
    });
}

const coctel = document.getElementById('tipo-coctel');
function llenarCoctel() {
  
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la red');
      }
      return response.json();
    })
    .then(data => {
      // Asegurarse de que los datos existen y recorrerlos
      if (data.drinks) {
        data.drinks.forEach(drink => {
          const option = document.createElement('option');
          option.value = drink.strAlcoholic;
          option.textContent = drink.strAlcoholic;
          coctel.appendChild(option);
        });
      } else {
        console.log("No se encontraron ingredientes.");
      }
    })
    .catch(error => {
      console.error('Error al cargar los ingredientes:', error);
    });
}





// Escuchar el evento change del combobox
document.getElementById('ingredientes').addEventListener('change', function() {
  const ingredienteSeleccionado = this.value; // Obtener el valor seleccionado

  // Verificar si se seleccionó un ingrediente
  if (ingredienteSeleccionado) {
    // Hacer la solicitud a la API con el ingrediente seleccionado
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredienteSeleccionado}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json(); // Parsear la respuesta como JSON
      })
      .then(data => {
        // Mostrar los resultados como tarjetas de Bootstrap
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = ''; // Limpiar los resultados anteriores

        if (data.drinks) {
          data.drinks.forEach(drink => {
            // Crear la estructura de una card de Bootstrap
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4'); // col-md-4 hace que sean 3 por fila en pantallas medianas

            card.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body">
                  <h5 class="card-title">${drink.strDrink}</h5>
                  <p class="card-text">Disfruta de esta deliciosa bebida.</p>
                  <button class="btn btn-primary" data-id="${drink.idDrink}">Ver info</button>
                </div>
              </div>
            `;
            // Agregar la card al contenedor
            resultadoDiv.appendChild(card);
            // Añadir evento de click al botón "Ver info" para mostrar el modal
            const verInfoBtn = card.querySelector('.btn');
            verInfoBtn.addEventListener('click', function() {
              const idDrink = this.getAttribute('data-id');
              mostrarModal(idDrink); // Llamar a la función para mostrar el modal
            });
          });
        } else {
          resultadoDiv.textContent = 'No se encontraron bebidas.';
        }
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }
});

document.getElementById('tipo-coctel').addEventListener('change', function() {
  const tipoSeleccionado = this.value; // Obtener el valor seleccionado

  // Verificar si se seleccionó un tipo
  if (tipoSeleccionado) {
    // Hacer la solicitud a la API con el tipo de cóctel seleccionado
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${tipoSeleccionado}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json(); // Parsear la respuesta como JSON
      })
      .then(data => {
        // Mostrar los resultados como tarjetas de Bootstrap
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = ''; // Limpiar los resultados anteriores

        if (data.drinks) {
          data.drinks.forEach(drink => {
            // Crear la estructura de una card de Bootstrap
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4'); // col-md-4 hace que sean 3 por fila en pantallas medianas

            card.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body">
                  <h5 class="card-title">${drink.strDrink}</h5>
                  <p class="card-text">Disfruta de esta deliciosa bebida.</p>
                  <button class="btn btn-primary" data-id="${drink.idDrink}">Ver info</button>
                </div>
              </div>
            `;
            // Agregar la card al contenedor
            resultadoDiv.appendChild(card);
            // Añadir evento de click al botón "Ver info" para mostrar el modal
            const verInfoBtn = card.querySelector('.btn');
            verInfoBtn.addEventListener('click', function() {
              const idDrink = this.getAttribute('data-id');
              mostrarModal(idDrink); // Llamar a la función para mostrar el modal
            });
          });
        } else {
          resultadoDiv.textContent = 'No se encontraron bebidas.';
        }
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  }
});

// Función para mostrar el modal con la información detallada del cóctel
function mostrarModal(idDrink) {
  // Hacer una solicitud a la API para obtener los detalles del cóctel
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const drink = data.drinks[0]; // Obtener el primer (y único) resultado

      // Rellenar los elementos del modal con los datos del cóctel
      document.getElementById('modalTitle').textContent = drink.strDrink;
      document.getElementById('modalImage').src = drink.strDrinkThumb;
      document.getElementById('modalDrinkName').textContent = drink.strDrink;
      document.getElementById('modalInstructions').textContent = drink.strInstructions;

      // Limpiar la lista de ingredientes del modal
      const ingredientsList = document.getElementById('modalIngredientsList');
      ingredientsList.innerHTML = '';

      // Agregar los ingredientes y las medidas al modal con el botón de ver info para cada ingrediente
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        
        if (ingredient) {
          const listItem = document.createElement('li');
          listItem.textContent = `${measure ? measure : ''} ${ingredient}`;
          
          // Añadir imagen del ingrediente
          const img = document.createElement('img');
          img.src = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
          img.alt = ingredient;
          img.style.width = '50px';
          img.style.marginRight = '10px';
          
          // Crear botón de "Ver info" para el ingrediente
          const verInfoBtn = document.createElement('button');
          verInfoBtn.textContent = "Ver info";
          verInfoBtn.classList.add('btn', 'btn-info', 'ml-2');
          verInfoBtn.setAttribute('data-ingredient', ingredient);

          // Añadir evento al botón para abrir el modal de ingrediente
          verInfoBtn.addEventListener('click', function() {
            mostrarModalIngrediente(ingredient);
          });

          // Añadir la imagen y el botón al elemento de la lista
          listItem.prepend(img);
          listItem.appendChild(verInfoBtn);
          ingredientsList.appendChild(listItem);
        }
      }

      // Mostrar el modal
      const modal = document.getElementById('modalDrink');
      modal.style.display = 'block';
      modal.classList.add('show');
    })
    .catch(error => {
      console.error('Hubo un problema al obtener los detalles del cóctel:', error);
    });
}

// Función para mostrar el modal con la información del ingrediente
function mostrarModalIngrediente(ingredient) {
  // Hacer una solicitud a la API para obtener los detalles del ingrediente
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ingredientData = data.ingredients[0]; // Obtener el primer (y único) resultado

      // Rellenar los elementos del modal con los datos del ingrediente
      document.getElementById('modalIngredientTitle').textContent = ingredientData.strIngredient;
      document.getElementById('modalIngredientDescription').textContent = ingredientData.strDescription || "No hay descripción disponible.";
      document.getElementById('modalIngredientImage').src = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;

      // Mostrar el modal del ingrediente
      const modalIngredient = document.getElementById('modalIngredient');
      modalIngredient.style.display = 'block';
      modalIngredient.classList.add('show');
    })
    .catch(error => {
      console.error('Hubo un problema al obtener los detalles del ingrediente:', error);
    });
}

// Cerrar el modal de cóctel al hacer clic en el botón de cierre
document.getElementById('closeModal').addEventListener('click', function() {
  cerrarModal('modalDrink');
});

document.getElementById('closeModalFooter').addEventListener('click', function() {
  cerrarModal('modalDrink');
});

// Cerrar el modal de ingrediente al hacer clic en el botón de cierre
document.getElementById('closeIngredientModal').addEventListener('click', function() {
  cerrarModal('modalIngredient');
});

document.getElementById('closeIngredientModalFooter').addEventListener('click', function() {
  cerrarModal('modalIngredient');
});

// Función para cerrar los modales
function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
  modal.classList.remove('show');
}



// Llamar a la función para llenar los ingredientes
llenarIngredientes();
llenarCoctel();
