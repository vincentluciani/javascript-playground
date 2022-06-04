"use strict";


/* not working fully , but can be used as example for a factory + websql +at the end, 
DO NOT TAKE AS EXAMPLE FOR calling a synchronous function getting value from a funciton that was supposed to be asynchronous at the beginning*/


/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
class Creator {
    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    getHabitProgressJournal() {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return product.getHabitProgressJournal();
    }
    removeItemByKey(keyName) {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        product.removeItemByKey(keyName);
    }
    getItemByKey(keyName) {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return product.getItemByKey(keyName);
    }
    setItem(keyName, value) {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        product.setItem(keyName, value);
    }
    updateParameterInItemValue(keyName, parameterName, value) {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        product.updateParameterInItemValue(keyName, parameterName, value);
    }
}
/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class LocalStorageCreator extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    factoryMethod() {
        return new LocalStorageProduct();
    }
}
class WebSQLCreator extends Creator {
    factoryMethod() {
        var database = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        database.transaction(function (tx) { 
            tx.executeSql('CREATE TABLE IF NOT EXISTS HABITS (keyName unique, keyValue)'); 
         }); 
        return new WebSQLProduct(database);
    }
}

class APICreator extends Creator {
    factoryMethod() {
        return new APIProduct();
    }
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class LocalStorageProduct {
    getHabitProgressJournal() {

        return new Promise(
            function (resolve, reject) {
                var progressArray=[];
                var habitsArray=[];
                var journalArray = [];
                var todaysProgressArray=[];
                var pastProgressArray=[];
                var localStorageLength = localStorage.length;
            
                for (var i = 0; i < localStorageLength; i++){
                    var currentKey = localStorage.key(i);
                    if ( currentKey.indexOf("progress-") >= 0){
                        var progressValue = JSON.parse(localStorage.getItem(currentKey));
                        if ( progressValue.progressDate == formattedTodaysDate()){
                            todaysProgressArray.push(progressValue);
                        } else if (daysSinceToday(progressValue.progressDate)<=30) {
                            pastProgressArray.push(progressValue);
                        }
                        progressArray.push(progressValue);
                    } else if ( currentKey.indexOf("habit-") >= 0){
                        habitsArray.push(JSON.parse(localStorage.getItem(currentKey)));
                    } else if ( currentKey.indexOf("journal-") >= 0){
                        journalArray.push({'key':currentKey,'text':JSON.parse(localStorage.getItem(currentKey))});
                    }
                }
                resolve({progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray});
            }
        );
            
    }
    removeItemByKey(keyName) {
        return new Promise(
            function (resolve, reject) {
                window.localStorage.removeItem(keyName);
                resolve('Item Removed');
            }
        )
    }
    getItemByKey(keyName) {
        return new Promise(
            function (resolve, reject) {
                var itemValue = window.localStorage.getItem(keyName);
                resolve(itemValue);
            }
        )
    }
    setItem(keyName, value) {
        return new Promise(
            function (resolve, reject) {
                window.localStorage.setItem(keyName, value)
                resolve('Item Set');
            }
        )
    }
    updateParameterInItemValue(keyName, parameterName, value){
        return new Promise(
            function (resolve, reject,_this) {
                var objectValue = _this.getItemByKey(keyName);
                var jsonValue = JSON.parse(objectValue);
                jsonValue[parameterName]=value;
                objectValue = JSON.stringify(jsonValue);
                this.setItem(keyName,objectValue);
                resolve('Parameter Updated');
            }
        )

    }
}
class WebSQLProduct {

    constructor(database){
        this.database = database;
    }
    getHabitProgressJournal() {
        return '{Result of the ConcreteProduct2}';
    }
    removeItemByKey(keyName) {
        return '{Result of the ConcreteProduct2}' + keyName;
    }
    getItemByKey(keyName) {
        return '{Result of the ConcreteProduct2}' + keyName;
    }
    setItem(keyName, value) {
        this.database.transaction(function (tx) { 
            tx.executeSql('INSERT INTO HABITS (keyName, keyValue) VALUES (?, ?)',[keyName,value]); 
         });
        return '{Result of the ConcreteProduct2}' + keyName + ":" + value;
    }
    updateParameterInItemValue(keyName, parameterName, value){
        return '{Result of the ConcreteProduct2}' + keyName + ":" + ":"+parameterName +":"+value;
    }
}

class APIProduct {
    getHabitProgressJournal() {
    
        return new Promise(
            function (resolve, reject) {
                var APIcallParameters = {
                    method: "GET",
                    url: "http://localhost:5000/get-habit-progress-journal"
                };

                APICall(APIcallParameters)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }
        );
    }
    removeItemByKey(keyName) {
        return new Promise(
            function (resolve, reject) {
                var APIcallParameters = {
                    method: "GET",
                    url: `http://localhost:5000/removeItemByKey?keyName=${keyName}`
                };

                APICall(APIcallParameters)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }
        );
    }
    getItemByKey(keyName) {
        return new Promise(
            function (resolve, reject) {
                var APIcallParameters = {
                    method: "GET",
                    url: `http://localhost:5000/getItemByKey?keyName=${keyName}`
                };

                APICall(APIcallParameters)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }
        );
    }
    setItem(keyName, value) {
        return new Promise(
            function (resolve, reject) {
                var APIcallParameters = {
                    method: "GET",
                    url: `http://localhost:5000/getItemByKey?keyName=${keyName}&value=${value}`
                };

                APICall(APIcallParameters)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }
        );
    }
    updateParameterInItemValue(keyName, parameterName, value){
        return new Promise(
            function (resolve, reject) {
                var APIcallParameters = {
                    method: "GET",
                    url: `http://localhost:5000/getItemByKey?keyName=${keyName}&parameterName=${parameterName}&value=${value}`
                };

                APICall(APIcallParameters)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error);
                    })
            }
        );
    }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator) {
    // ...
    console.log('All content necessary for habits');
    creator.getHabitProgressJournal()
    .then(function(response){
        console.log('response from the main function');
        console.log(response);
        })
        .catch(function(error) {
            console.error(error);
        })
    console.log("progress-164655054444102");
    console.log(creator.getItemByKey('progress-164655054444102'));
    console.log(creator.setItem('test-1','{"param1":"test11","param2":"test12"}'));
    console.log(creator.setItem('test-2','{"param1":"test21","param2":"test22"}'));
    console.log("test-1");
    console.log(creator.getItemByKey('test-1'));
    console.log("test-2");
    console.log(creator.getItemByKey('test-2'));
    console.log(creator.removeItemByKey('test-2'));
    console.log("test-1");
    console.log(creator.getItemByKey('test-1'));
    console.log("test-2");
    console.log(creator.getItemByKey('test-2'));
    creator.updateParameterInItemValue("test-1", "param2", "abc");
    console.log("test-1 after update");
    console.log(creator.getItemByKey('test-1'));

    // ...
}
/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
console.log('App: Launched with the localstorage creator.');
clientCode(new LocalStorageCreator());
console.log('');
console.log('App: Launched with API call creator.');
clientCode(new APICreator());


/*==========================*/



