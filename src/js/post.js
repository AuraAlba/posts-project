import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/post.hbs";
import {nameUser} from './dataUser';

function onPublishClick(evt) {
    console.log(evt);

    const $textPublish = $('.post .post-comment').val();
    console.log($textPublish);
    $('.post').trigger('new-post',[{
        user:{
            name: nameUser,
            img: ""
        },
        text: $textPublish,
        reactions: [],
        comments: []

    }]);
    onCloseX();
    $('.post .post-comment').val("");
}

function onPostClick(evt) {
    const $target = $(evt.target);
   // console.log(evt.target);
    if($target.hasClass('post-close')){
        onCloseX();
    }else{
        if($target.hasClass('.post-btn-publish')){
            onPublishClick;
        }else{
            $('.container').addClass('is-open-modal');
            $('.post').addClass('is-open-post');
        }


    }

}
function onCloseX() {
    $('.container').removeClass('is-open-modal');
    $('.post').removeClass('is-open-post');
}

const render = () => {
    const compileTmplate = compile(template)({

    });

    $('.post').html(compileTmplate);
    $('.post .post-btn-publish').on('click', onPublishClick);
    $('.post').on('click', onPostClick);

    /*$('.post').on('new-post', (evt,json) =>{
        console.log(evt);
        console.log(json);
    });*/

};


export default render;
