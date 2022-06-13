export function queryMeteo() {
  return httpGetAsync(
    "https://openweathermap.org/data/2.5/onecall?lat=44.8404&lon=-0.5805&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02"
  );
}

async function httpGetAsync(theUrl: string) {
  return new Promise<string>((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        resolve(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  });
}
