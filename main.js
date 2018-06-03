var root = document.getElementById('main');
var squares = [].slice.call(main.getElementsByClassName('block'));
var blank_index = Number.parseInt(Math.random() * 10 % squares.length);
var blank_square = squares[blank_index];
var img_index = Number.parseInt(Math.random() * 10 % 3);
var moves = 0;
var ongoing = true;

var shuffle = a => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
var set_selectables = _ => {
	blank_index = Number(document.querySelector('.blank').getAttribute('position'));

	squares.forEach(item => {
		item.className = item.className.replace('selectable', '');

		if (item.getAttribute('position') == blank_index - 3 || item.getAttribute('position') == blank_index + 3 || item.getAttribute('position') == blank_index - 1 || item.getAttribute('position') == blank_index + 1)
			item.className += ' selectable';
	});
	check_puzzle();
}
var check_puzzle = _ => {
	if (! ongoing)
		return;

	var won = true;
	squares.forEach(item => {
		if (won && Number(item.getAttribute('position')) != Number(item.getAttribute('source')) + 1)
			won = false;
	});

	if (won) {
		if (moves == 0)
			location.reload();
		else {
			ongoing = false;
			alert('won in ' + moves + ' moves!');
		}
	}
}

blank_square.className += ' blank'
var img_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var img_arr_index = 0;
img_arr.splice(img_arr.indexOf(blank_index), 1);
img_arr = shuffle(img_arr);
squares.forEach((item, index) => {
	if (item.classList.contains('blank')) {	
		item.setAttribute('source', blank_index);
		return;
	}

	var img = document.createElement('img');
	img.setAttribute('src', 'img/' + img_index + '/' + img_arr[img_arr_index] + '.jpg');
	item.setAttribute('source', img_arr[img_arr_index]);
	item.appendChild(img);
	img_arr_index++;
});

set_selectables();

squares.forEach(item => {
	item.addEventListener('click', _ => {
		if (! item.className.includes('selectable'))
			return;

		console.log(item);

		var blank_target = item.getAttribute('position');
		var blank_origin = blank_square.getAttribute('position');
		
		blank_square.className = blank_square.className.replace('pos-' + blank_origin, 'pos-' + blank_target);
		blank_square.setAttribute('position', blank_target)
		item.className = item.className.replace('pos-' + blank_target, 'pos-' + blank_origin);
		item.setAttribute('position', blank_origin);
		
		moves++;
		set_selectables();
	});
});