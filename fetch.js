
class Fetch {
    async getCurrent(input) {
      const myKey = "cdb91b50203dabb6954097b1c812fa6d";
  

  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=it&units=metric&appid=${myKey}`
      );
  
      const data = await response.json();
  

      console.log(data);
  
      return data;
    }
  }
  
  
  class UI {
    constructor() {
      this.uiContainer = document.querySelector("#content");
      this.city;
      this.defaultCity = "London";
    }
  
    populateUI(data) {
      
  
      this.uiContainer.innerHTML = `
          
        <div class="card mx-auto response-weather" >
            <div class="row justify-content-center align-items-center px-4 py-3">
                <div class="col-6">
                  <h2 class="card-title py-2">${data.name}</h2>
                </div>
                <div class="col-6 output">
                <p class="card-text pt-2 fs-5">Le condizioni del tempo previste sono: <br> 
                <div class="text-center">
                  <strong class="text-yellow"><h4>${data.weather[0].description}</h4></strong>
                </div>
                  </p>  
                  <div class="">
                    <h4 class="card-subtitle text-light py-2">Massime <strong class="ms-4 text-main">${data.main.temp_max} °C</strong> <br>Minime <strong class="ms-4 text-main">${data.main.temp_min} °C</strong></h4>
                  </div>
                </div>  
            </div>
        </div>
          
          
          `;
    }
  
    clearUI() {
      uiContainer.innerHTML = "";
    }
  
    saveToLS(data) {
      localStorage.setItem("city", JSON.stringify(data));
    }
  
    getFromLS() {
      if (localStorage.getItem("city" == null)) {
        return this.defaultCity;
      } else {
        this.city = JSON.parse(localStorage.getItem("city"));
      }
  
      return this.city;
    }
  
    clearLS() {
      localStorage.clear();
    }
  }
  
  
 
  
  const ft = new Fetch();
  const ui = new UI();
  
 
  const search = document.querySelector("#searchUser");
  const button = document.querySelector("#submit");
  button.addEventListener("click", () => {
  const currentVal = search.value;

  
  
  
  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
  });
  
 
  
  window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
  });
  
  
  
