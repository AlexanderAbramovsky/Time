$(document).ready(function(){

	var flagTime = 0;
	var timer;

	// выбор сервера на установку флажка
	$('#socket_server').click(function(){
		$('#spring_boot').prop('checked', false);
	});

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
	}

});