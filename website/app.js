/* Global Variables */
// DOM Variables
const zipInput = document.getElementById("zip");
const feelingsTextArea = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");

// Requestes Variables
const wheatherApiKey = "f9f7fc8f9amshf3a2c34dd037befp1d2a25jsnaf2cbf3b9888";
const PORT = 8080;
const server = `http://localhost:${PORT}`
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();



const getWheatherResponse = async () => {
    try {
        if (zipInput.value === "") {
            alert("No ZipCode provided");
            return
        }
        const res = await fetch
            (
                `https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&units=imperial&id=${zipInput.value}`,
                {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": wheatherApiKey,
                        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
                    }
                }
            );
        if (res.status == 200) {
            const body = await res.json();
            postWeatherRespone(server, {
                temperature: body.main.temp,
                date: newDate,
                user_response: feelingsTextArea.value
            });
        }

    }
    catch (error) {
        console.log('An Error Occure ', error);
    }
}


const postWeatherRespone = async (linkToServer, postRequestBody) => {
    try {
        const req = await fetch(linkToServer, {
            "method": "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postRequestBody)
        });

        if (req.status == 200) {
            updateUi();
        }
    }
    catch (error) {
        console.log('An Error Occure ', error);
    }

}

const updateUi = async () => {
    const res = await fetch(`${server}/getData`, {
        "method": "GET",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        }
    });


    if (res.status == 200) {
        const nodeServerData = await res.json();
        dateElement.innerHTML = `Date : ${nodeServerData.date}`;
        tempElement.innerHTML = `Temperature : ${nodeServerData.temperature}`;
        contentElement.innerHTML = `Content : ${nodeServerData.user_response}`;
    }



}


generateBtn.addEventListener("click", getWheatherResponse);