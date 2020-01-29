var chartBar = document.getElementById('male.females');
var nbMales = chartBar.dataset.males;
var nbFemales = chartBar.dataset.females;

new Chart(chartBar, {
    type: 'bar',

    options: {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    },

    data: {
       labels: ["Males", "Females"],
       datasets: [{
           data: [nbMales, nbFemales],
           backgroundColor: ['#5f27cd','#f368e0'],
       }]
    }
});


var msgs = document.getElementById('read.unread');
var unread = msgs.dataset.unread;
var read = msgs.dataset.read;

new Chart(msgs, {
    type: 'doughnut',

    data: {
       labels: ["Unread", "Read"],
       datasets: [{
           data: [unread, read],
           backgroundColor: ['#ff6b6b','#2ed573'],
       }]
    }
});

var ship = document.getElementById('shiped.unshiped');
var unshiped = ship.dataset.unshiped;
var shiped = ship.dataset.shiped;

new Chart(ship, {
    type: 'pie',

    data: {
       labels: ["UnShipped", "Shipped"],
       datasets: [{
           data: [unshiped, shiped],
           backgroundColor: ['#ff4757','#10ac84'],
       }]
    }
});

var saleLine = document.getElementById('saleLine');
var sales = JSON.parse(saleLine.dataset.sales);
var months = [0,0,0,0,0,0,0,0,0,0,0,0];

for(var i=0;i<sales.length;i++) {
    months[sales[i]._id.month] = sales[i].CA;
}

console.log(months)


new Chart(saleLine, {
    type: 'line',
    data: {
      labels: ["January","Febuary","March","April","May", "June","July","August","September","October","November","December"],
      datasets: [{ 
          data: months,
          label: "2019",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });