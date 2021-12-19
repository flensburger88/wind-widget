const token = "";
let windData = {
    timestamps: [],
    windspeedAvgs: [],
    windspeedHighs: [],
    windspeedLows: []
}

getDataFromApi();

function getDataFromApi() {
    fetch("https://api.weather.com/v2/pws/observations/all/1day?apiKey=" + token + "&stationId=IWANDE4&numericPrecision=decimal&format=json&units=m")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            data['observations'].forEach(element => {
                windData.timestamps.push(element["obsTimeLocal"]);
                windData.windspeedAvgs.push(element["metric"]["windspeedAvg"]);
                windData.windspeedHighs.push(element["metric"]["windspeedHigh"]);
                windData.windspeedLows.push(element["metric"]["windspeedLow"]);
            });

            // Remove every fourth value for a cleaner display
            windData.timestamps = windData.timestamps.filter((_, index) => index % 4 != 0);
            windData.windspeedAvgs = windData.windspeedAvgs.filter((_, index) => index % 4 != 0);
            windData.windspeedHighs = windData.windspeedHighs.filter((_, index) => index % 4 != 0);
            windData.windspeedLows = windData.windspeedLows.filter((_, index) => index % 4 != 0);

            //console.log(windData);
            createChart();
        });

}

function createChart() {
    var ctx = document.getElementById('windchart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: windData.timestamps,
            datasets: [
                {
                    data: windData.windspeedAvgs,
                    label: "Durchschnittgeschwindigkeit",
                    borderColor: "#b03a2e",
                    backgroundColor: "#b03a2e",
                    fill: false,
                }, {
                    data: windData.windspeedHighs,
                    label: "Höchstgeschwindigkeit",
                    borderColor: "rgba(52, 152, 219, 0.5)",
                    backgroundColor: "rgba(52, 152, 219, 0.5)",
                    fill: true,
                }]
        },
        options: {
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

