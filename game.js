// ODIN Project
// Game of Rock, Paper or Scissors (webpage)

const shoots = ['rock', 'paper', 'scissors']
let winners = []

// Select img from HTML and addEventListener for click.
// Only img.id can be clicked in HTML.
const game = () => {
    let imgs = document.querySelectorAll ('img')
    imgs.forEach ((img) => 
    img.addEventListener ('click', () => {
        if (img.id) {
            playRound (img.id)
        }
    })
    )
}

// Heart of the Code
const playRound = (playerChoice) => {
    let wins = checkWins ()
    if (wins >= 5) {
        return
    }
    const computerChoice = computerSelect ()
    const winner = gamePlay (playerChoice, computerChoice)
    winners.push (winner)
    winsTally ()
    showRound (playerChoice, computerChoice, winner)
    wins = checkWins ()
    if (wins == 5) {
        endResults ()
    }
}

// Computer randomly Select either rock, paper or scissors from array
// Make image bigger at what computer chose for 700ms
const computerSelect = () => {
    const choice = shoots [Math.floor(Math.random () * shoots.length)]
    document.querySelector (`.${choice}`).classList.add ('active')
    setTimeout (() => {
    document.querySelector (`.${choice}`).classList.remove ('active')
    }, 700)
    return choice
}

// Game Mechanics
const gamePlay = (pChoice, cChoice) => {
    if (pChoice === cChoice) {
        return 'Tie'
    }   else if ((pChoice === 'rock' && cChoice === 'scissors')||
                 (pChoice === 'paper' && cChoice === 'rock')||
                 (pChoice === 'scissors' && cChoice === 'paper')
            )   {
                return 'Player'
            }   {
                return 'Computer'
            }
}

// Check winners of each round and return either player or computer wins the most
const checkWins = () => {
    let playerWins = winners.filter ((item) => item == 'Player').length
    let computerWins = winners.filter ((item) => item == 'Computer').length
    return Math.max (playerWins, computerWins)
}

// Update the Score of both Player and Computer
const winsTally = () => {
    let playerWins = winners.filter ((item) => item == 'Player').length
    let computerWins = winners.filter ((item) => item == 'Computer').length
    let ties = winners.filter ((item) => item == 'Tie').length
    document.querySelector ('.playerScore').textContent = `Score: ${playerWins}`
    document.querySelector ('.computerScore').textContent = `Score: ${computerWins}`
    document.querySelector ('.ties').textContent = `Ties: ${ties}`
}

// Show what Player and Computer chose each round and winner in HTML 
const showRound = (playerChoice, computerChoice, winner) => {
    document.querySelector ('.playerChoice').textContent = `Player Chose: ${playerChoice.charAt (0).toUpperCase () + playerChoice.slice (1)}`
    document.querySelector ('.computerChoice').textContent = `Computer Chose: ${computerChoice.charAt (0).toUpperCase () + computerChoice.slice (1)}`
    document.querySelector ('.winner').textContent = `Round Winner: ${winner}`
    showRoundWinner (winner)
}

// Show winner of each round
const showRoundWinner = (winner) => {
    if (winner == 'Player') {
        document.querySelector ('.winner').textContent = 'Player won the Round!'
    } else if (winner == 'Computer') {
        document.querySelector ('.winner').textContent = 'Computer won the Round!'
    } else {
        document.querySelector ('.winner').textContent = 'Round was a Tie!'
    }
}

// Show the End results and show reset button
const endResults = () => {
    let playerwin = winners.filter ((item) => item == 'Player').length
    if (playerwin == 5) {
        document.querySelector ('.winner').textContent = 'CONGRATS, Player won the Game!'
        playCheerSound ()
    } else {
        document.querySelector ('.winner').textContent = 'SORRY, Computer won the Game!'
        playSadSound ()
    }
        document.querySelector ('.reset').style.display = 'flex'
}

// Resets the game
const gameReset = () => {
    winners = []
    document.querySelector ('.playerScore').textContent = 'Score: 0'
    document.querySelector ('.computerScore').textContent = 'Score: 0'
    document.querySelector ('.ties').textContent = 'Ties: 0'
    document.querySelector ('.winner').textContent = ''
    document.querySelector ('.playerChoice').textContent = ''
    document.querySelector ('.computerChoice').textContent = ''
    document.querySelector ('.reset').style.display = 'none'
}

// Win Sound
const playCheerSound = () => {
    const cheers = document.getElementById ('cheersound')
    cheers.play ()
}

// Lose Sound
const playSadSound = () => {
    const sad = document.getElementById ('sadsound')
    sad.play ()
}

game ()