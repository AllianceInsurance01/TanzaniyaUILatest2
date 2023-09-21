export class Product {
	ref: any = null
	ts: number = 0
	data: ProductData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new ProductData(product)
	}
}

export class ProductData {
	
	
	Name:any=null;
	Gender:any=null;      
	Dob:any=null;PayingTerm:any=null;  
	PolicyTerm:any=null;   
	constructor(data?) {
		this.Name = data?.Name ?? '';
	  this.Gender = data?.Gender ?? '1';
	  this.Dob = data?.Dob ?? null;
	  this.PayingTerm = data?.PayingTerm ?? null;
	  this.PolicyTerm = data?.PolicyTerm ?? null;
		// this.EquipmentSi = data?.EquipmentSi ?? '0';
		// this.ElectronicEquipSuminsured = data.ElectronicEquipSuminsured ?? '0';
	}
}
