import React, { useState } from "react";
import "./weather.css"
const Weather = () => {
    const [search, setsearch] = useState("")
    const [data, setdata] = useState({});
    const [displays, setdisplays] = useState(false);
    const [warning, setwarning] = useState(false);
    const [history, sethistory] = useState([]);
    const [olddata, setolddata] = useState(false);
    const [showhistory, setshowhistory] = useState(false);

    const confirm = async () => {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f8debdc59254bffd5ca73d24ccdf578d`);
        const res = await resp.json();
        if (res.cod == 404) {
            setwarning(true);
            setdisplays(false)
        }
        else {
            setwarning(false)
            setdata(res);
            setdisplays(true);
            sethistory([...history, { name: search }]);
        }
    }

    const historychecker = async () => {
        if (history.length > 2) {
            setshowhistory(true);
        }
    }

    // console.log(history);
    const searchbar = (e) => {

        if (e.target.value == "") {
        }
        setsearch(e.target.value)
    }

    const emptybar = (e) => {
        if (e.target.value == "") {
            setwarning(false);
            setdisplays(false);
            historychecker();
        }
        else {
            setshowhistory(false);
        }
    }

    return (
        <>
            <h1 style={{ color: "blue" }}>Weather App</h1>
            <input type="text" onBlur={(e) => { searchbar(e) }} onChange={(e) => { emptybar(e) }} placeholder="Enter City Name"></input>
            <button onClick={confirm}>Search</button>
            {warning ? (<div id="danger">Enter a Valid City Name</div>) : null}
            {
                displays ? (<div id="display">
                    <div className="details">Weather details of city :{search}</div>
                    <div className="details"> Current Temperature : {data.main.temp} F</div>
                    <div className="details">Temperature Range: {data.main.temp_max} F to {data.main.temp_min} F </div>
                    <div className="details">Humidity : {data.main.humidity} </div>
                    <div className="details">Pressure : {data.main.pressure}</div>
                </div>) : null
            }

            {showhistory ?
                <>
                    <div id="hist">

                        < div >Last 3 City Entries :</div>
                        {
                            history.reverse().slice(0, 3).map((value) => {
                                return (
                                    <p id="old-search">{value.name}</p>
                                )
                            })
                        }
                    </div>

                </> : null}




        </>
    )
}

export default Weather
