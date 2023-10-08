

let myline;
var r = document.querySelector(':root');
let ticker = "BTCEUR"
let glabel = "bitcoin"

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.binance.com/api/v3/klines?symbol=' + ticker + '&interval=1d&limit=30')
        .then(response => response.json())
        .then(data => {
            const close = new Array();
            const pvm = new Array();

            const temp = JSON.parse(JSON.stringify(data));
            let open = parseFloat(temp[temp.length - 1][1]);
            let high = parseFloat(temp[temp.length - 1][2]);
            let low = parseFloat(temp[temp.length - 1][3]);
            for (let i = 0; i < temp.length; i++) {
                close.push(parseFloat(temp[i][4]))
                pvm.push(new Date(temp[i][0]).toLocaleDateString())
            }

            const ctx = document.getElementById('myChart');
            myline = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: pvm,
                    datasets: [{
                        label: glabel,
                        data: close,
                        borderWidth: 1,
                        fill: false,
                        borderColor: '#000000',//#329ef7',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
            document.getElementById(glabel).innerHTML='<i>_bitcoin</i>'

            updateToday(open, high, low, close);
        })
        .then(
            setTimeout(() => { alert("Valitse vasemmalta menusta kryptovaluutta.") }, 1000)
        )
});


const btc = document.getElementById('bitcoin');
btc.addEventListener("click", () => {
    document.getElementById(glabel).innerHTML=glabel;
    ticker = "BTCEUR"
    glabel = "bitcoin"
    btc.innerHTML='<i>_bitcoin</i>'
    temp();
});
const eth = document.getElementById('ethereum');
eth.addEventListener("click", () => {
    document.getElementById(glabel).innerHTML=glabel
    ticker = "ETHEUR"
    glabel = "ethereum"
    eth.innerHTML='<i>_ethereum</i>'
    temp();
});
const lite = document.getElementById('litecoin');
lite.addEventListener("click", () => {
    document.getElementById(glabel).innerHTML=glabel;
    ticker = "LTCEUR"
    glabel = "litecoin"
    lite.innerHTML='<i>_litecoin</i>'
    temp();
});
const doge = document.getElementById('dogecoin');
doge.addEventListener("click", () => {
    document.getElementById(glabel).innerHTML=glabel;
    ticker = "DOGEEUR"
    glabel = "dogecoin"
    doge.innerHTML='<i>_dogecoin</i>'
    temp();
});


function temp() {
    fetch('https://api.binance.com/api/v3/klines?symbol=' + ticker + '&interval=1d&limit=30')
        .then(response => response.json())
        .then(data => {
            document.getElementById("kuva").src = "/websivu/assets/pictures/" + ticker.substring(0, ticker.length - 3).toLowerCase() + ".png"
            //document.getElementById("themebtn").value = "/websivu/assets/pictures/"+ticker.toLowerCase().substring(0, ticker.length - 3).toString() + ".png"
            const close = new Array();

            const pvm = new Array();

            const temp = JSON.parse(JSON.stringify(data));
            let open = parseFloat(temp[temp.length - 1][1]);
            let high = parseFloat(temp[temp.length - 1][2]);
            let low = parseFloat(temp[temp.length - 1][3]);
            for (let i = 0; i < temp.length; i++) {
                close.push(parseFloat(temp[i][4]))
                pvm.push(new Date(temp[i][0]).toLocaleDateString())
            }

            myline.data.datasets[0].data = close;
            myline.data.datasets[0].label = glabel;
            myline.data.labels = pvm;
            myline.data.datasets[0].borderColor = document.getElementById("themebtn").value == "light theme" ? '#ffffff' : '#000000',
                myline.update();

            updateToday(open, high, low, close);
        })


}



r.style.setProperty('--blue', '#0c1483');
r.style.setProperty('--lightblue', '#e2effb');
function myFunction_set() {

    var rs = String(getComputedStyle(r).getPropertyValue('--blue'));
    if (rs === "#0c1483") {
        document.getElementById("themebtn").value = "light theme"
        r.style.setProperty('--blue', '#e2effb');
        r.style.setProperty('--lightblue', '#0c1483');
    } else if (rs.valueOf == "#e2effb".valueOf) {
        document.getElementById("themebtn").value = "dark theme"
        r.style.setProperty('--blue', '#0c1483');
        r.style.setProperty('--lightblue', '#e2effb');
    }

    temp()
}


function updateToday(open, high, low, close) {
    let sum = 0;
    for (let i = 0; i < 20; i++) {
        sum += close[close.length - 1 - i]
    }
    sum /= 20;

    delta = parseFloat((close[close.length - 1] - open) / open * 100).toFixed(2);;
    let temp = delta > 0 ? "green" : "red";
    document.getElementById("today").innerHTML = 'tänäiset: <br>delta: '
        + '<span style=color:' + temp + '>' + delta + '%</span><br>open: '
        + open + ' €<br>high: '
        + high + ' €<br>low: '
        + low + ' €<br>close: '
        + close[close.length - 1] + ' €<br>SMA20: '
        + parseFloat(sum).toFixed(2);
}

document.addEventListener('mouseover', () => {
    //document.getElementById('bitcoin').innerHTML=document.body.clientWidth;
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;

    if (document.body.clientWidth < 750) {
        myline.resize(width - 20, height);
    } else {
        myline.resize(width / 2, height);
    }
})


/*
btc.addEventListener('mouseover', () => {
    btc.style.color = "green";
})
eth.addEventListener('mouseover', () => {
    eth.style.color = "green";
})
doge.addEventListener('mouseover', () => {
    doge.style.color = "green";
})
lite.addEventListener('mouseover', () => {
    lite.style.color = "green";
})
btc.addEventListener('mouseout', () => {
    btc.style.color = "#0c1483";
})
eth.addEventListener('mouseout', () => {
    eth.style.color = "#0c1483";
})
doge.addEventListener('mouseout', () => {
    doge.style.color = r.style.getPropertyValue('--blue');
})
lite.addEventListener('mouseout', () => {
    lite.style.color = r.style.getPropertyValue('--blue');
})*/