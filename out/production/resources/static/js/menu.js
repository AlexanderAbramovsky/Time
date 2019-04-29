$(document).ready(function(){

	//начальное положение экрана при загрузке страницы
	$('#timer_content').fadeIn();
	$('#reports_content').hide();
	$('#projects_content').hide();
	$('#tags_content').hide();

	//начальное положение активности кнопок
	$("#timer_menu").css("backgroundColor","#B3E5FC");
	$("#reports_menu").css("backgroundColor","#03A9F4");
	$("#projects_menu").css("backgroundColor","#03A9F4");
	$("#tags_menu").css("backgroundColor","#03A9F4");



	$('#timer_menu').on('click',  function(event){
		$('#timer_content').fadeIn();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').hide();

		//меняем цвет кнопки указывая на её активность
		$("#timer_menu").css("backgroundColor","#B3E5FC");
		$("#reports_menu").css("backgroundColor","#03A9F4");
		$("#projects_menu").css("backgroundColor","#03A9F4");
		$("#tags_menu").css("backgroundColor","#03A9F4");
	});

	$('#reports_menu').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').fadeIn();
		$('#projects_content').hide();
		$('#tags_content').hide();

		$("#timer_menu").css("backgroundColor","#03A9F4");
		$("#reports_menu").css("backgroundColor","#B3E5FC");
		$("#projects_menu").css("backgroundColor","#03A9F4");
		$("#tags_menu").css("backgroundColor","#03A9F4");
	});

	$('#projects_menu').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').fadeIn();
		$('#tags_content').hide();

		$("#timer_menu").css("backgroundColor","#03A9F4");
		$("#reports_menu").css("backgroundColor","#03A9F4");
		$("#projects_menu").css("backgroundColor","#B3E5FC");
		$("#tags_menu").css("backgroundColor","#03A9F4");
	});

	// переход на вкладку теги 
	$('#tags_menu').on('click',  function(event){
		//делаем видимым только вкладку Теги
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').fadeIn();

		//меняем цвет кнопки указывая на её активность
		$("#timer_menu").css("backgroundColor","#03A9F4");
		$("#reports_menu").css("backgroundColor","#03A9F4");
		$("#projects_menu").css("backgroundColor","#03A9F4");
		$("#tags_menu").css("backgroundColor","#B3E5FC");

	});
});