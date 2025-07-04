import './App.css'
import './font.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Gantt } from './components/Gantt';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { ComboBox } from './components/ComboBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { HttpClientService } from './services/axios/HttpClientService';
import { colors } from './helpers/constats';
import { JalaliDatePicker } from './components/JalaliDatePicker';
import { According } from './components/According';

function App() {

  const [comboBoxValue, setComboBoxValue] = useState(0);
  const [ganttDatas, setGanttDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [units, setUnits] = useState(null);
  let ganttColorIndex = -1;

  useEffect(() => {

    async function fetchUnits() {

      const httpClient = new HttpClientService();

      const result = await httpClient.get('/api/v1/unit-sub-groups');

      setUnits(result.data);
    }

    fetchUnits();

  }, []);

  useEffect(() => {

    if (startDate == null) {
      const currentDate = new DateObject({ calendar: persian, locale: persian_fa });
      const clonedCurrentDate = new DateObject(currentDate);

      setStartDate(currentDate);
      setEndDate(clonedCurrentDate.add(2, 'month'));
    }

  }, [])

  useEffect(() => {

    setGanttDatas(null);

    if (comboBoxValue == 0)
      return;

    async function fetchGanttData() {

      setLoading(true);

      const httpClient = new HttpClientService();

      const result = await httpClient.get(`/api/v1/gantt-datas?unitId=${comboBoxValue}`);

      const customData = result.data.filter((data) => {


        data.program.jEstimatedStarTime = new DateObject({ date: new Date(data.program.EstimatedStarTime), calendar: persian, locale: persian_fa });
        data.program.jEstimatedEndTime = new DateObject({ date: new Date(data.program.EstimatedEndTime), calendar: persian, locale: persian_fa });
        data.program.jStartTime = new DateObject({ date: new Date(data.program.StartTime), calendar: persian, locale: persian_fa });
        data.program.jEndTime = new DateObject({ date: new Date(data.program.EndTime), calendar: persian, locale: persian_fa });

        return data.levels.map((pipeline) => {

          pipeline.jLevelEstimatedEndTime = new DateObject({ date: new Date(pipeline.LevelEstimatedEndTime), calendar: persian, locale: persian_fa });
          pipeline.jLevelEstimatedStartTime = new DateObject({ date: new Date(pipeline.LevelEstimatedStartTime), calendar: persian, locale: persian_fa });
          pipeline.jLevelStartTime = new DateObject({ date: new Date(pipeline.LevelStartTime), calendar: persian, locale: persian_fa });
        });
      });

      setGanttDatas(customData);

      setLoading(false);
    }

    fetchGanttData();

  }, [comboBoxValue])

  function onchangeFunctionFromDate(unix, formatted) {
    const dateSplited = formatted.split('/');
    const newStartDate = new DateObject({ year: dateSplited[0], month: dateSplited[1], day: dateSplited[2], calendar: persian, locale: persian_fa })
    setStartDate(newStartDate);
  }

  function onchangeFunctionToDate(unix, formatted) {
    const dateSplited = formatted.split('/');
    const newEndDate = new DateObject({ year: dateSplited[0], month: dateSplited[1], day: dateSplited[2], calendar: persian, locale: persian_fa })
    setEndDate(newEndDate);
  }

  return (
    <>
      <Container dir='rtl' fluid >

        <Row className='mb-3 mt-2 me-1'>
          <Col lg={12} sm={12} xs={12}>
            <According eventKey={0} title={'فیلتر ها'}>

              <Row className='mb-3 mt-2 me-1'>
                <Col lg={4} sm={12}>
                  <ComboBox onchangeFunction={(option) => setComboBoxValue(option.value)} data={units ? units : null} defaultSelect='واحد را انتخاب کنید ...' />
                </Col>
              </Row>

              <Row>
                <Col xl={6} lg={6} sm={12} xs={12} className='d-lg-block d-sm-flex justify-content-center'>
                  {startDate && <JalaliDatePicker date={startDate} onChangeFunction={onchangeFunctionFromDate} title={'از تاریخ : '} />}
                </Col>
                <Col xl={6} lg={6} sm={12} xs={12} className='d-lg-block d-sm-flex justify-content-center'>
                  {endDate && <JalaliDatePicker date={endDate} onChangeFunction={onchangeFunctionToDate} title={'تا تاریخ : '} />}
                </Col>
              </Row>

            </According>
          </Col>
        </Row>

        {loading &&
          <Row className='d-flex justify-content-center'>
            <Spinner animation='grow' />
          </Row>
        }

        {ganttDatas && ganttDatas.map((ganttData, index) => {

          if (ganttData.length == 0)
            return;

          ganttColorIndex++;
          if (ganttColorIndex > colors.length)
            ganttColorIndex = 0;

          return (

            <Row key={index}>
              <Col>
                < Gantt startDate={startDate} endDate={endDate} levels={ganttData.levels} program={ganttData.program} color={colors[ganttColorIndex]} />
              </Col>
            </Row>
          )
        })}

      </Container>
    </>
  )
}

export default App;
