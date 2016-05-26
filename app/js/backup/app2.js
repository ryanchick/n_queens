$(document).ready(function() {
	var block_size = 50;

	$('.options').submit(function(event){
		event.preventDefault();
		var n = $('input[name="numQueens"]').val();
		if(n > 14)
		{
			block_size = Math.floor(Math.min(($('body').width()-50)/n,(window.innerHeight-50)/n));
			console.log(block_size);
		}	
		console.log(n)
		var solve = nQueens(n)
		console.log(solve)
		display(solve,n);


	})

	function display(queens,size){
		//clear board
		console.log(queens)
		var board = newBoard(size);
		if(queens == false){
			if (html === 1){
				$('body').append('<h3>Solution not found in time</h3>');
			}
			console.log('not found')
		}
		else{
			//add queens
			for(var i = 0; i < queens.length;i++){
				board[queens[i]][i] = 1;
			}
				htmlDisplay(board,size);
				console.log("Board:");
				console.log(board);
		}
	}

	function htmlDisplay(board,size){
		$('display').append('<div class="board"></div>');
		$('.title').append('<span>,   # of Queens: ' + size + '</span>');
		$('body').append('<h4>Solved in ' + time + 'ms</h4>');
		$('.board').css({'width': (size * block_size),'height': (size * block_size)});
		$('.board').children('div').css({'width': block_size,'height': block_size})
		$("ul").empty();
		for(var i = 0; i < size;i++){
			for(var j=0; j< size;j++){
				if(board[i][j] == 0){
					if((i+j)%2 == 0){
						$('.board').append('<div class = "white"><div>');
					}
					else if((i+j)%2 == 1){
						$('.board').append('<div class = "black"><div>');
					}
				}
				if(board[i][j] == 1){
					$('.board').append('<div class = "queen"><div>');
				}
			}
		}
		$('.board').children('div').css({'width': block_size,'height': block_size})
	}

});