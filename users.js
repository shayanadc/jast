var mongoose = require("mongoose");
mongoose.Promise = Promise;
var { model, Schema } = mongoose;

var UserSchema = new Schema({
  githubId: {
    type: String
  },
  prefix: {
    type: String,
    unique: true
  },
  access_token: {
    type: String
    // unique: true
  },
  stubs: [{ type: Schema.Types.ObjectId, ref: "Stub" }]
});
function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}
function nullOrJson(item) {
  if (item == "") {
    return true;
  } else {
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    console.log(item);
    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }
}
var StubSchema = new Schema({
  request: {
    type: Object,
    required: true,
    validate: [nullOrJson, "request should be json type"]
  },
  response: {
    type: Object,
    required: true,
    validate: [isJson, "response should be json type"]
  },
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  header: Object,
  status: {
    type: Number,
    min: 200,
    max: 499,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

UserSchema = model("User", UserSchema);
StubSchema = model("Stub", StubSchema);

module.exports = {
  UserSchema,
  StubSchema
};
