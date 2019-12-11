class Menu {
  constructor(gameView) {
    this.gameView = gameView;
    this.selectFX = new Audio('assets/sounds/select.wav');
    this.closeFX = new Audio('assets/sounds/close.wav');

    this.menu = document.getElementById('menu');
    this.victoryMenu = document.getElementById("victory");
    this.startButton = document.getElementById('start');
    this.howToButton = document.getElementById('how-to');
    this.instructionsBg = document.getElementById('instructions-bg');
    this.instructions = document.getElementById('instructions');
    this.closeButton = document.getElementById('close-icon-container');
    this.keyBindingsButton = document.getElementById('key-bindings');
    this.restartButton = document.getElementById('restart');
    this.quitButton = document.getElementById('quit');

    this.startGame = this.startGame.bind(this);
    this.openHowTo = this.openHowTo.bind(this);
    this.closeHowTo = this.closeHowTo.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.quitGame = this.quitGame.bind(this);
  }

  bindMenuButtons() {
    this.startButton.addEventListener('click', this.startGame);
    this.howToButton.addEventListener('click', this.openHowTo);
    this.closeButton.addEventListener('click', this.closeHowTo);
    this.restartButton.addEventListener('click', this.restartGame);
    this.quitButton.addEventListener('click', this.quitGame);
  }

  openMenu() {
    this.menu.classList.remove('close');
    this.instructions.classList.add('close');
    this.instructionsBg.classList.remove('modal-background');
  }

  closeMenu() {
    this.menu.classList.add('close');
  }

  closeVictoryMenu() {
    this.victoryMenu.classList.add('close');
  }

  startGame() {
    this.selectFX.play();
    this.closeMenu();
    this.gameView.start();
  }

  openHowTo() {
    this.selectFX.play();
    this.instructionsBg.classList.add('modal-background');
    this.instructionsBg.addEventListener('click', this.closeHowTo);
    this.instructions.classList.remove('close')
  }
  
  closeHowTo() {
    this.closeFX.play();
    this.instructionsBg.classList.remove('modal-background');
    this.instructionsBg.removeEventListener('click', this.closeHowTo);
    this.instructions.classList.add('close');
  }

  restartGame() {
    this.selectFX.play();
    this.closeVictoryMenu();

    this.gameView.start();
  }

  quitGame() {
    this.selectFX.play();
    this.closeVictoryMenu();
    this.openMenu();
    this.gameView.quit();
  }
}

export default Menu;

const schmenu = {
  setMenuButtons(game) {

    const aboutButton = document.getElementById('how-to-play-button');
    const closeAboutButton = document.getElementById('close-how-to-play');
    const menuButton = document.getElementById('menu-button');
    const submitHighScoreButton = document.getElementById('submit-highscore');
    const muteButton = document.getElementById('mute-button');
    const selectSound = new Audio('./assets/sounds/select.wav');

    const openAbout = (e) => {
      const aboutScreen = document.getElementsByClassName('how-to-play-container')[0];
      if (aboutScreen.className.indexOf('how-to-play-open') !== -1) {
        aboutScreen.className = 'how-to-play-container group';
        playSelectSound();
        game.unpause();
      } else {
        aboutScreen.className += ' how-to-play-open';
        playSelectSound();
        game.pause();
      }
    };

    const playSelectSound = () => {
      selectSound.pause();
      selectSound.currentTime = 0;
      selectSound.play();
    };

    const backToMenu = () => {
      game.over = true;
      // game.gamePlaying = false;
      game.backgroundMusic.pause();
      game.backgroundMusic.currentTime = 0;
      playSelectSound();
      game.openMenu();
      document.getElementById('game-over-menu').className += ' close';
      openMainMenu();
      game.ctx.clearRect(0, 0, 800, 300);
      document.getElementById('game-canvas').focus();
    };


    const muteToggle = (e) => {
      if (game.toggleMute()) {
        muteButton.className = 'toggled';
      } else {
        muteButton.className = '';
      }
      playSelectSound();
      document.getElementById('game-canvas').focus();
    };

    game.gameCanvas.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && game.gamePlaying) {
        e.preventDefault();
        backToMenu();
      }
    });
    muteButton.addEventListener('click', muteToggle);
    menuButton.addEventListener('click', backToMenu);
    aboutButton.addEventListener('click', openAbout);
    closeAboutButton.addEventListener('click', openAbout);
    submitHighScoreButton.addEventListener('click', submitScore);
    hardButton.addEventListener('click', (e) => {
      closeMainMenu();
      playSelectSound();
      setTimeout(() => game.start('hard'), 200);
    }
    );
    mediumButton.addEventListener('click', (e) => {
      closeMainMenu();
      playSelectSound();
      setTimeout(() => game.start('medium'), 200);
    }
    );
    easyButton.addEventListener('click', (e) => {
      closeMainMenu();
      playSelectSound();
      setTimeout(() => game.start('easy'), 200);
    }
    );
  }
};
