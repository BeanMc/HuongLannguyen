/**
 * Created by nightshade on 7/27/16.
 */

url2pdf = require("url2pdf");


console.log(process.env.PWD);
var pdfsPath = process.env.PWD + '/server/pdfs';
var htmlsPath = process.env.PWD + '/server/htmls';
var rootUrl = Meteor.absoluteUrl();

// html zoom 0.5
console.log(rootUrl)
var htmlPath = 'nested/invoice.html';
function renderPDF(path,data) {
    // url2pdf.renderPdf(htmlsPath + '/tripnote.html', {
    // console.log("Rendered pdf @", data);
    url2pdf.renderFromHTML(data, {
        paperSize: {format: "A4", orientation: 'portrait'}, //Pretty self explanatory, adjust as needed
        saveDir: pdfsPath, //This is where the temporary files will be kept
        // idLength: 30 //The length of the file ID, adjust if you need to avoid conflicts or just want smaller filenames
    })
        .then(function(path){
            console.log("Rendered pdf @", Meteor.absoluteUrl(path));
            console.log("Rendered pdf @", path);
            // sendEmail('contact@unusualexpedition.com', 'Send test Invoice from Huan', 'Hi Jos, this is your invoice for your trip', path);
            sendEmail('nguyenhuyconglove@gmail.com', 'Send test Invoice from Huan', 'Hi Jos, this is your invoice for your trip', path);
        });
    // url2pdf.renderPdf("<b>thi is ssssss</b>", {
    //         paperSize: {format: "A4", orientation: 'portrait'}, //Pretty self explanatory, adjust as needed
    //         saveDir: pdfsPath, //This is where the temporary files will be kept
    //         idLength: 30 //The length of the file ID, adjust if you need to avoid conflicts or just want smaller filenames
    //     })
    //     .then(function(path){
    //         console.log("Rendered pdf @", Meteor.absoluteUrl(path));
    //         console.log("Rendered pdf @", path);
    //         // sendEmail('contact@unusualexpedition.com', 'Send test Invoice from Huan', 'Hi Jos, this is your invoice for your trip', path);
    //         sendEmail('nguyenhuyconglove@gmail.com', 'Send test Invoice from Huan', 'Hi Jos, this is your invoice for your trip', path);
    //     });
}

function sendEmail(customerEmail, subject, text, filePath) {
    var cid_value = Date.now() + '.image.jpg';

    // var html = 'Embedded image: <img src="cid:' + cid_value + '" />';

    if (filePath) {
        var attachments = [{
            fileName: 'unusual-expedition-invoice.pdf',
            // fileName: filePath.split('/').last(),
            filePath: filePath,
            cid: cid_value
        }];
    }
    console.log(attachments);



    Email.send({
        to: customerEmail,
        cc: 'nguyenhuyconglove@gmail.com',
        from: 'congkeonice@gmail.com',
        subject: subject,
        // text: text,
         attachments: attachments
    });
}


//
// function renderInvoice(path) {
//     var fs = Npm.require('fs');
//     // file originally saved as public/data/taxa.csv
//     // var data = fs.readFileSync(htmlsPath + '/invoice.html', 'utf8');
//     wkhtmltopdf(path, { output: pdfsPath + '/out.pdf', pageSize: 'letter', ignore: [/QFont::setPixelSize/] }, function (err, stream) {
//         console.log('hello');
//     });
// }

Meteor.startup(function () {
    // var fs = Npm.require('file-system');
        // renderPDF(rootUrl +'tripnote.html');
        var htmlPath = 'nested/invoice.html';

        // SSR.compileTemplate('emailText', Assets.getText(htmlPath));

        Template.emailText.helpers({
            time: function() {
                return new Date();
            }
        });

    var html = SSR.render("emailText", {time: new Date()});
    // console.log(typeof SSR.render("emailText", {time: new Date()}));
    // SSR.render("emailText", {time: new Date()})
     cheerio = Npm.require('cheerio')
     $ = cheerio.load(Assets.getText(htmlPath))
    $('#nameCustomer').html()
    console.log($('html').html())
    renderPDF(rootUrl +'private/tripnote.html',$('html').html());
});

SendInvoice = function () {
    renderPDF(rootUrl + 'invoice.html');
};


//
// Meteor.methods({
//     // loadFile:function(){
//     //     var fs = Npm.require('fs');
//     //     return fs.readFileSync(Meteor.absoluteUrl(path), 'utf8');
//     // }
// })