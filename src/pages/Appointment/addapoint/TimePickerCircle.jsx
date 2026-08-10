import { useState } from "react";
import ClockCircle from "./ClockCircle";


export default function TimePickerCircle({
    date,
    time,
    setTime
}) {

    const [mode,setMode] = useState("hour");


    const selectValue = (value)=>{

        if(mode==="hour"){

            setTime({
                ...time,
                hour:value
            });

            setMode("minute");

            return;
        }


        setTime({
            ...time,
            minute:value
        });

    };



    return (

        <div className="flex flex-col items-center gap-5">


            <div className="text-sm font-semibold text-blue-600">

                {
                    mode==="hour"
                    ? "انتخاب ساعت"
                    : "انتخاب دقیقه"
                }

            </div>



            <ClockCircle
                mode={mode}
                date={date}
                time={time}
                onSelect={selectValue}
            />



            <div className="flex flex-row-reverse gap-3">

                <button
                    onClick={()=>setMode("hour")}
                    className={`
                    rounded-xl px-4 py-2 text-sm
                    ${
                    mode==="hour"
                    ?"bg-blue-500 text-white"
                    :"bg-slate-100"
                    }
                    `}
                >
                    {time.hour || "--"}
                </button>



                <span className="text-xl">
                    :
                </span>


                <button
                    onClick={()=>setMode("minute")}
                    className={`
                    rounded-xl px-4 py-2 text-sm
                    ${
                    mode==="minute"
                    ?"bg-blue-500 text-white"
                    :"bg-slate-100"
                    }
                    `}
                >
                    {time.minute || "--"}
                </button>

            </div>


        </div>
    );
}