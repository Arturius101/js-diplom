function generateTicket() {
  const selectSeanse = JSON.parse(localStorage.selectSeanse);
  console.log(selectSeanse);
  // Общее число мест
  let places = "";

  selectSeanse.salesPlaces.forEach((element) => {
    let price = 0;

    if (places != "") {
      places += ", ";
    }
    places += `${element.row}/${element.place}`;
    price += element.type == "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);
  });

  document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName; // Ффильмы
  document.querySelector(".ticket__chairs").innerHTML = places; // Места
  document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName; // Залы
  document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime; // Начало сеанса

  //QR-код
  const date = new Date(Number(`${selectSeanse.seanceTimeStamp}000`));
  let dd = date.getDate();

  if (dd < 10) {
    dd = "0" + dd;
  }

  let mm = date.getMonth();

  if (mm < 10) {
    mm = "0" + mm;
  }

  const dateStr = date.toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});

  let textQR = `Фильм: ${selectSeanse.filmName} Зал: ${
    selectSeanse.hallName
  } Ряд/Место ${places} Дата: ${dateStr} Начало сеанса: ${
    selectSeanse.seanceTime
  } Билет действителен строго на свой сеанс`;

  const qrcode = QRCreator(textQR, {image: "SVG"});
  qrcode.download();
  document.querySelector(".ticket__info-qr").append(qrcode.result);
  console.log(qrcode.result);
}

document.addEventListener("DOMContentLoaded", generateTicket);
