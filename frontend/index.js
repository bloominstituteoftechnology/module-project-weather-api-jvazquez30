
async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  //Task 1)
  document.querySelector("#weatherWidget").style.display = "none"

  //Task 2)
  document.querySelector("#citySelect").addEventListener("change", async evt => {
    console.log('selection changed')
    try {
      document.querySelector("#citySelect").setAttribute('disabled', 'disabled')
      document.querySelector("#weatherWidget").style.display = "none"
      document.querySelector(".info").textContent = `Fetching weather data...`

      let city = evt.target.value
      let weatherURL = `http://localhost:3003/api/weather?city=${city}`

      const res = await axios.get(weatherURL)

      document.querySelector(`#weatherWidget`).style.display = "block"
      document.querySelector('.info').textContent = ''
      evt.target.removeAttribute("disabled")

      let { data } = res

      document.querySelector("#apparentTemp div:nth-child(2)")
      .textContent = `${data.current.apparent_temperature}°`
      document.querySelector("#todayDescription")
      .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
      document.querySelector("#todayStats div:nth-child(1)")
      .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector("#todayStats div:nth-child(2)")
      .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
      document.querySelector("#todayStats div:nth-child(3)")
      .textContent = `Humidity: ${data.current.humidity}%`
      document.querySelector("#todayStats div:nth-child(4)")
      .textContent = `Wind: ${data.current.wind_speed}m/s`

      data.forecast.daily.forEach((day, idx) => {
        let afterDays = document.querySelectorAll('.next-day')[idx]

        let weekDay = afterDays.children[0]
        let apparent = afterDays.children[1]
        let minMax = afterDays.children[2]
        let precip = afterDays.children[3]

        weekDay.textContent = getDayOfWeek(day.date)
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        precip.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })
      document.querySelector("#location").firstElementChild.textContent = data.location.city
    } catch (err) {
      console.log(`Promise rejected with an err.message -->`, err.message)
    }
  })
  function getDayOfWeek(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Array containing the names of the days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
    const dayIndex = date.getDay();

    // Return the name of the day corresponding to the dayIndex
    return daysOfWeek[dayIndex];
}

// Example usage
console.log(getDayOfWeek('2024/02/21')); // Output: 'Wednesday'

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
