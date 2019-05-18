module.exports = function(arg){
    if(Array.isArray(arg)){
        return arg[Math.floor(Math.random()*arg.length)]
    }
    else if(typeof arg == 'number'){
        return;
    }
}