const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // we use JSON.parse to transform the initial stringified version of items from addItem function and transform it back into an object so we can add that object in the list on pageLoad

function addItem (e) {
  // this prevents the page to reload/atempt to send the submit to the server, we want our form to run locally
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  //saving to localStorage and converting items to a json string since local storage work's only as a key-value and cant read objects (browser will try to .toString() the object and it will return an akward [Object object] string)
  localStorage.setItem('items', JSON.stringify(items));
  this.reset(); // .this is the form. forms have a .reset() method
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}" />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

addItems.addEventListener('submit', addItem);

populateList(items, itemsList)