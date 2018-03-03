import $ from "jquery";
import {compile} from "handlebars";
import template from "../hbs/reaction.hbs";

class Reaction{

    constructor($container, dataReaction){
        this.$el=null;
        this.$container = $container;
        this.dataReaction = dataReaction;
    }

    render(){
        const compileTmplate = compile(template)(this.dataReaction);

        console.log(this.$container, compileTmplate);
        this.$container.append(compileTmplate);
        this.$el = this.$container.find('.reactions-circle').last();
        this.$el.addClass(this.dataReaction.name);
    };
}



export default Reaction;