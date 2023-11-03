import React from "react";
import "./slajder.css";

export default function Glavno() {
  var counter = 1;
  setInterval(function () {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    if (counter > 2) {
      counter = 1;
    }
  }, 5000);

  return (
    <div>
      <div class="slides">
        <input type="radio" name="radio-btn" id="radio1"></input>
        <input type="radio" name="radio-btn" id="radio2"></input>

        <div class="slide first">
          <img
            src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
            alt=""
          ></img>
        </div>
        <div class="slide">
          <img
            src="https://recepti.zena.blic.rs/resources/images/4e/4e374cca526f4b4ffbc99281aba408e6/resize/a91d64df69e6029d2b17ec15822a7c36_670x0.jpeg"
            alt=""
          ></img>
        </div>

        <div class="navigation-auto">
          <div class="auto-btn1"></div>
          <div class="auto-btn2"></div>
        </div>
      </div>

      <div class="navigation-manual">
        <label for="radio1" class="manual-btn"></label>
        <label for="radio2" class="manual-btn"></label>
      </div>
    </div>
  );
}
