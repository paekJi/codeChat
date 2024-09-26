const mongoose = require("mongoose");
const User = require("./model/user");

module.exports = () => {
    mongoose.connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("mongoDB is connected");

        /*
        const newUser = new User({
          name: "test",
          password: "1234",
          createDate: new Date(),
        });

        newUser
          .save()
          .then(() => {
                User.find().then(users => {
                console.log(users);
                })

          })
          .catch((err) => console.error("사용자 저장 실패:", err));

          */
    });
}

