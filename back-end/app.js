// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const multer = require('multer'); //import multer for file uploads

// we will put some server logic here later...

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // decode JSON-formatted incoming POST data
app.use(bodyParser.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.post("/change-password", (req, res) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    //check that current password is correct then change it to the new password
    res.send("Password change successful");

  });


// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
const upload = multer({ storage: storage });

app.post("/upload/photo", upload.single('photo'), (req, res) => {
    const file = req.file
    if (!file) {
      const error = new Error('file error')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
 });

app.get("/", (req, res) => {
    res.send("Hello!");
  });



// export the express app we created to make it available to other modules
module.exports = app;
