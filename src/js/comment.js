import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/comment.hbs";

class Comment{

    constructor($container, dataComment){
        this.$container = $container;
        this.dataComment = dataComment;
    }

    render(){

        const date = new Date().getTime(),
            timePassed = Math.ceil((date - (this.dataComment.date * 1000)) / (1000 * 60 * 60 * 24));
        console.log(date, this.dataComment.date, (date - (this.dataComment.date * 1000)));
        let compileTmplate;

        this.dataComment.date = timePassed;

        compileTmplate = compile(template)(this.dataComment);
        this.$container.append(compileTmplate);
    }
}

export default Comment;