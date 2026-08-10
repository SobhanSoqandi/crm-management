import { isPastTime } from "./utils";


export default function ClockCircle({
    mode,
    date,
    time,
    onSelect
}){


    const values =
        mode==="hour"
        ?
        Array.from({length:24},(_,i)=>i+1)
        :
        [
            "00",
            "05",
            "10",
            "15",
            "20",
            "25",
            "30",
            "35",
            "40",
            "45",
            "50",
            "55"
        ];



    return (

        <div className="
        relative
        h-72
        w-72
        rounded-full
        border
        border-slate-200
        bg-slate-50
        ">


        {
            values.map((item,index)=>{


                const angle =
                (360 / values.length) * index;



                const x =
                50 + 42 * Math.sin(angle*Math.PI/180);


                const y =
                50 - 42 * Math.cos(angle*Math.PI/180);



                const disabled =
                mode==="hour"
                ?
                isPastTime(date,item,time.minute)
                :
                false;



                const selected =
                mode==="hour"
                ?
                time.hour===item
                :
                time.minute===item;



                return (

                <button

                    key={item}

                    disabled={disabled}

                    onClick={()=>onSelect(item)}

                    style={{
                        left:`${x}%`,
                        top:`${y}%`
                    }}


                    className={`
                    absolute
                    -translate-x-1/2
                    -translate-y-1/2
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    transition

                    ${
                    selected
                    ?
                    "bg-blue-500 text-white shadow-lg scale-110"
                    :
                    "bg-white hover:bg-blue-50"
                    }

                    ${
                    disabled
                    ?
                    "cursor-not-allowed opacity-30"
                    :
                    ""
                    }

                    `}

                >

                    {item}


                </button>

                )

            })
        }


        <div className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-blue-500
        text-white
        font-bold
        ">

            {time.hour || "--"}
            :
            {time.minute || "--"}

        </div>


        </div>

    )
}