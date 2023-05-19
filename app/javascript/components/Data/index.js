import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import BasicTable from './table'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Select } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';

const useStyles = makeStyles({
  basicInformation: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitle: {
    color: '#1976d2',
    fontSize: '36px',
  },
  mainTitleContainer: {
    paddingBottom: '20px'
  },
  basicInformation: {
    padding: '15px'
  },
  conciliationData: {
    padding: '15px'
  },
  histogramContainer: {
    paddingTop: '30px'
  },
  histoFilters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: '15px'
  },
  sectionTitle: {
    paddingBottom: '10px',
    color: 'rgb(79, 101, 241)'
  },
  conciliaciones: {
    paddingTop: '15px',
    paddingBottom: '15px'
  },
  conciliacion: {
    padding: '5px'
  }
})

const baseUrl = 'https://pubsub.onrender.com'
// const baseUrl = 'http://localhost:3000'


const Data = () => {

  const classes = useStyles()

  const [data, setData] = useState(false)
  const [filteredData, setFilteredData] = useState([0,0,0,0,0,0,0])
  
  const [OB, setOB] = useState(false)
  const [DB, setDB] = useState(false)
  const [FT, setFT] = useState([dayjs('2023-05-01'), dayjs('2023-05-31')])

  const getData = async () => {
    axios
      .get(baseUrl + '/api/v1/stats')
      .then( resp => {
        if (resp.status === 200){
          setData(resp.data.data)
        } else {
          setData(false)
        }
       })
      .catch( resp => console.log(resp) )
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const histogramOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const globalLabels = [
    'Menor a $10.000', 
    'Entre $10.000 y $49.999', 
    'Entre $50.000 y $99.999', 
    'Entre $100.000 y $499.999', 
    'Entre $500.000 y $999.999',
    'Entre $1.000.000 y $9.999.999',
    'Más de $9.999.999'
  ]

  const histogramData = {
    labels: globalLabels,
    datasets: [
      {
        label: 'Frequency',
        data: filteredData,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const handleChangeOB = (event) => {
    setOB(event.target.value);
  }

  const handleChangeDB = (event) => {
    setDB(event.target.value);
  }

  const handleChangeFT = (ranges) => {
    setFT([ranges.selection]);
  };

  useEffect(() => {
    const histoData = globalLabels.map((label) => {
      if (data.histo?.[label]){

        const filt = data.histo[label].filter((t) => {
          if ((!DB || t.destinyBank === DB) && (!OB || t.originBank === OB)) {
            const date = dayjs(t.publishTime.split("T")[0])
            if (date.isSame(FT[0]) || date.isAfter(FT[0]) && date.isSame(FT[1]) || date.isBefore(FT[1])){
              return true
            } else {
              return false
            }
          } else {
            return false;
          }
        });
        return (filt.length)
      } else {
        return 0
      }
    })
    setFilteredData(histoData)
  }, [OB, DB, FT, data])


  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainTitleContainer}>
        <a className={classes.mainTitle}>
          Informacion
        </a>
      </div>
      {data ?
      <div>
        <div className={classes.basicContainer}>
          <div className={classes.sectionTitle}>
            Informacion Basica
          </div>
          <div className={classes.basicInformation}>
            <div className={classes.row}>
              <a className={classes.main}><strong>Numero de Operaciones:</strong></a>
              <a className={classes.value}>{(data.send_amount + data.reverse_amount).toLocaleString()}</a>
            </div>
            <div className={classes.row}>
              <a className={classes.main}><strong>Numero de envios:</strong></a>
              <a className={classes.value}>{data.send_amount.toLocaleString()}</a>
            </div>
            <div className={classes.row}>
              <a className={classes.main}><strong>Numero de reversos: </strong></a>
              <a className={classes.value}>{data.reverse_amount.toLocaleString()}</a>
            </div>
            <div className={classes.row}>
              <a className={classes.main}><strong>Monto total de envios:</strong></a>
              <a className={classes.value}>${data.send_qty.toLocaleString()}</a>
            </div>
            <div className={classes.row}>
              <a className={classes.main}><strong>Monto total de reversos:</strong></a>
              <a className={classes.value}>${data.reverse_qty.toLocaleString()}</a>
            </div>
          </div>
        </div>
        <div className={classes.conciliaciones}>
          <div className={classes.sectionTitle}>
            Conciliaciones
          </div>
          <div className={classes.conciliationData}>
            {Object.keys(data.conciliaciones).map((cons) => {
              const consList = cons.split('-')
              if (data.conciliaciones[cons] > 0){
                return (
                  <div className={classes.conciliacion}>
                    <a>Banco {consList[0]} le debe ${data.conciliaciones[cons].toLocaleString()} a {consList[1]}</a>
                  </div>
                )
              } else if (data.conciliaciones[cons] < 0){
                return (
                  <div className={classes.conciliacion}>
                    <a>Banco {consList[1]} le debe ${(-data.conciliaciones[cons]).toLocaleString()} a {consList[0]}</a>
                  </div>
                )
              } else {
                return (
                  <div className={classes.conciliacion}>
                    <a>Entre el banco {consList[0]} y {consList[1]} no hay deudas</a>
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className={classes.lastTransactions}>
          <div className={classes.sectionTitle}>
            Ultimas transacciones
          </div>
          <div className={classes.lastTransactionsData}>
            <BasicTable rows={Object.keys(data.last_transaction[0])} data={data.last_transaction}/>
          </div>
        </div>
        <div className={classes.histogramContainer}>
          <div className={classes.sectionTitle}>
            Histograma
          </div>
          <div className={classes.histoFilters}>
            <div className={classes.select}>
              <InputLabel id="1">Banco Origen</InputLabel>
              <Select
                labelId="1"
                id="1"
                value={OB}
                label="Banco Origen"
                onChange={handleChangeOB}
              >
                {[false, ...data.ob].map((obv) => {
                  return (
                    <MenuItem value={obv}>{obv ? obv : 'None'}</MenuItem>
                  )
                })}
              </Select>
            </div>
            <div className={classes.select}>
              <InputLabel id="2">Banco Destino</InputLabel>
              <Select
                labelId="2"
                id="2"
                value={DB}
                label="Banco Destino"
                onChange={handleChangeDB}
              >
                {[false , ...data.ob].map((dbv) => {
                  return (
                    <MenuItem value={dbv}>{dbv ? dbv : 'None'}</MenuItem>
                  )
                })}
              </Select>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateRangePicker', 'DateRangePicker', 'DateRangePicker']}
              >
                <DemoItem label="1 calendar" component="DateRangePicker">
                  <DateRangePicker 
                    value={FT}
                    onChange={(newValue) => setFT(newValue)} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className={classes.histogramData}>
            <Bar data={histogramData} options={histogramOptions} />
          </div>
        </div>
      </div>
      : 
      <div>
        Recargue la pagina, los datos no se cargaron correctamente o espere a la actualizacion automatica cada 10 segundos  
      </div>}
    </div>
  )
}

export default Data