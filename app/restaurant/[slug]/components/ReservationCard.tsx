"use client";

import { useState } from "react";

import { partySize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailability from "../../../../hooks/useAvailability";

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { fetchAvailabilities, data, loading, error } = useAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timeInWindow = times.filter(
      ({ time }) => time >= openTime && time <= closeTime
    );

    return timeInWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          value={partySize}
          onChange={(e) => setPartySize(parseInt(e.target.value))}
          name=""
          className="py-3 border-b font-light"
          id=""
        >
          {partySizes.map((size, index) => (
            <option key={index} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="px-1 py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            name=""
            id=""
            className="py-3 border-b font-light"
          >
            {filterTimeByRestaurantOpenWindow().map(
              ({ time, displayTime }, index) => (
                <option key={index} value={time}>
                  {displayTime}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
        >
          Find a Time
        </button>
      </div>
    </div>
  );
}
