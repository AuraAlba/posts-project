import $ from "jquery";
import './scss/index.scss';
import renderHeader from './js/header';
import renderPost from './js/post';
import ShowPost from './js/showPost';
import getData from './js/getData';

const url='http://www.mocky.io/v2/5a663e0d2e0000002b323e0e';

const posts = [],
    dataPosts = getData(url, onDataSync);


function onDataSync(dataPosts) {
    dataPosts.forEach((dataPost) => {
        const showPost= new ShowPost($('.show-post'), dataPost);
        showPost.render();
        posts.push(showPost);
    });
}

function onNewPost(evt, json) {
    console.log(json);
}

renderHeader();
renderPost();

$('.post').on('new-post', onNewPost);
