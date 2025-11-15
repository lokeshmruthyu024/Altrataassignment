import { useState, useEffect } from 'react';
import { useCalendar } from './useCalendar';
import styles from './Calendar.module.css';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calender = ({
  date: initialDate,
  onDateChange,
  interactive = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());


  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setCurrentMonth(initialDate);
    }
  }, [initialDate]);

  const { year, monthName, weeks } = useCalendar(currentMonth);
  const selectedDay = selectedDate.getDate();

  const handleDateClick = (day) => {
    if (day && interactive) {
      const newDate = new Date(year, currentMonth.getMonth(), day);
      setSelectedDate(newDate);
      onDateChange?.(newDate);
    }
  };

  const goPrev = () => setCurrentMonth(new Date(year, currentMonth.getMonth() - 1, 1));
  const goNext = () => setCurrentMonth(new Date(year, currentMonth.getMonth() + 1, 1));

  const isToday = (day) => {
    const today = new Date();
    return (
      day &&
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles.calendar}>

      <div className={styles.header}>
        {interactive && (
          <button onClick={goPrev} className={styles.navButton}>
            ←
          </button>
        )}
        <span>{monthName} {year}</span>
        {interactive && (
          <button onClick={goNext} className={styles.navButton}>
            →
          </button>
        )}
      </div>

      <div className={styles.weekdays}>
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className={styles.weekday}>
            {d}
          </div>
        ))}
      </div>

      <div className={styles.weeks}>
        {weeks.map((week, i) => (
          <div key={i} className={styles.week}>
            {week.map((day, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleDateClick(day)}
                disabled={!interactive || day === null}
                className={`${styles.day} ${day === selectedDay ? styles.selected : ''
                  } ${day === null ? styles.empty : ''} ${isToday(day) ? styles.today : ''
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;