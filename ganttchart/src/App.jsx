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


  const onChangeComboBox = (event) => {
    setComboBoxValue(Number(event.target.value));
  }

  useEffect(() => {

    async function fetchUnits() {

      const httpClient = new HttpClientService();

      const result = await httpClient.get('/units');
      // const result = [
      //   {
      //     "id": 1,
      //     "title": "معاونت آموزشی"
      //   }
      // ];

      setUnits(result.data);
      // setUnits(result);

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

      const result = await httpClient.get(`/ganttData?unitId=${comboBoxValue}`);

      // const result = [
      //   {
      //     "unitId": 1,
      //     "levels": [
      //       {
      //         "LevelNo": "1",
      //         "title": "تحلیل و پیاده سازی",
      //         "description": "تحلیل سیستمی و پیاده سازی سامانه ترفیع تشویقی",
      //         "LevelEstimatedStartTime": "2025-01-20",
      //         "LevelEstimatedEndTime": "2025-05-05",
      //         "LevelStartTime": "2025-01-20",
      //         "LevelEndTime": "0000-00-00",
      //         "ProjectLevelStatus": "PROGRESSING",
      //         "EstimatedWorkHours": "600",
      //         "duration": "33",
      //         "Deadline": "2025-05-20"
      //       },
      //       {
      //         "LevelNo": "2",

      //         "title": "تست و استقرار",

      //         "description": "تست سامانه و استقرار",

      //         "LevelEstimatedStartTime": "2025-05-05",

      //         "LevelEstimatedEndTime": "2025-05-20",

      //         "LevelStartTime": "0000-00-00",

      //         "LevelEndTime": "0000-00-00",

      //         "ProjectLevelStatus": "NOT_START",

      //         "EstimatedWorkHours": "40",

      //         "duration": "33",

      //         "Deadline": "2025-05-20"

      //       }
      //     ]
      //   },
      // ];




      const customData = result.data.filter((data) => {
        return data.levels.map((pipeline) => {

          pipeline.jLevelEstimatedEndTime = new DateObject({ date: new Date(pipeline.LevelEstimatedEndTime), calendar: persian, locale: persian_fa });
          pipeline.jLevelEstimatedStartTime = new DateObject({ date: new Date(pipeline.LevelEstimatedStartTime), calendar: persian, locale: persian_fa });
          pipeline.jLevelStartTime = new DateObject({ date: new Date(pipeline.LevelStartTime), calendar: persian, locale: persian_fa });
        });
      });


      // const customData = result.filter((data) => {
      //   return data.levels.map((pipeline) => {

      //     pipeline.jLevelEstimatedEndTime = new DateObject({ date: new Date(pipeline.LevelEstimatedEndTime), calendar: persian, locale: persian_fa });
      //     pipeline.jLevelEstimatedStartTime = new DateObject({ date: new Date(pipeline.LevelEstimatedStartTime), calendar: persian, locale: persian_fa });
      //     pipeline.jLevelStartTime = new DateObject({ date: new Date(pipeline.LevelStartTime), calendar: persian, locale: persian_fa });
      //   });
      // });

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
                  <ComboBox onchangeFunction={onChangeComboBox} data={units ? units : null} defaultSelect='واحد را انتخاب کنید ...' />
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
                < Gantt startDate={startDate} endDate={endDate} data={ganttData.levels} color={colors[ganttColorIndex]} />
              </Col>
            </Row>
          )
        })}

      </Container>
    </>
  )
}

export default App;
