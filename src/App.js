import React, { useEffect, useRef, useState } from 'react';
import { Line, Tooltip } from 'britecharts-react';
import dataGenerator, { updateData } from './utils/dataGenerator';
import 'britecharts/dist/css/britecharts.css';
import 'britecharts/dist/css/common/common.css';
import 'britecharts/dist/css/charts/line.css';
import './App.css';

let App = () => {
    let [data, setData] = useState(dataGenerator({ dateCount: 20 }));

    let useInterval = (callback, delay) => {
        let savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    };

    useInterval(() => {
        let updatedData = updateData(data);
        setData(updatedData);
    }, 1000);

    let margin = {
        top: 60,
        right: 30,
        bottom: 60,
        left: 70,
    };

    return (
        <div className="container">
            <div className="chart">
                <Tooltip
                    data={data}
                    render={props => (
                        <Line margin={margin} lineCurve="basis" {...props} />
                    )}
                    topicLabel="topics"
                    title="Tooltip Title"
                />
            </div>
        </div>
    );
};

export default App;
