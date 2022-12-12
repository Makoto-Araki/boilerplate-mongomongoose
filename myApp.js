require('dotenv').config();

// データベース情報
const mongoose = require('mongoose');
const myUser = process.env['username']
const myPass = process.env['password']
const myClus = process.env['cluster']
const myURI = `mongodb+srv://${myUser}:${myPass}@${myClus}/?retryWrites=true&w=majority`

// データベース接続
mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database connection successed')
})
.catch(err => {
  console.error('Database connection failed')
})

/*******************************************************

// モデルをインポート
let PersonModel = require('./model/person');

// インスタンス作成
let Makoto = new PersonModel({
  name: 'Makoto',
  age: 67,
  favoriteFoods: ['Pizza', 'Pasta'],
});

// ドキュメント保存
Makoto.save((err, data) => {
  if (err) {
    console.error(err);
  } else {
    done(null, data);
  }
});

 *******************************************************/

// スキーマ定義
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

// モデル作成
let Person = mongoose.model('Person', personSchema)

// インスタンス作成とドキュメント保存
const createAndSavePerson = (done) => {
  let Makoto = new Person({
    name: 'Makoto',
    age: 67,
    favoriteFoods: ['Pizza', 'Pasta'],
  });
  Makoto.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  });
};

// 多数のインスタンス作成とドキュメント保存
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// モデル属性(name)からドキュメント検索
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// モデル属性(favoriteFoods)からドキュメント検索
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// 自動追加される属性(_id)からドキュメント検索
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// ドキュメント検索・更新・保存
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
      return;
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data) => {
        if (err) {
          console.error(err);
        } else {
          done(null, data);
        }
      });
    }
  })
};

// ドキュメント検索・更新・保存
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// 自動追加される属性(_id)からドキュメント削除
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

// 条件に合致する全ドキュメント削除
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      done(null, res);
    }
  });
};

// 連鎖クエリー
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})    // 昇順にソート
  .limit(2)           // 表示件数
  .select({name: 1})  // 表示指定
  .exec((err, res) => {
    if (err) {
      console.error(err);
    } else {
      done(null, res);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
