    
    // Загружаем библиотеки google для воспроизведения графиков   
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawColumnChart);
    google.setOnLoadCallback(drawCircleChart);

    // Текущая дата (начальная точка отсчёта)
    var date = new Date();  

    // Массив для хранения всех месяцев по индексу
    const monthNames = ["ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ", 
        "СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ" 
    ];

    /*
        Выводит информацию о недели в столбчатом графике
        относительно общего времени дня
    */ 
    function drawColumnChart() {

        var days = [];

        // Время дня для вывода над столбцом 
        var allTimeDays = [];

        // Время дня для сравнения в графики и формирования столбцов 
        var allTimeDaysInt = [];

        // Устанавливаем неделю начиная с понедельника
        var week = new Date(date);
        var countWeek = week.getDay();
        week.setDate(week.getDate() - countWeek + 1);

         // Проходится по всей неделе
        for (var i = 0; i <= 6; i++) {

            // Переменная даты нужная для ajax запроса
            var jsonData = week.getFullYear() + "-" + (week.getMonth()+1) + "-" + week.getDate();

            // Получаем все время дня
            $.ajax({
                url: 'http://localhost:8092/get_all_time_date',
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

            // Переключаем дату на следующий день недели
            days[i] = week.getDate();
            week.setDate(week.getDate() + 1);
        }

        // Заполняем график информацией
        var data = google.visualization.arrayToDataTable ([ 
            ['Element', 'Время', { role: 'annotation' } ], 
            ['Пн\n' + days[0] ,+allTimeDaysInt[0], '' + allTimeDays[0] ], 
            ['Вт\n' + days[1] ,+allTimeDaysInt[1], '' + allTimeDays[1] ], 
            ['Ср\n' + days[2] ,+allTimeDaysInt[2], '' + allTimeDays[2] ], 
            ['Чт\n' + days[3] ,+allTimeDaysInt[3], '' + allTimeDays[3] ],
            ['Пт\n' + days[4] ,+allTimeDaysInt[4], '' + allTimeDays[4] ],
            ['Сб\n' + days[5] ,+allTimeDaysInt[5], '' + allTimeDays[5] ],
            ['Вс\n' + days[6] ,+allTimeDaysInt[6], '' + allTimeDays[6] ],  
        ]);

        // Выводим в график текущий месяц
        var options = {
          hAxis: {title: ""+monthNames[date.getMonth()]}
        };

        // Выводим график
        var chart = new google.visualization.ColumnChart(document.getElementById('weeks'));
        chart.draw(data, options);
    }


    /*
        Выводит информацию о недели в круговом графике
        относительно тегов дня
    */ 
    function drawCircleChart() {

        // Коллекция для хранения времени по тегам (ключ - тег, значение - время)
        var tagsMap = new Map();

        // Если у заметки не установлен тег она попадает в категорию "No tags"
        tagsMap.set("No tags", 0);

        // Вызываем все теги из базы данных и заполняем структуру
        $.ajax({
            url: 'http://localhost:8092/all_tags',
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

        // Устанавливаем неделю начиная с понедельника
        var week = new Date(date);
        var countWeek = week.getDay();
        week.setDate(week.getDate() - countWeek + 1);

        // Проходится по всей неделе
        for (var i = 0; i <= 6; i++) {

            // Переменная даты нужная для ajax запроса 
            var jsonDate = week.getFullYear() + "-" + (week.getMonth()+1) + "-" + week.getDate();

            // Делаем ajax запрос и заполняем коллекцию
            $.ajax({
                url: 'http://localhost:8092/get_acts_findDateAct',
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

        // Если есть категория "No tags" добавляем её на график
        var timeNoTags = tagsMap.get("No tags");
        if(timeNoTags != 0){
            dataCircle.addRow(["No tags", timeNoTags]);
        }

        // Делаем запрос на все теги
        $.ajax({
            url: 'http://localhost:8092/all_tags',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data, function(index, element) {
                    // Получаем значение коллекции по имени тега и
                    // если оно не нулевое добавляем в график
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

        // Выводим график
        var chart = new google.visualization.PieChart(document.getElementById('job'));
        chart.draw(dataCircle, options);
    }


    /*
        При нажатии переходим на неделю назад
        и выводим информацию о недели  
    */
    $('#last_week').on('click', function(event) {       
         date.setDate(date.getDate() - 7);
         drawColumnChart();
         drawCircleChart();
    });

    /*
        При нажатии переходим на текущую неделю
        и выводим информацию о недели  
    */
    $('#next_week').on('click', function(event) {       
        date.setDate(date.getDate() + 7);
        drawColumnChart();
        drawCircleChart();
    });

    /*
        При нажатии переходим на неделю вперед
        и выводим информацию о недели  
    */
    $('#this_week').on('click', function(event) {       
        date = new Date();
        drawColumnChart();
        drawCircleChart();
    });