export const getUrlVars = (reference) => {
    var address = window.location.href;

    var indexOfReader = address.indexOf(reference);
    address = address.slice(indexOfReader + reference.length, address.length);
    
    var params = address.split("/");
    let props = {};
    props.author = params[0];
    props.seriesTitle = params[1];
    props.currentPage = parseInt(params[2]);
    
    return props;
}