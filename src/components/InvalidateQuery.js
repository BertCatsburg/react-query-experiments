import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Planet from './Planet';



const InvalidateQuery = () => {

    // const [page, setPage] = useState(1);
    // const {data, status} = useQuery(['planets', {page: page}], fetchPlanets);


    return (
        <div>
            <h2>Invalidate Query</h2>


        </div>
    )
}

export default InvalidateQuery;
