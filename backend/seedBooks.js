// Script to seed 50+ books into the database
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/bookModel.js";

dotenv.config();

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice in the Deep South.",
    category: "Classic Fiction & Literature",
    price: 320,
    countInStock: 8,
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    rating: 4.8,
    numReviews: 1200,
    sample: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow..."
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel that explores the dangers of totalitarianism.",
    category: "Classic Fiction & Literature",
    price: 300,
    countInStock: 7,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    rating: 4.7,
    numReviews: 1100,
    sample: "It was a bright cold day in April, and the clocks were striking thirteen..."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners.",
    category: "Classic Fiction & Literature",
    price: 280,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    rating: 4.6,
    numReviews: 900,
    sample: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife..."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American dream and the roaring twenties.",
    category: "Classic Fiction & Literature",
    price: 250,
    countInStock: 5,
    image: "https://covers.openlibrary.org/b/id/7222161-L.jpg",
    rating: 4.5,
    numReviews: 850,
    sample: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since..."
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    description: "A tale of passion and revenge on the Yorkshire moors.",
    category: "Classic Fiction & Literature",
    price: 270,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    rating: 4.4,
    numReviews: 700,
    sample: "1801—I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with..."
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    description: "The epic tale of Captain Ahab's obsession with a white whale.",
    category: "Classic Fiction & Literature",
    price: 350,
    countInStock: 4,
    image: "https://covers.openlibrary.org/b/id/8100927-L.jpg",
    rating: 4.3,
    numReviews: 600,
    sample: "Call me Ishmael. Some years ago—never mind how long precisely..."
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoyevsky",
    description: "A psychological drama of guilt and redemption.",
    category: "Classic Fiction & Literature",
    price: 330,
    countInStock: 7,
    image: "https://covers.openlibrary.org/b/id/8235116-L.jpg",
    rating: 4.7,
    numReviews: 950,
    sample: "On an exceptionally hot evening early in July a young man came out of the garret in which he lodged..."
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description: "A coming-of-age story of an orphaned girl.",
    category: "Classic Fiction & Literature",
    price: 290,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8228781-L.jpg",
    rating: 4.5,
    numReviews: 800,
    sample: "There was no possibility of taking a walk that day..."
  },
  {
    title: "Great Expectations",
    author: "Charles Dickens",
    description: "The story of Pip and his journey through life.",
    category: "Classic Fiction & Literature",
    price: 310,
    countInStock: 5,
    image: "https://covers.openlibrary.org/b/id/8231852-L.jpg",
    rating: 4.4,
    numReviews: 750,
    sample: "My father's family name being Pirrip, and my Christian name Philip..."
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoyevsky",
    description: "A philosophical novel about faith, doubt, and reason.",
    category: "Classic Fiction & Literature",
    price: 340,
    countInStock: 4,
    image: "https://covers.openlibrary.org/b/id/8235117-L.jpg",
    rating: 4.8,
    numReviews: 1000,
    sample: "Alexey Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov..."
  },
  {
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    description: "A story of a doctor's wife who seeks escape from her dull life.",
    category: "Classic Fiction & Literature",
    price: 260,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8231857-L.jpg",
    rating: 4.2,
    numReviews: 500
  },
  {
    title: "The Odyssey",
    author: "Homer",
    description: "The epic journey of Odysseus returning home from war.",
    category: "Classic Fiction & Literature",
    price: 370,
    countInStock: 5,
    image: "https://covers.openlibrary.org/b/id/8231858-L.jpg",
    rating: 4.6,
    numReviews: 900
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    description: "The adventures of a delusional would-be knight.",
    category: "Classic Fiction & Literature",
    price: 360,
    countInStock: 4,
    image: "https://covers.openlibrary.org/b/id/8231859-L.jpg",
    rating: 4.3,
    numReviews: 650
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    description: "A sweeping story of love, justice, and redemption in 19th-century France.",
    category: "Classic Fiction & Literature",
    price: 390,
    countInStock: 5,
    image: "https://covers.openlibrary.org/b/id/8231860-L.jpg",
    rating: 4.7,
    numReviews: 950
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description: "A man remains young while his portrait ages.",
    category: "Classic Fiction & Literature",
    price: 270,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8231861-L.jpg",
    rating: 4.4,
    numReviews: 700
  },
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    description: "A journey into the Congo and the darkness of the human soul.",
    category: "Classic Fiction & Literature",
    price: 250,
    countInStock: 7,
    image: "https://covers.openlibrary.org/b/id/8231862-L.jpg",
    rating: 4.1,
    numReviews: 400
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    description: "A scientist creates a living being from dead body parts.",
    category: "Classic Fiction & Literature",
    price: 260,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8231863-L.jpg",
    rating: 4.2,
    numReviews: 500
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    description: "The classic vampire novel.",
    category: "Classic Fiction & Literature",
    price: 270,
    countInStock: 5,
    image: "https://covers.openlibrary.org/b/id/8231864-L.jpg",
    rating: 4.3,
    numReviews: 600
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    description: "A tale of betrayal, revenge, and redemption.",
    category: "Classic Fiction & Literature",
    price: 350,
    countInStock: 4,
    image: "https://covers.openlibrary.org/b/id/8231865-L.jpg",
    rating: 4.6,
    numReviews: 850
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    description: "A story of sin and redemption in Puritan New England.",
    category: "Classic Fiction & Literature",
    price: 240,
    countInStock: 6,
    image: "https://covers.openlibrary.org/b/id/8231866-L.jpg",
    rating: 4.1,
    numReviews: 350
  }
  // Add more books as needed for your list
];

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("Books seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedBooks();
