    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawColumnChart);
    google.setOnLoadCallback(drawCircleChart);

    var date = new Date();

    const monthNames = ["ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ", 
        "СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ" 
    ];

    function drawColumnChart() {

        var days = [];
        var week = new Date(date);
        //alert(date.getDay());

        var countWeek = week.getDay();
        week.setDate(week.getDate() - countWeek + 1);

        for (var i = 0; i <= 6; i++) {
            days[i] = week.getDate();
            week.setDate(week.getDate() + 1);
        }

        var data = google.visualization.arrayToDataTable ([ 
            ['Element', 'Время', {role: 'style'} ], 
            ['Пн\n' + days[0] , 8.94, '' ], // Значение RGB 
            ['Вт\n' + days[1] , 14.49, '' ], // английское имя цвета 
            ['Ср\n' + days[2] , 4.30, '' ], 
            ['Чт\n' + days[3] , 0.0, ''],
            ['Пт\n' + days[4] , 3, ''],
            ['Сб\n' + days[5] , 0, '' ],
            ['Вс\n' + days[6] , 0, '' ], // объявление в стиле CSS 
        ]);

        var options = {
          hAxis: {title: ""+monthNames[date.getMonth()]}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('weeks'));
        chart.draw(data, options);
    }



    function drawCircleChart() {
        var data = google.visualization.arrayToDataTable([
            ['Газ', 'Проекты'],
            ['No project', 165.09],
            ['VR', 30.93],
            ['Таймер', 45.03]
        ]);

        var options = {
            slices: {
                0: { color: 'silver' },
            },      
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('job'));
        chart.draw(data, options);
    }

    $('#last_week').on('click', function(event) {       
         date.setDate(date.getDate() - 7);
         drawColumnChart();
    });

    $('#next_week').on('click', function(event) {       
        date.setDate(date.getDate() + 7);
        drawColumnChart();
    });

    $('#this_week').on('click', function(event) {       
        date = new Date();
        drawColumnChart();
    });