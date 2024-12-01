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

  $("#bloglink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/blog.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#reservationlink").click(function (e) {
    e.preventDefault();
    $("#content").load("/components/reservation.html", function () {
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
  $(document).on("click", "#home-btn-reservation", function (e) {
    e.preventDefault();
    $("#content").load("/components/reservation.html", function () {
      window.scrollTo(0, 0);
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
  const cart = []; // Array to store cart items

  $("#viewCart").on("click", function () {
    $("#cart-popup").toggle(); // Toggles visibility
    $("#cart-popup-overlay").toggle(); // Toggles overlay
  });

  // Handle adding items to the cart
  $(document).on("click", ".add-to-cart", function () {
    const itemName = $(this).data("item");
    const itemImage = $(this).data("image");
    const itemPrice = $(this).data("price");

    cart.push({ name: itemName, image: itemImage, price: itemPrice }); // Add item to cart
    // alert(`${itemName} added to cart!`);
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
  });

  // Remove item from cart
  $(document).on("click", ".remove-item", function () {
    const index = $(this).data("index");
    cart.splice(index, 1); // Remove item from cart
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
  });

  // Function to update the cart count display
  function updateCartCount() {
    const cartCount = cart.length; // Get the number of items in the cart
    $("#viewCart span").text(cartCount); // Update the count in the cart icon
  }
  function calculateTotal() {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", "")); // Convert price string to number
      return sum + price;
    }, 0);
    $("#total-cost").text(`$${total.toFixed(2)}`); // Update the total cost in the cart
  }
  // Function to render cart items
  function renderCart() {
    const cartItemsList = $("#cart-items");
    cartItemsList.empty(); // Clear existing cart items

    if (cart.length === 0) {
      cartItemsList.append("<li>Your cart is empty.</li>");
    } else {
      cart.forEach((item, index) => {
        const cartItemHtml = `
          <li class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="image-cart" />
            <div>${item.name} - ${item.price}</div>
            <button class="remove-item" data-index="${index}">
              Remove
            </button>
          </li>
        `;
        cartItemsList.append(cartItemHtml);
      });
    }
    calculateTotal();
  }
  // Handle the close button
  $("#close-cart-popup").on("click", function () {
    $("#cart-popup").hide(); // Hide the cart popup
    $("#cart-popup-overlay").hide(); // Hide the overlay
  });

  // Handle overlay click (optional, to close the popup by clicking outside)
  $("#cart-popup-overlay").on("click", function () {
    $("#cart-popup").hide(); // Hide the cart popup
    $("#cart-popup-overlay").hide(); // Hide the overlay
  });

  // Ensure the popup can still be toggled open using the "View Cart" button
  $("#viewCart").on("click", function () {
    $("#cart-popup").show(); // Show the cart popup
    $("#cart-popup-overlay").show(); // Show the overlay
  });

  $("#checkout-btn").on("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    const loader = $("#checkout-loader");
    const successMessage = $("#checkout-success");

    // Show loader
    loader.removeClass("hidden");

    // Simulate checkout process with a timeout
    setTimeout(() => {
      // Hide loader
      loader.addClass("hidden");

      // Show success message
      successMessage.removeClass("hidden");

      // Clear the cart after a successful checkout
      cart.length = 0;
      renderCart(); // Re-render the cart to update UI
      updateCartCount(); // Update cart count

      // Hide the success message after a few seconds
      setTimeout(() => {
        successMessage.addClass("hidden");
      }, 3000);
    }, 2000); // Simulate a 2-second delay for the loader
  });

  $("#checkout-btn").on("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
    } else {
      const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return sum + price;
      }, 0);
      alert(`Your total is $${total.toFixed(2)}. Proceeding to checkout.`);
      // Redirect to checkout page or handle checkout logic
      // window.location.href = "/checkout.html";
    }
  });
  $("#clear-cart-btn").on("click", function () {
    if (cart.length === 0) {
      alert("Your cart is already empty.");
    } else {
      if (confirm("Are you sure you want to clear the cart?")) {
        cart.length = 0; // Clear the cart array
        renderCart(); // Re-render the cart to update UI
        updateCartCount(); // Update cart count
        alert("Cart cleared!");
      }
    }
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
      },
      {
        name: "Golden Reserve Whisky",
        description: "A smooth and refined whisky with hints of vanilla and caramel.",
        image: "../assets/images/menu2.png",
        price: "$60",
        categories: ["whisky"],
      },
      {
        name: "Black Label Whisky",
        description: "A premium blend of whisky with a deep, complex flavor profile.",
        image: "../assets/images/menu3.png",
        price: "$75",
        categories: ["whisky"],
      },
      {
        name: "Peat Aged Whisky",
        description: "A unique whisky with a distinctive peat smokiness.",
        image: "../assets/images/menu4.png",
        price: "$85",
        categories: ["whisky"],
      },
      {
        name: "Highland Gold Whisky",
        description: "A smooth whisky with a sweet, fruity finish and a touch of spice.",
        image: "../assets/images/whisky.png",
        price: "$55",
        categories: ["whisky"],
      },
      
      // Bourbon
      {
        name: "Kentucky Bourbon",
        description: "A traditional bourbon with strong vanilla and caramel notes.",
        image: "../assets/images/menu2.png",
        price: "$50",
        categories: ["Bourbon"],
      },
    
      // Fruit Liqueur
      {
        name: "Citrus Blossom Liqueur",
        description: "A refreshing fruit liqueur with vibrant citrus flavors.",
        image: "../assets/images/menu4.png",
        price: "$35",
        categories: ["fruit Liqueur"],
      },
      {
        name: "Berry Fusion Liqueur",
        description: "A sweet and tangy fruit liqueur made with a blend of berries.",
        image: "../assets/images/menu5.png",
        price: "$40",
        categories: ["fruit Liqueur"],
      },
    
      // Wine
      {
        name: "Grand Cru Bordeaux",
        description: "An elegant Bordeaux wine with deep flavors of black currant and oak.",
        image: "../assets/images/wine1.jpg",
        price: "$120",
        categories: ["wine"],
      },
      {
        name: "Chardonnay Reserve",
        description: "A full-bodied white wine with hints of butter and tropical fruits.",
        image: "../assets/images/wine2.jpg",
        price: "$85",
        categories: ["wine"],
      },
      {
        name: "Pinot Noir Elegance",
        description: "A light, yet complex red wine with flavors of red berries and earthy undertones.",
        image: "../assets/images/wine3.jpg",
        price: "$95",
        categories: ["wine"],
      },
      {
        name: "Riesling Sweetness",
        description: "A sweet and aromatic white wine with floral and fruity notes.",
        image: "../assets/images/wine4.jpg",
        price: "$70",
        categories: ["wine"],
      },
      {
        name: "Merlot Classic",
        description: "A smooth and fruity red wine with rich flavors of plum and cherry.",
        image: "../assets/images/wine5.jpg",
        price: "$80",
        categories: ["wine"],
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
        <div class="menu-item"  data-aos="zoom-in">
          <img src="${item.image}" alt="${item.name}" />
          <div class="menu-flex">
            <strong>${item.name}</strong> - <span style="color: #ff0000;">${item.price}</span>
            <p>${item.description}</p>
            <button class="add-to-cart" data-item="${item.name}" data-image="${item.image}" data-price="${item.price}">Add to Cart</button>
          </div>
        </div>
      `;
      $("#menuGrid").append(menuItemHtml); // Append the item HTML to the menu grid
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
