class User {
    name;
}

/////////////////////////////

const indexedDB = window.indexedDB;
var db = null;

const request = indexedDB.open('dbUsers', 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains('users')) {
        upgradeDb.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    }
});
request.onerror = event => console.error('error');
request.onsuccess = event => db = request.result;


function add(data) {
    let data = new User();
    data.name = document.getElementById('addUserForm.fieldName');
    const transaction = db.transaction("users", "readwrite")
        .objectStore("users")
        .add(data);

    transaction.onsuccess = event => console.log('add success');
    transaction.onerror = event => console.error('add error');
}
