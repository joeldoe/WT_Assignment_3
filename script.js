var url = "https://davids-restaurant.herokuapp.com/menu_items.json";
var options = [];

$(document).ready(function()
{
	$("#error").hide();

	// GET method is called to retrieve the JSON data and to store its names into an array
	$.get(url, function(data, status)
	{
		console.log(status);
		
		for(option of data.menu_items)
		{
			options.push(option.name);
		}
		createMenu();
	});

	$("#get-details").click(function()
	{
		if($("#list").val() == "Select an item")
		{
			$("#error").show();
		}
		else
		{
			$.get(url, function(data)
			{
				$("#error").hide();

				for(option of data.menu_items)
				{
					if($("#list").val() == option.name)
					{
						$("#data").html("<b>About the item:</b> " + option.description);
				
						if(option.price_small == null)
						{
							$("#max-price").html("<b>Price (large):</b> " + option.price_large);
						}
						else
						{
							$("#min-price").html("<b>Price (small):</b> " + option.price_small);
							$("#max-price").html("<b>Price (large):</b> " + option.price_large);
						}
					}
				}
			});
		}
	});
});

// createMenu() will create the dropdown list of the food items
function createMenu()
{
	let dropdown = document.getElementById('list');

	options.forEach(function(foodItem)
	{
		let op = document.createElement('option');
		op.textContent = foodItem;
		dropdown.appendChild(op);
	});
}

