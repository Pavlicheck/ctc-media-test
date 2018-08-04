;(function() {
//Объявление функций

// Функция создает список моих хобби и добавлет их в DOM
	function createMyList(list, hobby) {
		for (let i=0; i<hobby.length; i++) {
			addNewItem(list, createMyListItem(hobby[i]));
		}
	}
// Функция создает список хобби моего друга и добавлет их в DOM
	function createFriendList(list, hobby) {
		for (let i=0; i<hobby.length; i++) {
			addNewItem(list, createFriendListItem(hobby[i]));
		}
	}
//Функция создает сообщение о скопированном хобби
	function createAlert() {
		alert = document.createElement('span');
		alert.innerHTML = 'добавленно в ваши увлечения';
		alert.classList.add('alert');
		return alert;
	}
//Функция генерирует события изменения списка хобби
	function listChange(list) {
		let event = new Event("contentchange");
		list.dispatchEvent(event);
	}
//Функция добавлят новое хобби в DOM
	function addNewItem(list, item) {
		list.appendChild(item);
		listChange(list);
	}
//Функция создает мое новое хобби
	function createMyListItem(text = '') {
		let li = document.createElement('li');
		li.innerHTML = `<button class="remove-btn"></button><span class='text'>${text}</span>`;
		return li
	}
//Функция создает новое хобби моего друга
	function createFriendListItem(text = '') {
		let li = document.createElement('li');
		li.innerHTML = `<button class="copy-btn"></button><span class="text">${text}</span><button class="complain-btn">Пожаловаться</button>`;
		return li
	}


 	window.onload = function() {
//Oбъявление перменных
 	let myHobbies = ['Хоккей', 'Высокоточная вёрстка под старые версии Microsoft Internet Explorer, начиная с версии 5.01'],
		friendsHobbies = ['Баскетбол','Нарезка Photoshop/Fireworks макетов на скорость, в экстримельных условиях, на природе'];

	const aboutMe = document.querySelector('#aboutMe'),
		  addItemInp = aboutMe.querySelector('#addHobby'),
		  myList = aboutMe.querySelector('#aboutMe .hobby-list'),
		  aboutFriend = document.querySelector('#aboutFriend'),
		  friendList = aboutFriend.querySelector('#aboutFriend .hobby-list'),
		  complainForm = document.getElementById('complain-form');
//Вставляем списки хобби в DOM
		createMyList(myList, myHobbies)
		createFriendList(friendList, friendsHobbies)
//Привязываем события

	//Привязываем собыдие к моему списку для удаления хобби
		myList.addEventListener('click', function(e) {
			if (e.target.classList.contains('remove-btn')) {
				this.removeChild(e.target.parentNode);
				listChange(this);
			}
		})
	// Привязываем событие к списоку хобби друга для копирования хобби и открытия формы жалоб
		friendList.addEventListener('click', function(e) {
			if (e.target.classList.contains('copy-btn')) {
				addNewItem(myList, createMyListItem(e.target.nextSibling.textContent));
				e.target.parentNode.appendChild(createAlert());
				e.target.parentNode.classList.add('added');
				e.target.parentNode.removeChild(e.target);
			} else if (e.target.classList.contains('complain-btn')) {
				complainForm.classList.add('show');
			}
		})
	//Привязываем событие к форме жалоб для её закрытия
		complainForm.addEventListener('click', function(e) {
			 if (e.target.classList.contains('btn')) {
			 	this.classList.remove('show')
			 }
		})
	//Привязываем событие к полю ввода нового хобби
		addItemInp.addEventListener('keyup', function(e) {
			if(e.keyCode == 13 && e.target.value != ''){
	 		   event.preventDefault();
	 		   addNewItem(myList, createMyListItem(e.target.value));
	 		   e.target.value = '';
			}	
		})


 	}
	
})()