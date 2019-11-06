import XLSX from 'xlsx'
export default class XlsxCnn {
	constructor(){
		this.sheetName="Registro"
		this.author="Mexpharm"
		this.title="Mexpharm (ficha de registro)"
	}
	createBook(){
		let wb = XLSX.utils.book_new();
		wb.props={
			Title:this.title,
			Author:this.author
		}
		wb.SheetNames.push(this.sheetName);
		var ws_data = [['hello' , 'world']];
		var ws = XLSX.utils.aoa_to_sheet(ws_data);
		wb.Sheets[this.sheetName] = ws;
		var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
		return wbout
	}
	s2ab(s) {
		console.log('s: ',s);
		var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
		var view = new Uint8Array(buf);  //create uint8array as viewer
		for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
		return buf;
	}
}
