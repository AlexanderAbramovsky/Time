   google.load("visualization", "1", {packages:["corechart"]});
   google.setOnLoadCallback(drawChart);
   google.setOnLoadCallback(drawChart1);
   function drawChart() {

     var data = google.visualization.arrayToDataTable ([ 
         ['Element', 'Время', {role: 'style'} ], 
         ['Пн', 8.94, '' ], // Значение RGB 
         ['Вт', 14.49, '' ], // английское имя цвета 
         ['Ср', 4.30, '' ], 
     ['Чт', 0.0, '' ],
     ['Пт', 3, '' ],
     ['Сб', 0, '' ],
     ['Вс', 0, '' ], // объявление в стиле CSS 
      ]);
    var options = {
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('weeks'));
    chart.draw(data, options);
   }

   function drawChart1() {

     var data = google.visualization.arrayToDataTable ([ 
         ['Element', 'Время', {role: 'style'} ], 
         ['Пн', 8.94, '' ], // Значение RGB 
         ['Вт', 14.49, '' ], // английское имя цвета 
         ['Ср', 4.30, '' ], 
     ['Чт', 0.0, '' ],
     ['Пт', 3, '' ],
     ['Сб', 0, '' ],
     ['Вс', 0, '' ], // объявление в стиле CSS 
      ]);
    var options = {
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('weeks1'));
    chart.draw(data, options);
   }