// ContextPulse App JS - Simulator Console (Cart & Checkout Flow)

const API_BASE = "https://zepto-ai-native-mvp.onrender.com";

const EMOJI_MAP = {
  "Fruits & Vegetables": "🥦",
  "Dairy, Bread & Eggs": "🥛",
  "Cold Drinks & Juices": "🥤",
  "Snacks & Munchies": "🍟",
  "Breakfast & Instant Food": "🥣",
  "Sweet Craving": "🍫",
  "Tea, Coffee & More": "☕",
  "Atta, Rice, Oil & Dal": "🍚",
  "Masala & Spices": "🌶️",
  "Chicken, Meat & Fish": "🍗",
  "Organic & Healthy": "🍎",
  "Baby Care": "👶",
  "Pet Care": "🐶",
  "Personal Care": "🧴",
  "Cleaning Essentials": "🧹",
  "Home Needs": "📦",
  "Ice Cream & Sweet Tooth": "🍦",
  "Biscuits & Cookies": "🍪",
  "Electronics": "🔌",
  "Home Appliances": "📺",
  "Shops": "🏪",
  "Fashion": "👕"
};

const IMAGE_MAP = {
  "Organic Broccoli": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=150&q=80",
  "Godrej Jersey Milk": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=150&q=80",
  "Paper Boat Coconut Water": "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=150&q=80",
  "Crax Corn Rings": "/crax_corn_rings.png",
  "Maggi Noodles Pack": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=150&q=80",
  "Cadbury Dairy Milk Silk": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=150&q=80",
  "Nescafe Gold Coffee Jar": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80",
  "Fortune Mustard Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80",
  "Catch Turmeric Powder": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80",
  "Chicken Breast Boneless": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80",
  "Organic Red Apples": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&q=80",
  "Huggies Soft Baby Wipes": "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=150&q=80",
  "Pedigree Chicken Treats": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80",
  "Nivea Soft Mini Moisturizer": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=150&q=80",
  "Vim Dishwash Liquid Gel": "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=150&q=80",
  "Organizer Storage Drawer": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=150&q=80",
  "Kwality Walls Choco Brownie": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=150&q=80",
  "Good Day Cashew Cookies": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=150&q=80",
  "Oreo Creme Biscuits": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=150&q=80",
  "Fresh Bananas": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=150&q=80",
  "Red Tomatoes": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80",
  "Amul Salted Butter": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=150&q=80",
  "White Eggs (6 Pack)": "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=150&q=80",
  "Coca Cola Zero Sugar": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80",
  "Lays Potato Chips Classic": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=150&q=80",
  "Rusk Crispy Toast": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80",
  "Kellogg's Corn Flakes": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=150&q=80",
  "KitKat Share Bag": "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=150&q=80",
  "Taj Mahal Tea Dust": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=150&q=80",
  "Aashirvaad Shudh Chakki Atta": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80",
  "MDH Kitchen King Masala": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Johnson's Baby Powder": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80",
  "Whiskas Dry Cat Food": "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&w=150&q=80",
  "Colgate MaxFresh toothpaste": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=150&q=80",
  "Lizol Floor Cleaner Citrus": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80",
  "Syska 9W LED Bulb": "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=150&q=80",
  "Boat Wireless Earphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
  "Fast Charging Cable USB-C": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=150&q=80",
  "Electric Kettle 1.5L": "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=150&q=80",
  "Handheld Garment Steamer": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=150&q=80",
  "Local Specialty Gift Box": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=150&q=80",
  "Artisanal Handmade Candles": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=150&q=80",
  "Zepto Classic Cotton T-Shirt": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80",
  "Unisex Summer Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=150&q=80",
  "Electronics": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
  "Home Appliances": "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=150&q=80",
  "Shops": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=150&q=80",
  "Fashion": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80",
  "Nivea Soft Mini Cream": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=150&q=80",
  "Nivea Soft Mini Moisturizer": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=150&q=80",
  "Healthy Morning Bundle": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&q=80",
  "Fruits & Vegetables": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80",
  "Dairy, Bread & Eggs": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80",
  "Cold Drinks & Juices": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80",
  "Snacks & Munchies": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=150&q=80",
  "Breakfast & Instant Food": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=150&q=80",
  "Sweet Craving": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=150&q=80",
  "Tea, Coffee & More": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80",
  "Atta, Rice, Oil & Dal": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80",
  "Masala & Spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Chicken, Meat & Fish": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80",
  "Organic & Healthy": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=150&q=80",
  "Baby Care": "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=150&q=80",
  "Pet Care": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&q=80",
  "Personal Care": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=150&q=80",
  "Cleaning Essentials": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80",
  "Home Needs": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80",
  "Ice Cream & Sweet Tooth": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=150&q=80",
  "Biscuits & Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=150&q=80"
};

function getProductMediaHTML(item, sizeStyle = "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;") {
  const nameKey = item.name;
  const catKey = item.category;
  const imageUrl = IMAGE_MAP[nameKey] || IMAGE_MAP[catKey];
  if (imageUrl) {
    return `<img src="${imageUrl}" class="product-media-img" alt="${nameKey || 'product'}" style="${sizeStyle}" />`;
  }
  return `<span class="p-emoji">${item.emoji || "🛒"}</span>`;
}

