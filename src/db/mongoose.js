const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tv-program', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Connected to the Database. Yayzow!");
})
.catch(err => {
  console.log(err);
});

// Why is this not working from here?