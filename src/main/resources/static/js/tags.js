$(document).ready(function(){

	// нужны для удаления и обновления тега
	var idUpdateTeg;
	var textUpdateTeg;

	// переход на вкладку теги 
	$('#tags').on('click',  function(event){
		//делаем видимым только вкладку Теги
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').fadeIn();

		//меняем цвет кнопки указывая на её активность
		$("#timer").css("background","#03A9F4");
		$("#reports").css("background","#03A9F4");
		$("#projects").css("background","#03A9F4");
		$("#tags").css("background","#B3E5FC");

		addTagsOfDiv();
	});

	//добавляем тег в базу данных и вывводим его в программе
	$('#button_add_tag').on('click',  function(event){
		
		var text = $('#text_add_tag').val();

		//если ничего не ввели
		if(text != ""){
			//проверям есть ли такой тег, если нет то сохраняем его
			$.ajax({
				url: 'http://localhost:8080/get_tag_findTextTag',
				type: 'POST',
				dataType: 'json',
				data: {tag: text},
				success: function(data){
					if(data != null){
						alert("Такой тег уже существует !");
					} else {
						$.ajax({
							url: 'http://localhost:8080/save_tag',
							type: 'POST',
							dataType: 'json',
							data: {tag: text},
							success: function(data){
								$('#text_add_tag').val("");
								var span_tag = getSpanTag(data.id, data.tag);
								$("#all_tags").append(span_tag);
							} 
						});
					}	
         		} 
			});
		} else {
			alert("Введите текст !!!");
		}
	});

	// добавляет теги в div
	function addTagsOfDiv(){

		//удаляем содержимое div
		$("#all_tags").empty();

		// делаем запрос на получение всех тегов из базы данных
		$.ajax({
			url: 'http://localhost:8080/all_tags',
			type: 'POST',
			dataType: 'json',
			success: function(data){

				// проходим по всему списку data
				$.each(data, function(index, element) {
            		var span_tag = getSpanTag(element.id, element.tag);
					$('#all_tags').append(span_tag);
   				 });
         		
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}

	function getSpanTag(id, text){

		//создаем span в котором будет храниться один блок с тегом
					var span_tag = $('<span>', {
										class: 'span',
										id: "span_tag" + id
									});

					var span_item = $('<span>', {
										class: 'span_item',
										id: "span_item" + id
									});

					var label_text = $('<label>', {
										id: "label_text" + id,
										text: text
									});
					
					var buttonUpdate = $('<button>', {
						class: 'button_update', 
						on: {
            				click: function(event){
            					// запоминаем id и текст тега
            					idUpdateTeg = id;
                				$('#overlay_update').fadeIn(); // открываем модальное окно обновления тега
            				}
            			}	
            		});

					var buttonDelete = $('<button>', {
						class: 'button_delete',
						id: "button"+id, 
						href: "#delete_Form_Tag",
						on: {
            				click: function(event){
            					//запоминаем id тега
            					idUpdateTeg = id;
            					$('#overlay_delete').fadeIn();
            				}
            			}	
					});

					span_item.append(label_text);
					span_item.append(buttonUpdate);
					span_item.append(buttonDelete);

					span_tag.append(span_item);

		return span_tag;
	}

	//__________Модальные_окна___________________
	
	//обновление тега через модальное окно
	$('#button_update_save').on('click',  function(event){
		
		//пересылаем серверу id и text тега который нужно обновить

		textUpdateTeg = $('#text_update_new_tag').val();

		//проверяем есть ли в базе такой же тег, если нет то обновляем тег
		$.ajax({
			url: 'http://localhost:8080/get_tag_findTextTag',
			type: 'POST',
			dataType: 'json',
			data: {tag: textUpdateTeg},
			success: function(data){
				if(data != null){
					alert("Такой тег уже существует !");
				} else {
					$.ajax({
						url: 'http://localhost:8080/update_tag',
						type: 'POST',
						data: {id: idUpdateTeg, tag: textUpdateTeg},
						success: function(){
							$("#label_text" + idUpdateTeg).text(textUpdateTeg);
							$('.overlay').fadeOut();
						}
					});	
				}
			}
		});
	});

	//закрытие модального окна обновления тега
	$('#button_update_cancel').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	//удаление тега через модальное окно
	$('#button_delete_delete').on('click',  function(event){

		$.ajax({
			url: 'http://localhost:8080/delete_tag',
			type: 'POST',
			data: {id: idUpdateTeg} // 
		});

		$('.overlay').fadeOut();

		$('#span_tag' + idUpdateTeg).remove();

		
	});

	//закрытие модального окна удаления тега
	$('#button_delete_cancel').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	//закрытие модального окна
	$('.close_popup').on('click',  function(event){
		$('.overlay').fadeOut();
	});

});