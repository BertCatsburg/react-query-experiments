import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import QueryCachePlay from './components/QueryCachePlay';
import Home from './components/Home';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {

    const [_page, setPage] = useState('planets');
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="App">
                    <h1>Star Wars Info</h1>
                    <Navbar setPage={setPage}/>
                    <div className="content">
                       <Switch>
                           <Route path="/" exact><Home /></Route>
                           <Route path="/planets" exact><Planets /></Route>
                           <Route path="/people" exact><People /></Route>
                           <Route path="/querycacheplay" exact><QueryCachePlay /></Route>
                       </Switch>
                    </div>
                </div>
                <ReactQueryDevtools initialIsOpen={false}/>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
