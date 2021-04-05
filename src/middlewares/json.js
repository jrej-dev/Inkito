export const safeJSON = {
    parse: (json) => {
        let parsed
        try {
            parsed = safeJSON.parse(json)
        } catch (e) {
            //console.log('Error: ' + e)
        }
    
        return parsed
    },
    stringify: (data) => {
        let string
    
        try {
            string = JSON.stringify(data)
        } catch (e) {
            //console.log('Error: ' + e)
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