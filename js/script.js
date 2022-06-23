/*
(() => {
    
    const usuarios = document.querySelector(".usuarios");
    fragmento = document.createDocumentFragment();
    fetch("http://127.0.0.1:5500/data.json")
        .then((res) => {
            console.log(res);
            return res.ok ? res.json() : Promise.reject(res);//ya la va a devolver en formato json
        })
        .then(json => {
            //console.log(json);
        })
        .catch((err) => {
            console.log("estamos en el catch ", err);
            let mensaje = err.statusText;
            usuarios.innerHTML = `Error ${err.status}: ${mensaje}`;
        }).finally(() => {
            console.log("Esto se ejecutara independientemente del resultado de la promesa fetch");
        });
})();
*/

const usuarios = document.querySelector(".usuarios");
//fragmento = document.createDocumentFragment();
let dias = [];
let monto = [];

fetch("http://127.0.0.1:5500/data.json")
    .then((res) => {
        console.log(res);
        return res.ok ? res.json() : Promise.reject(res);//ya la va a devolver en formato json
    })
    .then(json => {
        json.forEach((el) => {
            const li = document.createElement("li");
          //  li.innerHTML = `${el.day} -- ${el.amount}`;
          //  fragmento.appendChild(li);

            dias.push(el.day);
            monto.push(el.amount);
        });
        //usuarios.appendChild(fragmento);
        /*empiza el dibujado de la grafica*/
        let arrD = dias;
        let arrM = monto;

        console.log(arrD);
        console.log(arrM);

        let micanvas = document.getElementById("miGrafica").getContext("2d");
        let chart = new Chart(micanvas, {
            type: "bar",
            data: {
                labels: arrD,
                //labels: ["lunes", "martes", "miercols","jueves"],
                datasets: [
                    {
                        //label: "grafica de datos",
                        data: arrM,
                        //data: [5, 10, 20, 30],
                        backgroundColor: "hsl(10, 79%, 65%)"
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Gasto de los ultimos 7 dias'
                    },
                    legend: {
                        display: false,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                }
            }
        });
        /*termina el dibujado de la grafica*/
    })
    .catch((err) => {
        console.log("estamos en el catch ", err);
        let mensaje = err.statusText;
        usuarios.innerHTML = `Error ${err.status}: ${mensaje}`;
    }).finally(() => {
        // console.log("Esto se ejecutara independientemente del resultado de la promesa fetch");
    });