// Seeding products catalog for Category Discovery rendering
const PRODUCTS_CATALOG = {
  "Fruits & Vegetables": { name: "Organic Broccoli", price: 55, meta: "500 g", emoji: "🥦" },
  "Dairy, Bread & Eggs": { name: "Godrej Jersey Milk", price: 35, meta: "500 ml", emoji: "🥛" },
  "Cold Drinks & Juices": { name: "Paper Boat Coconut Water", price: 60, meta: "200 ml Pack", emoji: "🥤" },
  "Snacks & Munchies": { name: "Crax Corn Rings", price: 20, meta: "50 g", emoji: "🍟" },
  "Breakfast & Instant Food": { name: "Maggi Noodles Pack", price: 14, meta: "70 g", emoji: "🥣" },
  "Sweet Craving": { name: "Cadbury Dairy Milk Silk", price: 80, meta: "60 g", emoji: "🍫" },
  "Tea, Coffee & More": { name: "Nescafe Gold Coffee Jar", price: 85, meta: "50 g Jar", emoji: "☕" },
  "Atta, Rice, Oil & Dal": { name: "Fortune Mustard Oil", price: 175, meta: "1 L", emoji: "🍚" },
  "Masala & Spices": { name: "Catch Turmeric Powder", price: 29, meta: "100 g", emoji: "🌶️" },
  "Chicken, Meat & Fish": { name: "Chicken Breast Boneless", price: 169, meta: "500 g", emoji: "🍗" },
  "Organic & Healthy": { name: "Organic Red Apples", price: 99, meta: "4 pcs", emoji: "🍎" },
  "Baby Care": { name: "Huggies Soft Baby Wipes", price: 89, meta: "24 Pack (Trial size)", emoji: "👶" },
  "Pet Care": { name: "Pedigree Chicken Treats", price: 50, meta: "Single Pack", emoji: "🐶" },
  "Personal Care": { name: "Nivea Soft Mini Moisturizer", price: 79, meta: "50 ml Tube", emoji: "🧴" },
  "Cleaning Essentials": { name: "Vim Dishwash Liquid Gel", price: 55, meta: "250 ml", emoji: "🧹" },
  "Home Needs": { name: "Organizer Storage Drawer", price: 199, meta: "Medium Plastic Tray", emoji: "📦" },
  "Ice Cream & Sweet Tooth": { name: "Kwality Walls Choco Brownie", price: 45, meta: "100 ml cup", emoji: "🍦" },
  "Biscuits & Cookies": { name: "Good Day Cashew Cookies", price: 30, meta: "150 g", emoji: "🍪" },
  "Electronics": { name: "Boat Wireless Earphones", price: 999, meta: "1 Unit", emoji: "🎧" },
  "Home Appliances": { name: "Electric Kettle 1.5L", price: 1200, meta: "1 Unit", emoji: "🫖" },
  "Shops": { name: "Local Specialty Gift Box", price: 350, meta: "1 Box", emoji: "🎁" },
  "Fashion": { name: "Zepto Classic Cotton T-Shirt", price: 499, meta: "Medium / Blue", emoji: "👕" }
};

// Rich products map per category for Categories Tab
const CATEGORIES_PRODUCTS = {
  "Fruits & Vegetables": [
    { name: "Fresh Bananas", price: 29, old: 34, emoji: "🍌", size: "500 g", category: "Fruits & Vegetables" },
    { name: "Organic Broccoli", price: 55, old: 68, emoji: "🥦", size: "500 g", category: "Fruits & Vegetables" },
    { name: "Red Tomatoes", price: 39, old: 48, emoji: "🍅", size: "500 g", category: "Fruits & Vegetables" }
  ],
  "Dairy, Bread & Eggs": [
    { name: "Godrej Jersey Milk", price: 35, old: 38, emoji: "🥛", size: "500 ml", category: "Dairy, Bread & Eggs" },
    { name: "Amul Salted Butter", price: 56, old: 60, emoji: "🧈", size: "100 g", category: "Dairy, Bread & Eggs" },
    { name: "White Eggs (6 Pack)", price: 45, old: 50, emoji: "🥚", size: "6 pcs", category: "Dairy, Bread & Eggs" }
  ],
  "Cold Drinks & Juices": [
    { name: "Paper Boat Coconut Water", price: 60, old: 75, emoji: "🥤", size: "200 ml Pack", category: "Cold Drinks & Juices" },
    { name: "Coca Cola Zero Sugar", price: 40, old: 45, emoji: "🥤", size: "300 ml Can", category: "Cold Drinks & Juices" }
  ],
  "Snacks & Munchies": [
    { name: "Crax Corn Rings", price: 20, old: 25, emoji: "🍟", size: "50 g", category: "Snacks & Munchies" },
    { name: "Lays Potato Chips Classic", price: 30, old: 35, emoji: "🥔", size: "90 g", category: "Snacks & Munchies" },
    { name: "Rusk Crispy Toast", price: 40, old: 48, emoji: "🍞", size: "200 g", category: "Snacks & Munchies" }
  ],
  "Breakfast & Instant Food": [
    { name: "Maggi Noodles Pack", price: 14, old: 16, emoji: "🥣", size: "70 g", category: "Breakfast & Instant Food" },
    { name: "Kellogg's Corn Flakes", price: 99, old: 110, emoji: "🥣", size: "150 g", category: "Breakfast & Instant Food" }
  ],
  "Sweet Craving": [
    { name: "Cadbury Dairy Milk Silk", price: 80, old: 90, emoji: "🍫", size: "60 g", category: "Sweet Craving" },
    { name: "KitKat Share Bag", price: 65, old: 70, emoji: "🍫", size: "4 pcs", category: "Sweet Craving" }
  ],
  "Tea, Coffee & More": [
    { name: "Nescafe Gold Coffee Jar", price: 85, old: 100, emoji: "☕", size: "50 g Jar", category: "Tea, Coffee & More" },
    { name: "Taj Mahal Tea Dust", price: 120, old: 140, emoji: "🍵", size: "250 g", category: "Tea, Coffee & More" }
  ],
  "Atta, Rice, Oil & Dal": [
    { name: "Fortune Mustard Oil", price: 175, old: 195, emoji: "🍚", size: "1 L", category: "Atta, Rice, Oil & Dal" },
    { name: "Aashirvaad Shudh Chakki Atta", price: 245, old: 270, emoji: "🌾", size: "5 kg", category: "Atta, Rice, Oil & Dal" }
  ],
  "Masala & Spices": [
    { name: "Catch Turmeric Powder", price: 29, old: 35, emoji: "🌶️", size: "100 g", category: "Masala & Spices" },
    { name: "MDH Kitchen King Masala", price: 78, old: 85, emoji: "🌶️", size: "100 g", category: "Masala & Spices" }
  ],
  "Chicken, Meat & Fish": [
    { name: "Chicken Breast Boneless", price: 169, old: 199, emoji: "🍗", size: "500 g", category: "Chicken, Meat & Fish" }
  ],
  "Organic & Healthy": [
    { name: "Organic Red Apples", price: 99, old: 120, emoji: "🍎", size: "4 pcs", category: "Organic & Healthy" }
  ],
  "Baby Care": [
    { name: "Huggies Soft Baby Wipes", price: 89, old: 99, emoji: "👶", size: "24 Pack (Trial size)", category: "Baby Care" },
    { name: "Johnson's Baby Powder", price: 95, old: 110, emoji: "👶", size: "100 g", category: "Baby Care" }
  ],
  "Pet Care": [
    { name: "Pedigree Chicken Treats", price: 50, old: 60, emoji: "🐶", size: "Single Pack", category: "Pet Care" },
    { name: "Whiskas Dry Cat Food", price: 199, old: 220, emoji: "🐱", size: "480 g", category: "Pet Care" }
  ],
  "Personal Care": [
    { name: "Nivea Soft Mini Moisturizer", price: 79, old: 99, emoji: "🧴", size: "50 ml Tube", category: "Personal Care" },
    { name: "Colgate MaxFresh toothpaste", price: 95, old: 110, emoji: "🪥", size: "150 g", category: "Personal Care" }
  ],
  "Cleaning Essentials": [
    { name: "Vim Dishwash Liquid Gel", price: 55, old: 65, emoji: "🧹", size: "250 ml", category: "Cleaning Essentials" },
    { name: "Lizol Floor Cleaner Citrus", price: 89, old: 99, emoji: "🧹", size: "500 ml", category: "Cleaning Essentials" }
  ],
  "Home Needs": [
    { name: "Organizer Storage Drawer", price: 199, old: 225, emoji: "📦", size: "Medium Plastic Tray", category: "Home Needs" },
    { name: "Syska 9W LED Bulb", price: 89, old: 120, emoji: "💡", size: "1 Unit", category: "Home Needs" }
  ],
  "Ice Cream & Sweet Tooth": [
    { name: "Kwality Walls Choco Brownie", price: 45, old: 50, emoji: "🍦", size: "100 ml cup", category: "Ice Cream & Sweet Tooth" }
  ],
  "Biscuits & Cookies": [
    { name: "Good Day Cashew Cookies", price: 30, old: 35, emoji: "🍪", size: "150 g", category: "Biscuits & Cookies" },
    { name: "Oreo Creme Biscuits", price: 35, old: 40, emoji: "🍪", size: "120 g", category: "Biscuits & Cookies" }
  ],
  "Electronics": [
    { name: "Boat Wireless Earphones", price: 999, old: 1499, emoji: "🎧", size: "1 Unit", category: "Electronics" },
    { name: "Fast Charging Cable USB-C", price: 199, old: 299, emoji: "🔌", size: "1 Meter", category: "Electronics" }
  ],
  "Home Appliances": [
    { name: "Electric Kettle 1.5L", price: 1200, old: 1799, emoji: "🫖", size: "1 Unit", category: "Home Appliances" },
    { name: "Handheld Garment Steamer", price: 1499, old: 1999, emoji: "💨", size: "1 Unit", category: "Home Appliances" }
  ],
  "Shops": [
    { name: "Local Specialty Gift Box", price: 350, old: 450, emoji: "🎁", size: "1 Box", category: "Shops" },
    { name: "Artisanal Handmade Candles", price: 299, old: 399, emoji: "🕯️", size: "3 Pack", category: "Shops" }
  ],
  "Fashion": [
    { name: "Zepto Classic Cotton T-Shirt", price: 499, old: 699, emoji: "👕", size: "Medium / Blue", category: "Fashion" },
    { name: "Unisex Summer Sunglasses", price: 399, old: 599, emoji: "🕶️", size: "1 Unit", category: "Fashion" }
  ]
};

