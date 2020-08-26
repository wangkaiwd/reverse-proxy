const express = require('express');
const app = express();
const PORT = 4000;
app.use('/user/list1', (req, res) => {
  res.json({
    data: [
      { name: '4', age: 14 },
      { name: '5', age: 15 },
      { name: '6', age: 16 },
    ]
  });
});
app.listen(PORT, () => {
  console.log(`Server is listen on ${PORT}`);
});
