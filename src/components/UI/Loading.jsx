import { ThreeDot } from "react-loading-indicators";

function Loading({ color = "#0a6847", size = "medium", className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ThreeDot color={color} size={size} />
    </div>
  );
}

export default Loading;