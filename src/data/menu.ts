export type MenuCategory = 'Coffee' | 'All-Day Bites' | 'Pizzas' | 'Salads & Bowls' | 'Desserts' | 'Refreshing Drinks';
export type MenuItem = { name: string; description: string; price: number; category: MenuCategory; vegetarian?: boolean };

export const menuCategories: MenuCategory[] = ['Coffee', 'All-Day Bites', 'Pizzas', 'Salads & Bowls', 'Desserts', 'Refreshing Drinks'];

export const menuItems: MenuItem[] = [
  { name: 'Maveloa Special Latte', description: 'Our signature blend with a hint of caramel', price: 220, category: 'Coffee' },
  { name: 'Classic Cappuccino', description: 'Rich espresso with velvety foam', price: 200, category: 'Coffee' },
  { name: 'Iced Spanish Latte', description: 'Chilled espresso with sweet condensed milk', price: 240, category: 'Coffee' },
  { name: 'Hazelnut Mocha', description: 'Chocolate, hazelnut & espresso', price: 240, category: 'Coffee' },
  { name: 'Americano', description: 'Pure espresso, pure taste', price: 180, category: 'Coffee' },
  { name: 'Classic Veg Sandwich', description: 'Fresh veggies, cheese & house sauce', price: 220, category: 'All-Day Bites', vegetarian: true },
  { name: 'Grilled Chicken Sandwich', description: 'Tender chicken, fresh greens & special sauce', price: 260, category: 'All-Day Bites', vegetarian: false },
  { name: 'Paneer Ciabatta', description: 'Herbed paneer, greens & roasted peppers', price: 240, category: 'All-Day Bites', vegetarian: true },
  { name: 'Chicken Croissant', description: 'Flaky croissant with seasoned chicken', price: 260, category: 'All-Day Bites', vegetarian: false },
  { name: 'Loaded Nachos', description: 'Crispy nachos with cheese, salsa & jalapeños', price: 280, category: 'All-Day Bites', vegetarian: true },
  { name: 'Margherita', description: 'Classic cheese & basil', price: 320, category: 'Pizzas', vegetarian: true },
  { name: 'Farm Fresh Veg', description: 'Bell peppers, olives, onions, mushrooms', price: 360, category: 'Pizzas', vegetarian: true },
  { name: 'BBQ Chicken', description: 'Grilled chicken, onions, BBQ sauce', price: 380, category: 'Pizzas', vegetarian: false },
  { name: 'Peri-Peri Paneer', description: 'Spicy paneer, peppers, onions', price: 360, category: 'Pizzas', vegetarian: true },
  { name: 'Mediterranean Salad', description: 'Feta, olives, greens, cherry tomatoes', price: 280, category: 'Salads & Bowls', vegetarian: true },
  { name: 'Quinoa Power Bowl', description: 'Quinoa, roasted veggies, hummus', price: 320, category: 'Salads & Bowls', vegetarian: true },
  { name: 'Caesar Salad', description: 'Crisp lettuce, parmesan, croutons', price: 280, category: 'Salads & Bowls', vegetarian: true },
  { name: 'Grilled Chicken Bowl', description: 'Chicken, brown rice, greens, special dressing', price: 340, category: 'Salads & Bowls', vegetarian: false },
  { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with gooey center', price: 220, category: 'Desserts', vegetarian: true },
  { name: 'Classic Cheesecake', description: 'Creamy, rich & timeless', price: 220, category: 'Desserts', vegetarian: true },
  { name: 'Tiramisu', description: 'Coffee-infused Italian delight', price: 240, category: 'Desserts', vegetarian: true },
  { name: 'Blueberry Muffin', description: 'Soft, fluffy & loaded with berries', price: 180, category: 'Desserts', vegetarian: true },
  { name: 'Chocolate Brownie', description: 'Rich, fudgy & irresistible', price: 200, category: 'Desserts', vegetarian: true },
  { name: 'Fresh Lime Soda', description: 'Classic | Mint | Strawberry', price: 140, category: 'Refreshing Drinks' },
  { name: 'Iced Tea', description: 'Lemon | Peach', price: 160, category: 'Refreshing Drinks' },
  { name: 'Cold Coffee', description: 'Classic | Hazelnut | Mocha', price: 200, category: 'Refreshing Drinks' },
  { name: 'Fruit Smoothies', description: 'Mango | Strawberry | Mixed Berries', price: 220, category: 'Refreshing Drinks' },
  { name: 'Milkshakes', description: 'Chocolate | Vanilla | Strawberry', price: 220, category: 'Refreshing Drinks' },
];