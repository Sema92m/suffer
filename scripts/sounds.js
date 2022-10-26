export  function timestart() {
    timer = setInterval(function () {
        counterDisplayElem.innerHTML = ++count;
    }, 1000);
}


