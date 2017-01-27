/**
 * Created by HuycongNguyen on 12/2/2016.
 */
Template.body.onRendered(function () {
    Meteor.call("loadFile")
})