// Shopping catalog by Store Tab
const STORES_CATALOG = {
  zepto: [
    { name: "Godrej Jersey Milk", price: 35, old: 38, emoji: "🥛", size: "500 ml", category: "Dairy, Bread & Eggs" },
    { name: "Fresh Bananas", price: 29, old: 34, emoji: "🍌", size: "500 g", category: "Fruits & Vegetables" }
  ],
  monsoon: [
    { name: "Nescafe Gold Coffee Jar", price: 85, old: 100, emoji: "☕", size: "50 g Jar", category: "Tea, Coffee & More" },
    { name: "Rusk Crispy Toast", price: 40, old: 48, emoji: "🍞", size: "200 g", category: "Snacks & Munchies" }
  ],
  mall: [
    { name: "Nivea Soft Mini Moisturizer", price: 79, old: 99, emoji: "🧴", size: "50 ml Tube", category: "Personal Care" },
    { name: "Organizer Storage Drawer", price: 199, old: 225, emoji: "📦", size: "Medium Plastic Tray", category: "Home Needs" },
    { name: "Boat Wireless Earphones", price: 999, old: 1499, emoji: "🎧", size: "1 Unit", category: "Electronics" },
    { name: "Electric Kettle 1.5L", price: 1200, old: 1799, emoji: "🫖", size: "1 Unit", category: "Home Appliances" }
  ],
  fresh: [
    { name: "Organic Broccoli", price: 55, old: 68, emoji: "🥦", size: "500 g", category: "Fruits & Vegetables" },
    { name: "Organic Red Apples", price: 99, old: 120, emoji: "🍎", size: "4 pcs", category: "Organic & Healthy" }
  ]
};

// Map store tabs to their corresponding categories
const STORE_CATEGORIES = {
  zepto: [
    "Fruits & Vegetables",
    "Dairy, Bread & Eggs",
    "Cold Drinks & Juices",
    "Snacks & Munchies",
    "Breakfast & Instant Food",
    "Sweet Craving",
    "Baby Care",
    "Pet Care",
    "Ice Cream & Sweet Tooth",
    "Biscuits & Cookies",
    "Shops",
    "Fashion"
  ],
  monsoon: [
    "Tea, Coffee & More",
    "Snacks & Munchies",
    "Breakfast & Instant Food",
    "Sweet Craving"
  ],
  mall: [
    "Personal Care",
    "Home Needs",
    "Cleaning Essentials",
    "Electronics",
    "Home Appliances"
  ],
  fresh: [
    "Fruits & Vegetables",
    "Organic & Healthy"
  ]
};

// Cart State (initially empty)
let cartItems = [];
let activePayload = null;
let addedItems = []; // Checkout recommendations additions

let currentStore = "zepto";
let currentSearch = "";
let currentHomepageCategory = "All";

