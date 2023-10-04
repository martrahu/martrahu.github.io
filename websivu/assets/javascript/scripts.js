

let myline;
let ticker = "BTCEUR"
let glabel = "bitcoin"

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.binance.com/api/v3/klines?symbol=' + ticker + '&interval=1d&limit=30')
        .then(response => response.json())
        .then(data => {
            //const label =glabel
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
                        borderColor: '#329ef7',
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

            updateToday(open, high, low, close);
        })
});

const btc = document.getElementById('bitcoin');
btc.addEventListener("click", () => {
    ticker = "BTCEUR"
    glabel = "bitcoin"
    temp();

});
const eth = document.getElementById('ethereum');
eth.addEventListener("click", () => {
    ticker = "ETHEUR"
    glabel = "ethereum"
    temp();
});
const doge = document.getElementById('dogecoin');
doge.addEventListener("click", () => {
    ticker = "DOGEEUR"
    glabel = "dogecoin"
    temp();
});


function temp() {
    fetch('https://api.binance.com/api/v3/klines?symbol=' + ticker + '&interval=1d&limit=30')
        .then(response => response.json())
        .then(data => {
            document.getElementById("kuva").src = "/assets/pictures/" + ticker.substring(0, ticker.length - 3) + ".png"

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
            myline.update();

            updateToday(open, high, low, close);
        })


}




var r = document.querySelector(':root');
r.style.setProperty('--blue', '#0c1483');
r.style.setProperty('--lightblue', '#e2effb');
function myFunction_set() {
    var rs = String(getComputedStyle(r).getPropertyValue('--blue'));

    if (rs === "#0c1483") {
        document.getElementById("themebtn").value = "Light theme"
        r.style.setProperty('--blue', '#e2effb');
        r.style.setProperty('--lightblue', '#0c1483');
    } else if (rs.valueOf == "#e2effb".valueOf) {
        document.getElementById("themebtn").value = "Dark theme"
        r.style.setProperty('--blue', '#0c1483');
        r.style.setProperty('--lightblue', '#e2effb');
    }

    temp()
}

document.addEventListener('mouseover', () => {
    //document.getElementById('bitcoin').innerHTML=document.body.clientWidth;

    var height = document.body.clientHeight;
    var width = document.body.clientWidth;

    if (document.body.clientWidth < 640) {
        myline.resize(width - 20, height);
    } else {
        myline.resize(width / 2, height);
    }
})


function updateToday(open, high, low, close) {

    let sum = 0;
    for (let i = 0; i < 20; i++) {
        sum += close[close.length - 1 - i]
    }
    sum /= 20;

    delta = parseFloat((close[close.length - 1] - open) / open * 100).toFixed(2);;
    let temp = delta > 0 ? "green" : "red";
    document.getElementById("today").innerHTML = 'Tänäiset: <br>delta: '
        + '<span style=color:' + temp + '>' + delta + '%</span><br>open: '
        + open + ' €<br>high: '
        + high + ' €<br>low: '
        + low + ' €<br>close: '
        + close[close.length - 1] + ' €<br>SMA20: '
        + parseFloat(sum).toFixed(2);

}


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
btc.addEventListener('mouseout', () => {
    btc.style.color = "#0c1483";
})
eth.addEventListener('mouseout', () => {
    eth.style.color = "#0c1483";
})
doge.addEventListener('mouseout', () => {
    doge.style.color = r.style.getPropertyValue('--blue');
})*/