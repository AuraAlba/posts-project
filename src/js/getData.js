import $ from "jquery";


const getData = (url,fun) => {
    $.getJSON(url)
        .done(fun);

};

export default getData;
