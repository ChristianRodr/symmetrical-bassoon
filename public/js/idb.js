let db;

const request = indexedDB.open("transactions", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  db.createObjectStore("this.transactions", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

function uploadTransactions() {

  const transactions = db.transactions(['new_transaction'], 'readwrite');

  const transactionsObjectStore = transactions.objectStore('new_transaction');

  const getAll = transactionsObjectStore.getAll();
};

getAll.onsuccess = function() {

  if (getAll.result.length > 0) {
    fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(getAll.result),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(serverResponse => {
        if (serverResponse.message) {
          throw new Error(serverResponse);
        }
        
        const transactions = db.transaction(['new_transactions'], 'readwrite');
        
        const transactionsObjectStore = transactionsn.objectStore('new_transactions');

        transactionsObjectStore.clear();

        alert('All saved transactions has been submitted!');
      })
      .catch(err => {
        console.log(err);
      });
  }
};

window.addEventListener('online', uploadTransactions);