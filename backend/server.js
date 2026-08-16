import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";


dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || "PulSarHostSecret";



const db = new sqlite3.Database("./pulsar.db");




// Создание базы

db.serialize(()=>{


db.run(`
CREATE TABLE IF NOT EXISTS users(
id TEXT PRIMARY KEY,
username TEXT,
email TEXT UNIQUE,
password TEXT,
balance INTEGER DEFAULT 0,
role TEXT DEFAULT 'user'
)
`);



db.run(`
CREATE TABLE IF NOT EXISTS servers(
id TEXT PRIMARY KEY,
user_id TEXT,
name TEXT,
game TEXT,
ram INTEGER,
status TEXT DEFAULT 'offline'
)
`);



});





// Проверка API

app.get("/",(req,res)=>{

res.json({

brand:"PulSar Host",

status:"online",

version:"1.0"

});

});






// Middleware авторизации

function auth(req,res,next){


const token =
req.headers.authorization?.split(" ")[1];


if(!token)
return res.status(401)
.json({
error:"Нет доступа"
});



try{


const data =
jwt.verify(token,SECRET);


req.user=data;


next();


}catch{

res.status(401)
.json({
error:"Токен недействителен"
});


}


}







// Регистрация

app.post("/api/register",
async(req,res)=>{


try{


const {
username,
email,
password
}=req.body;



const hash =
await bcrypt.hash(password,12);



const id=uuid();



db.run(
`
INSERT INTO users
(id,username,email,password)
VALUES(?,?,?,?)
`,
[
id,
username,
email,
hash
],

(err)=>{


if(err)

return res.status(400)
.json({
error:"Email уже используется"
});



res.json({

message:"Добро пожаловать в PulSar Host 🚀"

});


});


}catch{

res.status(500)
.json({
error:"Ошибка сервера"
});


}

});







// Авторизация

app.post("/api/login",
(req,res)=>{


const {
email,
password
}=req.body;



db.get(
"SELECT * FROM users WHERE email=?",
[email],

async(err,user)=>{


if(!user)

return res.status(404)
.json({
error:"Аккаунт не найден"
});



const check =
await bcrypt.compare(
password,
user.password
);



if(!check)

return res.status(401)
.json({
error:"Неверный пароль"
});



const token =
jwt.sign(
{
id:user.id,
role:user.role
},
SECRET,
{
expiresIn:"7d"
}
);



res.json({

token

});


});


});







// Профиль

app.get(
"/api/profile",
auth,
(req,res)=>{


db.get(

"SELECT id,username,email,balance,role FROM users WHERE id=?",

[req.user.id],

(err,user)=>{

res.json(user);

});


});







// Создание сервера

app.post(
"/api/create-server",
auth,
(req,res)=>{


const {

name,
game,
ram

}=req.body;



const id=uuid();



db.run(

`
INSERT INTO servers
(id,user_id,name,game,ram)
VALUES(?,?,?,?,?)
`,

[
id,
req.user.id,
name,
game,
ram
]

);



res.json({

message:"Сервер создан 🚀",

server:id

});


});







// Мои сервера

app.get(
"/api/my-servers",
auth,
(req,res)=>{


db.all(

"SELECT * FROM servers WHERE user_id=?",

[req.user.id],

(err,data)=>{

res.json(data);

});


});







// Запуск

app.listen(PORT,()=>{

console.log(
`🚀 PulSar Host API запущен: ${PORT}`
);

});
