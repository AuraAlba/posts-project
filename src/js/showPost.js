import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/showPost.hbs";
import Comment from "./comment";
import Reaction from "./reaction";
import {nameUser} from './dataUser';


class ShowPost {

    constructor($container, dataPost) {
        this.$el = null;
        this.$container = $container;
        this.dataPost = dataPost;
        this.comments = [];
        this.reactions = [];
        this.totalReactions = 0;
    }

    onReactionClick(evt) {
        const $target = $(evt.target);
        $('.container').addClass('is-open-modal');
        this.$el.find('.show-post-option-interaction').addClass('is-open-reaction');
    }

    onOptionColorClick(evt) {
        const $target = $(evt.target);
        this.$el.find('.show-option-color').removeClass('is-active');
        $target.addClass('is-active');
        this.selectedReaction = $target.data("reaction");
    }

    onCloseX() {
        $('.container').removeClass('is-open-modal');
        this.$el.find('.show-post-option-interaction').removeClass('is-open-reaction');
        this.$el.find('.show-option-color').removeClass('is-active');
    }

    onBtnInteractionClick() {
        const reactionObject = new Reaction(this.$el.find('.show-reactions'), {
            id: "",
            name: this.selectedReaction,
            number: 1
        });
        reactionObject.render();
        this.totalReactions += 1;
        this.reactions.push(reactionObject);
        this.onCloseX();
        this.$el.find('.total-reactions').text(this.totalReactions);
    }

    render() {

        const date = new Date().getTime(),
            timePassed = Math.ceil((date - (this.dataPost.date * 1000)) / (1000 * 60 * 60 * 24));
        this.dataPost.date = timePassed;
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
        this.dataPost.reactions.forEach((reaction) => {
            const reactionObject = new Reaction(this.$el.find('.show-reactions'), reaction);
            this.totalReactions += reaction.number;
            reactionObject.render();
            this.reactions.push(reactionObject);
        });

        this.$el.find('.total-reactions').text(this.totalReactions);

        //escuchar event enter del text area de comentario
        this.$el.find('.show-post-insert').keypress((e) => {
            if (e.which == 13) {
                const dateNow = new Date().getTime() / 1000;
                const postComment = this.$el.find('.write-comment').val();
                const commentJson = {
                    user: {
                        name: nameUser,
                        img: ""
                    },
                    text: postComment,
                    date: dateNow
                };
                const commentObject = new Comment(this.$container.find('.show-post-comments'), commentJson);

                commentObject.render();
                this.comments.push(commentObject);
                this.$el.find('.total-comments span').text(this.comments.length);
                this.$el.find('.write-comment').val("");
            }
        });

        this.$el.find('.show-post-btn').on('click', this.onReactionClick.bind(this));
        this.$el.find('.show-option-color').on('click', this.onOptionColorClick.bind(this));
        this.$el.find('.show-option-close').on('click', this.onCloseX.bind(this));
        this.$el.find('.option-btn').on('click', this.onBtnInteractionClick.bind(this));
        this.$el.find('.reaction-btn').on('click', this.onReactionClick.bind(this));
    };
}


export default ShowPost;
