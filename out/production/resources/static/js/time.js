$(document).ready(function(){

	var flagTime = 0;
	var timer;

	var test = 0;


	//При нажатии на старт меняет иконку на стоп и обратно
	$('#timer_button_controller').on('click',  function(event){
		// меняем местами старт и стоп

		if(test == 0){
			$('#timer_button_controller').css("background", "url(../img/stop.png)");
			$('#timer_button_controller').css("background-size", "55px 55px");
			$('#timer_button_bucket').show();
			startTimer();
			test = 1;	
		} else {
			$('#timer_button_controller').css("background", "url(../img/start.png)");
			$('#timer_button_controller').css("background-size", "55px 55px");	
			$('#timer_button_bucket').hide();
			stopTimer();
			test = 0;
		}
		
	});

	$('#timer_button_bucket').on('click', function(event) {
		$('#timer_button_controller').css("background", "url(../img/start.png)");
		$('#timer_button_controller').css("background-size", "55px 55px");	
		$('#timer_button_bucket').hide();
		clearInterval(timer);
		$('#timer_span').text("00:00:00");
		$('#timer_text').val("");
		test = 0;
	});

	function startTimer(){

			var seconds = 0;
			var minutes = 0;
			var hours = 0;

			$('#start_timer').text('stop');

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
		clearInterval(timer);
		$('#timer_text').val("");
		$('#timer_span').text("00:00:00");
	}



});