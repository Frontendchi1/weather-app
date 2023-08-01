// const KEY = '96b947a45d33d7dc1c49af3203966408'
// bu mening kalitim. Agar o'zingiz olsangiz va ishlamasa buni ishlating.
// Agar ishlamay qolsa unda 1 soatda so'rovlar soni limitdan oshib ketgan bo'ladi.
// Aloqa: Telegram => @akror_web
const KEY = '24846b9cab408cf3f134fce321d4df95'

// request get data

const getData = async (city) => {
    const base = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&units=metric&appid=${KEY}`

    loader(true)
    const req = await fetch(base + query)
    const data = await req.json()
    loader(false)
    
    return data 
}

getData('London').then((data) => console.log(data))
