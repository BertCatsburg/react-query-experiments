import React, {useState, useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchPlanets = async ({queryKey}) => {
    console.log('Invalidate:fetchPlanets:queryKey:', queryKey);
    const res = await fetch(`http://swapi.dev/api/planets/`);
    await delay(500);
    return res.json();
}


const QueryCachePlay = () => {

    const [qstate, setQstate] = useState();
    const {data, status, refetch} = useQuery('planetsAll', fetchPlanets, {enabled: false});

    const queryClient = useQueryClient();

    const handleReset = () => {
        console.log('About to Invalidate Planets');
        queryClient.resetQueries(['planetsAll']);
    }

    const handleRefetch = () => {
        refetch();
    }

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        setQstate(queryClient.getQueryState());
    }, [data, queryClient])

    console.log(qstate);
    return (
        <div>
            <h2>Invalidate Query</h2>
            <p>This component gets the data upon entering. <br />
                Remove the QueryCache with button "Reset Query".<br />
                "ReFetch" button gets the data again from the server. (500ms delay to show the loading)
            </p>
            <h3>Number of records in this Query Cache = {
                qstate?.data?.count
                ? qstate.data.count
                    : '0'
            }</h3>
            <button onClick={handleReset}>Reset Query</button>
            <button onClick={handleRefetch}>ReFetch</button>

            {status === 'loading' && (<div>Loading data....</div>)}

            {status === 'error' && (<div>Error fetching data</div>)}

            <React.Fragment>
                {
                    data
                        ? (
                            <ul>
                                {
                                    data?.results?.map((planet) => {
                                        return (<li key={planet.name}>{planet.name}</li>)
                                    })
                                }
                            </ul>
                        )
                        : null
                }
            </React.Fragment>
        </div>
    )
}

export default QueryCachePlay;
