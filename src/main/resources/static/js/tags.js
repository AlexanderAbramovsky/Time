$(document).ready(function(){

	// переход на вкладку теги 
	$('#tags').on('click',  function(event){
		$('#timer_content').hide();
		$('#reports_content').hide();
		$('#projects_content').hide();
		$('#tags_content').show();

		//удаляем содержимое div
		$("#database").empty()

		addTagsOfDiv();

	});

	$('#add_tag').on('click',  function(event){
		
		$.ajax({
			url: 'http://localhost:8080/save_tag',
			type: 'POST',
			data: {id: 2, tag: "Boston"} // посмотреть запрос, что да как
		});
		
		//удаляем содержимое div
		$("#database").empty()

		addTagsOfDiv();

	});


	// добавляет теги в div
	function addTagsOfDiv(){
		$.ajax({
			url: 'http://localhost:8080/all_tags',
			type: 'POST',
			dataType: 'json',
			success: function(data){

				// проходим по всему списку data
				$.each(data, function(index, element) {
            			
            		//$('#database').text(index + " " + element);
        			
            		/*$('#database').append($('<div>', {
           				 text: element.id + " " + element.tag
       				}));
					*/

					//var label = $("<label>").text(element.id + " " + element.tag).after('className': 'label');

					var span = $('<span>', {class: 'span', id: 'span'+element.id});

					var label = $('<label>', {text: element.id + " " + element.tag, class: 'label'});
					
					var buttonUpdate = $('<button>', {
						text: 'изменить', 
						class: 'label', 
						on: {
            				click: function(event){
                				alert('На меня кликнули');
            				}
            			}	
            		});

					var labelDelete = $('<button>', {
						text: 'удалить',
						class: 'label', 
						on: {
            				click: function(event){
                				deleteTag(element.id);
                				$("#" + "span"+element.id).remove();
            				}
            			}	
					});

					span.append(label);
					span.append(buttonUpdate);
					span.append(labelDelete);

					$('#database').append(span);

            		//$('#database').append('<span className="folder-name">element.id + " " + element.tag</span>');

   				 });
         		
      		},
      		error: function(error){
         		alert(error);
      		}
		});
	}

	function deleteTag(index){
		$.ajax({
			url: 'http://localhost:8080/delete_tag',
			type: 'POST',
			data: {id: index} // посмотреть запрос, что да как
		});
	}

});