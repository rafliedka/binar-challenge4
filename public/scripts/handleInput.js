const textinput = document.getElementById('textinput')
const hasil_ti = document.getElementById('hasil_ti')
textinput.addEventListener('change', (e) => {
    e.preventDefault()
    hasil_ti.innerHTML = e.target.value
    filterCar(e.target.value)
}
)
