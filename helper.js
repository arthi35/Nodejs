import { client } from "./index.js";

export async function getMoviesById(id) {
  return await client.db("movie").collection("movies").findOne({ id: id });
}
export async function createMovies(data) {
  return await client.db("movie").collection("movies").insertMany(data);
}

export async function updateMoviesById(id, updateData) {
  return await client.db("movie").collection("movies").updateOne({ id: id }, { $set: updateData });
}

export async function deleteMoviesById(id) {
  return await client.db("movie").collection("movies").deleteOne({ id: id });
}

export async function getAllMovies() {
  return await client.db("movie").collection("movies").find({}).toArray();
}
