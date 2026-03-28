function start() {
  inPageStart(); // per page start
  ifSpecial();
}

function jstClock() {
  let tD = new Date(new Date().getTime() + diffOffs(9)),
    mt = tD.getMonth(),
    dd = tD.getDate(),
    yy = tD.getFullYear(),
    hh = tD.getHours(),
    mm = tD.getMinutes(),
    ss = tD.getSeconds();
  mm = addZero(mm);
  ss = addZero(ss);
  document.getElementById("time").innerHTML = `${hr12(hh)}:${mm}${ampm(hh)} JST`;
  document.getElementById("date").innerHTML = `${dd} ${month(mt)} ${yy}`;
  setTimeout(jstClock, 0);
}
function addZero(z) {
  if (z < 10) { z = "0" + z };
  return z;
}
function diffOffs(tz) {
  const dt = new Date();
  let tzDiff = tz * 60 + dt.getTimezoneOffset(),
    diff = tzDiff * 60 * 1000;
  return diff;
}
function hr12(hr) {
  const hrs = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  for (let a = hr; a <= 23; a++) {
    if (hr <= 11) {
      return hr = hrs[a];
    } else if (hr <= 23) {
      ind = a - hrs.length;
      return hr = hrs[ind];
    }
  }
}
function ampm(ap) {
  const apD = ["am", "pm"];
  for (let p = ap; p <= 23; p++) {
    if (ap <= 11) {
      return ap = apD[0];
    } else if (ap <= 23) {
      return ap = apD[1];
    }
  }
}
function month(mth) {
  const mos = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let m = mth; m <= 12; m++) {
    return mth = mos[m];
  }
}

function isLineupActive(s) {
  if (s == 0) {
    document.getElementById("vodList").style.display = "none";
    document.getElementById("noVod").style.display = "block";
  } else if (s == 1) {
    document.getElementById("vodList").style.display = "block";
    document.getElementById("noVod").style.display = "none";
  }
}

function showSchedule(year) {
  document.body.insertAdjacentHTML("beforebegin", `
    <div id="sch" onclick="document.getElementById('sch').remove();" tabindex="0">
      <img src="/senrimana/assets/images/schedsheet/${year}_schedule.png" alt="schedule">
    </div>
  `);
}

// ifSpecial()

function ifSpecial() {
  let ifSpc = new URLSearchParams(window.location.search).get("ifSpecial");
  if (ifSpc == "true") {
    // instantiate things that needs instantiating
    document.body.insertAdjacentHTML("beforeend", `
      <div class="specialDialog"><div>
        <audio mnPlyr style="width: 0; height: 0;"></audio>
        <h2>special menu</h2>
        <br>
        <div>
          <h3>mystery music</h3>
          <div btnList>
            <button senri onclick="{
              document.querySelector('audio[mnPlyr]').src = 'https://media.githubusercontent.com/media/AstraeaCentrale/senrimana/refs/heads/audio/SummerDreamRefrain_theme.mp3';
              document.querySelector('audio[mnPlyr]').onended = () => {
                document.querySelector('audio[mnPlyr]').play();
                document.querySelector('audio[mnPlyr]').currentTime = 10.8125;
              };
              document.querySelector('audio[mnPlyr]').play();
              document.querySelector('header').innerHTML = \`
                <p class='flashPrompt' style='margin: 0; padding: 0.5rem; font-weight: bold;'>
                  now playing: Summer Dream Refrain - Main Theme
                </p>
              \`;
              document.querySelector('header').setAttribute('style', 'justify-content: center;');
            }">play</button>
          </div>
        </div>
        <br>
        <div>
          <h3>#StateOfVTuber Theme</h3>
          <div btnList>
            <button senri onclick="{
              document.querySelector('audio[mnPlyr]').src = 'https://media.githubusercontent.com/media/AstraeaCentrale/senrimana/refs/heads/audio/NewYearTwinkleCrisis_theme.mp3';
              document.querySelector('audio[mnPlyr]').onended = () => { document.querySelector('audio[mnPlyr]').play(); };
              document.querySelector('audio[mnPlyr]').play();
              document.querySelector('header').innerHTML = \`
                <p class='flashPrompt' style='margin: 0; padding: 0.5rem; font-weight: bold;'>
                  now playing: New Year Twinkle Crisis! - Main Theme
                </p>
              \`;
              document.querySelector('header').setAttribute('style', 'justify-content: center;');
            }">play</button>
            <button senri onclick="window.open('https://thebelovedmoon.github.io/?vt=stateofvtuber')">visit</button>
          </div>
        </div>
      </div></div>
    `);
    document.querySelector(".specialDialog").setAttribute("style", `width: 100%; height: calc(100vh - ${getComputedStyle(document.querySelector("header")).height}); background-color: #e5e3e1; color: #3d374c; overflow-y: auto; scrollbar-width: thin;`);
    // document.querySelector(".specialDialog *").setAttribute("style", "margin: 0 !important; display: block !important; padding: 0 !important;");
    document.querySelector(".specialDialog > div").setAttribute("style", "width: 62.5rem; max-width: 100%; margin: 0 auto; text-align: center; padding: 3rem 1rem;");
    document.querySelectorAll("div[btnList] *").forEach(btlst  => {
      btlst.setAttribute("style", "display: inline-block; color: #e5e3e1;");
    });
  }
}