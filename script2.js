const labels = ['Red Vans', 'Blue Vans', 'Green Vans', 'Gray Vans'];
const images = ['https://i.stack.imgur.com/2RAv2.png', 'https://i.stack.imgur.com/Tq5DA.png', 'https://i.stack.imgur.com/3KRtW.png', 'https://i.stack.imgur.com/iLyVi.png'];
const values = [48, 56, 33, 44];

new Chart(document.getElementById("test"), {
  type: "bar",
  plugins: [{
    afterDraw: chart => {      
      var ctx = chart.chart.ctx; 
      var xAxis = chart.scales['x-axis-0'];
      var yAxis = chart.scales['y-axis-0'];
      xAxis.ticks.forEach((value, index) => {  
        var x = xAxis.getPixelForTick(index);      
        var image = new Image();
        image.src = images[index],
        ctx.drawImage(image, x - 12, yAxis.bottom + 10);
      });      
    }
  }],
  data: {
    labels: labels,
    datasets: [{
      label: 'My Dataset',
      data: values,
      backgroundColor: ['red', 'blue', 'green', 'lightgray']
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },    
    scales: {
      yAxes: [{ 
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          padding: 30
        }   
      }],
    }
  }
});