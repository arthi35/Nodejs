import express from "express";

import{getAllMovies,
    getMoviesById,
    deleteMoviesById,
    updateMoviesById,
    createMovies}from "../helper.js"
import { auth } from "../middleware/auth.js";

const router=express.Router();

router.get('/', auth, async function (request, response) {
    const movies=await getAllMovies();
      response.send(movies);
    })
  
  
    router.get('/:id',async function (request, response) {
      console.log(request.params);
      //db.movies.findOne({id:"102"})
      const {id}=request.params;
  
      // const movie=movies.find((mv)=>mv.id===id);
      const movie= await getMoviesById(id);
        console.log(movie);
    movie? response.send(movie):response.status(404).send({message: "No such movie found 🙂"})
    });
  
    router.delete('/:id',async function (request, response) {
      console.log(request.params);
      //db.movies.findOne({id:"102"})
      const {id}=request.params;
  
      // const movie=movies.find((mv)=>mv.id===id);
      const result=await deleteMoviesById(id);
      response.send(result);
    });
  
    router.put('/:id',async function (request, response) {
      console.log(request.params);
      //db.movies.updateOne({id:"102"},{$set:updateData})
      const {id}=request.params;
      const updateData=request.body;
      // const movie=movies.find((mv)=>mv.id===id);
      const result=await updateMoviesById(id, updateData);
      response.send(result);
    });
    router.post('/', async function (request, response) {
  
      const data=request.body;
      const result=await createMovies(data);
      response.send(result);
    })
    export const moviesRouter=router;