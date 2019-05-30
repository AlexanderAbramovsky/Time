$(document).ready(function(){
	
	/*
		Настраивает начальное положение экрана,
		делает активной только вкладку Таймер
		и оставляет эффект нажатия на кнопке меню "Таймер"
	*/
	$('#timer_content').fadeIn();
	$('#reports_content').hide();
	$('#tags_content').hide();
	$("#timer_menu").css("backgroundColor","#B3E5FC");


	/*
		При нажатии на кнопку меню "Таймер"
		делает активной только вкладку Таймер 
		и оставляет эффект нажатия на кнопке меню "Таймер"
	*/
	$('#timer_menu').on('click',  function(event){
		$('#timer_content').fadeIn();
		$('#reports_content').hide();
		$('#tags_content').hide();

		$("#timer_menu").css("backgroundColor","#B3E5FC");
		$("#reports_menu").css("backgroundColor","#03A9F4");
		$("#tags_menu").css("backgroundColor","#03A9F4");
	});


	/*
		При нажатии на кнопку меню "Отчёты"
		делает активной только вкладку Отчёты 
		и оставляет эффект нажатия на кнопке меню "Отчёты"
	*/
	$('#reports_menu').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').fadeIn();
		$('#tags_content').hide();

		$("#timer_menu").css("backgroundColor","#03A9F4");
		$("#reports_menu").css("backgroundColor","#B3E5FC");
		$("#tags_menu").css("backgroundColor","#03A9F4");
	});


	/*
		При нажатии на кнопку меню "Теги"
		делает активной только вкладку Теги 
		и оставляет эффект нажатия на кнопке меню "Теги"
	*/ 
	$('#tags_menu').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#tags_content').fadeIn();

		$("#timer_menu").css("backgroundColor","#03A9F4");
		$("#reports_menu").css("backgroundColor","#03A9F4");
		$("#tags_menu").css("backgroundColor","#B3E5FC");
	});
});