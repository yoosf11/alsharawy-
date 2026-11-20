
const LocalDB = {
    save: (key, data) => localStorage.setItem(`als_#_${key}`, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(`als_#_${key}`)) || []
};

if (!localStorage.getItem('als_#_initialized')) {
    LocalDB.save('products', [
        { id: 1, name: 'صنف تجريبي ١', barcode: '1234567890123', price: 150, cost: 100, stock: 20 },
        { id: 2, name: 'صنف تجريبي ٢', barcode: '9876543210987', price: 250, cost: 180, stock: 15 }
    ]);
    LocalDB.save('contacts', [
        { id: 1, type: 'customer', name: 'عميل عام', phone: '01000000000' },
        { id: 2, type: 'supplier', name: 'مورد رئيسي', phone: '01111111111' }
    ]);
    LocalDB.save('initialized', true);
}

function getProducts() { return LocalDB.get('products'); }
function saveProduct(product) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) products[index] = product;
    else {
        product.id = Date.now();
        products.push(product);
    }
    LocalDB.save('products', products);
}

function getInvoices() { return LocalDB.get('invoices'); }
function saveInvoice(invoiceData, items) {
    const invoices = getInvoices();
    const newInvoice = {
        id: Date.now(),
        number: invoices.length + 1,
        date: new Date().toISOString(),
        ...invoiceData,
        items: items
    };
    invoices.push(newInvoice);
    LocalDB.save('invoices', invoices);

    const products = getProducts();
    items.forEach(item => {
        const prod = products.find(p => p.barcode === item.barcode);
        if (prod) {
            if (invoiceData.type === 'sale') prod.stock -= item.qty;
            if (invoiceData.type === 'purchase') prod.stock += item.qty;
        }
    });
    LocalDB.save('products', products);
    return newInvoice;
}

function getExpenses() { return LocalDB.get('expenses'); }
function saveExpense(expenseData) {
    const expenses = getExpenses();
    expenseData.id = Date.now();
    expenses.push(expenseData);
    LocalDB.save('expenses', expenses);
}

function getContacts() { return LocalDB.get('contacts'); }
function saveContact(contactData) {
    const contacts = getContacts();
    contactData.id = Date.now();
    contacts.push(contactData);
    LocalDB.save('contacts', contacts);
}