import "./Loader.css";
import type {FC} from "react";

interface JokeListProps {
  isLoading: boolean;
}

const Loader: FC<JokeListProps> = ({isLoading}) => {
  if (!isLoading) return null;

  return (
    <div className="loaderOverlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;