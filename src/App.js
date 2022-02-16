import './App.css'
import {data} from './data'
import {useState} from "react";
import CsvDownload from 'react-json-to-csv'

const App = () => {
    const [selectedCol, setSelectedCol] = useState('')
    const [sortDirection, setSortDirection] = useState(1);
    const [playerNameInput, setPlayerNameInput] = useState('');
    const columnHeaders = Object.keys(data[0])
    const columnClicked = (col) => {
        setSelectedCol(col)
        setSortDirection(prevState => prevState * -1)
    }
    const sortByColumn = (data, col) => {
        if (col) {
            return data.sort((a, b) => {
                if (a[col] < b[col]) {
                    return -1 * sortDirection
                } else if (a[col] > b[col]) {
                    return sortDirection
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
    const filteredAndSortedData = filterPlayerName(sortByColumn(data, selectedCol), playerNameInput)
    const SORTABLE_ROWS = ['Yds', 'Lng', 'TD']
    return (
        <div className="App">
            <h1>Football Player Stats</h1>
            <div>
                <CsvDownload data={filteredAndSortedData} filename="exported-sports-data"/>
            </div>
            <input type="text" placeholder="Search player name" name="search"
                   onChange={e => setPlayerNameInput(e.target.value)}/>
            {
                playerNameInput &&
                <div>search input: {playerNameInput}</div>
            }
            <table>
                <thead>
                <tr>
                    { columnHeaders &&
                        columnHeaders.map(header => {
                            if (SORTABLE_ROWS.includes(header)) {
                                return <th key={header} onClick={() => columnClicked(header)}
                                           className='sortable-header'>{header} {selectedCol === header && (sortDirection === 1 ? '▲' : '▼')}</th>
                            } else {
                                return <th key={header}>{header}</th>
                            }
                        })
                    }
                </tr>
                </thead>
                {
                    filteredAndSortedData.length !== 0 ?
                    <tbody>
                    {
                        filteredAndSortedData.map(row => (
                            <tr key={row.Player}>
                                {Object.keys(row).map((column, i) => (<td key={`${row[column]}-${i}`}>{row[column]}</td>))}
                            </tr>
                        ))
                    }
                    </tbody>
                    : <div>No results found</div>
                }
            </table>
        </div>
    );
}

export default App;
