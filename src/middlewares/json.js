export const safeJSON = {
    parse: (json) => {
        let parsed
        try {
            parsed = JSON.parse(json)
        } catch (e) {
            console.log('Error: ' + e)
            console.log(json);
        }
    
        return parsed
    },
    stringify: (data, replacer, space) => {
        let string
    
        try {
            string = JSON.stringify(data, replacer, space)
        } catch (e) {
            console.log('Error: ' + e)
        }
    
        return string
    }
}    

export const binArrayToJson = (binArray) => {
    var str = "";
    for (var i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
    }
    return str.toString()
}