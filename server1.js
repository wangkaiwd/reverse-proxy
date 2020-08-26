const express = require('express');
const app = express();
const PORT = 3000;
app.use('/', () => {

});
app.listen(PORT, () => {
  console.log(`Server is listen on ${PORT}`);
});
