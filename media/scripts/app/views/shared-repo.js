define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'text!' + app.config._tmplRoot + 'shared-repo.html'
], function($, _, Backbone, Common, reposTemplate) {
    'use strict';

    var SharedRepoView = Backbone.View.extend({
        tagName: 'tr',

        template: _.template(reposTemplate),

        events: {
            'mouseenter': 'showAction',
            'mouseleave': 'hideAction',
            'click .unshare-btn': 'unshare'
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },

        unshare: function() {
            var _this = this,
                after_remove_shared_repo = function(data) {
                    if (data['success']) {
                        _this.$el.remove();
                        Common.feedback(gettext('Success'), 'success', Common.SUCCESS_TIMOUT);
                    };
                };
            Common.ajaxGet({
                'get_url': Common.getUrl({name: 'ajax_remove_shared_repo'}),
                'data': {'repo_id': this.model.get('id'), 'from': this.model.get('owner'), 'to': app.pageOptions.current_user},
                'after_op_success': after_remove_shared_repo
            });
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        showAction: function() {
            this.$el.addClass('hl');
            this.$el.find('.op-icon').removeClass('vh');
        },

        hideAction: function() {
            this.$el.removeClass('hl');
            this.$el.find('.op-icon').addClass('vh');
        },
    });

    return SharedRepoView;
});
