function getRandomNumber(min,max){

    var randomSeed = Math.random();
    var randomNumber;

    if ( (Math.floor( 1000 * randomSeed )  % 2) == 0)
    {
        randomNumber= Math.floor( (max - min) * randomSeed + min );
    }
    else
    {
        randomNumber= Math.ceil( (max - min) * randomSeed + min );
    }
    return randomNumber;
    
    }