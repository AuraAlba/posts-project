import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/post.hbs";
import {nameUser} from './dataUser';


function onPublishClick(evt) {

    const $textPublish = $('.post .post-comment').val();
    $('.post').trigger('new-post', [{
        user: {
            name: nameUser,
            img: ""
        },
        text: $textPublish,
        reactions: [],
        comments: []

    }]);
    debugger;
    onCloseX();
    $('.post .post-comment').val("");
}

function onPostClick(evt) {
    const $target = $(evt.target);
    if ($target.hasClass('.post-btn-publish')) {
        onPublishClick;
    } else {

        $('.container').addClass('is-open-modal');
        $('.post').addClass('is-open-post');
    }


    evt.stopPropagation();
}

function onCloseX() {
    $('.container').removeClass('is-open-modal');
    $('.post').removeClass('is-open-post');
}

const render = () => {
    const compileTmplate = compile(template)({});

    $('.post').html(compileTmplate);
    $('.post .post-btn-publish').on('click', onPublishClick);
    $('.post-comment').on('click', onPostClick);
    $('.post-close').on('click', onCloseX);


};


export default render;
