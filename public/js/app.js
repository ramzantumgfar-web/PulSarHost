// ==================================
// 🚀 PulSar Host App MAXIMUM
// ==================================

console.log("🚀 PulSar Host System Loaded");



// ================================
// Данные пользователя
// ================================


let user = JSON.parse(
    localStorage.getItem("pulsar_user")
);



if(!user){

    user = {

        name:"Guest",

        balance:0,

        servers:[]

    };

}



// Сохранение

function saveUser(){

    localStorage.setItem(
        "pulsar_user",
        JSON.stringify(user)
    );

}





// ================================
// Уведомления
// ================================


function notify(text,type="info"){


    let box=document.createElement("div");


    box.className="notification";


    box.innerHTML=text;


    document.body.appendChild(box);



    setTimeout(()=>{

        box.classList.add("show");

    },50);



    setTimeout(()=>{

        box.classList.remove("show");


        setTimeout(()=>{

            box.remove();

        },500);


    },3000);


}






// ================================
// Вход
// ================================


const loginBtn=document.querySelector(".login");


if(loginBtn){


loginBtn.onclick=()=>{


let name=prompt(
"Введите имя:"
);



if(name){


user.name=name;


saveUser();


notify(
"Добро пожаловать в PulSar Host 🚀"
);


}


};


}






// ================================
// Создание сервера
// ================================


const createBtn=
document.querySelector(".primary");



if(createBtn){


createBtn.onclick=()=>{


if(user.name==="Guest"){


notify(
"Сначала войдите в аккаунт 👤",
"error"
);


return;

}



let serverName=
prompt(
"Название сервера:"
);



if(serverName){


let server={


id:Date.now(),


name:serverName,


status:"online",


ram:"4GB"



};



user.servers.push(server);


saveUser();



notify(
"Сервер создан 🎮"
);


}


};


}







// ================================
// Покупка тарифов
// ================================


const plans=
document.querySelectorAll(".plan button");



plans.forEach((btn,index)=>{


btn.onclick=()=>{


let prices=[99,299,599];


let price=prices[index];



if(user.balance < price){


notify(
"Недостаточно средств 💳",
"error"
);


return;

}



user.balance-=price;



user.servers.push({

id:Date.now(),

name:
"New Game Server",

status:
"online"


});



saveUser();



notify(
"Сервер успешно куплен 🚀"
);



};


});








// ================================
// Профиль
// ================================


function showProfile(){


notify(`

👤 ${user.name}<br>

💰 Баланс: ${user.balance}₽<br>

🖥 Серверов: ${user.servers.length}

`);


}





// ================================
// Подготовка API для Telegram Bot
// ================================


window.PulSarHost={


getUser(){

return user;

},


addBalance(amount){


user.balance+=amount;


saveUser();


},


getServers(){


return user.servers;


}


};





saveUser();


console.log(
"PulSar Host Ready 🚀"
);
