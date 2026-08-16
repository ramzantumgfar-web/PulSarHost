// 🚀 PulSar Host Client

console.log("PulSar Host System Started");


document.addEventListener("DOMContentLoaded", () => {


    // Анимация появления элементов

    const elements = document.querySelectorAll(
        ".card, .panel, .stats div"
    );


    elements.forEach((element, index)=>{

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";


        setTimeout(()=>{

            element.style.transition = "0.6s";
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }, index * 150);

    });



    // Кнопка создания сервера

    const create = document.querySelector(".create");


    if(create){

        create.onclick = ()=>{

            showMessage(
            "🚀 Создание сервера",
            "Выберите игру и тариф в панели PulSar Host"
            );

        };

    }



    // Личный кабинет

    const login = document.querySelector("header button");


    if(login){

        login.onclick = ()=>{

            showMessage(
            "👤 Личный кабинет",
            "Авторизация PulSar Host скоро будет доступна"
            );

        };

    }



    // Статус сервера

    const status = document.querySelector(".panel div");


    if(status){

        setInterval(()=>{

            status.innerHTML =
            "🟢 Статус: Онлайн";

        },3000);

    }


});




// Красивое уведомление

function showMessage(title,text){


    const box = document.createElement("div");


    box.innerHTML = `
    <h3>${title}</h3>
    <p>${text}</p>
    `;


    box.style.position="fixed";
    box.style.bottom="30px";
    box.style.right="30px";
    box.style.background="#10172f";
    box.style.padding="25px";
    box.style.borderRadius="20px";
    box.style.boxShadow="0 0 40px #6c5cff";
    box.style.zIndex="999";


    document.body.appendChild(box);



    setTimeout(()=>{

        box.remove();

    },4000);


}
