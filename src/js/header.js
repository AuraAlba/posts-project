import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/header.hbs";
import {nameUser} from './dataUser';

const render = () => {
    const compileTmplate = compile(template)({
        user: nameUser
    });

    $('header').html(compileTmplate);
};


export default render;

