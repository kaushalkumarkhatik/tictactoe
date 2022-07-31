window.addEventListener('DOMContentLoaded', ()=> {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const display_player = document.querySelector('.player');
  const reset_btn = document.querySelector('#reset');
  const win_player = document.querySelector('.winner');
  const audi = new Audio("win-player.mp3");


  let board = ['',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''];
  let current_player = "X";
  let active = true;

  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';

  const win_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function result_val() {
    let round = false;
    for (let i = 0; i <= 7; i++) {
      const win = win_condition[i]
      const a = board[win[0]];
      const b = board[win[1]];
      const c = board[win[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        round = true;
        break
      }
    }
    if (round) {
      win_anouncer(current_player === 'X' ? PLAYERX_WON: PLAYERO_WON);
      active = false;
      return;
    }
    if (!board.includes(''))
      win_anouncer(TIE);
  }
  const win_anouncer = (type)=> {
    switch (type) {
      case PLAYERO_WON:
        audi.play()
        win_player.innerHTML = 'Player <span class="player">O</span> Won 🏆🏆🏆';
        break;
      case PLAYERX_WON:
        audi.play()
        win_player.innerHTML = 'Player <span class="playerX">X</span> Won 🏆🏆🏆';
        break;
      case TIE:
        audi.play()
        win_player.innerHTML = 'Match TIE';
    }
    win_player.classList.remove('hide');
  }
  const is_action = (tile)=> {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    }
    return true;
  }

  const update_board = (index)=> {
    board[index] = current_player;
  }
  const change_player = ()=> {
    display_player.classList.remove(`player${current_player}`);
    current_player = current_player === "X"?"O": "X";
    display_player.innerText = current_player;
    display_player.classList.add(`player${current_player}`);
  }

  const user_action = (tile, index)=> {
    if (is_action(tile) && active) {
      tile.innerText = current_player;
      tile.classList.add(`player${current_player}`);
      update_board(index);
      result_val();
      change_player();
    }
  }

  const reset_board = ()=> {
    board = ['',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''];
    active = true;
    win_player.classList.add('hide');
    if (current_player == "O") {
      change_player();
    }
    tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerO');
      tile.classList.remove('playerX');
  });

}
  tiles.forEach((tile, index)=> {
    tile.addEventListener('click', ()=>
      user_action(tile, index));
  });
  reset_btn.addEventListener('click', reset_board);
});