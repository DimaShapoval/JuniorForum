const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB(action, userData = null) {
  try {
    await client.connect();

    const db = client.db("Blog");
    const usersCollection = db.collection("Users_info");
    const articlesCollection = db.collection("Articles");
    if (action === "findAll") {
      const data = await usersCollection.find({}).toArray();
      return data;
    } else if (action === "addUser" && userData) {
      const result = await usersCollection.insertOne(userData);
      return result;
    } else if (action === "findOne" && userData) {
      const result = await usersCollection.findOne({ email: userData.email });
      return result;
    } else if (action === "updateById" && userData) {
      const result = await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(userData.id) },
        { $set: { password: userData.password } },
        { new: true }
      );
      return result;
    } else if (action === "updateByEmail" && userData) {
      const result = await usersCollection.findOneAndUpdate(
        { email: userData.email },
        { $push: { articles_id: userData.articleId } },
        { new: true }
      );
      return result;
    } else if (action === "addArticle" && userData) {
      const result = await articlesCollection.insertOne(userData);
      return result;
    } else if(action === 'findAllArticles') {
      const result = await articlesCollection.find({}).toArray();
      return result;
    } else if(action === 'findArticleById' && userData){
      const result = await articlesCollection.findOne({_id: new ObjectId(userData.id)});
      return result;
    } else if(action === 'deleteArticle' && userData){
      const result = await articlesCollection.deleteOne({_id: new ObjectId(userData.id)});
      return result;
    }
  } catch (err) {
    console.error("Error conection to MongoDB: ", err);
    throw err;
  }
}

module.exports = { connectToDB };
