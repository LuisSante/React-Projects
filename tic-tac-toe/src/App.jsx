import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./components/constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGameStorage } from "./logic/storage"

function App() {

  // First position is state initial
  // Second position es update state, next step
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage)
      console.log(turnFromStorage)
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  // Update in React is asynchrone
  // Asynchrone = does not block the code that comes after
  const updateBoard = (index) => {
    // No update is position, if you already have something
    if (board[index] || winner) return

    // Always create a copy, never modifier the array original
    //const newBoard = [...board] 
    const newBoard = structuredClone(board)
    newBoard[index] = turn
    setBoard(newBoard) // Update

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Review if exists a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // asynchrone
      console.log(winner) // winner no contiene el nuevo estado todavia
    }

    else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }

  }

  useEffect(() => {
    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })
  }, [turn, board])

  return (

    <main className="board">
      <h1>tic-tac-toe</h1>
      <button onClick={resetGame}>Again</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square

                // The function is passed
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        //ResetGame and Winner are arguments of function WinnerModal
      }
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
