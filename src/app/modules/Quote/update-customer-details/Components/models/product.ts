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
	
	id: string = '';
	CustomerName: string = '';
	Dob:any = '';
	OccupationType:any='';
	SalaryPerAnnum:any='';
	BenefitCoverMonth:any='';
	SumInsured:any='';
    SectionId: string='';
    IdProofType:string = '';
    IdNo:string = '';IndustryName:any;
    JobJoiningMonth:string = '';NatureOfBusinessId:any;
    BetweenDiscontinued:string="N";MoneyInSafeBusinessSIYN:boolean=false;
	MoneyOutSafeBusinessSIYN:boolean=false;MoneyInPremisesSIYN:boolean=false;
	CashInTransitSIYN:boolean=false;CashInHandEmployeesSIYN:boolean=false;MoneyAnnualcarrySuminsuredSIYN:boolean=false;
	EthicalWorkInvolved:string='N';PowerPlantSIYN:boolean=false;CashInSafeSIYN:boolean=false;
	BuildingOwnerYn:any=null;InbuildConstructType:any=null;OutbuildConstructType:any=null;
	BuildingBuildYear:any='';BuildingFloors:any='';ElecMachinesSIYN:boolean=false;
	IndustryId:any='';CategoryId:any='';BreakDownCoverYN:any='No';MoneyCoverYN:any="No";
	FidelityCoverYN:any="No";WcYN:any="No";LiabilityYN:any="No";GoodsYN:any="No";
	ElecEquipSuminsured:any='0';MoneySinglecarrySuminsured:any='0';EquipmentSIYN:boolean=false;
	BuildingSuminsured:any='0';ContentSuminsured:any='0';TotalExcludedEmployees:any;
	GoodsTurnoverSuminsured:any='0';GoodsSinglecarrySuminsured:any='0';GeneralMachineSIYN:boolean=false;
	EmpliabilityExcessSuminsured:any='0';EmpliabilityAnnualSuminsured:any='0';MachineEquipSIYN:boolean=false
	FidelityAnnualSuminsured:any='0';FidelityAnyoccuSuminsured:any='0';BoilerPlantsSIYN:boolean=false;
	MoneyAnnualcarrySuminsured:any='0';MoneyInsafeSuminsured:any='0';ManuUnitsSIYN:boolean=false;
	CashInHandDirectors:any='0';CashInTransit:any='0';CashInHandEmployees:any='0';
	CashInSafe:any='0';CashInPremises:any='0';RevenueFromStamps:any='0';MoneyInSafeBusiness:any='0';
	MoneyOutSafeBusiness:any='0';MoneyInPremises:any='0';MoneyInLocker:any='0';
	TpliabilityAnyoccuSuminsured:any='0';PersonalIntermediarySuminsured:any='0';
	BuildingUsageId: any='';Status:any='Y';TotalNoOfEmployees:any;TotalRejoinedEmployees:any;
	PersonalAccidentSuminsured: any;LiabilityOccupationId:any='';AccountOutstandingEmployees:any;
	AllriskSumInsured: any = '0';WallType:any='';RoofType:any='';TotalOutstandingAmount:any;
	AccountAuditentType:any;
	/*Product Burglary*/
	NatureOfTradeId:any='';InternalWallType:any='';
	CeilingType: any = '';WindowsMaterialId:any='';
	RegionCode: any = '';NightLeftDoor:any='';
	DistrictCode: any = '';InsuranceForId:any=[];
	DoorsMaterialId: any = '';StockInTradeSi:any='';
	GoodsSi:any='';FurnitureSi:any='';ApplianceSi:any='';
	CashValueablesSi:any='';OccupiedYear:any='';
	WatchmanGuardHours:any='';AccessibleWindows:any='';ShowWindow:any='';
	FrontDoors:any='';BackDoors:any='';TrapDoors:any='';
	Address:any='';CategoryDesc:any='';
	BuildingOccupied: any = '';
	FirstLossPercentId:any='';
	IndemityPeriod:any='';
	MakutiYn:any='';
	PlasteGlassType:any='';PowerPlantSi:any='0';
	BoilerPlantsSi:any='0';ElecMachinesSi:any='0';
	ManuUnitsSi: any='0';
	MachineEquipSi: any='0';
	GeneralMachineSi: any='0';
	EquipmentSi: any='0';
	category_1:any[]=[];employeeList:any[]=[];
	fidelityList: any[]=[];StockLossPercent:any='';
	GoodsLossPercent:any='';FurnitureLossPercent:any='';
	ApplianceLossPercent:any='';CashValueablesLossPercent:any='';
	MiningPlantSi:any='0';NonminingPlantSi:any='0';GensetsSi:any='0';
	ElectronicEquipSuminsured:any ='0';
	
	constructor(data?) {
		this.id = data?.id ?? ''
		this.CustomerName = data?.CustomerName ?? '';
		this.Dob = data?.Dob ?? '';
		this.OccupationType = data?.OccupationType ?? '';
		this.SalaryPerAnnum = data?.SalaryPerAnnum ?? '';
		this.BenefitCoverMonth = data?.BenefitCoverMonth ?? '';
		this.SumInsured = data?.SumInsured ?? '';
		this.SectionId = data?.SectionId ?? '';
		this.IndustryName = data?.IndustryName ?? '';
		this.NatureOfBusinessId = data?.NatureOfBusinessId ?? '';
		this.TotalNoOfEmployees = data?.TotalNoOfEmployees ?? '';
		this.TotalExcludedEmployees = data?.TotalExcludedEmployees ?? '';
		this.TotalRejoinedEmployees = data?.TotalRejoinedEmployees ?? '';
		this.TotalOutstandingAmount = data?.TotalOutstandingAmount ?? '';
		this.AccountOutstandingEmployees = data?.AccountOutstandingEmployees ?? '';
		this.AccountAuditentType = data?.AccountAuditentType ?? '';
		this.IdProofType = data?.IdProofType ?? '';
		this.IdNo = data?.IdNo ?? '';
		this.CategoryDesc = data?.CategoryDesc ?? '';
		this.JobJoiningMonth = data?.JobJoiningMonth ?? '';
		this.BetweenDiscontinued = data?.BetweenDiscontinued ?? '';
		this.EthicalWorkInvolved = data?.EthicalWorkInvolved ?? '';
		this.IndustryId = data?.IndustryId ?? '';
		this.CategoryId = data?.CategoryId ?? '';
		this.BuildingOwnerYn = data?.BuildingOwnerYn ?? null;
		this.InbuildConstructType = data?.InbuildConstructType ?? null;
		this.OutbuildConstructType = data?.OutbuildConstructType ?? null;
		this.BuildingBuildYear = data?.BuildingBuildYear ?? '';
		this.BuildingFloors = data?.BuildingFloors ?? '';
		this.WallType = data?.WallType ?? '';
		this.RoofType = data?.RoofType ?? '';
		this.BuildingUsageId = data?.BuildingUsageId ?? '';
		this.PersonalIntermediarySuminsured = data?.PersonalIntermediarySuminsured ?? '';
		this.PersonalAccidentSuminsured = data?.PersonalAccidentSuminsured ?? '';
		this.AllriskSumInsured = data?.AllriskSumInsured ?? '';
		this.ElecEquipSuminsured = data?.ElecEquipSuminsured ?? '';
		this.MoneySinglecarrySuminsured = data?.MoneySinglecarrySuminsured ?? '';
		this.ContentSuminsured = data?.ContentSuminsured ?? '';
		this.BuildingSuminsured = data?.BuildingSuminsured ?? '';
		this.GoodsTurnoverSuminsured =  data?.GoodsTurnoverSuminsured ?? '';
		this.GoodsSinglecarrySuminsured = data?.GoodsSinglecarrySuminsured ?? '';
		this.EmpliabilityAnnualSuminsured = data?.EmpliabilityAnnualSuminsured ?? '';
		this.FidelityAnnualSuminsured = data?.FidelityAnnualSuminsured ?? '';
		this.MoneyAnnualcarrySuminsured = data?.MoneyAnnualcarrySuminsured ?? '';
		this.MoneyInsafeSuminsured = data?.MoneyInsafeSuminsured ?? '';
		this.TpliabilityAnyoccuSuminsured = data?.TpliabilityAnyoccuSuminsured ?? '';
		this.BreakDownCoverYN = data?.BreakDownCoverYN ?? 'No';
		this.FidelityCoverYN = data?.FidelityCoverYN ?? 'No';
		this.Status = data?.Status ?? 'Y';
		this.WcYN = data?.WcYN ?? 'No';
		this.LiabilityYN = data?.LiabilityYN ?? 'No';
		this.GoodsYN = data?.GoodsYN ?? 'No';
		this.NatureOfTradeId = data?.NatureOfTradeId ?? '';
		this.InternalWallType = data?.InternalWallType ?? '';
		this.CeilingType = data?.CeilingType ?? '';
		this.RegionCode = data?.RegionCode ?? '';
		this.DistrictCode = data?.DistrictCode ?? '';
		this.WindowsMaterialId = data?.WindowsMaterialId ?? '';
		this.DoorsMaterialId = data?.DoorsMaterialId ?? '';
		this.NightLeftDoor = data?.NightLeftDoor ?? '';
		this.BuildingOccupied = data?.BuildingOccupied ?? '';
		this.InsuranceForId = data?.InsuranceForId ?? []
		this.StockInTradeSi = data?.StockInTradeSi ?? '';
		this.GoodsSi = data?.GoodsSi ?? '';
		this.FurnitureSi = data?.FurnitureSi ?? '';
		this.ApplianceSi = data?.ApplianceSi ?? '';
		this.CashValueablesSi = data?.CashValueablesSi ?? '';
		this.OccupiedYear = data?.OccupiedYear ?? '';
		this.WatchmanGuardHours = data?.WatchmanGuardHours ?? '';
		this.AccessibleWindows = data?.AccessibleWindows ?? '';
		this.ShowWindow = data?.ShowWindow ?? '';
		this.FrontDoors = data?.FrontDoors ?? '';
		this.BackDoors = data?.BackDoors ?? '';
		this.TrapDoors = data?.TrapDoors ?? '';
		this.Address = data?.Address ?? '';
		this.CashInHandDirectors = data?.CashInHandDirectors ?? '0';
		this.CashInTransit = data?.CashInTransit ?? '0';
		this.CashInHandEmployees = data?.CashInHandEmployees ?? '0';
		this.CashInSafe = data?.CashInSafe ?? '0';
		this.CashInPremises = data?.CashInPremises ?? '0';
		this.RevenueFromStamps = data?.RevenueFromStamps ?? '0';
		this.MoneyInSafeBusiness = data?.MoneyInSafeBusiness ?? '0';
		this.MoneyOutSafeBusiness = data?.MoneyOutSafeBusiness ?? '0';
		this.MoneyInLocker = data?.MoneyInLocker ?? '0';
		this.FirstLossPercentId = data?.FirstLossPercentId ?? '';
		this.IndemityPeriod = data?.IndemityPeriod ?? '';
		this.MakutiYn = data?.MakutiYn ?? '';
		this.PlasteGlassType = data?.PlasteGlassType ?? '';
		this.BoilerPlantsSi = data?.BoilerPlantsSi ?? '0';
		this.ElecMachinesSi = data?.ElecMachinesSi ?? '0';
		this.EquipmentSi = data?.EquipmentSi ?? '0';
		this.GeneralMachineSi = data?.GeneralMachineSi ?? '0';
		this.MachineEquipSi = data?.MachineEquipSi ?? '0';
		this.ManuUnitsSi = data?.ManuUnitsSi ?? '0';
		this.PowerPlantSi = data?.PowerPlantSi ?? '0';
		this.employeeList = data?.EmployeeList ?? [];
		this.fidelityList = data?.FidelityList ?? [];
		this.StockLossPercent = data?.StockLossPercent ?? '';
		this.GoodsLossPercent = data?.GoodsLossPercent ?? '';
		this.FurnitureLossPercent = data?.FurnitureLossPercent ?? '';
		this.ApplianceLossPercent = data?.ApplianceLossPercent ?? '';
		this.CashValueablesLossPercent = data?.CashValueablesLossPercent ?? '';
		this.MiningPlantSi  = data?.MiningPlantSi ?? '0';
		this.NonminingPlantSi = data?.NonminingPlantSi ?? '0';
		this.GensetsSi = data?.GensetsSi ?? '0';
		this.ElectronicEquipSuminsured = data?.ElecEquipSuminsured ?? '0';
		// this.EquipmentSi = data?.EquipmentSi ?? '0';
		// this.ElectronicEquipSuminsured = data.ElectronicEquipSuminsured ?? '0';
	}
}
