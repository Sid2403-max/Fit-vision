const Product = require('./models/Product');

const fashionProducts = [
  { name: 'Men Solid Polo Neck Blue T-Shirt', discount: 'Min. 50% Off', sub: 'Explore Now!', icon: '👕', price: 499, rating: 4.2, reviews: 1245 },
  { name: 'Women Printed A-line Kurta', discount: 'Flat 60% Off', sub: 'Biba, W & more', icon: '👗', price: 899, rating: 4.5, reviews: 3400 },
  { name: 'Men Slim Fit Blue Jeans', discount: 'Under ₹999', sub: 'Levi\'s, Wrangler', icon: '👖', price: 999, rating: 4.3, reviews: 2100 },
  { name: 'Men Solid Puffer Jacket', discount: 'Min. 40% Off', sub: 'Winter Wear', icon: '🧥', price: 1299, rating: 4.6, reviews: 890 },
  { name: 'Women Regular Fit Printed Shirt', discount: 'Special Offer', sub: 'Trending Styles', icon: '👚', price: 599, rating: 4.1, reviews: 450 },
  { name: 'Men Regular Fit Checkered Shirt', discount: 'Under ₹499', sub: 'Casual Wear', icon: '👔', price: 399, rating: 4.0, reviews: 1100 },
  { name: 'Running Shoes For Men', discount: 'Up to 70% Off', sub: 'Puma, Adidas', icon: '👟', price: 1499, rating: 4.7, reviews: 5600 },
  { name: 'Women Embroidered Saree', discount: 'Min. 50% Off', sub: 'Ethnic Wear', icon: '🥻', price: 2199, rating: 4.8, reviews: 3200 },
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(fashionProducts);
    console.log('Mock Data Seeded Successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedDatabase;
