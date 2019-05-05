   
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawColumnChart);
    google.setOnLoadCallback(drawCircleChart);

    var date = new Date();  

    const monthNames = ["ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ", 
        "СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ" 
    ];

    function drawColumnChart() {

        var days = [];
        var allTimeDays = [];
        var allTimeDaysInt = [];
        var week = new Date(date);

        var countWeek = week.getDay();
        week.setDate(week.getDate() - countWeek + 1);

        for (var i = 0; i <= 6; i++) {

            var jsonData = week.getFullYear() + "-" + (week.getMonth()+1) + "-" + week.getDate();

            $.ajax({
                url: 'http://localhost:8080/get_all_time_date',
                type: 'POST',
                dataType: 'text',
                data: {date_act: jsonData},
                async: false,
                success: function(time){   

                    allTimeDays[i] = time;

                    var str = time.split(":");
                    allTimeDaysInt[i] = Number(str[0]) + Number(str[1]) * 0.01 + Number(str[2]) * 0.0001;
                   
                },
                error: function(error){
                    alert(error);
                }
            });

            days[i] = week.getDate();
            week.setDate(week.getDate() + 1);
        }

        var data = google.visualization.arrayToDataTable ([ 
            ['Element', 'Время', { role: 'annotation' } ], 
            ['Пн\n' + days[0] ,allTimeDaysInt[0] + 0.00001, '' + allTimeDays[0] ], // Значение RGB 
            ['Вт\n' + days[1] ,allTimeDaysInt[1] + 0.00001, '' + allTimeDays[1] ], // английское имя цвета 
            ['Ср\n' + days[2] ,allTimeDaysInt[2] + 0.00001, '' + allTimeDays[2] ], 
            ['Чт\n' + days[3] ,allTimeDaysInt[3] + 0.00001, '' + allTimeDays[3] ],
            ['Пт\n' + days[4] ,allTimeDaysInt[4] + 0.00001, '' + allTimeDays[4] ],
            ['Сб\n' + days[5] ,allTimeDaysInt[5] + 0.00001, '' + allTimeDays[5] ],
            ['Вс\n' + days[6] ,allTimeDaysInt[6] + 0.00001, '' + allTimeDays[6] ], // объявление в стиле CSS 
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
         drawCircleChart();
    });

    $('#next_week').on('click', function(event) {       
        date.setDate(date.getDate() + 7);
        drawColumnChart();
        drawCircleChart();
    });

    $('#this_week').on('click', function(event) {       
        date = new Date();
        drawColumnChart();
        drawCircleChart();
    });




