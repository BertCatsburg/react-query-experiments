import React, {useEffect, useState} from 'react';
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
    const {
        data,
        status,
        refetch,
        isLoading,
        isFetching,
        isIdle,
        isStale
    } = useQuery('planetsAll', fetchPlanets, {enabled: false});

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
            <p>This component gets the data upon entering. <br/>
                Remove the QueryCache with button "Reset Query".<br/>
                "ReFetch" button gets the data again from the server. (500ms delay to show the loading)
            </p>
            <h3>What am I doing</h3>
            <p style={{marginLeft: 40}}>State from ReactQuery:&nbsp;
                <strong>
                    {isLoading ? "Loading, " : null}
                    {isIdle ? "Idle, " : null}
                    {isFetching ? "Fetching, " : null}
                    {isStale ? "Stale" : null}
                </strong>
            </p>
            <h3>getQueryState information:</h3>
            <ul>
                <li>Number of records in this Query Cache = {
                    qstate?.data?.count
                        ? qstate.data.count
                        : '0'
                }</li>
                <li>dataUpdatedAt: {
                    qstate?.dataUpdatedAt
                        ? new Date(qstate.dataUpdatedAt).toLocaleString()
                        : 'Not Updated'
                }</li>
            </ul>

            <button onClick={handleReset}>Reset Query</button>
            <button onClick={handleRefetch}>ReFetch</button>

            {status === 'loading' && (<div>Loading data....</div>)}

            {status === 'error' && (<div>Error fetching data</div>)}

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
        </div>
    )
}

export default QueryCachePlay;
