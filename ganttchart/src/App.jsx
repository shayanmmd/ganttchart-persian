import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Gantt from './components/Gantt/Gantt';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function App() {

  const data = [
    {
      id: 1,
      label: 'تیم سازی',
      startDate: new DateObject({ year: 1404, month: 1, day: 10, calendar: persian, locale: persian_fa }),
      endDate: new DateObject({ year: 1404, month: 4, day: 13, calendar: persian, locale: persian_fa }),
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
      startDate: new DateObject({ year: 1404, month: 2, day: 5, calendar: persian, locale: persian_fa }),
      endDate: new DateObject({ year: 1404, month: 3, day: 5, calendar: persian, locale: persian_fa }),
      percentage: 43
    },
    {
      id: 4,
      label: 'مصرف دخانیات',
      startDate: new DateObject({ year: 1404, month: 2, day: 28, calendar: persian, locale: persian_fa }),
      endDate: new DateObject({ year: 1404, month: 4, day: 8, calendar: persian, locale: persian_fa }),
      percentage: 15
    },
  ]


  return (
    <Gantt data={data} />
  )
}

export default App
