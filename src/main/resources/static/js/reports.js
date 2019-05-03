   google.load("visualization", "1", {packages:["corechart"]});
   google.setOnLoadCallback(drawColumnChart);
   google.setOnLoadCallback(drawCircleChart);

   function drawColumnChart() {

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

  function drawCircleChart() {
    var data = google.visualization.arrayToDataTable([
     ['Газ', 'Объём'],
     ['Азот',     78.09],
     ['Кислород', 20.95],
     ['Аргон',    0.93],
     ['Углекислый газ', 0.03]
    ]);
    var options = {
     title: 'Состав воздуха',
     is3D: true,
     pieResidueSliceLabel: 'Остальное'
    };
    var chart = new google.visualization.PieChart(document.getElementById('job'));
     chart.draw(data, options);
   }