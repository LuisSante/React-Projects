import { WINNER_COMBOS } from "../components/constants"
export const checkWinner = (boardToCheck) => {

    // I can do better
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] && // 0 -> x u o
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]) {

            return boardToCheck[a]
        }
    }
    return null
}