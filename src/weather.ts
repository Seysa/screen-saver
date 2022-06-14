import axios from "axios";

export async function queryWeather() {
  const response = await axios.get(
    "https://openweathermap.org/data/2.5/onecall?lat=44.8404&lon=-0.5805&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02"
  );
  return response.data;
}
