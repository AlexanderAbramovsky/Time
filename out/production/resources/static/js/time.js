$(document).ready(function(){

	var flagTime = 0;
	var timer;

	var seconds = 0;
	var minutes = 0;
	var hours = 0;

	var date;

	var act;
	var project = null;
	var tag = null;
	var dateAct;
	var timeStart;
	var timeEnd;
	var timeAll;

	addActOfDiv();

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

	//При нажатии сбрасывает таймер
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

			var date = new Date();

			var dayDate = ((date.getDate() < 10) ? "0" : "") + date.getDate();
			var monthDate = (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1);

			var hoursDate = ((date.getHours() < 10) ? "0" : "") + date.getHours();
			var minutesDate = ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
			var secondsDate = ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

			// настройка текущей даты для передачи json
			dateAct = date.getFullYear() + "-" + monthDate + "-" + dayDate;

			timeStart = hoursDate + ":" + minutesDate + ":" + secondsDate;

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

		var date = new Date();

		var hoursDate = ((date.getHours() < 10) ? "0" : "") + date.getHours();
		var minutesDate = ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
		var secondsDate = ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

		timeEnd = hoursDate + ":" + minutesDate + ":" + secondsDate;
		timeAll = $('#timer_span').text();
		act = $('#timer_text').val();

		if(act == ""){
			act = "Добавить описание...";
		}

		clearInterval(timer);
		$('#timer_text').val("");
		$('#timer_span').text("00:00:00");

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

						var element = data.date_act;
						var year = element[0] + element[1] + element[2] + element[3];
						var month = element[5] + element[6];
						var day = element[8] + element[9];
						var id_day = day + "." + month + "." + year;
						var thisDay = "div_day_act" + id_day;

						var lastDay = $('#content_div_all_acts .div_day_act:first').attr( "id");

						//если событие происходит в текущем дне то записываем его туда,
						//если нет создаем новый день
						if(lastDay ==  thisDay){
							var div_act = getDivAct(data);
							$('#content_div_all_acts .div_day_act:first').append(div_act);

    					} else {
							var jsonData = year + "-" + month + "-" + day;
							var div_day_act = getDivDayAct(id_day, jsonData);
							var	div_act = getDivAct(data);

							div_day_act.append(div_act);
							$('#content_div_all_acts').prepend(div_day_act);
    					}
					} 
		});
	}

	function getDivDayAct(id_day, data){

		var allTime = "00:00:00";

		$.ajax({
			url: 'http://localhost:8080/get_all_time_date',
			type: 'POST',
			dataType: 'text',
			data: {date_act: data},
			async: false,
			success: function(time){		
				allTime = time;
			},
			error: function(error){
				alert(error);
			}
		});
		

		var div_day_act = $('<div>', {
								class: 'div_day_act',
								id: "div_day_act" + id_day
						  });

		var day_inform = $('<div>', {
							class: 'day_inform',
							id: "day_inform" + id_day
						});

		var labal_day_inform = $('<label>', {
							text: id_day,
							class: 'labal_day_inform',
							id: "labal_day_inform" + id_day
		});

		var right_day_inform = $('<div>', {
							class: 'right_day_inform',
							id: "right_day_inform" + id_day
						});

		var labal_all_time_right_day = $('<label>', {
							id: "labal_all_time_right_day" + id_day,
							text: allTime
						});

		var button_delete_day = $('<button>', {
							class: 'button_delete_day',
							id: "button_delete_day" + id_day
						});

		right_day_inform.append(labal_all_time_right_day);
		right_day_inform.append(button_delete_day);

		day_inform.append(labal_day_inform);
		day_inform.append(right_day_inform);

		div_day_act.append(day_inform);

		return div_day_act;
	}

	function getDivAct(element){

		var id = element.id;

		var div_act = $('<div>', {
							class: 'div_act',
							id: "div_act" + id
						});

		var textAct = element.act;
		if(textAct == "Добавить описание..."){
			textAct = "";
		}

		var div_act_text = $('<input>', {
								type: "text",
								placeholder: "Добавьте описание...",
								val: textAct,
								class: 'div_act_text',
								id: "div_act_text" + id
							});
								
		var timer_button_project = $('<button>', {
										class: 'timer_button timer_button_project',
										id: "timer_button_project" + id
									});

		var timer_button_tag = $('<button>', {
									class: 'timer_button timer_button_tag',
									id: "timer_button_tag" + id
								});

		var timer_span_start_end = $('<span>', {
										text: element.time_start_act + " - " + element.time_end_act,
										class: 'timer_span_start_end',
										id: "timer_span_start_end" + id
									});

		var timer_span_all = $('<span>', {
								text: element.all_time_act,
								class: 'timer_span_all',
								id: "timer_span_all" + id
							});

		var timer_button_delete = $('<button>', {
										class: 'timer_button timer_button_delete',
										id: "timer_button_delete" + id
									});

		div_act.append(div_act_text);
		div_act.append(timer_button_project);
		div_act.append(timer_button_tag);
		div_act.append(timer_span_start_end);
		div_act.append(timer_span_all);
		div_act.append(timer_button_delete);

		return div_act;
	}

	// добавляет акт в div
	function addActOfDiv(){

		//удаляем содержимое div
		$("#content_div_all_acts").empty();
		$("#content_div_all_acts").fadeIn();

		// делаем запрос на получение оригинальных дат актов из базы данных
		$.ajax({
			url: 'http://localhost:8080/get_distinct_date',
			type: 'POST',
			dataType: 'json',
			success: function(date){
				// проходим по всему списку date
				$.each(date, function(index, element) {

					var year = element[0] + element[1] + element[2] + element[3];
					var month = element[5] + element[6];
					var day = element[8] + element[9];

					var id_day = day + "." + month + "." + year;
					var jsonData = year + "-" + month + "-" + day;
					var div_day_act = getDivDayAct(id_day, jsonData);

					$.ajax({
						url: 'http://localhost:8080/get_acts_findDateAct',
						type: 'POST',
						dataType: 'json',
						data: {date_act: jsonData},
						success: function(acts){
							$.each(acts, function(index, element) {
								div_act = getDivAct(element);
								div_day_act.append(div_act);
							});
						}
					});

					$('#content_div_all_acts').append(div_day_act);

   				 });
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}

});