function showToast(message = "Added! You're exploring a new category.") {
  const toast = document.getElementById("toast-message");
  toast.querySelector("span").innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Switch between Cart, Checkout, and KPI screens
function navigateToScreen(screenId) {
  document.querySelectorAll(".phone-screen").forEach(scr => {
    scr.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
  if (screenId === "phone-kpi-screen") {
    updateDashboardMetrics();
  }
  updateCartSummary();
}

// 1. Render Product Feed (Shop tab)
function renderProducts() {
  const container = document.getElementById("home-product-list");
  container.innerHTML = "";

  // Hide or show home promotions & category grid based on filter/search selection
  const promos = document.querySelector(".home-promos");
  const specialStrip = document.querySelector(".home-special-strip");
  const shopByCat = document.querySelector(".home-shop-by-category");

  if (currentHomepageCategory === "All" && currentSearch === "") {
    if (promos) promos.style.display = "grid";
    if (specialStrip) specialStrip.style.display = "block";
    if (shopByCat) shopByCat.style.display = "block";
  } else {
    if (promos) promos.style.display = "none";
    if (specialStrip) specialStrip.style.display = "none";
    if (shopByCat) shopByCat.style.display = "none";
  }

  let itemsToRender = [];
  if (currentSearch !== "") {
    // Search across all items in all stores and categories
    const allProductsMap = {};
    Object.values(STORES_CATALOG).forEach(list => {
      list.forEach(item => { allProductsMap[item.name] = item; });
    });
    Object.values(CATEGORIES_PRODUCTS).forEach(list => {
      list.forEach(item => { allProductsMap[item.name] = item; });
    });
    itemsToRender = Object.values(allProductsMap);
  } else if (currentHomepageCategory === "All") {
    itemsToRender = STORES_CATALOG[currentStore] || [];
  } else {
    itemsToRender = CATEGORIES_PRODUCTS[currentHomepageCategory] || [];
  }
  
  // Filter by search query
  const filtered = itemsToRender.filter(item => 
    item.name.toLowerCase().includes(currentSearch.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div style="font-size: 10px; color: #64748b; padding: 12px; text-align: center;">No items match "${currentSearch}"</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "home-product-card-item";

    const inCartCount = cartItems.filter(ci => ci.name === item.name).length;

    if (inCartCount > 0) {
      card.innerHTML = `
        <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(item)}</div>
        <div class="p-details">
          <h4>${item.name}</h4>
          <p>${item.size} · <span class="price">₹${item.price} <span class="old">₹${item.old}</span></span></p>
        </div>
        <div class="qty-selector-container" style="margin-left: auto;">
          <button class="btn-qty-minus">-</button>
          <span class="qty-val">${inCartCount}</span>
          <button class="btn-qty-plus">+</button>
        </div>
      `;

      card.querySelector(".btn-qty-plus").addEventListener("click", () => {
        cartItems.push(item);
        showToast(`Added ${item.name} to cart!`);
        renderProducts();
        updateCartSummary();
      });

      card.querySelector(".btn-qty-minus").addEventListener("click", () => {
        const idx = cartItems.findIndex(ci => ci.name === item.name);
        if (idx > -1) {
          cartItems.splice(idx, 1);
        }
        renderProducts();
        updateCartSummary();
      });
    } else {
      card.innerHTML = `
        <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(item)}</div>
        <div class="p-details">
          <h4>${item.name}</h4>
          <p>${item.size} · <span class="price">₹${item.price} <span class="old">₹${item.old}</span></span></p>
        </div>
        <button class="btn-p-add">+ ADD</button>
      `;

      card.querySelector(".btn-p-add").addEventListener("click", () => {
        cartItems.push(item);
        showToast(`Added ${item.name} to cart!`);
        renderProducts();
        updateCartSummary();
      });
    }

    container.appendChild(card);
  });
}

// 2. Recalculate Cart values and labels
function updateCartSummary() {
  // Update labels
  const itemCount = cartItems.length;
  document.getElementById("cart-item-count-label").innerText = `${itemCount} item${itemCount !== 1 ? "s" : ""}`;
  document.getElementById("checkout-item-count-label").innerText = `${itemCount} item${itemCount !== 1 ? "s" : ""}`;

  // Hide or show floating bottom cart bar (visible on Home/Categories/Trending when items present)
  const floatingBar = document.querySelector(".home-floating-cart-bar");
  if (floatingBar) {
    const isCheckoutScreen = document.getElementById("phone-checkout-screen").classList.contains("active");
    if (itemCount === 0 || isCheckoutScreen) {
      floatingBar.style.display = "none";
    } else {
      floatingBar.style.display = "flex";
    }
  }

  // Update Cart total pay amount
  let itemTotal = 0;
  cartItems.forEach(ci => {
    itemTotal += ci.price;
  });

  const cartTotalText = document.querySelector(".floating-cart-pill .pill-title");
  if (cartTotalText) {
    cartTotalText.innerText = "Cart";
  }

  // Update mini item box emoji dynamically based on last added item
  const lastItem = cartItems[cartItems.length - 1];
  const miniBox = document.querySelector(".mini-item-box");
  if (miniBox) {
    if (lastItem) {
      miniBox.innerHTML = getProductMediaHTML(lastItem, "width: 18px; height: 18px; border-radius: 4px; object-fit: cover;");
    } else {
      miniBox.innerText = "🥛";
    }
  }

  // Update proceed bar price labels
  const homeTotalVal = document.querySelector("#phone-cart-screen .pay-amount .pay-val");
  if (homeTotalVal) {
    homeTotalVal.innerText = `₹${itemTotal}`;
  }

  // Update checkout details
  const checkoutList = document.getElementById("checkout-cart-list");
  if (checkoutList) {
    checkoutList.innerHTML = "";
    
    const groupedItems = [];
    cartItems.forEach(ci => {
      const existing = groupedItems.find(item => item.name === ci.name);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += ci.price;
      } else {
        groupedItems.push({
          ...ci,
          quantity: 1,
          totalPrice: ci.price
        });
      }
    });

    groupedItems.forEach(ci => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.style.marginBottom = "8px";
      row.innerHTML = `
        <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(ci, "width: 38px; height: 38px; border-radius: 6px; object-fit: cover;")}</div>
        <div class="item-info" style="flex: 1; min-width: 0; padding-right: 8px;">
          <h4>${ci.name}</h4>
          <p>${ci.size} · <span class="item-price">₹${ci.totalPrice}</span></p>
        </div>
        <div class="qty-selector-container" style="margin-left: auto; scale: 0.85; flex-shrink: 0;">
          <button class="btn-qty-minus">-</button>
          <span class="qty-val">${ci.quantity}</span>
          <button class="btn-qty-plus">+</button>
        </div>
      `;
      
      row.querySelector(".btn-qty-plus").addEventListener("click", () => {
        cartItems.push(ci);
        updateCartSummary();
        renderProducts();
        renderTrendingProducts();
        if (typeof renderCategoryProducts === "function") renderCategoryProducts();
      });

      row.querySelector(".btn-qty-minus").addEventListener("click", () => {
        const idx = cartItems.findIndex(item => item.name === ci.name);
        if (idx > -1) {
          cartItems.splice(idx, 1);
        }
        updateCartSummary();
        renderProducts();
        renderTrendingProducts();
        if (typeof renderCategoryProducts === "function") renderCategoryProducts();
      });

      checkoutList.appendChild(row);
    });
  }

  updateCheckoutBill();
  if (typeof updateRecommendationButtons === "function") {
    updateRecommendationButtons();
  }
}

// 3. Recalculate Checkout Bill
function updateCheckoutBill() {
  let subtotal = 0;
  cartItems.forEach(ci => {
    subtotal += ci.price;
  });

  addedItems.forEach(item => {
    subtotal += item.price;
  });

  const delivery = 30;
  const total = subtotal + delivery;

  // Bill Summary Card
  const billCard = document.querySelector(".bill-card");
  if (billCard) {
    billCard.innerHTML = `
      <h3>📋 Bill Summary</h3>
      <div class="bill-row">
        <span>Item Total</span>
        <span>₹${subtotal}</span>
      </div>
      <div class="bill-row">
        <span>Delivery Fee</span>
        <span>₹30</span>
      </div>
      <div class="bill-row total">
        <span>To Pay</span>
        <span id="total-bill-pay">₹${total}</span>
      </div>
    `;
  }

  const totalBillPayEl = document.getElementById("total-bill-pay");
  if (totalBillPayEl) {
    totalBillPayEl.innerText = `₹${total}`;
  }
  const payPriceEl = document.getElementById("pay-price");
  if (payPriceEl) {
    payPriceEl.innerText = `₹${total}`;
  }
}

// 4. Fetch recommendations from ContextPulse endpoint
async function loadContextPulseRecommendations() {
  const userId = document.getElementById("user-selector").value;
  const weather = document.getElementById("weather-selector").value;
  const temp = weather === "sunny" ? 34 : (weather === "rainy" ? 28 : 18);
  const cartNames = cartItems.map(item => item.name).join(",");

  console.log(`ContextPulse query: fetching user profile exclusions and intent...`);
  
  try {
    sendTelemetry("checkout_loaded", "All");

    const response = await fetch(`${API_BASE}/api/users/${userId}/recommendations?temp=${temp}&weather=${weather}&cart=${encodeURIComponent(cartNames)}`);
    const res = await response.json();
    
    if (res.success) {
      activePayload = res;
      addedItems = [];
      
      document.getElementById("detected-intent-badge").innerText = `INTENT: ${res.intent}`;

      let primaryRec = null;

      // 1. Render Discovery Card
      if (res.recommendations && res.recommendations.length > 0) {
        primaryRec = res.recommendations[0];
        const prod = PRODUCTS_CATALOG[primaryRec.category] || { name: `${primaryRec.category} Item`, price: 80, meta: "Trial Size", emoji: "🆕" };
        
        primaryRec.product = prod;

        document.getElementById("ai-discovery-card").style.display = "block";
        document.getElementById("ai-card-category-name").innerText = primaryRec.category;
        document.getElementById("ai-reason-text").innerText = `"${primaryRec.reason}"`;
        document.getElementById("ai-product-name").innerText = prod.name;
        document.getElementById("ai-product-meta").innerText = `${prod.meta} · ₹${prod.price}`;
        document.getElementById("ai-product-emoji").innerHTML = getProductMediaHTML(prod, "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;");

        const addBtn = document.getElementById("add-discovery-item");
        addBtn.innerText = "+ ADD";
        addBtn.disabled = false;
        addBtn.style.backgroundColor = "#118822";

        sendTelemetry("impression", primaryRec.category);
      } else {
        document.getElementById("ai-discovery-card").style.display = "none";
      }

      // 2. Render Micro-Trial Card
      let trialRec = res.recommendations.find(r => 
        (!primaryRec || r.category !== primaryRec.category) && 
        (r.isTrial || (PRODUCTS_CATALOG[r.category] && PRODUCTS_CATALOG[r.category].price < 99))
      );

      if (!trialRec && res.recommendations.length > 1) {
        trialRec = res.recommendations[1];
      }

      if (trialRec) {
        const prod = PRODUCTS_CATALOG[trialRec.category] || { name: `${trialRec.category} Trial Pack`, price: 79, meta: "Sample size", emoji: "⚡" };
        trialRec.product = prod;

        document.getElementById("ai-trial-card").style.display = "block";
        document.getElementById("ai-trial-category-name").innerText = trialRec.category;
        document.getElementById("ai-trial-name").innerText = prod.name;
        document.getElementById("ai-trial-meta").innerText = `${prod.meta} · ₹${prod.price}`;
        document.getElementById("ai-trial-emoji").innerHTML = getProductMediaHTML(prod, "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;");
        
        const trialBtn = document.getElementById("add-trial-item");
        trialBtn.innerText = `Try for ₹${prod.price}`;
        trialBtn.disabled = false;
        trialBtn.style.backgroundColor = "#2563eb";
      } else {
        document.getElementById("ai-trial-card").style.display = "none";
      }

      // 3. Render Bundle Card
      if (res.bundle) {
        document.getElementById("ai-bundle-card").style.display = "block";
        document.getElementById("ai-bundle-name").innerText = res.bundle.name;
        document.getElementById("ai-bundle-price").innerText = `₹${res.bundle.price}`;
        document.getElementById("ai-bundle-savings").innerText = `Save ₹${res.bundle.savings}`;
        
        const bundleBtn = document.getElementById("add-bundle-item");
        bundleBtn.innerText = "Add Bundle";
        bundleBtn.disabled = false;
        bundleBtn.style.backgroundColor = "#d97706";
      } else {
        document.getElementById("ai-bundle-card").style.display = "none";
      }
      updateRecommendationButtons();
    }
  } catch (error) {
    console.error(`API Error: ${error.message}`);
  }
}

// 5. Telemetry Client Dispatcher
async function sendTelemetry(eventType, category, revenue = 0) {
  const userId = document.getElementById("user-selector").value;
  
  try {
    const response = await fetch(`${API_BASE}/api/telemetry/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventType, category, revenue })
    });
    await response.json();
    updateDashboardMetrics();
  } catch (error) {
    console.error("Telemetry error:", error);
  }
}

// 6. Update dashboard metrics in background
async function updateDashboardMetrics() {
  try {
    const response = await fetch(`${API_BASE}/api/telemetry/metrics`);
    const res = await response.json();
    
    if (res.success && res.metrics) {
      const { impressions, clicks, addCartEvents, clickThroughRatePercent, addToCartRatePercent, conversionRatePercent, checkoutCompletionRatePercent, incrementalRevenueGenerated } = res.metrics;
      
      const elImp = document.getElementById("kpi-val-impressions");
      if (elImp) elImp.innerText = impressions;
      const elCli = document.getElementById("kpi-val-clicks");
      if (elCli) elCli.innerText = clicks;
      const elAtc = document.getElementById("kpi-val-atcs");
      if (elAtc) elAtc.innerText = addCartEvents;
      const elRev = document.getElementById("kpi-val-revenue");
      if (elRev) elRev.innerText = `₹${incrementalRevenueGenerated}`;

      const pctCtr = document.getElementById("kpi-pct-ctr");
      if (pctCtr) pctCtr.innerText = `${clickThroughRatePercent}%`;
      const barCtr = document.getElementById("kpi-bar-ctr");
      if (barCtr) barCtr.style.width = `${Math.min(clickThroughRatePercent, 100)}%`;

      const pctAtc = document.getElementById("kpi-pct-atc");
      if (pctAtc) pctAtc.innerText = `${addToCartRatePercent}%`;
      const barAtc = document.getElementById("kpi-bar-atc");
      if (barAtc) barAtc.style.width = `${Math.min(addToCartRatePercent, 100)}%`;

      const pctCvr = document.getElementById("kpi-pct-cvr");
      if (pctCvr) pctCvr.innerText = `${conversionRatePercent}%`;
      const barCvr = document.getElementById("kpi-bar-cvr");
      if (barCvr) barCvr.style.width = `${Math.min(conversionRatePercent, 100)}%`;

      const pctChk = document.getElementById("kpi-pct-checkout");
      if (pctChk) pctChk.innerText = `${checkoutCompletionRatePercent}%`;
      const barChk = document.getElementById("kpi-bar-checkout");
      if (barChk) barChk.style.width = `${Math.min(checkoutCompletionRatePercent, 100)}%`;
    }
  } catch (error) {
    console.error("Metric sync failed:", error);
  }
}

// 7. Register listeners

// Navigation
document.getElementById("proceed-to-checkout-btn").addEventListener("click", () => {
  navigateToScreen("phone-checkout-screen");
  loadContextPulseRecommendations();
});

document.getElementById("checkout-back-btn").addEventListener("click", () => {
  navigateToScreen("phone-cart-screen");
});

document.getElementById("tab-home-bar").addEventListener("click", () => {
  navigateToScreen("phone-cart-screen");
});

// Search input interaction
const searchInput = document.getElementById("home-search-input");
const searchBtn = document.getElementById("home-search-btn");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      currentSearch = e.target.value;
      renderProducts();
    }
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    currentSearch = searchInput ? searchInput.value : "";
    renderProducts();
  });
}

// 1.5 Render homepage category pills
function renderHomepageCategoryPills() {
  const container = document.getElementById("home-categories-pills");
  if (!container) return;
  container.innerHTML = "";

  // Add "All" pill
  const allPill = document.createElement("div");
  allPill.className = currentHomepageCategory === "All" ? "cat-pill active" : "cat-pill";
  allPill.innerText = "All";
  allPill.addEventListener("click", () => {
    currentHomepageCategory = "All";
    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
    allPill.classList.add("active");
    
    // reset title
    const storeTitleMap = {
      zepto: "FRESH @ ₹1 · Daily Essentials",
      monsoon: "🌧️ Monsoon Store Special Tea & Coffee",
      mall: "🏬 Super Mall Lifestyle & Personal Care",
      fresh: "🥦 Fresh Farm Fruits & Veggies"
    };
    document.getElementById("store-section-title").innerHTML = `${storeTitleMap[currentStore]} <span class="subtitle">Quick delivery items</span>`;
    
    renderProducts();
  });
  container.appendChild(allPill);

  // Add other category pills
  const availableCats = STORE_CATEGORIES[currentStore] || Object.keys(CATEGORIES_PRODUCTS);
  availableCats.forEach(cat => {
    const pill = document.createElement("div");
    pill.className = currentHomepageCategory === cat ? "cat-pill active" : "cat-pill";
    pill.innerText = cat;
    pill.addEventListener("click", () => {
      currentHomepageCategory = cat;
      document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      // Update section title to category name
      document.getElementById("store-section-title").innerHTML = `${EMOJI_MAP[cat] || "🛒"} ${cat} <span class="subtitle">Explore category items</span>`;
      
      renderProducts();
    });
    container.appendChild(pill);
  });
}

// Store tabs select
document.querySelectorAll(".store-tab").forEach(tab => {
  tab.addEventListener("click", (e) => {
    document.querySelectorAll(".store-tab").forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    
    currentStore = e.target.getAttribute("data-store");
    currentHomepageCategory = "All"; // Reset category filter
    
    // Update store section title
    const storeTitleMap = {
      zepto: "FRESH @ ₹1 · Daily Essentials",
      monsoon: "🌧️ Monsoon Store Special Tea & Coffee",
      mall: "🏬 Super Mall Lifestyle & Personal Care",
      fresh: "🥦 Fresh Farm Fruits & Veggies"
    };
    document.getElementById("store-section-title").innerHTML = `${storeTitleMap[currentStore]} <span class="subtitle">Quick delivery items</span>`;
    
    renderHomepageCategoryPills();
    renderHomepageCategoriesGrid();
    renderProducts();
  });
});

function updateRecommendationButtons() {
  if (!activePayload) return;

  // 1. Discovery Button
  if (activePayload.recommendations && activePayload.recommendations[0]) {
    const rec = activePayload.recommendations[0];
    const prod = rec.product || PRODUCTS_CATALOG[rec.category] || { name: `${rec.category} Item`, price: 80 };
    const btn = document.getElementById("add-discovery-item");
    if (btn) {
      const inCart = cartItems.some(item => item.name === prod.name);
      btn.innerText = inCart ? "✓ ADDED" : "+ ADD";
      btn.style.backgroundColor = inCart ? "#7e22ce" : "#118822";
      btn.disabled = false;
    }
  }

  // 2. Trial Button
  const primaryRec = activePayload.recommendations ? activePayload.recommendations[0] : null;
  const trialRec = activePayload.recommendations ? activePayload.recommendations.find(r => 
    (!primaryRec || r.category !== primaryRec.category) && 
    (r.isTrial || (PRODUCTS_CATALOG[r.category] && PRODUCTS_CATALOG[r.category].price < 99))
  ) || activePayload.recommendations[1] : null;

  if (trialRec) {
    const prod = trialRec.product || PRODUCTS_CATALOG[trialRec.category] || { name: `${trialRec.category} Trial Pack`, price: 79 };
    const btn = document.getElementById("add-trial-item");
    if (btn) {
      const inCart = cartItems.some(item => item.name === prod.name);
      btn.innerText = inCart ? "✓ ADDED" : `Try for ₹${prod.price}`;
      btn.style.backgroundColor = inCart ? "#7e22ce" : "#2563eb";
      btn.disabled = false;
    }
  }

  // 3. Bundle Button
  if (activePayload.bundle) {
    const btn = document.getElementById("add-bundle-item");
    if (btn) {
      const inCart = cartItems.some(item => item.name === activePayload.bundle.name);
      btn.innerText = inCart ? "✓ ADDED" : "Add Bundle";
      btn.style.backgroundColor = inCart ? "#7e22ce" : "#d97706";
      btn.disabled = false;
    }
  }
}

// Add to cart AI widgets
document.getElementById("add-discovery-item").addEventListener("click", () => {
  if (!activePayload || !activePayload.recommendations[0]) return;
  const rec = activePayload.recommendations[0];
  const prod = rec.product || PRODUCTS_CATALOG[rec.category] || { name: `${rec.category} Item`, price: 80 };
  
  const inCartIdx = cartItems.findIndex(item => item.name === prod.name);
  if (inCartIdx > -1) {
    cartItems.splice(inCartIdx, 1);
    sendTelemetry("remove", rec.category);
  } else {
    const prodTagged = { ...prod, isAIRecommendation: true, recCategory: rec.category };
    cartItems.push(prodTagged);
    sendTelemetry("click", rec.category);
    sendTelemetry("cart_add", rec.category);
    showToast();
  }
  updateCartSummary();
});

document.getElementById("add-trial-item").addEventListener("click", () => {
  const primaryRec = activePayload.recommendations[0];
  const trialRec = activePayload.recommendations.find(r => 
    (!primaryRec || r.category !== primaryRec.category) && 
    (r.isTrial || (PRODUCTS_CATALOG[r.category] && PRODUCTS_CATALOG[r.category].price < 99))
  ) || activePayload.recommendations[1];

  if (!trialRec) return;

  const prod = trialRec.product || PRODUCTS_CATALOG[trialRec.category] || { name: `${trialRec.category} Trial Pack`, price: 79 };
  const inCartIdx = cartItems.findIndex(item => item.name === prod.name);
  if (inCartIdx > -1) {
    cartItems.splice(inCartIdx, 1);
    sendTelemetry("remove", trialRec.category);
  } else {
    const prodTagged = { ...prod, isAIRecommendation: true, recCategory: trialRec.category };
    cartItems.push(prodTagged);
    sendTelemetry("click", trialRec.category);
    sendTelemetry("cart_add", trialRec.category);
    showToast();
  }
  updateCartSummary();
});

document.getElementById("add-bundle-item").addEventListener("click", () => {
  if (!activePayload || !activePayload.bundle) return;
  const bundle = activePayload.bundle;
  const inCartIdx = cartItems.findIndex(item => item.name === bundle.name);
  if (inCartIdx > -1) {
    cartItems.splice(inCartIdx, 1);
    if (bundle.categories && bundle.categories.length > 0) {
      sendTelemetry("remove", bundle.categories[0]);
    }
  } else {
    const prod = { name: bundle.name, price: bundle.price, size: "Bundle Pack", isAIRecommendation: true, recCategory: bundle.categories ? bundle.categories[0] : "Bundle" };
    cartItems.push(prod);
    sendTelemetry("click", bundle.categories ? bundle.categories[0] : "Bundle");
    sendTelemetry("cart_add", bundle.categories ? bundle.categories[0] : "Bundle");
    showToast();
  }
  updateCartSummary();
});

// Pay Online / Pay Cash/UPI Complete checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  sendTelemetry("checkout_completed", "All");

  const aiConversionItems = cartItems.filter(item => item.isAIRecommendation);
  if (aiConversionItems.length > 0) {
    aiConversionItems.forEach(item => {
      sendTelemetry("conversion", item.recCategory || "Explore", item.price);
    });
    alert("Checkout completed! Toast confirmed: 'Added! You're exploring a new category.'");
  } else {
    alert("Checkout completed successfully!");
  }

  // Reset shopping state
  cartItems = [];
  addedItems = [];
  updateCartSummary();
  navigateToScreen("phone-cart-screen");
});

// --- NEW CATEGORIES TAB INTEGRATION ---
let selectedCategoryName = "Fruits & Vegetables";
let categorySearchQuery = "";

// 1. Render Homepage "Shop by Category" grid
function renderHomepageCategoriesGrid() {
  const grid = document.getElementById("homepage-category-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const availableCats = STORE_CATEGORIES[currentStore] || Object.keys(CATEGORIES_PRODUCTS);
  availableCats.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-grid-item";
    
    // Choose light pastel background color based on category
    const hash = cat.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hues = [10, 35, 75, 140, 190, 210, 260, 290, 325];
    const hue = hues[hash % hues.length];
    card.style.backgroundColor = `hsl(${hue}, 85%, 97%)`;
    card.style.borderColor = `hsl(${hue}, 40%, 88%)`;

    const catImage = IMAGE_MAP[cat];
    const mediaHTML = catImage 
      ? `<img src="${catImage}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`
      : EMOJI_MAP[cat] || "🛒";

    card.innerHTML = `
      <div class="emoji-circle" style="background: hsl(${hue}, 85%, 92%); display: flex; align-items: center; justify-content: center; overflow: hidden;">${mediaHTML}</div>
      <span class="cat-title">${cat}</span>
    `;

    card.addEventListener("click", () => {
      selectedCategoryName = cat;
      navigateToScreen("phone-categories-screen");
      renderCategoriesSidebar();
      renderCategoryProducts();
    });

    grid.appendChild(card);
  });
}

// 2. Render Sidebar
function renderCategoriesSidebar() {
  const sidebar = document.getElementById("categories-sidebar");
  if (!sidebar) return;
  sidebar.innerHTML = "";

  Object.keys(CATEGORIES_PRODUCTS).forEach(cat => {
    const btn = document.createElement("div");
    btn.className = "sidebar-item";
    if (cat === selectedCategoryName) {
      btn.className += " active";
    }

    const catImage = IMAGE_MAP[cat];
    const sidebarMediaHTML = catImage 
      ? `<img src="${catImage}" style="width: 24px; height: 24px; object-fit: cover; border-radius: 50%;" />`
      : EMOJI_MAP[cat] || "🛒";

    btn.innerHTML = `
      <span class="sidebar-emoji" style="display: inline-flex; align-items: center; justify-content: center; overflow: hidden; width: 24px; height: 24px;">${sidebarMediaHTML}</span>
      <span class="sidebar-txt">${cat}</span>
    `;

    btn.addEventListener("click", () => {
      selectedCategoryName = cat;
      document.querySelectorAll(".sidebar-item").forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderCategoryProducts();
    });

    sidebar.appendChild(btn);
  });
}

// Helper to locally update the action button / quantity selector in a category row without redrawing the entire list
function updateCategoryRowAction(row, item) {
  const wrapper = row.querySelector(".row-action-wrapper");
  if (!wrapper) return;

  const inCartCount = cartItems.filter(ci => ci.name === item.name).length;

  if (inCartCount > 0) {
    wrapper.innerHTML = `
      <div class="qty-selector-container">
        <button class="btn-qty-minus">-</button>
        <span class="qty-val">${inCartCount}</span>
        <button class="btn-qty-plus">+</button>
      </div>
    `;

    wrapper.querySelector(".btn-qty-plus").addEventListener("click", (e) => {
      e.stopPropagation();
      cartItems.push(item);
      showToast(`Added ${item.name} to cart!`);
      updateCategoryRowAction(row, item);
      updateCartSummary();
    });

    wrapper.querySelector(".btn-qty-minus").addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = cartItems.findIndex(ci => ci.name === item.name);
      if (idx > -1) {
        cartItems.splice(idx, 1);
      }
      updateCategoryRowAction(row, item);
      updateCartSummary();
    });
  } else {
    wrapper.innerHTML = `
      <button class="btn-p-add" style="font-size: 10px; padding: 4px 10px; border-radius: 6px; border: 1px solid #ff3269; font-weight: 800; cursor: pointer; background-color: var(--primary); color: white;">+ ADD</button>
    `;

    wrapper.querySelector(".btn-p-add").addEventListener("click", (e) => {
      e.stopPropagation();
      cartItems.push(item);
      showToast(`Added ${item.name} to cart!`);
      updateCategoryRowAction(row, item);
      updateCartSummary();
    });
  }
}

