import './App.css'
import {data} from './data'
import {useState} from "react";

function App() {
    const [selectedCol, setSelectedCol] = useState('')
    const [sortDirection, setSortDirection] = useState(true);
    const [playerNameInput, setPlayerNameInput] = useState('');
    const columnHeaders = Object.keys(data[0])
    const columnClicked = (col) => {
        setSelectedCol(col)
        setSortDirection(prevState => prevState * -1)
    }
    const sortByColumn = (data, col) => {
        if (col) {
            return data.sort((a,b) => {
                if (a[col] < b[col]) {
                    return -1 * sortDirection
                } else if (a[col] > b[col]) {
                    return 1 * sortDirection
                }
                return 0
            })
        }
        return data
    }
    const filterPlayerName = (data, playerName) => {
        if (playerNameInput) {
            return data.filter(player => (player.Player).toLowerCase().includes(playerName.toLowerCase()))
        }
        return data
    }
    return (
        <div className="App">
            <input type="text" placeholder="Search player name" name="search"
                   onChange={e => setPlayerNameInput(e.target.value)}/>
            {
                playerNameInput &&
                <div>search input: {playerNameInput}</div>
            }
            <table>
                <thead>
                <tr>
                    {
                        columnHeaders.map(header => (<th key={header} onClick={() => columnClicked(header)}>{header}</th>))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    filterPlayerName(sortByColumn(data, selectedCol), playerNameInput).map(row => (
                        <tr key={row.Player}>
                            {Object.keys(row).map((column, i) => (<td key={`${row[column]}-${i}`}>{row[column]}</td>))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;
