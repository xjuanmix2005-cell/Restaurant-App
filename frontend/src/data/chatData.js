//questions and answers used to fake the AI
//if the user text has keyword, it sends the answer back
const chatData = [
  { keyword: 'special', question: "What are today's specials?", answer: "Today's special is Chicken Alfredo for $18.99." },
  { keyword: 'vegetarian', question: 'What vegetarian meals do you have?', answer: 'We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.' },
  { keyword: 'recommend', question: 'What do you recommend?', answer: 'Based on popular orders, we recommend our Chicken Alfredo.' },
  { keyword: 'gluten', question: 'Do you have gluten-free options?', answer: 'Yes. We offer gluten-free pasta and selected salads.' },
  { keyword: 'dessert', question: 'What is the most popular dessert?', answer: 'Our Chocolate Lava Cake is our most popular dessert.' },
  { keyword: 'last time', question: 'What did I order last time?', answer: 'Your previous order was Chicken Alfredo and Chocolate Lava Cake.' },
]

export default chatData