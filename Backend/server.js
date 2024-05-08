const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];

app.use(cors());
app.use(express.json());

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  try {
    const response = await fetchNumbers(numberid);
    const fetchedNumbers = response.data;

    storedNumbers = [...storedNumbers, ...fetchedNumbers];
    storedNumbers = [...new Set(storedNumbers)];

    if (storedNumbers.length > WINDOW_SIZE) {
      storedNumbers = storedNumbers.slice(storedNumbers.length - WINDOW_SIZE);
    }

    const average = calculateAverage(storedNumbers);

    res.json({
      windowPrevState: storedNumbers.slice(0, -fetchedNumbers.length),
      windowCurrState: storedNumbers,
      numbers: fetchedNumbers,
      avg: average
    });
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const fetchNumbers = async (numberid) => {
  let apiUrl = '';
  switch (numberid) {
    case 'p':
      apiUrl = 'http://20.244.56.144/test/primes';
      break;
    case 'f':
      apiUrl = 'http://20.244.56.144/test/fibo';
      break;
    case 'e':
      apiUrl = 'http://20.244.56.144/test/even';
      break;
    case 'r':
      apiUrl = 'http://20.244.56.144/test/rand';
      break;
    default:
      throw new Error('Invalid number ID');
  }
  
  const response = await axios.get(apiUrl);
  return response.data;
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
