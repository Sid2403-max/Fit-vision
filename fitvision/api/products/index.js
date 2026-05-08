const IMG = {
  "shirt": "/images/linen_shirt.png",
  "dress": "/images/olive_dress.png",
  "pants": "/images/sand_trousers.png",
  "saree": "/images/earthy_saree.png",
  "jacket": "/images/brown_jacket.png",
  "shoes": "/images/leather_shoes.png"
};
const products = [
  {
    "id": 1,
    "name": "Aesthetic Beige Linen Shirt",
    "category": "Men's Wear",
    "discount": "Cafe Collection",
    "sub": "Summer Essential",
    "image": "/images/linen_shirt.png",
    "price": 1299,
    "rating": 4.8,
    "reviews": 342
  },
  {
    "id": 2,
    "name": "Relaxed Fit Sand Trousers",
    "category": "Men's Wear",
    "discount": "Trending",
    "sub": "Premium Cotton",
    "image": "/images/sand_trousers.png",
    "price": 1899,
    "rating": 4.7,
    "reviews": 512
  },
  {
    "id": 3,
    "name": "Classic Brown Suede Jacket",
    "category": "Men's Wear",
    "discount": "Winter Edit",
    "sub": "Timeless Piece",
    "image": "/images/brown_jacket.png",
    "price": 3499,
    "rating": 4.9,
    "reviews": 210
  },
  {
    "id": 4,
    "name": "Earthy Olive Corduroy Overshirt",
    "category": "Men's Wear",
    "discount": "New Arrival",
    "sub": "Layering Essential",
    "image": "/images/linen_shirt.png",
    "price": 1499,
    "rating": 4.6,
    "reviews": 180
  },
  {
    "id": 5,
    "name": "Minimalist Coffee Brown Trousers",
    "category": "Men's Wear",
    "discount": "Bestseller",
    "sub": "Everyday Comfort",
    "image": "/images/sand_trousers.png",
    "price": 1699,
    "rating": 4.5,
    "reviews": 620
  },
  {
    "id": 6,
    "name": "Flowy Olive Green Boho Dress",
    "category": "Women's Wear",
    "discount": "Bestseller",
    "sub": "Aesthetic Vibe",
    "image": "/images/olive_dress.png",
    "price": 1999,
    "rating": 4.9,
    "reviews": 840
  },
  {
    "id": 7,
    "name": "Warm Sand Tiered Maxi Dress",
    "category": "Women's Wear",
    "discount": "Trending",
    "sub": "Summer Romance",
    "image": "/images/olive_dress.png",
    "price": 2299,
    "rating": 4.8,
    "reviews": 450
  },
  {
    "id": 8,
    "name": "Cream Linen Button-Down Shirt",
    "category": "Women's Wear",
    "discount": "Classic",
    "sub": "Office to Cafe",
    "image": "/images/linen_shirt.png",
    "price": 1199,
    "rating": 4.7,
    "reviews": 320
  },
  {
    "id": 9,
    "name": "Earthy Brown Suede Coat",
    "category": "Women's Wear",
    "discount": "Winter Ready",
    "sub": "Premium Warmth",
    "image": "/images/brown_jacket.png",
    "price": 3999,
    "rating": 4.9,
    "reviews": 150
  },
  {
    "id": 10,
    "name": "Bohemian Olive Wrap Skirt",
    "category": "Women's Wear",
    "discount": "New Arrival",
    "sub": "Flowy Comfort",
    "image": "/images/olive_dress.png",
    "price": 1499,
    "rating": 4.6,
    "reviews": 280
  },
  {
    "id": 11,
    "name": "Olive & Cream Block Print Saree",
    "category": "Ethnic Wear",
    "discount": "Artisan Crafted",
    "sub": "Handloom Cotton",
    "image": "/images/earthy_saree.png",
    "price": 2499,
    "rating": 4.8,
    "reviews": 670
  },
  {
    "id": 12,
    "name": "Earthy Tones Handwoven Saree",
    "category": "Ethnic Wear",
    "discount": "Festive Edit",
    "sub": "Minimalist Elegance",
    "image": "/images/earthy_saree.png",
    "price": 2999,
    "rating": 4.9,
    "reviews": 410
  },
  {
    "id": 13,
    "name": "Premium Brown Leather Loafers",
    "category": "Footwear",
    "discount": "Handcrafted",
    "sub": "Timeless Style",
    "image": "/images/leather_shoes.png",
    "price": 2999,
    "rating": 4.8,
    "reviews": 590
  },
  {
    "id": 14,
    "name": "Aesthetic Sand Suede Loafers",
    "category": "Footwear",
    "discount": "New Arrival",
    "sub": "Soft Comfort",
    "image": "/images/leather_shoes.png",
    "price": 2499,
    "rating": 4.7,
    "reviews": 320
  },
  {
    "id": 15,
    "name": "Vintage Brown Leather Belt",
    "category": "Accessories",
    "discount": "Essential",
    "sub": "Premium Leather",
    "image": "/images/leather_shoes.png",
    "price": 899,
    "rating": 4.6,
    "reviews": 840
  }
];
export default function handler(req, res) {
  res.status(200).json(products);
}
