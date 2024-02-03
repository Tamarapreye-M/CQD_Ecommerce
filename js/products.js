let url = `https://fakestoreapi.com/products`;

function addDom(data) {
	const container = document.querySelector("#section__two .container");
	const divs = data
		.map((item) => {
			console.log(`${item.image.slice(0, -3)}png`);

			return `<div class="item">

      <div class="image-container">
        <div class="image" >
          <img src="${item.image}">
        </div>
      </div>
     <div class="text-div">
      <h2>${item.title}</h2>
      <p class="description">${item.description} </p>
      <span class="readMoreBtn">Read More</span>
      
      <p class="price">$${item.price}</p>
      </div>
    </div>
    
    `;
		})
		.join(" ");

	container.innerHTML = divs;

	// Read More Function For Item Description
	const readMoreBtns = document.querySelectorAll(".readMoreBtn");
	readMoreBtns.forEach((btn, index) => {
		let isExpanded = false;
		const description = document.querySelectorAll(".description")[index];

		btn.addEventListener("click", function () {
			if (isExpanded) {
				description.style.maxHeight = "100px"; // Set back to the collapsed state
				btn.textContent = "Read More";
			} else {
				description.style.maxHeight = "none"; // Expand to show all content
				btn.textContent = "Read Less";
			}

			isExpanded = !isExpanded;
		});
	});

	console.log(data);
}

const select = document.getElementById("categories");

function handleSelect(e) {
	if (e.target.value != "all") {
		url = `https://fakestoreapi.com/products/category/${e.target.value}`;
	}
	fetchApi(url);

	console.log(e.target.value);
	console.log(url);
}

select.addEventListener("click", handleSelect);

async function fetchApi(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		addDom(data);
	} catch (error) {
		console.error("Error fetching or parsing data:", error);
	}
}

fetchApi(url);

// style="background-image: url(${item.image}); height: 150px; width: 100%; background-size: contain; background-repeat: no-repeat; background-position: center;"
