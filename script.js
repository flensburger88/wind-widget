const token = "";
let windData = {
    timestamps: [],
    windrotations: [],
    windspeedAvgs: [],
    windspeedHighs: [],
    windnodesAvgs: [],
    windnodesHighs: []
}

// 1 km/h = 0,540 kn

getDataFromApi();

function getDataFromApi() {
    fetch("https://api.weather.com/v2/pws/observations/all/1day?apiKey=" + token + "&stationId=IWANDE4&numericPrecision=decimal&format=json&units=m")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data['observations'].forEach(element => {
                windData.timestamps.push(element["obsTimeLocal"]);
                windData.windrotations.push(element["winddirAvg"]);
                windData.windspeedAvgs.push(element["metric"]["windspeedAvg"]);
                windData.windspeedHighs.push(element["metric"]["windspeedHigh"]);
                windData.windnodesAvgs.push(element["metric"]["windspeedAvg"] * 0.54);
                windData.windnodesHighs.push(element["metric"]["windspeedHigh"] * 0.54);
            });

            // Remove every fourth value for a cleaner display
            windData.timestamps = windData.timestamps.filter((_, index) => index % 4 != 0);
            windData.windspeedAvgs = windData.windspeedAvgs.filter((_, index) => index % 4 != 0);
            windData.windspeedHighs = windData.windspeedHighs.filter((_, index) => index % 4 != 0);
            windData.windnodesAvgs = windData.windnodesAvgs.filter((_, index) => index % 4 != 0);
            windData.windnodesHighs = windData.windnodesHighs.filter((_, index) => index % 4 != 0);

            //console.log(windData);
            createChart();
        });

}

const images = ['https://i.imgur.com/KrVIikr.png', 'https://i.imgur.com/KrVIikr.png', 'https://i.stack.imgur.com/3KRtW.png', 'https://i.stack.imgur.com/iLyVi.png'];


function createChart() {
    var ctx = document.getElementById('windchart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        plugins: [{
            afterDraw: (chart) => {
                console.log(chart);
                var ctx = chart.ctx;
                var xAxis = chart.scales['x'];
                var yAxis = chart.scales['y'];
                xAxis.ticks.forEach((_, index) => {
                    var x = xAxis.getPixelForTick(index);
                    var image = new Image();
                    image.src = images[0];
                    //ctx.drawImage(image, x - 12, yAxis.top + 10);

                    ctx.save();
                    ctx.translate(x - 12, yAxis.top + 5); 
                    ctx.rotate(windData.windrotations[index] * Math.PI / 180); 
                    ctx.drawImage(image, 0, 0);
                    ctx.restore();
                });
            }
        }],
        data: {
            labels: windData.timestamps,
            datasets: [
                {
                    data: windData.windspeedAvgs,
                    label: "Durchschnittgeschwindigkeit",
                    borderColor: "#b03a2e",
                    backgroundColor: "#b03a2e",
                    fill: false
                },
                {
                    data: windData.windspeedHighs,
                    label: "Höchstgeschwindigkeit",
                    borderColor: "rgba(52, 152, 219, 0.5)",
                    backgroundColor: "rgba(52, 152, 219, 0.5)",
                    fill: true
                }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            elements: {
                point: {
                    radius: 2.5
                }
            }, scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y:
                {
                    grid: {
                        display: true
                    }
                }
            }

        }
    });
}


