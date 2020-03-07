const weatherForm = document.querySelector('form')
const userLocationSent = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

// msg1.textContent = " Testing "

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = userLocationSent.value
    fetch('/weather?address='+location).then((response)=>{
    response.text().then((data)=>{
        if(data == 'Please Enter a Valid Location'|| location ==''){
            msg1.textContent = 'Unable to find the location'
            msg2.textContent = ''
            
        }
        else{
            var data = JSON.parse(data)
            msg1.textContent = 'For the Location : ' + data.Location + '. Temp is : ' + data.temp
            msg2.textContent = 'Summary : ' + data.summary + ' And the Percipitation : ' + data.preciProbability
            console.log(data.Location)
            console.log(data.Coordinates)
            console.log(data.summary)
            console.log(data.temp)
            console.log(data.preciProbability)
        }
    })
})
})