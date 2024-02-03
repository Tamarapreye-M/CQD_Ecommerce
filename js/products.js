let url = `https://fakestoreapi.com/products`

function addDom(data) {
  const container = document.querySelector('#section__two .container');
  const divs = data.map( item => {
    return `<div class="item">
      <img src='${item.image}' />
      <h2>${item.title}</h2>
      <p class="description">${item.description}</p>
      <p class="readMoreBtn">Read More</p>
      <p class="price">$${item.price}</p>
    </div>
    ` 
  }).join(" ");
  
  container.innerHTML = divs

  // Read More Function For Item Description
  const readMoreBtns = document.querySelectorAll('.readMoreBtn');
  readMoreBtns.forEach((btn, index) => {
    let isExpanded = false;
    const description = document.querySelectorAll('.description')[index];

    btn.addEventListener('click', function() {
      if (isExpanded) {
        description.style.maxHeight = '100px'; // Set back to the collapsed state
        btn.textContent = 'Read More';
      } else {
        description.style.maxHeight = 'none'; // Expand to show all content
        btn.textContent = 'Read Less';
      }

      isExpanded = !isExpanded;
    });
  });

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