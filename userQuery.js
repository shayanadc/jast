User = require("./users").UserSchema
Stub = require("./users").StubSchema

const findStub = (query) => {
  return new Promise(async (resolve, reject) => {
    try{
      Stub.findOne(query, function (err,stub) {
        resolve(stub)
      })
    }catch (err){
      reject(err)
    }
        })
}

const deleteStub = (query) => {
  return new Promise(async (resolve, reject) => {
  try{
    Stub.deleteOne(query, function (err) {
      resolve('saved!!')
    })
  }catch (err){
    reject(err)
}
      })
  }
  const saveUserStub = (user,stub) => {
  return new Promise(async (resolve, reject) => {
  try{
    await user.save(async function (err) {
      stub.user = user._id
      stub.request = stub.request
      stub.response = stub.response
      var newstub = new Stub(stub);
        newstub.save(async function (err) {
          if(err) reject(err)
      });
      await user.stubs.push(newstub);
      await user.save();
      resolve(newstub)
    })
  }catch (err){
    reject(err)
}
      })
  }

  const saveUser = (query) => {
    return new Promise(async (resolve, reject) => {
      try{
        user = new User(query)
        await user.save()
        resolve(user)
      }catch(err){
        reject(err)
      }
        })
    }

  const findUserWithStubs = (query, select = '-__v -user') => {
    return new Promise(async (resolve, reject) => {
      let user;
  
      try {
        user = User
          .findOne(query)
          .populate({ path: 'stubs', select: select })
          .exec()
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const findStubWithUser = (query) => {
    return new Promise(async (resolve, reject) => {
      let stub;
  
      try {
        stub = Stub
          .findOne(query)
          .populate('user')
          .exec()
        resolve(stub);
      } catch (error) {
        reject(error);
      }
    });
  };


  const getAllStubs = () => {
    return new Promise(async (resolve, reject) => {
      let user;
  
      try {
        user = await Stub.find({});  
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      let user;
  
      try {
        user = await User.find({});  
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const findUserWithStubsWhere = (Uquery,Swhere) => {
    return new Promise(async (resolve, reject) => {
      let user;
  
      try {
        user = User
          .findOne(Uquery)
          .populate({ path: 'stubs', select: '-_id -__v -user',  match: Swhere })
          .exec()
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };


  const findAndUpdateUser = (query) => {
    return new Promise(async (resolve, reject) => {
      let user;
      try{
        user = await findUserWithStubs({prefix: query.prefix});
        if(!user){
          user = await saveUser({prefix : query.prefix});
        }
        var conditions = { prefix: user.prefix }
        , update = { access_token: query.access_token }
        , options = { multi: false };
        await User.update(conditions, update, options);
        user = await findUserWithStubs({prefix: query.prefix});
        resolve(user)
      }catch(err){
        reject(err)
      }
    });
  };

module.exports = {
  findUserWithStubs,
  findUserWithStubsWhere,
  findStubWithUser,

  saveUserStub,
  saveUser,

  getAllStubs,
  getAllUsers,

  deleteStub,
  findStub,

  findAndUpdateUser
}