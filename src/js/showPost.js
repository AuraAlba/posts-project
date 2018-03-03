import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/showPost.hbs";
import Comment from "./comment";
import Reaction from "./reaction";

function onReactionClick(evt) {
    const $target = $(evt.target);
    console.log(evt.target);
    $('.container').addClass('is-open-modal');
    $('.show-post-option-interaction').addClass('is-open-reaction');

}

class ShowPost {

    constructor($container, dataPost) {
        this.$el = null;
        this.$container = $container;
        this.dataPost = dataPost;
        this.comments = [];
        this.reactions = [];
    }


    render() {
        const compileTmplate = compile(template)(
            this.dataPost
        );

        this.$container.append(compileTmplate);
        this.$el = this.$container.find('.show-post-single-container').last();

        this.dataPost.comments.forEach((comment) => {
            const commentObject = new Comment(this.$el.find('.show-post-comments'), comment);
            commentObject.render();
            this.comments.push(commentObject);

        });
        console.log(this.$el);
        this.dataPost.reactions.forEach((reaction) => {
            const reactionObject = new Reaction(this.$el.find('.show-reactions'), reaction);
            reactionObject.render();
            this.reactions.push(reactionObject);
        });

        //escuchar event enter del text area de comentario
        $('.show-post-insert').keypress((e) => {
            if (e.which == 13) {
                var dateNow = new Date().getTime();
                var postComment = $('.write-comment').val();
                var commentJson = {
                    user: {
                        name: this.dataPost.user.name,
                        img: ""
                    },
                    text: postComment,
                    date: dateNow
                }
                const commentObject = new Comment(this.$container.find('.show-post-comments'), commentJson);
                commentObject.render();
                this.comments.push(commentObject);
                $('.write-comment').val("");
            }
        });
        var numComments = this.comments.length;
        console.log(numComments);


        $('.show-post-btn').on('click', onReactionClick);


    };
}


export default ShowPost;
