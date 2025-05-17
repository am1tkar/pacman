'use strict'

const GHOST = '<i class="fas fa-ghost" ></i>'

var gGhosts = []
var gDeletedGhosts = []
var gGhostColors = []

var gGhostsInterval

function createGhosts(board) {
    // TODO: Create 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function reviveGhost() {
    for (var i = 0; i < gDeletedGhosts.length; i++) {
        gGhosts.push(gDeletedGhosts[i])
        
    }
    gDeletedGhosts = []
}


function getElGhosts() {
    return document.querySelectorAll('.fas.fa-ghost')
}

function colorGhosts() {
    var elGhosts = getElGhosts()

    for (var i = 0; i < elGhosts.length; i++) {
        gGhostColors.push(getRandomColor())
        elGhosts[i].style.color = gGhostColors[i]
    }

}

function changeColorGhost() {
    var elGhosts = getElGhosts()


    elGhosts.forEach(elGhost => {
        elGhost.style = `-webkit-text-stroke-width: 3px;
     -webkit-text-stroke-color: white;
    color: blue`

    });

}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
    }

    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost)
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
        colorGhosts()

    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper === true) {
            removeGhost()
        } else {
            return gameOver()
        }
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function removeGhost(pacmanNextLoc) {
    var ghostIdx = getGhostIdxByLoc(pacmanNextLoc)
    var deletedGhost = gGhosts.splice(ghostIdx, 1)[0]

    if (deletedGhost.currCellContent === FOOD) {
      updateScore(1)
      deletedGhost.currCellContent === EMPTY  
    }

    gDeletedGhosts.push(deletedGhost)
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}

function resetGhosts() {
  for (var i = 0; i < gDeletedGhosts.length; i++) {
    const currGhost = gDeletedGhosts[i]
    gGhosts.push(currGhost)

  }
  gDeletedGhosts = []
}

function getGhostIdxByLoc(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === location.i &&
      gGhosts[i].location.j === location.j
    ) {
      return i
    }
  }
  return -1
}