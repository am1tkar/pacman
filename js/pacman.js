'use strict'

const PACMAN = '🥠'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
        deg: 0
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)

    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === SUPERFOOD) superPacman()

    // // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
      removeGhost(nextLocation)
        } else {
            return gameOver()
        }

      
    }


      // TODO: moving from current location:
        // TODO: update the model
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

        // TODO: update the DOM
        renderCell(gPacman.location, EMPTY)

        // TODO: Move the pacman to new location:
        // TODO: update the model
        gPacman.location = nextLocation
        gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

        // TODO: update the DOM
        renderCell(gPacman.location, PACMAN)
        checkVictory()
}

function superPacman() {
    playSound('super')
    if (!gPacman.isSuper) {
        gPacman.isSuper = true
        setTimeout(() => { gPacman.isSuper = false }, 5000);
        setTimeout(() => { resetGhosts() }, 5000);
        var superFoodInterval = setInterval(changeColorGhost, 100)
        setTimeout(() => { clearInterval(superFoodInterval) }, 5000);
    } else {
        return
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            gPacman.deg = 270
            nextLocation.i -= 1
            break;

        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i += 1
            break;

        case 'ArrowLeft':
            gPacman.deg = 0
            nextLocation.j -= 1
            break;

        case 'ArrowRight':
            gPacman.deg = 180

            nextLocation.j += 1
            break;

        default:
            return null
    }
    // TODO: figure out nextLocation
    return nextLocation
}