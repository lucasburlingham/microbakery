// get list of menu items and skus from Google Sheets via the public CSV export
// then parse the CSV data and dynamically generate menu items

// get menu items
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4-p_th16bC67EP4hdd2C7DkGKqg-kHFyVIy8BiO1kIxKdmKsOJf-5W2jG3f8olAKXzfoCxDSA21Yj/pub?gid=0&single=true&output=csv';


async function fetchSheetData() {
	const response = await fetch(CSV_URL);
	const csvText = await response.text();

	// Parse CSV into objects
	const rows = csvText.split("\n").map(r => r.split(","));
	const headers = rows[0];

	const data = rows.slice(1).map(row => {
		return headers.reduce((obj, header, i) => {
			obj[header.trim()] = row[i]?.trim() || "";
			return obj;
		}, {});
	});

	// remove all dollar signs from cost fields
	data.forEach(item => {
		if (typeof item.cost === "string") {
			item.cost = item.cost.replace('$', '');
		}
	});

	// make the skus uppercase
	data.forEach(item => {
		if (typeof item.sku === "string") {
			item.sku = item.sku.toUpperCase();
		}
	});

	// remove any empty rows
	// const filteredData = data.filter(item => item.sku && item.name);
	console.log(data);
	return data;
}

menuItems = fetchSheetData().then(data => {
	generateMenuItems(data);
});


// Function to generate menu items
function generateMenuItems(menuItems) {
	const menuSection = document.getElementById('menu');

	menuItems.forEach(item => {
		const menuItemDiv = document.createElement('div');
		menuItemDiv.className = 'menu-item';
		menuItemDiv.id = `sku-${item.sku}`;

		const itemImage = document.createElement('img');
		itemImage.src = item.image_url;
		itemImage.alt = item.title;
		itemImage.style.height = '200px';
		itemImage.style.width = '200px';

		const itemTitle = document.createElement('h3');
		itemTitle.id = `name-${item.sku}`;
		// itemTitle.className = 'edu-nsw-act-cursive-400';
		itemTitle.textContent = item.title;
		const itemDescription = document.createElement('p');
		itemDescription.className = 'inter-text-400';
		itemDescription.textContent = item.description;

		// remove dollar sign if present and convert to float
		item.cost = parseFloat(item.cost.replace('$', ''));
		const itemCost = document.createElement('p');
		// add .cost class
		itemCost.classList.add('cost');
		itemCost.className = 'inter-text-400';
		itemCost.innerHTML = `<strong>Price:</strong> $${item.cost.toFixed(2)}`;

		const orderButton = document.createElement('button');
		orderButton.textContent = 'Order Now';

		menuItemDiv.appendChild(itemImage);
		menuItemDiv.appendChild(itemTitle);
		menuItemDiv.appendChild(itemDescription);
		menuItemDiv.appendChild(itemCost);
		menuItemDiv.appendChild(orderButton);

		menuSection.appendChild(menuItemDiv);
	});
}