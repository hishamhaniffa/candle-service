import React, { useState } from 'react';
import './App.css';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

function App() {
  const height = 500;
  const width = 800
  const [stock, setStock] = useState<string>("AAPL");
  const [interval, setTickerInterval] = useState<number>(1);
  const [series, setSeries] = useState<any>([]);
  const fetchData = () => {
    if (stock) {
      fetch(`http://localhost:8000/api/stocks/${stock}?interval=${interval}`)
        .then((response: any) => {
          if(response.ok) {
            return response.json();
          }
        }).then((response: any) => {
          console.log('re', response);
          const s = response.map((r: any) => {
            return {
              x: new Date(r.time),
              y: [r.open, r.high, r.low, r.close]
            }
          })
          setSeries([{name: 'candle', data: s}]);
        })
    }
  }

  const handleChange = (e: any) => {
    setStock(e.target.value);
  }

  const changeInterval = (e: any) => {
    console.log('e', e.target.value);
    setTickerInterval(e.target.value);
  }

  const data: any = {
    options: {
      chart: {
        height,
        width,
        type: 'candlestick',
      },
      title: {
        text: `CandleStick Chart ${stock}`,
        align: 'left'
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val: any) {
            return dayjs(val).format('MMM DD HH:mm')
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  }

  return (
    <div className="App">
      <div>
        <input name="stock" value={stock} onChange={handleChange} />
        <select defaultValue={interval} onChange={changeInterval}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button onClick={fetchData}>Fetch</button>
      </div>
      <ReactApexChart series={series} options={data.options} type="candlestick" height={height} width={width} />
    </div>
  );
}

export default App;
