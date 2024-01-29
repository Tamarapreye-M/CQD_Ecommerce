let url = `https://fakestoreapi.com/products`

function addDom(data) {
  const container = document.querySelector('#section__two .container');
  const divs = data.map( item => {
    return `<div class="item">
      <img src='${item.image}' />
      <h2>${item.title}</h2>
      <p>${item.description}</p>
    </div>
    ` 
  }).join(" ");
  
  container.innerHTML = divs
  console.log(data);
}

const select = document.getElementById("categories");

function handleSelect(e) {
  if (e.target.value != 'all') {
    url = `https://fakestoreapi.com/products/category/${e.target.value}`;
  } 
  fetchApi(url);

  console.log(e.target.value);
  console.log(url);
}

select.addEventListener('click', handleSelect);

async function fetchApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    addDom(data);

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  };
};

fetchApi(url);