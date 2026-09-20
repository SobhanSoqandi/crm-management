import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import useMoveBack from "../../hooks/useMoveBack";

function MoveBack() {
  const moveBack = useMoveBack();

  return (
    <div>
        <FaArrowLeftLong
      onClick={moveBack}
      className="text-[#cf8d00] text-2xl cursor-pointer"
    />
    </div>
  );
}

export default MoveBack;