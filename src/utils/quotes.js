const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    "Don't let yesterday take up too much of today.",
    // Add more quotes here...
  ];
  
  export const getQuoteOfTheDay = () => {
    const today = new Date().toDateString();
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  