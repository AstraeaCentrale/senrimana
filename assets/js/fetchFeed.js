// workaround: https://www.w3schools.com/xml/ajax_xmlfile.asp 

let platformID = ["X", "pixiv", "Reddit", "DeviantArt", "Danbooru", "YouTube", "yandere.re", "sourced externally"];

function broadcastLineup(year) {
  function vod(xml) {
    let out = "",
      xmlDoc = xml.responseXML,
      b = xmlDoc.getElementsByTagName("LIVE");
    for (let k = 0; k < b.length; k++) {
      out += `
        <div lineupSheet style="display: ${b[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('https://youtu.be/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}')"> <!-- event -->
          <img src="https://i.ytimg.com/vi/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}/hq720.jpg" alt="" width="375px">
          <div>
            <span type="date">${k + 1} Jul 2025</span>
            <br>
            <span type="eventTitle">${b[k].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue}</span>
            <br>
            <span type="eventText">${b[k].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue}</span>
          </div>
        </div>
      `;
    }
    document.getElementById("vodList").innerHTML = out;
    isOngoing();
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { vod(this); }
  };
  xhttp.open("GET", `/senrimana/assets/xml/${year}_lineup.xml`, true);
  xhttp.send();
}

function isOngoing() {
  let dates = document.querySelectorAll("span[type='date']");
  dates.forEach(date => {
    if (date.innerHTML.includes(`${tD.getDate()} ${month(tD.getMonth())} ${tD.getFullYear()}`)) {
      date.innerHTML = `<span class="liveOngoing" style="margin: 0;">&#x2B24 ONGOING</span>`;
    }
  });
}

function dailyKaiser(year) {
  function gallery(xml) {
    let out = "",
      xmlDoc = xml.responseXML,
      m = xmlDoc.getElementsByTagName("DAILY");
    for (let k = 0; k < m.length; k++) {
      out += `
        <div eventDays onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
          <img src="https://yt3.ggpht.com/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
          <div>
            <span style="font-size: .875rem;">DAY ${k + 1}</span>
            <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue} (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})</span>
          </div>
        </div>
      `;
    }
    document.getElementById("dailyKaiser").innerHTML = out;
    inactiveUnlessPassed();
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { gallery(this); }
  };
  xhttp.open("GET", `/senrimana/assets/xml/${year}_Kaiser.xml`, true);
  xhttp.send();
}

function inactiveUnlessPassed() {
  let days = document.querySelectorAll("div[eventDays]");
  for (let dK = 0; dK < days.length; dK++) {
    days[dK]?.setAttribute("style", "display: none;");
  }
  for (let dK = 0; dK < days.length; dK++) {
    let day = days[dK].querySelector("span");
    if (day.innerHTML.includes(`DAY ${dK + 1}`)) {
      if (tD.getDate() >= dK + 1) {
        days[dK]?.setAttribute("style", "display: inline-block;");
      }
    }
  }
}

function showCollection(year) {
  let xhttp;
  document.getElementById("displayCollection")?.setAttribute("style", "padding: .5rem;");
  if (year == "2022") {
    function gallery(xml) {
      let out = "",
        xmlDoc = xml.responseXML,
        m = xmlDoc.getElementsByTagName("DAILY");
      for (let k = 0; k < m.length; k++) {
        out += `
          <div style="display:${m[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
            <img src="${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
            <div>
              <span style="font-size: .875rem;">DAY ${k + 1}</span>
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue} (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    xhttp.open("GET", `/senrimana/assets/xml/2022_Kaiser.xml`, true);
    xhttp.send();
  } else if (year == "2023") {
    function gallery(xml) {
      let out = "",
        xmlDoc = xml.responseXML,
        m = xmlDoc.getElementsByTagName("DAILY");
      for (let k = 0; k < m.length; k++) {
        out += `
          <div style="display:${m[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
            <img src="https://pbs.twimg.com/media/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}?format=jpg&name=4096x4096" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
            <div>
              <span style="font-size: .875rem;">DAY ${k + 1}</span>
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue} (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    xhttp.open("GET", `/senrimana/assets/xml/2023_Kaiser.xml`, true);
    xhttp.send();
  } else if (year == "2024" || year == "2025") {
    function gallery(xml) {
      let out = "",
        xmlDoc = xml.responseXML,
        m = xmlDoc.getElementsByTagName("DAILY");
      for (let k = 0; k < m.length; k++) {
        out += `
          <div onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
            <img src="https://yt3.ggpht.com/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
            <div>
              <span style="font-size: .875rem;">DAY ${k + 1}</span>
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue} (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    xhttp.open("GET", `/senrimana/assets/xml/${year}_Kaiser.xml`, true);
    xhttp.send();
  }
}