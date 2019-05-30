$(document).ready(function(){

	// Переменная для обновления тега по его id
	var idUpdateTeg;

	// Переменная для удаление тега по его тексту 
	var textDeleteTeg;

	/*
		При переходе на вкладку "Теги" 
		загружает все теги из базы данных mysql 
		таблицы tags в блок(div) <all_tags> 
	*/
	$('#tags_menu').on('click',  function(event){
		addTagsOfDiv();
	});


	/*
		При нажатии на кнопку добавляем тег в базу данных 
		и выводим его в блоке(div)
	*/
	$('#button_add_tag').on('click',  function(event){
		
		// Получаем текст тега
		var text = $('#text_add_tag').val();

		// Проверка если на ввели текст тега, будет 
		// выводиться предупреждение с ошибкой 
		if(text != ""){
			
			// Проверяем есть ли такой тег, если нет то сохраняем его
			$.ajax({
				url: 'http://91.196.245.199:8092/get_tag_findTextTag',
				type: 'POST',
				
				dataType: 'json',
				data: {tag: text},
				success: function(data){
					if(data != null){
						alert("Такой тег уже существует !");
					} else {
						$.ajax({
							url: 'http://91.196.245.199:8092/save_tag',
							type: 'POST',
							dataType: 'json',
							data: {tag: text},
							success: function(data){
								$('#text_add_tag').val("");
								// Графическая обертка для тега
								var span_tag = getSpanTag(data.id, data.tag);

								// Добавление тега в блок
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


	/* 
		Загружает все теги из базы данных mysql 
		таблицы tags в блок <all_tags> 
	*/
	function addTagsOfDiv(){

		// Удаляем все содержимое div
		$("#all_tags").empty();

		// Делаем ajax запрос на получение всех тегов из базы данных 
		$.ajax({
			url: 'http://91.196.245.199:8092/all_tags',
			type: 'POST',
			dataType: 'json',
			success: function(data){

				// Проходим по всему списку data и вставляем теги в блок div
				$.each(data, function(index, element) {
					// Графическая обертка для тега
            		var span_tag = getSpanTag(element.id, element.tag);

            		// Добавление тега в блок
					$('#all_tags').append(span_tag);
   				 });
         		
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}


	/*
		Графическая обертка для тега
		возвращает блок <span> в котором находится
		функционал тега(текст тега, удаление тега, обновление тега) 
	*/
	function getSpanTag(id, text){

		// Создаем основной блок <span>
		var span_tag = $('<span>', {
							class: 'span',
							id: "span_tag" + id
		});

		// Создаём блок <span> для выравнивания объектов
		var span_item = $('<span>', {
							class: 'span_item',
							id: "span_item" + id
		});

		// Создаём Label с текстом тега
		var label_text = $('<label>', {
							id: "label_text" + id,
							text: text
		});

		// Создаём кнопку обновления тега
		var buttonUpdate = $('<button>', {
			class: 'button_update', 
			on: {
           		click: function(event){
            		// Запоминаем id тега и вызываем
            		// модальное окно обновления тега
            		idUpdateTeg = id;
                	$('#overlay_update').fadeIn();
            	}
            }	
		});

		// Создаём кнопку удаления тега
		var buttonDelete = $('<button>', {
			class: 'button_delete',
			id: "button"+id, 
			href: "#delete_Form_Tag",
			on: {
           		click: function(event){
           			// Запоминаем текст и id тега и вызываем
            		// модальное окно удаления тега
           			textDeleteTeg = text;
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

	
	/*
		При нажатии вызывается модальное окно 
		обновления тега
	*/
	$('#button_update_save').on('click',  function(event){

		// Получаем новый текст тега
		var textUpdateTeg = $('#text_update_new_tag').val();

		// Делаем проверку на введенный текст тега не является ли он пустым
		if(textUpdateTeg == ""){
			alert("Введите текст !");
		} else {
			// Проверяем есть ли в базе такой же тег, если нет то обновляем тег
			$.ajax({
				url: 'http://91.196.245.199:8092/get_tag_findTextTag',
				type: 'POST',
				dataType: 'json',
				data: {tag: textUpdateTeg},
				success: function(data){
					if(data != null){
						alert("Такой тег уже существует !");
					} else {
						// Обновляем текст тега
						$.ajax({
							url: 'http://91.196.245.199:8092/update_tag',
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
		}
	});


	// Закрытие модального окна обновления тега
	$('#button_update_cancel').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	/*
		При нажатии вызывается модальное окно 
		удаления тега
	*/
	$('#button_delete_delete').on('click',  function(event){

		// Удалят тег из базы данных 
		$.ajax({
			url: 'http://91.196.245.199:8092/delete_tag',
			type: 'POST',
			data: {id: idUpdateTeg} // 
		});

		// Удаляет тег из всех записей актов
		$.ajax({
			url: 'http://91.196.245.199:8092/delete_tag_all_act',
			type: 'POST',
			data: {tag: textDeleteTeg}  
		});

		// Закрываем окно и обновляем блок тегов
		$('.overlay').fadeOut();
		$('#span_tag' + idUpdateTeg).remove();	
	});

	// Закрытие модального окна удаления тега
	$('#button_delete_cancel').on('click',  function(event){
		$('.overlay').fadeOut();
	});

	// Закрытие модального окна через крестик 
	$('.close_popup').on('click',  function(event){
		$('.overlay').fadeOut();
	});

});