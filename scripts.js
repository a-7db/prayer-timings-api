let url = `http://api.aladhan.com/v1/timingsByCity`


function main() {
    document.getElementById('city_name').innerHTML = 'الرياض'
    get_timing('Ar Riyāḑ')
}
main()


let cities = [
    {
        arabic_name: 'الرياض',
        value: 'Ar Riyāḑ'
    },
    {
        arabic_name: 'مكة المكرمة',
        value: 'Makkah al Mukarramah'
    },
    {
        arabic_name: 'المدينة المنورة',
        value: 'Al Madīnah al Munawwarah'
    },
    {
        arabic_name: 'الشرقية',
        value: 'Ash Sharqīyah'
    },
    {
        arabic_name: 'الحدود الشمالية',
        value: 'Al Ḩudūd ash Shamālīyah'
    },
    {
        arabic_name: 'الباحة',
        value: 'Al Bāḩah'
    },
    {
        arabic_name: 'عسير',
        value: '\'Asīr'
    },
]

for(let city of cities){
    let option = `<option class="cities">${city.arabic_name}</option>`
    document.getElementById('cities').innerHTML += option
}


document.getElementById('cities').addEventListener('change', () => {
    const selected = document.getElementById('cities').value
    document.getElementById('city_name').innerHTML = selected

    let city_name = ''

    for(let city of cities){
        if (city.arabic_name == selected) {
            city_name = city.value
        }
    }
    get_timing(city_name)
})



function get_timing(city){
    const params = {
        country: 'Saudi Arabia',
        city: city
    }
    axios.get(url, {params: params})
    .then((response) => {
        show_timing(response.data.data)
    })
}


function show_timing(data){
    let city = document.getElementById('city_name')
    let date = document.getElementById('day_date')
    let cards = document.querySelector('.cards')

    // SHOW HIJRI DATE
    date.innerHTML = `${data.date.hijri.weekday.ar} ${data.date.hijri.day} ${data.date.hijri.month.ar}  |  
    ${data.date.gregorian.weekday.en} ${data.date.gregorian.month.en} ${data.date.gregorian.day}`

    // SHOW PRAYER TIMIMNGS
    cards.innerHTML =
    `
    <!-- CARD -->
            <div class="item">
                <div class="card_header">
                    <h2>الفجر</h2>
                </div>
                <div class="card_body center">
                    <h1 class="time">${data.timings.Fajr}</h1>
                </div>
            </div>
            <!--*/* CARD */*-->

            <!-- CARD -->
            <div class="item">
                <div class="card_header">
                    <h2>الظهر</h2>
                </div>
                <div class="card_body center">
                    <h1 class="time">${data.timings.Dhuhr}</h1>
                </div>
            </div>
            <!--*/* CARD */*-->
            <!-- CARD -->
            <div class="item">
                <div class="card_header">
                    <h2>العصر</h2>
                </div>
                <div class="card_body center">
                    <h1 class="time">${data.timings.Asr}</h1>
                </div>
            </div>
            <!--*/* CARD */*-->
            <!-- CARD -->
            <div class="item">
                <div class="card_header">
                    <h2>المغرب</h2>
                </div>
                <div class="card_body center">
                    <h1 class="time">${data.timings.Maghrib}</h1>
                </div>
            </div>
            <!--*/* CARD */*-->
            <!-- CARD -->
            <div class="item">
                <div class="card_header">
                    <h2>العشاء</h2>
                </div>
                <div class="card_body center">
                    <h1 class="time">${data.timings.Isha}</h1>
                </div>
            </div>
            <!--*/* CARD */*-->
    `
}