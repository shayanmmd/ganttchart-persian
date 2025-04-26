import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Gantt from './components/Gantt/Gantt';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ComboBox from './components/ComboBox/ComboBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { HttpClient } from './services/axios/httpClient';
import { colors } from './helpers/constats';
import JalaliDatePicker from './components/DatePicker/JalaliDatePicker';
import According from './components/According/According';

function App() {

  const [comboBoxValue, setComboBoxValue] = useState(0);
  const [ganttDatas, setGanttDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  let ganttColorIndex = -1;


  //TODO:request server to get new options

  const options = [
    {
      key: 'واحد سازمانی', value: '1'
    },
    {
      key: 'واحد توسعه', value: '2'
    },
    {
      key: 'تیم فروش', value: '3'
    },
    {
      key: 'شبکه و زیر ساخت', value: '4'
    },
  ];

  const onChangeComboBox = (event) => {
    setComboBoxValue(Number(event.target.value));
  }

  useEffect(() => {


    if (startDate == null) {
      const currentDate = new DateObject({ calendar: persian, locale: persian_fa });
      const clonedCurrentDate = new DateObject(currentDate);

      setStartDate(currentDate);
      setEndDate(clonedCurrentDate.add(2, 'month'));
    }

  }, [])

  useEffect(() => {

    if (comboBoxValue == 0) {
      setGanttDatas(null)
      return;
    }

    setLoading(true);

    //TODO:request server to get new gantt-data

    const ganttDataas = [
      [
        {
          id: 1,
          label: 'دولوپ کردن',
          startDate: new DateObject({ year: 1404, month: 1, day: 10, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1406, month: 4, day: 13, calendar: persian, locale: persian_fa }),
          percentage: 25
        },
        {
          id: 2,
          label: 'طراحی دیتابیس',
          startDate: new DateObject({ year: 1404, month: 2, day: 1, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 3, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 90
        },
        {
          id: 3,
          label: 'طراحی فیگما',
          startDate: new DateObject({ year: 1404, month: 4, day: 5, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 7, day: 5, calendar: persian, locale: persian_fa }),
          percentage: 43
        },
      ],
      [
        {
          id: 1,
          label: 'تیم سازی',
          startDate: new DateObject({ year: 1404, month: 1, day: 10, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 8, day: 13, calendar: persian, locale: persian_fa }),
          percentage: 25
        },
        {
          id: 2,
          label: 'اموزش بچه ها',
          startDate: new DateObject({ year: 1404, month: 2, day: 1, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 3, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 71
        },
        {
          id: 3,
          label: 'تعمیرات سرور',
          startDate: new DateObject({ year: 1404, month: 6, day: 5, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 7, day: 5, calendar: persian, locale: persian_fa }),
          percentage: 43
        },
        {
          id: 4,
          label: 'مصرف دخانیات',
          startDate: new DateObject({ year: 1404, month: 2, day: 28, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 4, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 15
        },
      ],
      [
        {
          id: 1,
          label: 'نصب بازی',
          startDate: new DateObject({ year: 1404, month: 5, day: 10, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 6, day: 13, calendar: persian, locale: persian_fa }),
          percentage: 25
        },
        {
          id: 2,
          label: 'باگ گیری',
          startDate: new DateObject({ year: 1404, month: 4, day: 1, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 9, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 71
        },
        {
          id: 3,
          label: 'سوپاپ اطمینان',
          startDate: new DateObject({ year: 1404, month: 6, day: 5, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 7, day: 5, calendar: persian, locale: persian_fa }),
          percentage: 100
        },
        {
          id: 4,
          label: 'راندمان گیری',
          startDate: new DateObject({ year: 1404, month: 2, day: 28, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 4, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 15
        },
      ]
      ,
      [
        {
          id: 1,
          label: 'نصب بازی',
          startDate: new DateObject({ year: 1404, month: 5, day: 10, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 6, day: 13, calendar: persian, locale: persian_fa }),
          percentage: 25
        },
        {
          id: 2,
          label: 'باگ گیری',
          startDate: new DateObject({ year: 1404, month: 4, day: 1, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 9, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 71
        },
        {
          id: 3,
          label: 'سوپاپ اطمینان',
          startDate: new DateObject({ year: 1404, month: 6, day: 5, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1404, month: 7, day: 5, calendar: persian, locale: persian_fa }),
          percentage: 100
        },
        {
          id: 4,
          label: 'راندمان گیری',
          startDate: new DateObject({ year: 1404, month: 2, day: 28, calendar: persian, locale: persian_fa }),
          endDate: new DateObject({ year: 1405, month: 4, day: 8, calendar: persian, locale: persian_fa }),
          percentage: 15
        },
      ]
    ];

    setGanttDatas(ganttDataas);

    setLoading(false);

  }, [comboBoxValue])

  function onchangeFunctionFromDate(e) {
    const newStartDate = new DateObject({ date: e.value, calendar: persian, locale: persian_fa })
    setStartDate(newStartDate);
  }

  function onchangeFunctionToDate(e) {
    const newEndDate = new DateObject({ date: e.value, calendar: persian, locale: persian_fa })
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
                  <ComboBox onchangeFunction={onChangeComboBox} options={options} defaultSelect='واحد را انتخاب کنید ...' />
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
                < Gantt startDate={startDate} endDate={endDate} data={ganttData} color={colors[ganttColorIndex]} />
              </Col>
            </Row>
          )
        })}

      </Container>
    </>
  )
}

export default App;
