import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestButton = () => {
  const handleTestClick = () => {
    toast.error("This is a test notification!");
  };

  return <button onClick={handleTestClick}>Test Toast Notification</button>;
};

export default TestButton;
