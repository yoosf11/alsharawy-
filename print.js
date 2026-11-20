
function printReceipt(invoiceNumber, items, total) {
    const systemName = document.getElementById('sys-title').innerText;
    let itemsHtml = items.map(item => `
        <tr><td style="text-align:right; padding:4px 0;">${item.name}</td><td style="text-align:center;">${item.qty}</td><td style="text-align:left;">${item.total} ج.م</td></tr>
    `).join('');

    document.getElementById('print-area').innerHTML = `
        <div style="width: 76mm; font-family: 'Cairo', sans-serif; direction: rtl; padding: 10px; color: #000;">
            <h2 style="text-align:center; margin:0; font-size:22px; font-weight:800;">${systemName}</h2>
            <p style="text-align:center; font-size:12px; margin:4px 0;">فاتورة رقم: #${invoiceNumber}</p>
            <p style="text-align:center; font-size:11px; margin:4px 0;">${new Date().toLocaleString('ar-EG')}</p>
            <hr style="border-top: 1px dashed #000; margin: 10px 0;">
            <table style="width:100%; font-size:12px; border-collapse: collapse;">
                <thead><tr style="border-bottom: 1px solid #000;"><th style="text-align:right;">الصنف</th><th>الكمية</th><th style="text-align:left;">الإجمالي</th></tr></thead>
                <tbody>${itemsHtml}</tbody>
            </table>
            <hr style="border-top: 1px dashed #000; margin: 10px 0;">
            <div style="font-size:16px; font-weight:bold; display:flex; justify-content:space-between;">
                <span>الإجمالي الصافي:</span><span>${total} ج.م</span>
            </div>
            <p style="text-align:center; font-size:11px; margin-top:15px;">شكراً لتعاملكم معنا</p>
        </div>
    `;
    window.print();
}

function printBarcodeLabel(productName, barcodeValue, price) {
    const systemName = document.getElementById('sys-title').innerText;
    document.getElementById('print-area').innerHTML = `
        <div style="width: 50mm; height: 30mm; text-align:center; font-family:'Cairo', sans-serif; padding:5px; color: #000; box-sizing: border-box;">
            <div style="font-size:11px; font-weight:bold; margin-bottom:2px;">${systemName}</div>
            <div style="font-size:10px; margin-bottom:4px;">${productName}</div>
            <svg id="barcode-svg" style="max-height: 40px;"></svg>
            <div style="font-size:12px; font-weight:bold; margin-top:2px;">السعر: ${price} ج.م</div>
        </div>
    `;
    JsBarcode("#barcode-svg", barcodeValue, {
        format: "CODE128", width: 1.5, height: 40, displayValue: true, fontSize: 11
    });
    window.print();
}