function renderCategoryProducts() {
  const list = document.getElementById("category-products-list");
  const title = document.getElementById("selected-category-title");
  if (!list || !title) return;

  title.innerText = selectedCategoryName;
  list.innerHTML = "";

  const products = CATEGORIES_PRODUCTS[selectedCategoryName] || [];
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div style="font-size: 10px; color: #64748b; text-align: center; padding: 20px;">No items match "${categorySearchQuery}"</div>`;
    return;
  }

  filtered.forEach(item => {
    const row = document.createElement("div");
    row.className = "cat-p-row";
    row.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.2s;";

    row.innerHTML = `
      <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(item, "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;")}</div>
      <div class="p-details" style="flex: 1; min-width: 0; padding-right: 8px;">
        <h4 style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 2px; line-height: 1.3;">${item.name}</h4>
        <p style="font-size: 9px; color: #64748b;">${item.size} · <span class="price" style="font-weight: 800; color: #ff3269;">₹${item.price} <span class="old" style="text-decoration: line-through; color: #94a3b8; font-size: 8px; font-weight: 400; margin-left: 3px;">₹${item.old}</span></span></p>
      </div>
      <div class="row-action-wrapper" style="flex-shrink: 0; margin-left: auto;"></div>
    `;

    updateCategoryRowAction(row, item);
    list.appendChild(row);
  });
}

// 3.5 Render Trending products list
function renderTrendingProducts() {
  const list = document.getElementById("trending-products-list");
  if (!list) return;
  list.innerHTML = "";

  const trendingItems = [
    { name: "Cadbury Dairy Milk Silk", price: 80, old: 90, emoji: "🍫", size: "60 g", category: "Sweet Craving" },
    { name: "Amul Salted Butter", price: 56, old: 60, emoji: "🧈", size: "100 g", category: "Dairy, Bread & Eggs" },
    { name: "Paper Boat Coconut Water", price: 60, old: 75, emoji: "🥤", size: "200 ml Pack", category: "Cold Drinks & Juices" },
    { name: "Lays Potato Chips Classic", price: 30, old: 35, emoji: "🥔", size: "90 g", category: "Snacks & Munchies" },
    { name: "Organic Red Apples", price: 99, old: 120, emoji: "🍎", size: "4 pcs", category: "Organic & Healthy" }
  ];

  trendingItems.forEach(item => {
    const row = document.createElement("div");
    row.className = "cat-p-row";
    row.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 8px;";
    
    const inCartCount = cartItems.filter(ci => ci.name === item.name).length;

    if (inCartCount > 0) {
      row.innerHTML = `
        <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(item, "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;")}</div>
        <div class="p-details" style="flex: 1; min-width: 0; padding-right: 8px;">
          <h4 style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${item.name}</h4>
          <p style="font-size: 9px; color: #64748b;">${item.size} · <span class="price" style="font-weight: 800; color: #ff3269;">₹${item.price}</span></p>
        </div>
        <div class="qty-selector-container">
          <button class="btn-qty-minus">-</button>
          <span class="qty-val">${inCartCount}</span>
          <button class="btn-qty-plus">+</button>
        </div>
      `;

      row.querySelector(".btn-qty-plus").addEventListener("click", () => {
        cartItems.push(item);
        renderTrendingProducts();
        updateCartSummary();
      });

      row.querySelector(".btn-qty-minus").addEventListener("click", () => {
        const idx = cartItems.findIndex(ci => ci.name === item.name);
        if (idx > -1) {
          cartItems.splice(idx, 1);
        }
        renderTrendingProducts();
        updateCartSummary();
      });
    } else {
      row.innerHTML = `
        <div class="product-media-wrapper" style="margin-right: 8px; flex-shrink: 0; display: flex; align-items: center;">${getProductMediaHTML(item, "width: 48px; height: 48px; border-radius: 8px; object-fit: cover;")}</div>
        <div class="p-details" style="flex: 1; min-width: 0; padding-right: 8px;">
          <h4 style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${item.name}</h4>
          <p style="font-size: 9px; color: #64748b;">${item.size} · <span class="price" style="font-weight: 800; color: #ff3269;">₹${item.price}</span></p>
        </div>
        <button class="btn-p-add" style="font-size: 10px; padding: 4px 10px; border-radius: 6px; border: 1px solid #ff3269; font-weight: 800; cursor: pointer; background-color: var(--primary); color: white;">+ ADD</button>
      `;

      row.querySelector(".btn-p-add").addEventListener("click", () => {
        cartItems.push(item);
        renderTrendingProducts();
        updateCartSummary();
      });
    }
    list.appendChild(row);
  });
}

// 4. Attach Tab click events
document.getElementById("tab-categories-bar").addEventListener("click", () => {
  navigateToScreen("phone-categories-screen");
  renderCategoriesSidebar();
  renderCategoryProducts();
});

document.getElementById("tab-home-categories").addEventListener("click", () => {
  navigateToScreen("phone-cart-screen");
});

document.getElementById("tab-trending-bar").addEventListener("click", () => {
  navigateToScreen("phone-trending-screen");
  renderTrendingProducts();
});

document.getElementById("tab-trending-categories").addEventListener("click", () => {
  navigateToScreen("phone-trending-screen");
  renderTrendingProducts();
});

document.getElementById("tab-home-trending").addEventListener("click", () => {
  navigateToScreen("phone-cart-screen");
});

document.getElementById("tab-categories-trending").addEventListener("click", () => {
  navigateToScreen("phone-categories-screen");
  renderCategoriesSidebar();
  renderCategoryProducts();
});

// Search input for Categories page
document.getElementById("categories-search-input").addEventListener("input", (e) => {
  categorySearchQuery = e.target.value;
  renderCategoryProducts();
});

// Startup routines
renderProducts();
renderHomepageCategoryPills();
renderHomepageCategoriesGrid();
renderCategoriesSidebar();
renderCategoryProducts();
renderTrendingProducts();
updateCartSummary();
