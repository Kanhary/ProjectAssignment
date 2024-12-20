$(document).ready(function () {
  // Load Home page by default
  $("#content").load("/components/home.html");

  // Function to close the menu after clicking a link
  // function closeMenu() {
  //   // Close the menu (for mobile devices)
  //   $("#navbarSupportedContent").collapse("hide");
  // }

  // Navigation link events
  $("#homelink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/home.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#aboutlink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/about.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // startCarousel();
      // closeMenu(); // Close the menu
    });
  });

  $(".nav-link.icon").click(function () {
    // closeMenu(); // Close the menu when icon is clicked
  });

  $("#menulink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/menu.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      renderMenu(); // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });

  $("#teamlink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/team.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#categorieslink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/gallery.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });



  

  $("#contactlink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/contact.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  // Handle "Our Menu" and "Contact Us" buttons within loaded content
  $(document).on("click", "#home-btn-menu", function (e) {
    e.preventDefault(); // Prevent default anchor action
    $("#content").load("/components/menu.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      renderMenu(); // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });
  $(document).on("click", "#home-btn-team", function (e) {
    e.preventDefault(); // Prevent default anchor action
    $("#content").load("/components/team.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
    // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });
  

  $(document).on("click", "#home-btn-contact", function (e) {
    e.preventDefault();
    $("#content").load("/components/contact.html", function () {
      window.scrollTo(0, 0);
      // closeMenu(); // Close the menu
    });
  });

  // Load the footer content
  loadFooter();

  // Function to load the footer content
  function loadFooter() {
    fetch("/components/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Footer content could not be loaded");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("footer-container").innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }

  // Cart functionality
  const cart = [];

// Toggle cart popup and overlay
$("#viewCart").on("click", function () {
  $("#cart-popup, #cart-popup-overlay").toggle();
});

// Close cart popup and overlay
$("#close-cart-popup, #cart-popup-overlay").on("click", function () {
  $("#cart-popup, #cart-popup-overlay").hide();
});

// Add to cart
$(document).on("click", ".add-to-cart", function () {
  const itemName = $(this).data("item");
  const itemImage = $(this).data("image");
  const itemPrice = $(this).data("price");

  cart.push({ name: itemName, image: itemImage, price: itemPrice });
  renderCart();
  updateCartCount();
});

// Remove item from cart
$(document).on("click", ".remove-item", function () {
  const index = $(this).data("index");
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
});

// Update cart count
function updateCartCount() {
  $("#viewCart span").text(cart.length);
}

// Calculate and render total
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);
  $("#total-cost").text(`$${total.toFixed(2)}`);
}

// Render cart
function renderCart() {
  const cartItemsList = $("#cart-items");
  cartItemsList.empty();

  if (cart.length === 0) {
    cartItemsList.append("<li>Your cart is empty.</li>");
  } else {
    cart.forEach((item, index) => {
      cartItemsList.append(`
        <li class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="image-cart" />
          <div>${item.name} - ${item.price}</div>
          <button class="remove-item" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        </li>
      `);
    });
  }
  calculateTotal();
}

// Checkout
$("#checkout-btn").on("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to proceed.");
    return;
  }

  $("#checkout-loader").removeClass("hidden");

  setTimeout(() => {
    $("#checkout-loader").addClass("hidden");
    $("#checkout-success").removeClass("hidden");

    cart.length = 0;
    renderCart();
    updateCartCount();

    setTimeout(() => $("#checkout-success").addClass("hidden"), 3000);
  }, 2000);
});

// Clear cart
$("#clear-cart-btn").on("click", function () {
  if (cart.length && confirm("Are you sure you want to clear the cart?")) {
    cart.length = 0;
    renderCart();
    updateCartCount();
    alert("Cart cleared!");
  }
});
$(document).on("click", "#home-btn-reservation", function (e) {
  e.preventDefault();
  $("#content").load("/components/menu.html", function () {
    window.scrollTo(0, 0);
    // closeMenu(); // Close the menu
  });
});

  // Function to render menu items
  function renderMenu() {
    const menuData = [
      // Whisky
      {
        name: "Smoky Oak Whisky",
        description: "A rich whisky with a bold smoky flavor, aged in oak barrels.",
        image: "../assets/images/menu1.png",
        price: "$45",
        categories: ["whisky"],
        stars: 4,
        reviewsCount: 12,
        sku: "001",
        category: "Whisky",
        tags: ["Bottle", "Drink", "Whisky"]
      },
      {
        name: "Golden Reserve Whisky",
        description: "A smooth and refined whisky with hints of vanilla and caramel.",
        image: "../assets/images/menu2.png",
        price: "$60",
        categories: ["whisky"],
        stars: 5,
        reviewsCount: 8,
        sku: "002",
        category: "Whisky",
        tags: ["Bottle", "Drink", "Whisky"]
      },
      {
        name: "Black Label Whisky",
        description: "A premium blend of whisky with a deep, complex flavor profile.",
        image: "../assets/images/menu3.png",
        price: "$75",
        categories: ["whisky"],
        stars: 4,
        reviewsCount: 10,
        sku: "003",
        category: "Whisky",
        tags: ["Bottle", "Drink", "Whisky"]
      },
      {
        name: "Peat Aged Whisky",
        description: "A unique whisky with a distinctive peat smokiness.",
        image: "../assets/images/menu4.png",
        price: "$85",
        categories: ["whisky"],
        stars: 5,
        reviewsCount: 15,
        sku: "004",
        category: "Whisky",
        tags: ["Bottle", "Drink", "Whisky"]
      },
      {
        name: "Highland Gold Whisky",
        description: "A smooth whisky with a sweet, fruity finish and a touch of spice.",
        image: "../assets/images/whisky.png",
        price: "$55",
        categories: ["whisky"],
        stars: 4,
        reviewsCount: 7,
        sku: "005",
        category: "Whisky",
        tags: ["Bottle", "Drink", "Whisky"]
      },
      
      // Bourbon
      {
        name: "Kentucky Bourbon",
        description: "A traditional bourbon with strong vanilla and caramel notes.",
        image: "../assets/images/menu2.png",
        price: "$50",
        categories: ["Bourbon"],
        stars: 4,
        reviewsCount: 9,
        sku: "006",
        category: "Bourbon",
        tags: ["Bottle", "Drink", "Bourbon"]
      },
    
      // Fruit Liqueur
      {
        name: "Citrus Blossom Liqueur",
        description: "A refreshing fruit liqueur with vibrant citrus flavors.",
        image: "../assets/images/menu4.png",
        price: "$35",
        categories: ["fruit Liqueur"],
        stars: 3,
        reviewsCount: 5,
        sku: "007",
        category: "Fruit Liqueur",
        tags: ["Bottle", "Drink", "Liqueur"]
      },
      {
        name: "Berry Fusion Liqueur",
        description: "A sweet and tangy fruit liqueur made with a blend of berries.",
        image: "../assets/images/menu5.png",
        price: "$40",
        categories: ["fruit Liqueur"],
        stars: 4,
        reviewsCount: 8,
        sku: "008",
        category: "Fruit Liqueur",
        tags: ["Bottle", "Drink", "Liqueur"]
      },
    
      // Wine
      {
        name: "Grand Cru Bordeaux",
        description: "An elegant Bordeaux wine with deep flavors of black currant and oak.",
        image: "../assets/images/wine1.jpg",
        price: "$120",
        categories: ["wine"],
        stars: 5,
        reviewsCount: 14,
        sku: "009",
        category: "Wine",
        tags: ["Bottle", "Wine", "Red"]
      },
      {
        name: "Chardonnay Reserve",
        description: "A full-bodied white wine with hints of butter and tropical fruits.",
        image: "../assets/images/wine2.jpg",
        price: "$85",
        categories: ["wine"],
        stars: 4,
        reviewsCount: 10,
        sku: "010",
        category: "Wine",
        tags: ["Bottle", "Wine", "White"]
      },
      {
        name: "Pinot Noir Elegance",
        description: "A light, yet complex red wine with flavors of red berries and earthy undertones.",
        image: "../assets/images/wine3.jpg",
        price: "$95",
        categories: ["wine"],
        stars: 5,
        reviewsCount: 18,
        sku: "011",
        category: "Wine",
        tags: ["Bottle", "Wine", "Red"]
      },
      {
        name: "Riesling Sweetness",
        description: "A sweet and aromatic white wine with floral and fruity notes.",
        image: "../assets/images/wine4.jpg",
        price: "$70",
        categories: ["wine"],
        stars: 3,
        reviewsCount: 4,
        sku: "012",
        category: "Wine",
        tags: ["Bottle", "Wine", "White"]
      },
      {
        name: "Merlot Classic",
        description: "A smooth and fruity red wine with rich flavors of plum and cherry.",
        image: "../assets/images/wine5.jpg",
        price: "$80",
        categories: ["wine"],
        stars: 4,
        reviewsCount: 13,
        sku: "013",
        category: "Wine",
        tags: ["Bottle", "Wine", "Red"]
      },
      {
        name: "Hunuman Beer",
        description: "A smooth and fruity red wine with rich flavors of plum and cherry.",
        image: "../assets/images/beer2.png",
        price: "$80",
        categories: ["beer"],
        stars: 3,
        reviewsCount: 6,
        sku: "014",
        category: "Beer",
        tags: ["Bottle", "Beer"]
      },
      {
        name: "Tiger Beer",
        description: "A smooth and fruity red wine with rich flavors of plum and cherry.",
        image: "../assets/images/beer3.png",
        price: "$80",
        categories: ["beer"],
        stars: 3,
        reviewsCount: 4,
        sku: "015",
        category: "Beer",
        tags: ["Bottle", "Beer"]
      },
    ];
    

    // Generate the menu initially with all items (this is the default)
    generateMenu(menuData);

    // When a filter is clicked, set the active class and filter the menu
    $(".filter h2").click(function () {
      $(".filter h2").removeClass("active-filter");
      $(this).addClass("active-filter");

      const selectedCategory = $(this).data("category");
      const filteredMenu =
        selectedCategory && selectedCategory !== "all"
          ? menuData.filter((item) =>
              item.categories.includes(selectedCategory)
            )
          : menuData;

      generateMenu(filteredMenu); // Re-render the menu based on the filtered data
    });

    // Search filter
    $("#searchInput").on("input", function () {
      const searchTerm = $(this).val().toLowerCase();
      const filteredMenu = menuData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      generateMenu(filteredMenu);
    });
  }

  // Function to generate the HTML for the menu items
  function generateMenu(items) {
    $("#menuGrid").empty(); // Clear the menu grid before adding new items
    items.forEach((item) => {
      const menuItemHtml = `
        <div class="menu-item" data-aos="zoom-in" data-item-id="${item.sku}">
          <img src="${item.image}" alt="${item.name}" class="menu-image" />
          <div class="menu-flex">
            <strong>${item.name}</strong> - <span style="color: #ff0000;">${item.price}</span>
            <p>${item.description}</p>
            <button class="add-to-cart" data-item="${item.name}" data-image="${item.image}" data-price="${item.price}">Add to Cart</button>
          </div>
        </div>
      `;
      $("#menuGrid").append(menuItemHtml); // Append the item HTML to the menu grid
    });
  
    // Add click event listener to the image inside menu item
    $(".menu-image").on("click", function() {
      const itemId = $(this).closest(".menu-item").data("item-id"); // Get the item SKU from the closest menu-item
      const item = items.find(item => item.sku === itemId); // Find the item by SKU
  
      if (item) {
        // Show the item details
        const itemDetailsHtml = `
          <div class="item-details" data-aos="zoom-in" data-aos-duration="500">
            <button class="close-btn" id="closeDetailsBtn">×</button>
            <h2 class="item-name">${item.name}</h2>
            <div class="item-info">
              <img src="${item.image}" alt="${item.name}" class="item-image" />
              <br><br>
              <div class="details-text">
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Tags:</strong> ${item.tags.join(", ")}</p>
              <p class="star">
  <strong>Rating:</strong> 
  <span class="rating-stars">${"★".repeat(item.stars)}</span> 
  (${item.reviewsCount} reviews)
</p>

              </div>
            </div>
            <button class="add-to-cart" data-item="${item.name}" data-image="${item.image}" data-price="${item.price}">Add to Cart</button>
          </div>
        `;
  
        // Ensure the item details section exists
        const detailsSection = $("#itemDetailsSection");
  
        if (detailsSection.length > 0) {
          detailsSection.html(itemDetailsHtml);
          detailsSection.show(); // Display the details section
        } else {
          console.log("Item details section not found.");
        }
      } else {
        console.log("Item not found.");
      }
    });
  
    // Close button functionality with event delegation
    $(document).on("click", "#closeDetailsBtn", function() {
      $("#itemDetailsSection").hide(); // Hide the item details section
    });
  }
  
  
  
});

// function startCarousel() {
//   let myIndex = 0;
//   function carousel() {
//     const slides = document.getElementsByClassName("mySlides");
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//     myIndex++;
//     if (myIndex > slides.length) myIndex = 1;
//     slides[myIndex - 1].style.display = "block";
//     setTimeout(carousel, 2000);
//   }
//   carousel();
// }
