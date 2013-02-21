
/// <reference path="tris.js" />
/// <reference path="backbone.js" />
/// <reference path="jquery-1.9.1.js" />

(function ($) {

    var NewGameView = Backbone.View.extend({
        tagName: "div",

        template: _.template($("#tpl-init-game").html()),

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        events: {
            "click button": "newGame"
        },

        newGame: function () {
            var players = $(this.el).find("input");
            var player1Name = players.eq(0).val();
            var player2Name = players.eq(1).val();
            this.model.set("player1Name", player1Name);
            this.model.set("player2Name", player2Name);
            app.navigate("game", { trigger: true });
            return false;
        }
    });

    var GameModel = Backbone.Model.extend();

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "newGame",
            "game": "startGame"
        },

        newGame: function () {

            this.gameModel = new GameModel();
            this.newGameView = new NewGameView({ model: this.gameModel });
            $('#tris').html(this.newGameView.render().el);
        },

        startGame: function () {
            if (this.gameModel == undefined)
                this.navigate("", { trigger: true });
            else {
                var tris = new Tris(this.gameModel.get("player1Name"),
                                    this.gameModel.get("player2Name"));
            }
        }
    });

    var app = new AppRouter();
    Backbone.history.start();

})(jQuery);