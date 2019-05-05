   
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
            ['Пн\n' + days[0] ,+allTimeDaysInt[0], '' + allTimeDays[0] ], // Значение RGB 
            ['Вт\n' + days[1] ,+allTimeDaysInt[1], '' + allTimeDays[1] ], // английское имя цвета 
            ['Ср\n' + days[2] ,+allTimeDaysInt[2], '' + allTimeDays[2] ], 
            ['Чт\n' + days[3] ,+allTimeDaysInt[3], '' + allTimeDays[3] ],
            ['Пт\n' + days[4] ,+allTimeDaysInt[4], '' + allTimeDays[4] ],
            ['Сб\n' + days[5] ,+allTimeDaysInt[5], '' + allTimeDays[5] ],
            ['Вс\n' + days[6] ,+allTimeDaysInt[6], '' + allTimeDays[6] ], // объявление в стиле CSS 
        ]);

        var options = {
          hAxis: {title: ""+monthNames[date.getMonth()]}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('weeks'));
        chart.draw(data, options);
    }

    function drawCircleChart() {

        var tagsMap = new Map();

        tagsMap.set("No tags", 0);

        $.ajax({
            url: 'http://localhost:8080/all_tags',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data, function(index, element) {
                    tagsMap.set(element.tag, 0);
                });
            },
            error: function(error){
                alert(error);
            }
        });

        var week = new Date(date);
        var countWeek = week.getDay();
        week.setDate(week.getDate() - countWeek + 1);

        for (var i = 0; i <= 6; i++) {
            var jsonDate = week.getFullYear() + "-" + (week.getMonth()+1) + "-" + week.getDate();

            $.ajax({
                url: 'http://localhost:8080/get_acts_findDateAct',
                type: 'POST',
                dataType: 'json',
                data: {date_act: jsonDate},
                async: false,
                success: function(acts){   
                    $.each(acts, function(index, act) {
                        var strTag = act.tag.split("-;-");

                        var str = act.all_time_act.split(":");
                        var allTimeAct = Number(str[0]) + Number(str[1]) * 0.01 + Number(str[2]) * 0.0001;

                        if(strTag[0] == ""){
                            tagsMap.set("No tags", tagsMap.get("No tags") + allTimeAct);
                        } else {
                            $.each(strTag, function(index, str) {
                                tagsMap.set(str, tagsMap.get(str) + allTimeAct);
                            });
                        }
                    });
                },
                error: function(error){
                    alert(error);
                }
            });

            week.setDate(week.getDate() + 1);
        }

        var dataCircle = google.visualization.arrayToDataTable([
            ['Tag', 'Time'],
            ['Test', 0]
        ]);

        var timeNoTags = tagsMap.get("No tags");
        if(timeNoTags != 0){
            dataCircle.addRow(["No tags", timeNoTags]);
        }


        $.ajax({
            url: 'http://localhost:8080/all_tags',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data, function(index, element) {
                    var time = tagsMap.get(element.tag);
                    if(time != 0){
                        dataCircle.addRow([""+element.tag, time]);
                    }
                });
            },
            error: function(error){
                alert(error);
            }
        });

        var options = {
            slices: {
                1: { color: 'silver' },
            },      
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('job'));
        chart.draw(dataCircle, options);
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




