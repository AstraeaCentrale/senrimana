// workaround: https://www.w3schools.com/xml/ajax_xmlfile.asp 

function broadcastLineup(year) {
  function vod(xml) {
    let out = "",
      xmlDoc = xml.responseXML,
      b = xmlDoc.getElementsByTagName("LIVE");
    for (let k = 0; k < b.length; k++) {
      out += `
        <div style="display: ${b[k].getElementsByTagName("VISIBILITY")[0].childNodes[0].nodeValue};" onclick="window.open('https://youtu.be/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}')"> <!-- event -->
          <img src="https://i.ytimg.com/vi/${b[k].getElementsByTagName("ID")[0].childNodes[0].nodeValue}/hq720.jpg" alt="" width="375px">
          <div>
            <span type="date">${b[k].getElementsByTagName("DATE")[0].childNodes[0].nodeValue}</span>
            <br>
            <span type="eventTitle">${b[k].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue}</span>
            <br>
            <span type="eventText">${b[k].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue}</span>
          </div>
        </div>
      `;
    }
    document.getElementById("vodList").innerHTML = out;
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { vod(this); }
  };
  xhttp.open("GET", `/senrimana/assets/xml/${year}_lineup.xml`, true);
  xhttp.send();
}

function dailyKaiser(year) {
  function gallery(xml) {
    let out = "",
      xmlDoc = xml.responseXML,
      m = xmlDoc.getElementsByTagName("DAILY");
    for (let k = 0; k < m.length; k++) {
      out += `
        <div onclick="window.open('${m[k].getElementsByTagName("URL")[0].childNodes[0].nodeValue}')">
          <img src="https://yt3.ggpht.com/${m[k].getElementsByTagName("IMGID")[0].childNodes[0].nodeValue}" alt="" width="500px" style="${m[k].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue}">
          <div>
            <span style="font-size: .875rem;">DAY ${m[k].getElementsByTagName("POSTID")[0].childNodes[0].nodeValue}</span>
            <span class="author" ${m[k].getElementsByTagName("FORMAT")[0].childNodes[0].nodeValue} type="eventText">${m[k].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue}</span>
          </div>
        </div>
      `;
    }
    document.getElementById("dailyKaiser").innerHTML = out;
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { gallery(this); }
  };
  xhttp.open("GET", `/senrimana/assets/xml/${year}_Kaiser.xml`, true);
  xhttp.send();
}