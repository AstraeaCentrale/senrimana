// workaround: https://www.w3schools.com/xml/ajax_xmlfile.asp 

let platformID = [
  "X",
  "pixiv",
  "Reddit",
  "DeviantArt",
  "Danbooru",
  "YouTube",
  "yandere.re",
  "sourced externally",
  "VRoid Hub",
];

function broadcastLineup(year) {
  function vod(xml) {
    let out = "",
      xmlDoc = xml.responseXML,
      b = xmlDoc.getElementsByTagName("LIVE"),
      dateeeee = new Date(new Date().getTime() + diffOffs(9));
    for (let k = 0; k < b.length; k++) {
      out += `
        <div lineupSheet style="display: ${b[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('https://youtu.be/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}')"> <!-- event -->
          <img src="https://i.ytimg.com/vi/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}/hq720.jpg" alt="" width="375px">
          <div>
            <span type="date" style="margin-bottom: 0.25rem; font-weight: bold;">${k + 1} Jul ${dateeeee.getFullYear()}</span>
            <span type="eventTitle">${b[k].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue}</span>
            <br>
            <span type="eventText">${b[k].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue}</span>
          </div>
        </div>
      `;
    }
    document.getElementById("vodList").innerHTML = out;
    // isOngoing();
  }
  let ajxLoad = new XMLHttpRequest();
  ajxLoad.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { vod(this); }
  };
  ajxLoad.open("GET", `/senrimana/assets/xml/${year}_lineup.xml`, true);
  ajxLoad.send();
}

function isOngoing() {
  let dates = document.querySelectorAll(`span[type="date"]`),
    ongoingDate = new Date(new Date().getTime() + diffOffs(9)),
    currDate = new RegExp(`\\b${ongoingDate.getDate()} Jul ${ongoingDate.getFullYear()}\\b`);
  dates.forEach((date) => {
    // PHASE 1: live is ongoing
    if (currDate.test(date.innerHTML)) { return date.innerHTML = `<span class="flashPrompt" style="color: red; margin: 0;">&#x1F534 ONGOING</span>`; }
    // PHASE 2: live not started but already past scheduled date
    let dayNumMatch = date.innerHTML.match(/(\d+)\s+\w+\s+\d{4}/);
    if (dayNumMatch) {
      let dayNum = parseInt(dayNumMatch[1], 10);
      if (ongoingDate.getDate() > dayNum) { return date.innerHTML = `<span style="color: #ecd6a1; margin: 0;">&#x1F553 DELAYED START</span>`; }
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
        <div eventDays style="display: ${m[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
          <img src="https://yt3.ggpht.com/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
          <div>
            <span style="font-size: .875rem; margin-bottom: 0.25rem;">DAY ${k + 1}</span>
            <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue}${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue == "cosplay" ? "" : ` (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})`}</span>
          </div>
        </div>
      `;
    }
    document.getElementById("dailyKaiser").innerHTML = out;
    // inactiveUnlessPassed();
  }
  let ajxLoad = new XMLHttpRequest();
  ajxLoad.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { gallery(this); }
  };
  ajxLoad.open("GET", `/senrimana/assets/xml/${year}_Kaiser.xml`, true);
  ajxLoad.send();
}

function inactiveUnlessPassed() {
  let days = document.querySelectorAll("div[eventDays]"),
    inactiveDate = new Date(new Date().getTime() + diffOffs(9));
  for (let dK = 0; dK < days.length; dK++) {
    days[dK]?.setAttribute("style", "display: none;");
  }
  for (let dK = 0; dK < days.length; dK++) {
    let day = days[dK].querySelector("span");
    if (day.innerHTML.includes(`DAY ${dK + 1}`)) {
      if (inactiveDate.getDate() >= dK + 1) {
        days[dK]?.setAttribute("style", "display: inline-block;");
      }
    }
  }
}

function showCollection(year) {
  let ajxLoad;
  document.getElementById("dKContainer")?.setAttribute("style", "display: block;");
  document.getElementById("dKTitle")?.setAttribute("style", "display: flex;");
  document.getElementById("dKTitle").innerHTML = `
    <span>Daily Kaiser ${year}🖤💜</span>
  `;
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
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue}${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue == "cosplay" ? "" : ` (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})`}</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    ajxLoad = new XMLHttpRequest();
    ajxLoad.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    ajxLoad.open("GET", `/senrimana/assets/xml/2022_Kaiser.xml`, true);
    ajxLoad.send();
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
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue}${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue == "cosplay" ? "" : ` (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})`}</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    ajxLoad = new XMLHttpRequest();
    ajxLoad.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    ajxLoad.open("GET", `/senrimana/assets/xml/2023_Kaiser.xml`, true);
    ajxLoad.send();
  } else {
    function gallery(xml) {
      let out = "",
        xmlDoc = xml.responseXML,
        m = xmlDoc.getElementsByTagName("DAILY");
      for (let k = 0; k < m.length; k++) {
        out += `
          <div style="display: ${m[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
            <img src="https://yt3.ggpht.com/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
            <div>
              <span style="font-size: .875rem;">DAY ${k + 1}</span>
              <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue}${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue == "cosplay" ? "" : ` (${platformID[m[k].getElementsByTagName("PLATFORMID")[0].childNodes[0].nodeValue]})`}</span>
            </div>
          </div>
        `;
      }
      document.getElementById("displayCollection").innerHTML = out;
    }
    ajxLoad = new XMLHttpRequest();
    ajxLoad.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { gallery(this); }
    };
    ajxLoad.open("GET", `/senrimana/assets/xml/${year}_Kaiser.xml`, true);
    ajxLoad.send();
  }
}