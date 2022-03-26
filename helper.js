import { ObjectId } from "mongodb";
import { client } from "./index.js";

export async function getMoviesById(id) {
  return await client.db("movie").collection("movies").findOne({ _id:ObjectId(id) });
}
export async function getUsersByName(username) {
  return await client.db("movie").collection("users").findOne({username:username});
}
export async function createMovies(data) {
  return await client.db("movie").collection("movies").insertMany(data);
}
export async function createUser(data) {
  return await client.db("movie").collection("users").insertOne(data);
}

export async function updateMoviesById(id, updateData) {
  return await client.db("movie").collection("movies").updateOne({  _id:ObjectId(id)  }, { $set: updateData });
}

export async function deleteMoviesById(id) {
  return await client.db("movie").collection("movies").deleteOne({  _id:ObjectId(id)  });
}

export async function getAllMovies() {
  return await client.db("movie").collection("movies").find({}).toArray();
}
