$(document).ready(function(){

	// нужны для удаления и обновления тега
	var idUpdateTeg;
	var textUpdateTeg;

	// переход на вкладку теги 
	$('#tags').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').fadeIn();

		addTagsOfDiv();
	});

	// защита на повторяющийся тег!!!!
	$('#button_add_tag').on('click',  function(event){
		
		var text = $('#text_add_tag').val();

		if(text != ""){
			$.ajax({
				url: 'http://localhost:8080/save_tag',
				type: 'POST',
				data: {tag: text} 
			});

			$('#text_add_tag').val("");
			$('#tags_content').fadeIn();
			addTagsOfDiv();

		} else {
			alert("Введите текст !!!");
		}
		
	});

	// добавляет теги в div
	function addTagsOfDiv(){

		//удаляем содержимое div
		$("#all_tags").empty()

		// делаем запрос на получение всех тегов из базы данных
		$.ajax({
			url: 'http://localhost:8080/all_tags',
			type: 'POST',
			dataType: 'json',
			success: function(data){

				// проходим по всему списку data
				$.each(data, function(index, element) {
            		
            		//создаем span в котором будет храниться один блок с тегом
					var span_tag = $('<span>', {class: 'span'});

					var span_item = $('<span>', {class: 'span_item'});

					var text_tag = element.tag;
					
					var buttonUpdate = $('<button>', {
						class: 'button_update', 
						on: {
            				click: function(event){
            					// запоминаем id и текст тега
            					idUpdateTeg = element.id;
            					$('#text_update_new_tag').val(element.tag);
                				$('#overlay_update').fadeIn(); // открываем модальное окно обновления тега
            				}
            			}	
            		});

					var buttonDelete = $('<button>', {
						class: 'button_delete',
						id: "button"+element.id, 
						href: "#delete_Form_Tag",
						on: {
            				click: function(event){
            					//запоминаем id тега
            					idUpdateTeg = element.id;
            					$('#overlay_delete').fadeIn();
            				}
            			}	
					});

					span_item.append(text_tag);
					span_item.append(buttonUpdate);
					span_item.append(buttonDelete);

					span_tag.append(span_item);

					$('#all_tags').append(span_tag);
   				 });
         		
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}


	//__________Модальные_окна___________________
	
	//обновление тега через модальное окно
	$('#button_update_save').on('click',  function(event){
		//пересылаем серверу id и text тега который нужно обновить

		textUpdateTeg = $('#text_update_new_tag').val();

		$.ajax({
			url: 'http://localhost:8080/update_tag',
			type: 'POST',
			data: {id: idUpdateTeg, tag: textUpdateTeg}
		});		

		$('.overlay').fadeOut();
		addTagsOfDiv();
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
		addTagsOfDiv();
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