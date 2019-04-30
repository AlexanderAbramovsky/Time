$(document).ready(function(){

	var flagTime = 0;
	var timer;

	var date;

	var act;
	var project = null;
	var tag = null;
	var dateAct;
	var timeStart;
	var timeEnd;
	var timeAll;

	// переход на вкладку таймер и загружаем все акты из базы данных
	$('#timer_menu').on('click',  function(event){
		addActOfDiv();
	});

	//При нажатии на старт меняет иконку на стоп и обратно
	$('#timer_button_controller').on('click',  function(event){
		// меняем местами старт и стоп

		if(flagTime == 0){
			$('#timer_button_controller').css("background", "url(../img/stop.png)");
			$('#timer_button_controller').css("background-size", "55px 55px");
			$('#timer_button_bucket').show();
			startTimer();
			flagTime = 1;	
		} else {
			$('#timer_button_controller').css("background", "url(../img/start.png)");
			$('#timer_button_controller').css("background-size", "55px 55px");	
			$('#timer_button_bucket').hide();
			stopTimer();
			flagTime = 0;
		}
		
	});

	$('#timer_button_bucket').on('click', function(event) {
		$('#timer_button_controller').css("background", "url(../img/start.png)");
		$('#timer_button_controller').css("background-size", "55px 55px");	
		$('#timer_button_bucket').hide();
		clearInterval(timer);
		$('#timer_span').text("00:00:00");
		$('#timer_text').val("");
		flagTime = 0;
	});

	function startTimer(){

			date = new Date();

			// настройка текущей даты для передачи json
			dateAct = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
			timeStart = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

			var seconds = 0;
			var minutes = 0;
			var hours = 0;

			timer = setInterval(function(){
				
				// проверка на секунды	
    			if(seconds < 59){
    				seconds++;
    			} else {
    				seconds = 0;
    				minutes++;
    			}

    			// проверка на минуты
    			if(minutes == 59){
    				minutes = 0;
    				hours++;
    			}

    			// проверка на часы
    			if(hours == 24) {
					$('#start_timer').text('start');
					stop();
    			}

    			var secondsStr = ((seconds < 10) ? "0" : "") + seconds; 
    			var minutesStr = ((minutes < 10) ? "0" : "") + minutes; 
    			var hoursStr = ((hours < 10) ? "0" : "") + hours; 

 				var clock = hoursStr + ":" + minutesStr + ":" + secondsStr;

   				$('#timer_span').text(clock);

			},1000);
	}

	function stopTimer(){

		date = new Date();

		timeEnd = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		timeAll = $('#timer_span').text();

		clearInterval(timer);
		$('#timer_text').val("");
		$('#timer_span').text("00:00:00");

		act = $('#timer_text').val();

		if(act == ""){
			act = "Добавить описание...";
		}

		$.ajax({
			url: 'http://localhost:8080/save_act',
			type: 'POST',
			dataType: 'json',
			data: {
				act: act,
				project: project,
				tag: tag,
				date_act: dateAct,
				time_start_act: timeStart,
				time_end_act: timeEnd,
				all_time_act: timeAll
			},
			success: function(data){
						alert(data.id + " " + data.act + " " + data.project + " "
							+ data.tag + " " + data.date_act + " " + data.time_start_act + " " 
							+ data.time_end_act + " " + data.all_time_act);
					} 
		});
		
		alert(act + " " + project + " " + tag + " " + dateAct + " "
			 + timeStart + " " + timeEnd + " " + timeAll);
	}

	// добавляет акт в div
	function addActOfDiv(){

		//удаляем содержимое div
		$("#content_div_all_acts").empty();

		// делаем запрос на получение оригинальных дат актов из базы данных
		$.ajax({
			url: 'http://localhost:8080/get_distinct_date',
			type: 'POST',
			dataType: 'json',
			success: function(data){
				// проходим по всему списку data
				$.each(data, function(index, element) {
            		//var span_tag = getSpanTag(element.id, element.tag);
					$('#content_div_all_acts').append(element);
   				 });
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}

});