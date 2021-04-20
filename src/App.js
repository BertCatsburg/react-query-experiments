import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import InvalidateQuery from './components/InvalidateQuery';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {

    const [page, setPage] = useState('planets');
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="App">
                    <h1>Star Wars Info</h1>
                    <Navbar setPage={setPage}/>
                    <div className="content">
                       <Switch>
                           <Route path="/planets" exact><Planets /></Route>
                           <Route path="/people" exact><People /></Route>
                           <Route path="/invalidatequery" exact><InvalidateQuery /></Route>
                       </Switch>
                    </div>
                </div>
                <ReactQueryDevtools initialIsOpen={false}/>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
