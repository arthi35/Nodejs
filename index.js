// const express = require('express')
import cors from "cors";
import dotenv from "dotenv";
import express from "express";//type:module
import { MongoClient } from "mongodb";
import{moviesRouter}from "./routes/movies.js";
import{usersRouter}from "./routes/users.js";

dotenv.config();

console.log(process.env.MONGO_URL);
const app = express()
const PORT=process.env.PORT

const movies=[
    {"id":"100",
    "name":"Iron man 2",
    "poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg","rating":7,"summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.","trailer":"https://www.youtube.com/embed/wKtcmiifycU"},{"id":"101","name":"No Country for Old Men","poster":"https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating":8.1,
    "summary":"A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.","trailer":"https://www.youtube.com/embed/38A__WT3-o0"},{"id":"102","name":"Jai Bhim","poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg","summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case","rating":8.8,
    "trailer":"https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {"id":"102","name":"Jai Bhim",
  "poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
  "summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
  "rating":8.8,
  "trailer":"https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {"id":"103",
  "name":"The Avengers",
  "rating":8,
  "summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.","poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
  "trailer":"https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {"id":"104",
  "name":"Interstellar",
  "poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
  "rating":8.6,
  "summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
  "trailer":"https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {"id":"105",
  "name":"Baahubali",
  "poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
  "rating":8,
  "summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
  "trailer":"https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {"id":"106",
  "name":"Ratatouille",
  "poster":"https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
  "rating":8,
  "summary":"Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
  "trailer":"https://www.youtube.com/embed/NgsQ8mVkN8w"}
  ]
//app.use is a middleware->all request we are intercepting 
//after intercepting converting body to json
app.use(cors());//3rd party middleware
  app.use(express.json());//Inbuilt middleware
  
//connection between node and mongodb
  // const MONGO_URL="mongodb://localhost";//mongodb default portnumber
  const MONGO_URL=process.env.MONGO_URL;
  // mongodb+srv://moviesdatabase:<password>@cluster0.c8dvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();//it will take time to connect so we have to use async & await
    console.log("Mongo is Connected🙂")
    return client;
  }
  createConnection();
//we have to use client again globally so we have 
  //to take partcular movie so 
  //we have to give command called db.movies.findOne({id:"102"})
   export const client=await createConnection();

  app.get('/', function (req, res) {
  res.send('Hello World 🙋‍♀️🌎😊🙋‍♀️')
})
// app.get('/movies', async function (request, response) {
//   const movies=await getAllMovies();
//     response.send(movies);
//   })


//   app.get('/movies/:id',async function (request, response) {
//     console.log(request.params);
//     //db.movies.findOne({id:"102"})
//     const {id}=request.params;

//     // const movie=movies.find((mv)=>mv.id===id);
//     const movie= await getMoviesById(id);
//       console.log(movie);
//   movie? response.send(movie):response.status(404).send({message: "No such movie found 🙂"})
//   });

//   app.delete('/movies/:id',async function (request, response) {
//     console.log(request.params);
//     //db.movies.findOne({id:"102"})
//     const {id}=request.params;

//     // const movie=movies.find((mv)=>mv.id===id);
//     const result=await deleteMoviesById(id);
//     response.send(result);
//   });

//   app.put('/movies/:id',async function (request, response) {
//     console.log(request.params);
//     //db.movies.updateOne({id:"102"},{$set:updateData})
//     const {id}=request.params;
//     const updateData=request.body;
//     // const movie=movies.find((mv)=>mv.id===id);
//     const result=await updateMoviesById(id, updateData);
//     response.send(result);
//   });
//   app.post('/movies', async function (request, response) {

