const app = require("./src/app");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Enable CORS
app.use(cors({
  origin: "*"
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));