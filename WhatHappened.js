let searchUrl = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/";
let userInput;
let counter = 10;

function setup() {
  noCanvas();
  userInput = select("#userinput");
  let term = userInput.value();
  let dateEntered = new Date(term);
  let monthIn = dateEntered.getUTCMonth() + 1;
  let dayIn = dateEntered.getUTCDate();
  let yearIn = dateEntered.getFullYear();

  const main = document.getElementById("section");

  userInput.changed(startSearch);
  startSearch();

  function startSearch() {
    main.innerHTML = "";
    goWiki();
  }

  function goWiki() {
    let url = searchUrl + monthIn + "/" + dayIn;
    loadJSON(url, gotData);
    console.log(url);
  }

  function gotData(data) {
    let len = data["events"].length;
    let index = floor(random(len));

    //TODO: fix when accidentally have 2 or more same index
    let indexes = [];
    for (let i = 0; i < 10; i++) {
      let yearEvent = data["events"][index]["year"];

      while (indexes.includes(index) || yearEvent > yearIn) {
        index = floor(random(len));
      }

      indexes.push(index);

      let textEvent = data["events"][index]["text"];
      let linkEvent =
        data["events"][index]["pages"][0]["content_urls"]["desktop"]["page"];
      let imgEvent;
      if (data["events"][index]["pages"][0]["thumbnail"] != null) {
        imgEvent = data["events"][index]["pages"][0]["thumbnail"]["source"];
      } else {
        imgEvent =
          "https://th.bing.com/th/id/OIP.GKhiEOmge1JFwYMst2neTQHaHX?pid=ImgDet&rs=1";
      }

      const div_card = document.createElement("div");
      div_card.setAttribute("class", "card");
      const div_row = document.createElement("div");
      div_row.setAttribute("class", "row");
      const div_column = document.createElement("div");
      div_column.setAttribute("class", "column");
      const img = document.createElement("img");
      img.setAttribute("class", "thumbnail");
      img.setAttribute("id", "image");
      const tex = document.createElement("p");
      tex.setAttribute("id", "text");
      const link = document.createElement("a");
      link.setAttribute("class", "linkWiki");
      link.setAttribute("id", "link");
      const cente = document.createElement("center");

      tex.innerHTML = `${textEvent}`;
      img.src = imgEvent;
      link.href = linkEvent;
      link.innerHTML = `Details`;
      link.target = "_blank";

      cente.appendChild(img);
      div_card.appendChild(cente);
      div_card.appendChild(tex);
      div_card.appendChild(link);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      main.appendChild(div_row);

      index = floor(random(len));
    }
  }
}
