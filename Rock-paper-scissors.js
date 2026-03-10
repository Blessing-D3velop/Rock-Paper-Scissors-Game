      let score = JSON.parse(localStorage.getItem('score')) ||  {
        wins:0,
        losses:0,
        ties:0,
      };
        displayScore()
      
      function pickMoveFuntion(){
        randomNumber = Math.random();
        

        if (randomNumber >= 0 && randomNumber <  1/3){
          choice = 'Rock';
        }else if(randomNumber >= 1/3  && randomNumber <= 2/3){
          choice = 'Paper';
        }else if (randomNumber < 1){
          choice = 'Scissors';
        }
        return choice;
      }
      let isAutoPlay = false;
      let  intervalId;
      function autoPlay(){

        if(!isAutoPlay){
          intervalId = setInterval( function(){
            const playerMove = pickMoveFuntion();
            returnResult(playerMove);
          }, 1000);
          isAutoPlay = true;
        }
        else{
          clearInterval(intervalId);
          isAutoPlay = false;
        }

        if(isAutoPlay === true){
          document.querySelector('.auto-play').innerHTML = 'Stop';
        }else if(isAutoPlay === false){
          document.querySelector('.auto-play').innerHTML = 'Auto-play';
        }
      }

      function returnResult(chosenChoice){
        
        let computerMove = pickMoveFuntion();
        result = '';

        if(chosenChoice === 'Scissors'){
          if(choice === chosenChoice){
            result = 'Tie';
          }else if (choice === 'Paper'){
            result = 'You win'
          }else if(choice === 'Rock'){
            result = 'You lose'
          }
        }
        
        else if (chosenChoice === 'Paper'){
          if(computerMove === chosenChoice){
            result = 'Tie';
          }else if (computerMove === 'Rock'){
            result = 'You win'
          }else if(computerMove === 'Scissors'){
            result = 'You lose'
          }
        }
        
        else if(chosenChoice === 'Rock'){
          if(computerMove === chosenChoice){
            result = 'Tie';
          }else if (computerMove === 'Paper'){
            result = 'You lose'
          }else if(computerMove === 'Scissors'){
            result = 'You win'
          }

        }if(result === 'You win'){
          score.wins++;
        }else if(result === 'You lose'){
          score.losses++;
        }else if( result === "Tie"){
          score.ties++
        }

        localStorage.setItem('score', JSON.stringify(score))

        displayScore();

        document.querySelector('.js-result')
          .innerHTML =`${result}`;

        document.querySelector('.js-moves')
          .innerHTML =`You chose ${chosenChoice} - Computer chose ${computerMove} `;

        displayScore();
      }

      function resetScore(score){
        score.losses = 0;
        score.wins = 0;
        score.ties=0;
        localStorage.removeItem('score')
        displayScore();

      }function displayScore(){
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }