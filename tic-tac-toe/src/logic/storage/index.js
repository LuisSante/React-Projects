export const saveGameStorage = ({board, turn}) => {
    // Save the match -> localStorage
    window.localStorage.setItem('board', JSON.stringify(board)) // save table in string but after transform to shape original
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}