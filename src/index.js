function component() {
  let elem = document.createElement('h2');

  elem.innerHTML = 'Made with webpack & love';
  elem.classList.add('love');

  return elem;
}

document.body.insertBefore(component(), document.querySelector('h1').nextSibling);
