export default function convertSecondstoTime(milliseconds) {
    const dateObj = new Date(milliseconds);
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();
    const hours = dateObj.getHours();
    const day = dateObj.getDays();
    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }