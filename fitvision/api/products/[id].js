



const IMG = {
  polo: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
  kurta: 'https://images.unsplash.com/photo-1610419266601-52541cde40a7?auto=format&fit=crop&w=500&q=80',
  jeans: 'https://images.unsplash.com/photo-1542272604-78021d7b322f?auto=format&fit=crop&w=500&q=80',
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80',
  wshirt: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=500&q=80',
  check: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=500&q=80',
  shoe: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
  saree: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
  suit: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80',
  tshirt: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80',
  frock: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80',
  pants: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80',
  blazer: 'https://images.unsplash.com/photo-1593030761235-2e2b2d79cde5?auto=format&fit=crop&w=500&q=80',
  fshirt: 'https://images.unsplash.com/photo-1529374255-68754904aa2d?auto=format&fit=crop&w=500&q=80',
  dress: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=500&q=80',
  cargo: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=500&q=80',
  hoodie: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=500&q=80',
  ethnic: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80',
  skirt: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=500&q=80',
  formal: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=80',
};

const products = [
  // ── T-SHIRTS (Men) ──
  {id:1, name:'Men Solid Polo Neck Blue T-Shirt', category:"Men's Wear", discount:'Min. 50% Off', sub:'Explore Now!', image:IMG.polo, price:499, rating:4.2, reviews:1245},
  {id:2, name:'Men Graphic Print Round Neck T-Shirt', category:"Men's Wear", discount:'Flat 40% Off', sub:'Urban Style', image:IMG.tshirt, price:399, rating:4.1, reviews:890},
  {id:3, name:'Men Striped V-Neck T-Shirt', category:"Men's Wear", discount:'Under ₹499', sub:'Cotton Comfort', image:IMG.polo, price:349, rating:4.0, reviews:650},
  {id:4, name:'Men Oversized Drop Shoulder T-Shirt', category:"Men's Wear", discount:'Flat 50% Off', sub:'Streetwear', image:IMG.tshirt, price:599, rating:4.4, reviews:2100},
  {id:5, name:'Men Pack of 3 Plain T-Shirts', category:"Men's Wear", discount:'Min. 60% Off', sub:'Best Value', image:IMG.polo, price:799, rating:4.3, reviews:3400},
  {id:6, name:'Men Tie-Dye Printed T-Shirt', category:"Men's Wear", discount:'Special Offer', sub:'Trending', image:IMG.tshirt, price:449, rating:3.9, reviews:560},
  {id:7, name:'Men Muscle Fit Gym T-Shirt', category:"Men's Wear", discount:'Under ₹399', sub:'Activewear', image:IMG.polo, price:299, rating:4.2, reviews:1800},
  {id:8, name:'Men Acid Wash T-Shirt', category:"Men's Wear", discount:'Flat 45% Off', sub:'Urban Casual', image:IMG.tshirt, price:499, rating:4.0, reviews:720},
  {id:9, name:'Men Henley Neck Full Sleeve T-Shirt', category:"Men's Wear", discount:'Min. 30% Off', sub:'Winter Casual', image:IMG.polo, price:599, rating:4.3, reviews:980},
  {id:10, name:'Men Color Block T-Shirt', category:"Men's Wear", discount:'Under ₹599', sub:'Colorful Picks', image:IMG.tshirt, price:449, rating:4.1, reviews:430},
  {id:11, name:'Men Plain White Round Neck T-Shirt', category:"Men's Wear", discount:'Min. 35% Off', sub:'Classic Basics', image:IMG.polo, price:299, rating:4.5, reviews:5200},
  {id:12, name:'Men Printed Slogan T-Shirt', category:"Men's Wear", discount:'Flat 55% Off', sub:'Street Style', image:IMG.tshirt, price:349, rating:3.8, reviews:310},

  // ── SHIRTS (Men) ──
  {id:13, name:'Men Regular Fit Checkered Shirt', category:"Men's Wear", discount:'Under ₹499', sub:'Casual Wear', image:IMG.check, price:399, rating:4.0, reviews:1100},
  {id:14, name:'Men Slim Fit Formal White Shirt', category:"Men's Wear", discount:'Min. 40% Off', sub:'Office Ready', image:IMG.fshirt, price:699, rating:4.4, reviews:2800},
  {id:15, name:'Men Linen Casual Full Sleeve Shirt', category:"Men's Wear", discount:'Flat 30% Off', sub:'Summer Must', image:IMG.check, price:899, rating:4.3, reviews:1560},
  {id:16, name:'Men Denim Shirt Full Sleeve', category:"Men's Wear", discount:'Under ₹999', sub:'Denim Love', image:IMG.fshirt, price:799, rating:4.2, reviews:890},
  {id:17, name:'Men Printed Floral Casual Shirt', category:"Men's Wear", discount:'Flat 50% Off', sub:'Beach Vibes', image:IMG.check, price:599, rating:4.0, reviews:670},
  {id:18, name:'Men Mandarin Collar Kurta Shirt', category:"Men's Wear", discount:'Special Offer', sub:'Festive Ready', image:IMG.ethnic, price:999, rating:4.5, reviews:1200},
  {id:19, name:'Men Regular Fit Oxford Shirt', category:"Men's Wear", discount:'Min. 35% Off', sub:'Smart Casual', image:IMG.fshirt, price:749, rating:4.3, reviews:2100},
  {id:20, name:'Men Half Sleeve Solid Shirt', category:"Men's Wear", discount:'Under ₹699', sub:'Everyday Pick', image:IMG.check, price:499, rating:4.1, reviews:940},
  {id:21, name:'Men Slim Fit Striped Shirt', category:"Men's Wear", discount:'Flat 40% Off', sub:'Trending Style', image:IMG.fshirt, price:649, rating:4.2, reviews:1340},
  {id:22, name:'Men Cotton Printed Batik Shirt', category:"Men's Wear", discount:'Min. 45% Off', sub:'Artisan Craft', image:IMG.check, price:899, rating:4.4, reviews:760},
  {id:23, name:'Men Double Pocket Cargo Shirt', category:"Men's Wear", discount:'Under ₹799', sub:'Utility Style', image:IMG.fshirt, price:699, rating:3.9, reviews:450},
  {id:24, name:'Men Bamboo Fabric Full Sleeve Shirt', category:"Men's Wear", discount:'Flat 25% Off', sub:'Eco Friendly', image:IMG.check, price:1099, rating:4.6, reviews:380},

  // ── PANTS / JEANS (Men) ──
  {id:25, name:'Men Slim Fit Blue Jeans', category:"Men's Wear", discount:'Under ₹999', sub:"Levi's, Wrangler", image:IMG.jeans, price:999, rating:4.3, reviews:2100},
  {id:26, name:'Men Regular Fit Chinos', category:"Men's Wear", discount:'Min. 40% Off', sub:'Office Casual', image:IMG.pants, price:899, rating:4.2, reviews:1800},
  {id:27, name:'Men Slim Fit Cargo Pants', category:"Men's Wear", discount:'Flat 35% Off', sub:'Utility Wear', image:IMG.cargo, price:1099, rating:4.1, reviews:970},
  {id:28, name:'Men Skinny Fit Black Jeans', category:"Men's Wear", discount:'Under ₹1199', sub:'Street Style', image:IMG.jeans, price:1199, rating:4.4, reviews:3200},
  {id:29, name:'Men Track Pants with Pockets', category:"Men's Wear", discount:'Min. 50% Off', sub:'Activewear', image:IMG.cargo, price:499, rating:4.0, reviews:2400},
  {id:30, name:'Men Relaxed Fit Linen Trousers', category:"Men's Wear", discount:'Flat 30% Off', sub:'Summer Comfort', image:IMG.pants, price:1299, rating:4.3, reviews:680},
  {id:31, name:'Men Jogger Pants Elastic Waist', category:"Men's Wear", discount:'Under ₹799', sub:'Athleisure', image:IMG.cargo, price:699, rating:4.2, reviews:1560},
  {id:32, name:'Men Formal Flat Front Trousers', category:"Men's Wear", discount:'Min. 35% Off', sub:'Corporate Wear', image:IMG.pants, price:899, rating:4.5, reviews:2900},
  {id:33, name:'Men Distressed Slim Fit Jeans', category:"Men's Wear", discount:'Flat 45% Off', sub:'Denim Edit', image:IMG.jeans, price:1499, rating:4.3, reviews:1100},
  {id:34, name:'Men Harem Pants Cotton', category:"Men's Wear", discount:'Special Offer', sub:'Boho Style', image:IMG.cargo, price:799, rating:3.9, reviews:340},
  {id:35, name:'Men Wide Leg Trousers', category:"Men's Wear", discount:'Under ₹1499', sub:'Modern Fit', image:IMG.pants, price:1299, rating:4.1, reviews:520},

  // ── SUITS (Men) ──
  {id:36, name:'Men 2-Piece Slim Fit Navy Suit', category:"Men's Wear", discount:'Min. 30% Off', sub:'Wedding Season', image:IMG.suit, price:4999, rating:4.6, reviews:1200},
  {id:37, name:'Men 3-Piece Formal Black Suit', category:"Men's Wear", discount:'Flat 25% Off', sub:'Occasions', image:IMG.formal, price:5999, rating:4.7, reviews:890},
  {id:38, name:'Men Bandhgala Jodhpuri Suit', category:"Men's Wear", discount:'Special Offer', sub:'Ethnic Formal', image:IMG.ethnic, price:3999, rating:4.8, reviews:760},
  {id:39, name:'Men Slim Fit Checkered Blazer', category:"Men's Wear", discount:'Min. 40% Off', sub:'Smart Casual', image:IMG.blazer, price:2499, rating:4.4, reviews:540},
  {id:40, name:'Men Single Breasted Blazer', category:"Men's Wear", discount:'Flat 35% Off', sub:'Office Wear', image:IMG.blazer, price:2999, rating:4.5, reviews:980},
  {id:41, name:'Men Nehru Jacket Festive', category:"Men's Wear", discount:'Under ₹2499', sub:'Ethnic Wear', image:IMG.ethnic, price:1999, rating:4.6, reviews:1400},
  {id:42, name:'Men Velvet Blazer Party Wear', category:"Men's Wear", discount:'Min. 20% Off', sub:'Party Picks', image:IMG.blazer, price:3499, rating:4.5, reviews:430},
  {id:43, name:'Men Printed Sherwani Set', category:"Men's Wear", discount:'Wedding Special', sub:'Bridal Wear', image:IMG.ethnic, price:7999, rating:4.9, reviews:320},
  {id:44, name:'Men Linen Blazer Unstructured', category:"Men's Wear", discount:'Flat 30% Off', sub:'Casual Formal', image:IMG.blazer, price:2799, rating:4.3, reviews:680},
  {id:45, name:'Men Slim Fit Grey Suit', category:"Men's Wear", discount:'Min. 25% Off', sub:'Power Dressing', image:IMG.suit, price:4499, rating:4.7, reviews:1100},

  // ── FROCKS / DRESSES (Women) ──
  {id:46, name:'Women Floral Midi Dress', category:"Women's Wear", discount:'Flat 55% Off', sub:'Summer Vibes', image:IMG.frock, price:999, rating:4.5, reviews:3400},
  {id:47, name:'Women A-Line Party Frock', category:"Women's Wear", discount:'Min. 40% Off', sub:'Party Ready', image:IMG.dress, price:1499, rating:4.4, reviews:1800},
  {id:48, name:'Women Fit & Flare Dress', category:"Women's Wear", discount:'Special Offer', sub:'All Day Chic', image:IMG.frock, price:1199, rating:4.3, reviews:2200},
  {id:49, name:'Women Wrap Maxi Dress Printed', category:"Women's Wear", discount:'Flat 50% Off', sub:'Beach Look', image:IMG.dress, price:1299, rating:4.2, reviews:1560},
  {id:50, name:'Women Bodycon Mini Dress', category:"Women's Wear", discount:'Under ₹1499', sub:'Night Out', image:IMG.frock, price:899, rating:4.0, reviews:980},
  {id:51, name:'Women Off-Shoulder Ruffle Dress', category:"Women's Wear", discount:'Min. 45% Off', sub:'Occasion Wear', image:IMG.dress, price:1699, rating:4.6, reviews:2100},
  {id:52, name:'Women Striped Shirt Dress', category:"Women's Wear", discount:'Flat 40% Off', sub:'Casual Smart', image:IMG.frock, price:799, rating:4.1, reviews:890},
  {id:53, name:'Women Cold Shoulder Dress', category:"Women's Wear", discount:'Special Offer', sub:'Statement Look', image:IMG.dress, price:1099, rating:4.3, reviews:1230},
  {id:54, name:'Women Puff Sleeve Midi Dress', category:"Women's Wear", discount:'Flat 35% Off', sub:'Trendy Picks', image:IMG.frock, price:1399, rating:4.4, reviews:1670},
  {id:55, name:'Women Lace Trim Evening Dress', category:"Women's Wear", discount:'Min. 30% Off', sub:'Elegant Choice', image:IMG.dress, price:1999, rating:4.7, reviews:760},
  {id:56, name:'Women Co-Ord Set Crop Top Skirt', category:"Women's Wear", discount:'Flat 50% Off', sub:'Co-ord Sets', image:IMG.frock, price:1199, rating:4.5, reviews:3100},
  {id:57, name:'Women Halter Neck Floral Dress', category:"Women's Wear", discount:'Under ₹999', sub:'Brunch Look', image:IMG.dress, price:849, rating:4.2, reviews:720},
  {id:58, name:'Women Tiered Bohemian Maxi Dress', category:"Women's Wear", discount:'Flat 45% Off', sub:'Boho Chic', image:IMG.frock, price:1299, rating:4.3, reviews:1040},
  {id:59, name:'Women Velvet Party Midi Dress', category:"Women's Wear", discount:'Min. 25% Off', sub:'Premium Feel', image:IMG.dress, price:2499, rating:4.6, reviews:540},
  {id:60, name:'Women Denim Pinafore Dress', category:"Women's Wear", discount:'Under ₹1299', sub:'Casual Denim', image:IMG.frock, price:1099, rating:4.0, reviews:680},

  // ── WOMEN'S TOPS / KURTAS ──
  {id:61, name:'Women Printed A-line Kurta', category:"Women's Wear", discount:'Flat 60% Off', sub:'Biba, W & more', image:IMG.kurta, price:899, rating:4.5, reviews:3400},
  {id:62, name:'Women Floral Printed Kurti', category:"Women's Wear", discount:'Min. 50% Off', sub:'Jaipur Prints', image:IMG.kurta, price:699, rating:4.4, reviews:2800},
  {id:63, name:'Women Cotton Anarkali Kurti', category:"Women's Wear", discount:'Flat 45% Off', sub:'Ethnic Daily', image:IMG.kurta, price:1199, rating:4.6, reviews:1900},
  {id:64, name:'Women Crop Top Solid', category:"Women's Wear", discount:'Under ₹599', sub:'Young & Trendy', image:IMG.wshirt, price:399, rating:4.0, reviews:1200},
  {id:65, name:'Women Regular Fit Printed Shirt', category:"Women's Wear", discount:'Special Offer', sub:'Trending Styles', image:IMG.wshirt, price:599, rating:4.1, reviews:450},
  {id:66, name:'Women Chikankari Straight Kurti', category:"Women's Wear", discount:'Flat 40% Off', sub:'Lucknow Craft', image:IMG.kurta, price:1499, rating:4.7, reviews:2300},
  {id:67, name:'Women Peplum Top Solid', category:"Women's Wear", discount:'Under ₹799', sub:'Office Chic', image:IMG.wshirt, price:699, rating:4.2, reviews:870},
  {id:68, name:'Women Asymmetric Hem Tunic', category:"Women's Wear", discount:'Flat 35% Off', sub:'Modern Cut', image:IMG.kurta, price:999, rating:4.3, reviews:640},
  {id:69, name:'Women Tie-Dye Kaftan Top', category:"Women's Wear", discount:'Min. 55% Off', sub:'Boho Soul', image:IMG.wshirt, price:799, rating:4.1, reviews:540},
  {id:70, name:'Women Embroidered Mirror Work Kurti', category:"Women's Wear", discount:'Festive Special', sub:'Rajasthan Craft', image:IMG.kurta, price:1999, rating:4.8, reviews:1100},

  // ── ETHNIC WEAR ──
  {id:71, name:'Women Embroidered Saree', category:'Ethnic Wear', discount:'Min. 50% Off', sub:'Ethnic Wear', image:IMG.saree, price:2199, rating:4.8, reviews:3200},
  {id:72, name:'Women Banarasi Silk Saree', category:'Ethnic Wear', discount:'Special Offer', sub:'Silk Collection', image:IMG.saree, price:3499, rating:4.9, reviews:1800},
  {id:73, name:'Women Cotton Tant Saree', category:'Ethnic Wear', discount:'Flat 40% Off', sub:'Daily Wear', image:IMG.saree, price:999, rating:4.5, reviews:2400},
  {id:74, name:'Women Salwar Kameez Set', category:'Ethnic Wear', discount:'Min. 45% Off', sub:'Festive Season', image:IMG.ethnic, price:1499, rating:4.6, reviews:2100},
  {id:75, name:'Women Palazzo Suit Set', category:'Ethnic Wear', discount:'Flat 50% Off', sub:'Comfort Ethnic', image:IMG.ethnic, price:1299, rating:4.4, reviews:1650},
  {id:76, name:'Women Phulkari Dupatta', category:'Ethnic Wear', discount:'Under ₹999', sub:'Punjab Special', image:IMG.ethnic, price:799, rating:4.5, reviews:920},
  {id:77, name:'Women Lehenga Choli Set', category:'Ethnic Wear', discount:'Wedding Special', sub:'Bridal Ready', image:IMG.saree, price:4999, rating:4.9, reviews:870},
  {id:78, name:'Women Dhoti Pants with Kurta', category:'Ethnic Wear', discount:'Flat 35% Off', sub:'Fusion Ethnic', image:IMG.ethnic, price:1799, rating:4.4, reviews:680},

  // ── HOODIES / JACKETS ──
  {id:79, name:'Men Solid Pullover Hoodie', category:"Men's Wear", discount:'Min. 40% Off', sub:'Winter Wear', image:IMG.hoodie, price:999, rating:4.3, reviews:2800},
  {id:80, name:'Men Zip-Up Fleece Hoodie', category:"Men's Wear", discount:'Flat 35% Off', sub:'Cold Days', image:IMG.hoodie, price:1299, rating:4.4, reviews:1900},
  {id:81, name:'Men Solid Puffer Jacket', category:"Men's Wear", discount:'Min. 40% Off', sub:'Winter Wear', image:IMG.jacket, price:1299, rating:4.6, reviews:890},
  {id:82, name:'Men Windcheater Jacket', category:"Men's Wear", discount:'Under ₹1499', sub:'Outdoor Ready', image:IMG.jacket, price:1199, rating:4.2, reviews:1100},
  {id:83, name:'Men Denim Jacket Regular Fit', category:"Men's Wear", discount:'Flat 30% Off', sub:'Denim Season', image:IMG.jacket, price:1699, rating:4.4, reviews:1560},
  {id:84, name:'Men Varsity Bomber Jacket', category:"Men's Wear", discount:'Min. 25% Off', sub:'Street Style', image:IMG.hoodie, price:1999, rating:4.3, reviews:740},
  {id:85, name:'Women Crop Hoodie Printed', category:"Women's Wear", discount:'Flat 50% Off', sub:'Y2K Vibes', image:IMG.hoodie, price:799, rating:4.1, reviews:980},
  {id:86, name:'Women Puffer Jacket Quilted', category:"Women's Wear", discount:'Under ₹1299', sub:'Stay Warm', image:IMG.jacket, price:1199, rating:4.5, reviews:1230},

  // ── SKIRTS ──
  {id:87, name:'Women Pleated Mini Skirt', category:"Women's Wear", discount:'Flat 45% Off', sub:'Y2K Fashion', image:IMG.skirt, price:699, rating:4.2, reviews:1400},
  {id:88, name:'Women Midi Wrap Skirt Floral', category:"Women's Wear", discount:'Min. 40% Off', sub:'Floral Edit', image:IMG.skirt, price:899, rating:4.3, reviews:980},
  {id:89, name:'Women Denim Skirt A-Line', category:"Women's Wear", discount:'Under ₹999', sub:'Denim Must', image:IMG.skirt, price:799, rating:4.1, reviews:760},
  {id:90, name:'Women Satin Midi Skirt', category:"Women's Wear", discount:'Flat 35% Off', sub:'Elegant Pick', image:IMG.skirt, price:1199, rating:4.4, reviews:540},
  {id:91, name:'Women Tiered Maxi Skirt Printed', category:"Women's Wear", discount:'Min. 45% Off', sub:'Boho Maxi', image:IMG.skirt, price:1099, rating:4.3, reviews:870},

  // ── FOOTWEAR ──
  {id:92, name:'Running Shoes For Men', category:'Footwear', discount:'Up to 70% Off', sub:'Puma, Adidas', image:IMG.shoe, price:1499, rating:4.7, reviews:5600},
  {id:93, name:'Men Formal Oxford Shoes', category:'Footwear', discount:'Min. 30% Off', sub:'Office Ready', image:IMG.formal, price:1999, rating:4.5, reviews:1800},
  {id:94, name:'Men Casual Canvas Sneakers', category:'Footwear', discount:'Flat 40% Off', sub:'Street Style', image:IMG.shoe, price:999, rating:4.3, reviews:3200},
  {id:95, name:'Women Block Heel Sandals', category:'Footwear', discount:'Under ₹1499', sub:'Party Feet', image:IMG.shoe, price:1299, rating:4.4, reviews:1400},
  {id:96, name:'Women Juttis Embroidered', category:'Footwear', discount:'Min. 35% Off', sub:'Ethnic Footwear', image:IMG.ethnic, price:899, rating:4.6, reviews:2100},
  {id:97, name:'Men Sports Running Shoes', category:'Footwear', discount:'Flat 50% Off', sub:'Performance', image:IMG.shoe, price:2499, rating:4.8, reviews:4200},

  // ── ACCESSORIES ──
  {id:98, name:'Men Leather Belt Brown', category:'Accessories', discount:'Min. 40% Off', sub:'Formal & Casual', image:IMG.formal, price:499, rating:4.3, reviews:2800},
  {id:99, name:'Women Printed Silk Scarf', category:'Accessories', discount:'Flat 45% Off', sub:'Statement Piece', image:IMG.wshirt, price:699, rating:4.5, reviews:940},
  {id:100, name:'Men Classic Aviator Sunglasses', category:'Accessories', discount:'Under ₹999', sub:'Eye Style', image:IMG.formal, price:799, rating:4.4, reviews:3600},
  {id:101, name:'Women Tote Bag Canvas', category:'Accessories', discount:'Flat 30% Off', sub:'Everyday Bag', image:IMG.wshirt, price:1199, rating:4.6, reviews:1200},
  {id:102, name:'Men Sports Watch Casual', category:'Accessories', discount:'Min. 25% Off', sub:'Watch Deals', image:IMG.formal, price:1499, rating:4.4, reviews:1800},
  {id:103, name:'Women Stud Earrings Set', category:'Accessories', discount:'Flat 60% Off', sub:'Jewellery', image:IMG.ethnic, price:349, rating:4.5, reviews:4200},
  {id:104, name:'Men Cap Baseball Black', category:'Accessories', discount:'Under ₹499', sub:'Street Caps', image:IMG.hoodie, price:399, rating:4.2, reviews:2100},
  {id:105, name:'Women Clutch Bag Party', category:'Accessories', discount:'Min. 35% Off', sub:'Evening Bags', image:IMG.wshirt, price:899, rating:4.3, reviews:760},
];



export default function handler(req, res) {
  const { id } = req.query;
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
