import { useEffect } from "react";

export default function TimeDropDown({
  hours,
  setHours,
  minutes,
  setMinutes,
  period,
  setPeriod,
}: {
  hours: string;
  setHours: (value: string) => void;
  minutes: string;
  setMinutes: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
}) {
  const maxHour = 12;
  const minHour = 1;
  const maxMinute = 59;
  const minMinute = 0;
  const openHour = 8;
  const closeHour = 20;

  const isOutsideBusinessHours = (hour: number) => {
    let newHour;
    if (period === "PM") {
      newHour = hour === 12 ? 12 : hour + 12;
    } else {
      newHour = hour === 12 ? 0 : hour;
    }
    return newHour < openHour || newHour > closeHour;
  };

  const createTimeOptionArr = (
    timeElm: "hour" | "minute",
    startNum: number,
    endNum: number,
    step: number
  ) => {
    const optionArr = [];
    if (
      timeElm === "minute" &&
      period === "PM" &&
      Number(hours) === closeHour - 12
    ) {
      optionArr.push(
        <option key={0} value="00">
          00
        </option>
      );
    } else {
      for (let i = startNum; i <= endNum; i += step) {
        const value = i.toString().length === 1 ? "0" + i : i.toString();
        optionArr.push(
          <option
            style={{
              display:
                isOutsideBusinessHours(i) && timeElm === "hour" ? "none" : "",
            }}
            value={value}
            key={value}
          >
            {value}
          </option>
        );
      }
    }
    return optionArr;
  };

  useEffect(() => {
    // Verify if the current time falls within business hours upon
    // changing the period.
    if (
      isOutsideBusinessHours(Number(hours)) ||
      (Number(hours) === closeHour - 12 && Number(minutes) > 0)
    ) {
      const formattedOpenHour =
        openHour.toString().length === 1
          ? "0" + openHour.toString()
          : openHour.toString();
      const formattedCloseHour =
        (closeHour - 12).toString().length === 1
          ? "0" + (closeHour - 12).toString()
          : (closeHour - 12).toString();

      if (period === "AM") {
        setHours(formattedOpenHour);
      } else {
        setHours(formattedCloseHour);
        setMinutes("00");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div>
      <select
        name="hour"
        id="hour"
        value={hours}
        onChange={(e) => {
          setHours(e.target.value);
        }}
      >
        {createTimeOptionArr("hour", minHour, maxHour, 1).map(
          (hourOption) => hourOption
        )}
      </select>

      <select
        name="minute"
        id="minute"
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
        }}
      >
        {createTimeOptionArr("minute", minMinute, maxMinute, 10).map(
          (minuteOption) => minuteOption
        )}
      </select>

      <select
        name="period"
        id="period"
        value={period}
        onChange={(e) => {
          setPeriod(e.target.value);
        }}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