//     const data=request.body;
//     const result=await createMovies(data);
//     response.send(result);
//   })
  // app.get('/movies/:id', async function (request, response) {
    
  //   console.log(request.params);
    
  //   const {id}=request.params;
  //   const movie=  await client
  //   .db("movie")
  //   .collection("movies")
  //   .findOne({id:"102"});
  
  //   response.send(movie);
  // });

  // app.get('/movies/:id', function (request, response) {
    
  //   console.log(request.params);
  //   const {id}=request.params;
  //   // const movie=movies.find((mv)=>mv.id===id);
  //   const movie=client.db("movie").collection("movies").findOne({id:102});
  //   response.send(movie);
  // });
  
  // app.get('/movies/:id', function (request, response) {
    
    // console.log(request.params);
    //find | filter  is an array method so we should use this to get particular element in an array 
    // response.send(movies);
  //   const {id}=request.params;
  //   const movie=movies.find((mv)=>mv.id===id);
  //   response.send(movie);
  // });
  //we have to use client again globally so we have 
  //to take partcular movie so 
  //we have to give command called db.movies.findOne({id:"102"})
 app.use("/movies",moviesRouter);
 app.use("/users",usersRouter);

 const rents = [
  {equip: "Dell",
img: "https://5.imimg.com/data5/EO/VU/MY-14705972/dell-computer-system-500x500.jpg",
price: "Rs.3,000/month",
},
{
equip: "Paper Shredder",
img: "https://m.media-amazon.com/images/I/31pbeW6IjWL._SY355_.jpg",
price:"Rs.1000/month",
},
{
equip: "Luminous Pro",
img: "https://shop.schneider-electric.co.in/media/catalog/product/cache/2ae9ca705c412fc06fc6bf682d887272/9/1/9145_copy.jpg",
price: "Rs.500/month",
},
{
equip: "Hp Printer",
img: "https://m.media-amazon.com/images/I/61+h3559FyL._SX679_.jpg",
price: "Rs.200/month",
},
{
equip: "POLAM-FOTO Professional Video Tripod System",
img: "https://m.media-amazon.com/images/I/71NXhyUdzrL._SY450_.jpg",
price: "Rs.100/month",
},
{
equip: "Color-Xerox machine",
img: "https://cpimg.tistatic.com/05176463/b/5/Colour-Photocopier-machine.jpg",
price: "Rs.1000/month",
},
{
equip: "Ikea Drawer Unit on Casters, White, Small, Rectangular, 11 x 16.75 x 27.1 inches",
img: "https://m.media-amazon.com/images/I/31-KGeKRa6L._SY450_.jpg",
price: "Rs.150/month",
},
{
equip: "Computer-Table",
img: "https://5.imimg.com/data5/QF/JH/WH/SELLER-15766737/corner-computer-table-500x500.jpg",
price: "Rs.350/month",
},
{
equip: "Office-Chairs",
img: "https://m.media-amazon.com/images/I/61DCPvJjLrL._SX466_.jpg",
price: "Rs.150/month",
},
{
equip: "HP 640 InkJet Fax Machine",
img: "https://m.media-amazon.com/images/I/71-AdCta3PL._AC_SL1500_.jpg",
price: "Rs.250/month",
},
{
equip: "Vostro 3681 Small Desktop",
img: "https://cdn.gameregg.com/assets/desktop-images/dell-vostro-3681.jpg",
price: "Rs.1000/month",
},
{
equip: "Logitech G Driving Force Shifter G Driving Force Shifter Joystick",
img: "https://m.media-amazon.com/images/I/51D3-2lQu7L._SX679_.jpg",
price: "Rs.100/month",
},
{
equip: "Lenovo Legion Tower 5 Gaming Desktop (AMD Ryzen 7 5700G/16GB/512GB SSD/Windows11/NVIDIA RTX 3060 12GB GDDR6 Graphics/Legion ColdFront 2.0 Cooling/WiFi 6/Bluetooth 5.1/USB Keyboard & Mouse), 90RC00M0IN",
img: "https://m.media-amazon.com/images/I/71OxPxfeSXL._SX679_.jpg",
price: "Rs.1000/month",
},
{
equip: "Electrobot Gaming Tower PC-Intel Core I9 11th Gen RTX 3070 8GB, 32GB RAM, 1TB HDD, 500GB NVME with 6 RGB Cooling Fans (Core I9 11900K)",
img: "https://m.media-amazon.com/images/I/61iP0Q6NLHL._SX679_.jpg",
price: "Rs.1000/month",
},
{
equip: "T21 Rainbow Backlit USB Wired Gaming Keyboard + Mouse,Computer Mouse Pad Set For FOR PS4 FOR PS3 FOR XBOX PC",
img: "https://img.joomcdn.net/b1f6c26b735ab03a3a4c05c3ca10c9a9e9c75001_original.jpeg",
price: "Rs.70/month",
},
{
equip: "Ecoprsio L Shaped Gaming Desk Corner Gaming Desk, Gaming Computer Desk with Keyboard Tray, Large PC Gaming Desk Gamer Desk Workstation, Computer Gaming Desk Table with Cup Holder and Headphone, Black",
img: "https://m.media-amazon.com/images/I/71dDe8cROHS._AC_SL1500_.jpg",
price: "Rs.200/month",
},
{
equip: "CELLBELL ® GC02 Transformer Series Gaming/Racing Style Ergonomic Faux Leather High Back Chair with Removable Neck Rest and Adjustable Back Cushion (Full Black)",
img: "https://m.media-amazon.com/images/I/61Et2Kh750L._SX569_.jpg",
price: "Rs.100/month",
},
{
equip: "Logitech G PRO X Gaming-Headset, Over-Ear Headphones with Blue VO!CE Mic, DTS Headphone:X 2.0, 50mm PRO-G Drivers, 2.0 Surround Sound for Esports Gaming, PC/PS/Xbox/VR/Nintendo Switch - Black",
img: "https://m.media-amazon.com/images/I/61bDCk+O+pL._SX679_.jpg",
price:"Rs.100/month",
},
];
 app.get('/rents',  async function (request, response) {
  const rents=await client.db("movie").collection("rents").find({}).toArray();
    response.send(rents);
  })
  app.post('/rents',  async function (request, response) {
const data=request.body
    // const movies=await getAllMovies();
    const result=await client.db("movie").collection("rents").insertMany(data);
      response.send(result);
    })

  const mobiles = [{model: "OnePlus 9 5G",
  img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  company: "Oneplus",
},
{
  model: "Iphone 13 mini",
  img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
  company: "Apple",
},
{
  model: "Samsung s21 ultra",
  img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
  company: "Samsung",
},
{
  model: "xiomi mi 11",
  img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
  company: "xiomi",
},
];
  app.get('/mobiles',  async function (request, response) {
    // const movies=await getAllMovies();
      response.send(mobiles);
    })
app.listen(PORT,()=>console.log(`Server Started in ${PORT}`))

//  async function genPassword(password){
// //bcrypt.genSalt(No Of Rounds)
//    const salt=await bcrypt.genSalt(10)
//    const hashPassword=await bcrypt.hash(password,salt);//salt+password@123
//   console.log({salt,hashPassword});
//   return hashpassword;
//  } 
 



