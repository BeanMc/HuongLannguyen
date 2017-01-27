Customers = new Mongo.Collection('customers');

var Schemas = {};

Schemas.customers = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
    },
    email: {
        type: String,
        label: "Email"
    },
    nationality: {
        type: String,
        label: "Nationality"
    },
});


Customers.attachSchema(Schemas.customers);
AdminConfig = {
    collections: {
        Customers: {
            tableColumns: [
                {label: 'Name', name: 'name'},
                {label: 'Email', name: 'email'},
                {label: 'Nationality', name: 'nationality'},
            ]
        }
    }
};