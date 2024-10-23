document.getElementsByClassName("img").onmouseenter = function() { mouseEnter() };
document.getElementsByClassName("img").onmouseleave = function() { mouseLeave() };

function mouseEnter() {
    document.getElementById("img").innerHTML += `

    <div>
      <div class="overlap-group-wrapper">
        <div class="overlap-group">
          <div class="rectangle"></div>
          <img class="vector" src="img/image.svg" />
          <img class="img" src="img/vector.svg" />
          <img class="new" src="img/new-1.svg" />
          <img class="updated" src="img/updated-1.svg" />
          <img class="multiplayer" src="img/multiplayer-1.svg" />
          <img class="puzzle" src="img/puzzle-1.svg" />
          <img class="escape" src="img/escape-1.svg" />
          <img class="action" src="img/action-1.svg" />
          <div class="home"><div class="text-wrapper">Home</div></div>
          <div class="escap-room"><div class="text-wrapper">Escap Room</div></div>
          <div class="div-wrapper"><div class="text-wrapper">New</div></div>
          <div class="recently-played"><div class="div">Recently Played</div></div>
          <div class="updates"><div class="text-wrapper">Updates</div></div>
          <div class="combat"><div class="text-wrapper">Combat</div></div>
          <div class="multiplayer-2"><div class="text-wrapper">Multiplayer</div></div>
          <div class="puzzels"><div class="text-wrapper">Puzzels</div></div>
          <p class="p">© 2024 The Infinite Dungeon</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
}

function mouseLeave() {
    document.getElementById("vector").style.color = "black";
}
