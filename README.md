Приложение для повышения эффективности работы, путём отслеживания и анализа затраченного времени.

___________________________________________________________________

Как работает приложение:

Вы авторизовываетесь на странице, перед началом любого дела вы запускаете секундомер, можете написать, 
чем вы занимаетесь (после это можно исправить), как только вы закончили это дело останавливаете секундомер и 
заметка попадает в базу данных MySQL, к этой заметке вы можете поставить определенные теги, если их у вас еще нет, 
переходите на вкладку меню "Теги" и добавляете их. После вы можете посмотреть статистику потраченного времени 
перейдя на вкладку меню "Отчёты", перед глазами вы увидите две таблицы, одна показывает кол-во учтенного
времени на каждый день, а вторая показывает, как это время было распределено по тегам.

___________________________________________________________________

Используемые технологии:

Gradle 5.0 - сборщик
git - система контроля версий
На сервере:
java (jdk-11.0.1)
Spring Security
Spring Boot
Spring MVC
Spring Data JPA
база данных MySQL
Frontend страницы:
Html
Сss
Backend страницы:
jQuery(Ajax)

___________________________________________________________________

Для запуска проекта выполнить его сборку

Команды:

gradle build
gradle bootRun

___________________________________________________________________

Для просмотра работы приложения перейдите по ссылки http://91.196.245.199:8092/time

Для авторизации воспользуйтесь учётной записью:
логин - root
пароль - 1234


