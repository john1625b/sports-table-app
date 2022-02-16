import './App.css'
import FootballTable from "./components/footballTable";
import {data} from "./data";

const App = () => {
    const SORTABLE_ROWS = ['Yds', 'Lng', 'TD']
    return (
        <FootballTable data={data} sortableRows={SORTABLE_ROWS}/>
    )
}

export default App;
