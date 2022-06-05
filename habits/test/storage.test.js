var loggedIn = true;

var asyncTestRunner = async function(){
    var response = await getHabitProgressJournal();
    console.log('test: response from getHabitProgressJournal');
    console.log(response);
    var response2 = await getItemByKey('progress-164655054444102');
    console.log('test: content of progress-164655054444102');
    console.log(response2); 
    var response3 = await setItem('test-1','{"param1":"test11","param2":"test12"}');
    var response4 = await setItem('test-2','{"param1":"test21","param2":"test22"}');
    var response5 = await getItemByKey('test-1');
    console.log('test:test-1 after insertion');
    console.log(response5); 
    var response6 = await getItemByKey('test-2');
    console.log('test:test-2 after insertion');
    console.log(response6); 
    var response7 = await removeItemByKey('test-2');
    var response8 = await getItemByKey('test-1');
    console.log('test:test-1 after deletion of test-2');
    console.log(response8); 
    var response9 = await getItemByKey('test-2');
    console.log('test:test-2 after deletion');
    console.log(response9); 
    
    var response9b = await updateParameterInItemValue("test-1", "param2", "abc");
    var response10 = await getItemByKey('test-1');
    console.log('test:test-1 after update');
    console.log(response10); 

}

var test = function(){
    asyncTestRunner()            
    .then(function(response){
        console.log("test completed");
    }    )    
    .catch(function(error) {
        console.log(error);
    })
}
test();


