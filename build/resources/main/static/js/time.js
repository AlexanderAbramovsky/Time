$(document).ready(function(){
	
	// Переменные для запуска/остановки секундомера
	var flagTime = 0;
	var timer;

	// Переменные для отсчёта секундомера
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var date;

	// Переменная для удаление акта по его id 
	var idDeleteAct;

	// Переменная для хранения id тега 
	var idTagTest = 0;

	// Переменная для хранения кнопки тега
	var tagButton;
	
	// Переменные для работы с записью акта
	var act;
	var project = null;
	var tag = null;
	var dateAct;
	var timeStart;
	var timeEnd;
	var timeAll;


	/*
		При загрузке страницы загружает все акты из базы данных
		в блок div (content_div_all_acts)
	*/ 
	addActOfDiv();


	/*
		При нажатии на кнопку меню "Таймер" 
		загружает все акты из базы данных
		в блок div (content_div_all_acts)
	*/ 
	$('#timer_menu').on('click',  function(event){
		addActOfDiv();
	});


	/*
		При нажатии на кнопку меняет иконку на Старт/Стоп  
		и запускает/останавливает секундомер 
		и сохраняем новую заметку в базе данных 
	*/ 
	$('#timer_button_controller').on('click',  function(event){
		
		// Проверка если нажат старт, запускаем секундомер иначе останавливаем
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


	/*
		При нажатии на кнопку сбрасывает секундомер
		без сохранения в базу данных
	*/ 
	$('#timer_button_bucket').on('click', function(event) {
		$('#timer_button_controller').css("background", "url(../img/start.png)");
		$('#timer_button_controller').css("background-size", "55px 55px");	
		$('#timer_button_bucket').hide();
		clearInterval(timer);
		$('#timer_span').text("00:00:00");
		$('#timer_text').val("");
		flagTime = 0;
	});


	/* 
		Запускает секундомер и устанавливает
		начальные значения акта 
	*/
	function startTimer(){

		// Настройка даты и времени начала акта для передачи json 
		var date = new Date();

		var dayDate = ((date.getDate() < 10) ? "0" : "") + date.getDate();
		var monthDate = (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1);

		var hoursDate = ((date.getHours() < 10) ? "0" : "") + date.getHours();
		var minutesDate = ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
		var secondsDate = ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

		dateAct = date.getFullYear() + "-" + monthDate + "-" + dayDate;

		timeStart = hoursDate + ":" + minutesDate + ":" + secondsDate;

		var seconds = 0;
		var minutes = 0;
		var hours = 0;

		// Запуск секундомера через интервал
		timer = setInterval(function(){
				
			// Проверка на заполнение секунд	
    		if(seconds < 59){
    			seconds++;
    		} else {
    			seconds = 0;
    			minutes++;
    		}

    		// Проверка на заполнение минут 	
    		if(minutes == 59){
    			minutes = 0;
    			hours++;
    		}

    		// Проверка на заполнение часов	
    		if(hours == 24) {
				$('#start_timer').text('start');
				stop();
    		}

    		// Проверка если значения (секунд, минут, часов) будут единичными,
    		// что бы в начале дописывался "0"
    		var secondsStr = ((seconds < 10) ? "0" : "") + seconds; 
    		var minutesStr = ((minutes < 10) ? "0" : "") + minutes; 
    		var hoursStr = ((hours < 10) ? "0" : "") + hours; 

 			var clock = hoursStr + ":" + minutesStr + ":" + secondsStr;

 			// Выводим время
   			$('#timer_span').text(clock);

		},1000);
	}


	/* 
		Останавливает секундомер, устанавливает начальные значения на форме
		и сохраняет полученные данные акта в базу данных MySQL в таблицу acts
	*/
	function stopTimer(){

		// Настройка даты и времени окнончания акта для передачи json 
		var date = new Date();

		var hoursDate = ((date.getHours() < 10) ? "0" : "") + date.getHours();
		var minutesDate = ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
		var secondsDate = ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

		timeEnd = hoursDate + ":" + minutesDate + ":" + secondsDate;
		timeAll = $('#timer_span').text();
		act = $('#timer_text').val();

		// Устанавливаем начальные значения формы
		if(act == ""){
			act = "Добавить описание...";
		}

		clearInterval(timer);
		$('#timer_text').val("");
		$('#timer_span').text("00:00:00");

		// Отправляем ajax запрос передаем полученные данные акта
		// и получаем их назад с присвоенным id 
		// и добавляем акт в блок div (content_div_all_acts) 
		$.ajax({
			url: 'http://91.196.245.199:8092/save_act',
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

						// Переводим дату акта в нужный формат
						var element = data.date_act;
						var year = element[0] + element[1] + element[2] + element[3];
						var month = element[5] + element[6];
						var day = element[8] + element[9];
						var id_day = day + "." + month + "." + year;
						var thisDay = "div_day_act" + id_day;
						var jsonData = year + "-" + month + "-" + day;

						// Получаем id текущего блока формы дня 	
						var lastDay = $('#content_div_all_acts .div_day_act:first').attr( "id");

						// Если событие происходит в текущем дне то записываем акт в него,
						// если нет создаем новую форму дня и добавляем туда акт
						if(lastDay ==  thisDay){

							var allTime;

							// Получаем общее время актов за текущий день
							$.ajax({
								url: 'http://91.196.245.199:8092/get_all_time_date',
								type: 'POST',
								dataType: 'text',
								data: {date_act: jsonData},
								async: false,
								success: function(time){		
									allTime = time;
								},
								error: function(error){
									alert(error);
								}
							});

							// Меняем общее время актов за текущий день
							$('.right_day_inform label:first').text(allTime);

							// Добавляем новый акт в блок актов на текущий день
							var div_act = getDivAct(data);
							$('#content_div_all_acts .div_day_act:first').append(div_act);

    					} else {

    						// Создаем новый блок дня и добавляем туда новый акт
							var div_day_act = getDivDayAct(id_day, jsonData);
							var	div_act = getDivAct(data);

							div_day_act.append(div_act);
							$('#content_div_all_acts').prepend(div_day_act);
    					}
					} 
		});
	}


	/* 
		Графическая обертка для дня актов возвращает блок <div> в котором находится 
		все акты за определенный день
	*/
	function getDivDayAct(id_day, data){

		var allTime = "00:00:00";

		// Делаем ajax запрос чтобы получить общее время всех актов за определенный день 
		$.ajax({
			url: 'http://91.196.245.199:8092/get_all_time_date',
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
		
		// Создаем основной блок <div> в котором будут находится акты
		var div_day_act = $('<div>', {
								class: 'div_day_act',
								id: "div_day_act" + id_day
		});

		// Создаем блок <div> в нём будет хранится информация о дне
		var day_inform = $('<div>', {
							class: 'day_inform',
							id: "day_inform" + id_day
		});

		// Создаём Label с датой акта
		var labal_day_inform = $('<label>', {
							text: id_day,
							class: 'labal_day_inform',
							id: "labal_day_inform" + id_day
		});

		var right_day_inform = $('<div>', {
							class: 'right_day_inform',
							id: "right_day_inform" + id_day
		});

		// Создаём блок <div> в нём будет хранится общее время выполнения всех актов
		var labal_all_time_right_day = $('<label>', {
							id: "labal_all_time_right_day" + id_day,
							text: allTime,
							style: "margin-right: 20px"
		});


		right_day_inform.append(labal_all_time_right_day);

		day_inform.append(labal_day_inform);
		day_inform.append(right_day_inform);

		div_day_act.append(day_inform);

		return div_day_act;
	}


	/* 
		Графическая обертка для акта возвращает блок <div> в котором находится 
		информация о акте, с дополнительным функционалом 
		(обновления текста акта, удаления, добавления тегов) 
	*/
	function getDivAct(element){

		var id = element.id;

		// Создаем основной блок <div> в нем будет хранится вся информация о акте
		var div_act = $('<div>', {
							class: 'div_act',
							id: "div_act" + id
		});

		// Проверка есть ли в акте описание(заметка)
		var textAct = element.act;
		if(textAct == "Добавить описание..."){
			textAct = "";
		}

		// Создаем <text> в котором будет хранится описание акта
		var div_act_text = $('<input>', {
								type: "text",
								placeholder: "Добавьте описание...",
								val: textAct,
								class: 'div_act_text',
								id: "div_act_text" + id,
								on: {
            						change: function(event){

            							// Если в <text> ввели новое описание и сняли с него фокус
            							// он обновит текст акта в базе данных через ajax запрос 
            							$.ajax({
											url: 'http://91.196.245.199:8092/update_act',
											type: 'POST',
											data: {id: id, act: div_act_text.val()},
										});	
            						}
            					}	
		});
								
		// Создаём кнопку добавления тега
		var timer_button_tag = $('<button>', {
									class: 'timer_button timer_button_tag',
									id: "timer_button_tag" + id,
									on: {
            							click: function(event){
            								tagButton = timer_button_tag;
            								idTagTest = id;
            								addTags(element.id);
            							}
            						}	
								});

		if(element.tag != ""){
			timer_button_tag.css("border-color", "#2fc0a7")
		} else {
			timer_button_tag.css("border-color", "white")
		}

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
										id: "timer_button_delete" + id,
										on: {
            								click: function(event){
            									// запоминаем id и текст тега
            									idDeleteAct = id;
                								$('#overlay_delete_act').fadeIn();
            								}
            							}	
									});

		div_act.append(div_act_text);
		div_act.append(timer_button_tag);
		div_act.append(timer_span_start_end);
		div_act.append(timer_span_all);
		div_act.append(timer_button_delete);

		return div_act;
	}

	function addActOfDiv(){

		//удаляем содержимое div
		$("#content_div_all_acts").empty();
		$("#content_div_all_acts").fadeIn();

		// делаем запрос на получение оригинальных дат актов из базы данных
		$.ajax({
			url: 'http://91.196.245.199:8092/get_distinct_date',
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
						url: 'http://91.196.245.199:8092/get_acts_findDateAct',
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

	function addTags(id){

		$("#popup_item_tag").empty();

		$.ajax({
			url: 'http://91.196.245.199:8092/get_act_findById',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {id: id},
			success: function(act){
						$.ajax({
							url: 'http://91.196.245.199:8092/all_tags',
							type: 'POST',
							dataType: 'json',
							async:false,
							success: function(data){

								// проходим по всему списку data
								$.each(data, function(index, element) {

									var span_tag = $('<span>', {
														class: 'popup_item_tag_span',
													});

									var checkbox_tag = $('<input>', {
														type: 'checkbox',
														class: 'popup_item_tag_checkbox',
														on: {
            												click: function(event){
            													//либо добавляем тег, либо его удаляем 
            													if(checkbox_tag.is(':checked')){
            														$.ajax({
            															url: 'http://91.196.245.199:8092/add_tag_act',
            															type: 'POST',
            															async:false,
            															data: {id: act.id, tag: text_tag.val()},
            														});
            													} else {
            														$.ajax({
            															url: 'http://91.196.245.199:8092/delete_tag_act',
            															type: 'POST',
            															async:false,
            															data: {id: act.id, tag: text_tag.val()},
            														});
            													}
            												}
            											}	
													});
	
									var text_tag = $('<input>', {
														type: 'text',
														class: 'popup_item_tag_text',
														value: element.tag
													});
			

									var str = act.tag.split("-;-");

									$.each(str, function(index, text) {
										
										if(element.tag == text){
											checkbox_tag.attr('checked', true);
										}
									});

									span_tag.append(checkbox_tag);
									span_tag.append(text_tag);
									span_tag.append('<br>');	
									$("#popup_item_tag").append(span_tag);
   				 				});
         		
      						},
      						error: function(error){
         						alert(error);
      						}
						});
					}
				});
						

		$('.overlay_add_tag_of_act').fadeIn();
	}

	//__________Модальные_окна___________________

	//закрытие модального окна удаления записи
	$('#button_delete_act_cancel').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	//удаление акта через модальное окно
	$('#button_delete_act').on('click',  function(event){

		$.ajax({
			url: 'http://91.196.245.199:8092/delete_act',
			type: 'POST',
			data: {id: idDeleteAct}, 
			async: false
		});


		addActOfDiv();
		$('.overlay').fadeOut();
	});

	//закрытие модального окна
	$('.close_popup').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	//закрытие модального окна
	$('#close_popup_add_tag_of_act').on('click',  function(event){

			$.ajax({
				url: 'http://91.196.245.199:8092/get_act_findById',
				type: 'POST',
				dataType: 'json',
				data: {id: idTagTest},
				async: false,
				success: function(act){
					if(act.tag != ""){
						tagButton.css("border-color", "#2fc0a7");
					} else {
						tagButton.css("border-color", "white");
					}
				}
			});
		$('.overlay_add_tag_of_act').fadeOut();
	});

	//закрываем окно добавления тегов если происходит нажатие вне окна
	$(document).mouseup(function(event) {
		var popup = $('.popup_add_tag_of_act');
		if(event.target != popup[0] && popup.has(event.target).length === 0){

			$.ajax({
				url: 'http://91.196.245.199:8092/get_act_findById',
				type: 'POST',
				dataType: 'json',
				data: {id: idTagTest},
				async: false,
				success: function(act){
					if(act != null){
						if(act.tag != ""){
							tagButton.css("border-color", "#2fc0a7");
						} else {
							tagButton.css("border-color", "white");
						}
					}
				}
			});

			$('.overlay_add_tag_of_act').fadeOut();
		}
	}); 
});