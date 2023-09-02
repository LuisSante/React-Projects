import { Square } from "./Square"

export function WinnerModal({winner , resetGame}) {

    const winnerText = winner === false ? 'Empate' : 'Ganaste'

    if (winner === null) return null

    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>

                <header className="win">
                    {winner &&
                        <Square>
                            {winner}
                        </Square>
                    }
                </header>

                <footer>
                    <button onClick={resetGame}>Again</button>
                </footer>
            </div>
        </section>
    )
}