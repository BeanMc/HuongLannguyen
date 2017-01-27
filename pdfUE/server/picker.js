/**
 * Created by nightshade on 7/27/16.
 */
Picker.route('/gravity', function(params, req, res, next) {
    var query = params.query || {};
    SendInvoice();
    res.end(JSON.stringify(query));
});