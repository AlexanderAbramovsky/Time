$(document).ready(function(){

	var flagTime = 0;
	var timer;

	//начальное положение экрана при загрузке страницы
	$('#timer_content').show();
	$('#reports_content').hide();
	$('#projects_content').hide();
	$('#tags_content').hide();



	// Переходы по вкладкам меню

	$('#timer').on('click',  function(event){
		$('#timer_content').show();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').hide();


		// ajax запрос
		$.ajax({
      		url: "http://localhost:8080/demo/all",
      		type: "POST",
      		dataType: "json",
      		success: function(msg){
         		alert(msg);
      		},
      		error: function(msg){
         		alert("Ошибка");
      		}
   		});

	});

	$('#reports').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').show();
		$('#projects_content').hide();
		$('#tags_content').hide();
	});

	$('#projects').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').show();
		$('#tags_content').hide();
	});

	$('#tags').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').show();
	});

	$('#all').on('click', function(event){

		$.ajax({
			url: 'http://localhost:8080/get/1',
			type: 'POST',
			dataType: 'json',
			success: function(msg){

				$('#database').text(msg.id + " " + msg.fio + " " + msg.number);
         		
      		},
      		error: function(msg){
         		alert("Ошибка");
      		}
		});
		
	});

	//старт секундомера
	$('#start_timer').on('click',  function(event) {

		if (flagTime == 0) {
			
			flagTime = 1;

			var seconds = 0;
			var minutes = 0;
			var hours = 0;

			$('#start_timer').text('stop');

			timer = setInterval(function(){
				
				// проверка на секунды	
    			if(seconds < 60){
    				seconds++;
    			} else {
    				seconds = 0;
    				minutes++;
    			}

    			// проверка на минуты
    			if(minutes == 60){
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

   				$('#label_time').text(clock);

			},1000);
		} else {
			$('#start_timer').text('start');
			stop();
		}
		/* Act on the event */
	});

	function stop(){
		clearInterval(timer);
		flagTime = 0;
		//alert("Text" + $('#text_time').val() + " time:" + $('#label_time').text());
	}

});