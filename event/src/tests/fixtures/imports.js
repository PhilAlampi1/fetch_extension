export const defaultState = {
    confirmRowIdentifiers: false,
    importConfirmed: false,
    importFileNameConfirmed: false,
    importRowIdentifierValues: [],
    importSetupArray: [], // holds import setup values to be matched with formMapgArray from DB
    formMappingArray: [], // holds a dump of that form's mapgs from DB
    importDataArray: [] // holds the final cut of data to be imported to the form
}

export const standardFields = [{
    standardFieldId: "1",
    standardFieldName: "Mapping Field (IDX)",
    standardFieldDescription: "A field for mapping.",
    importRowIdentifier: false,
    importedFieldName: "IDX Address Mapg"
}, {
    standardFieldId: "2",
    standardFieldName: "Type of Property",
    standardFieldDescription: "The type of building or structure the property is.",
    importRowIdentifier: false,
    importedFieldName: "Property Type"
}, {
    standardFieldId: "3",
    standardFieldName: "Address",
    standardFieldDescription: "Address of property.",
    importRowIdentifier: true,
    importedFieldName: "Street Address"
}]

export const rowIdentifiers = [{
    rowIdentifierId: "1",
    rowIdentifierName: "Listing Comp 1",
    rowIdentifierPrefix: "L1"
}, {
    rowIdentifierId: "2",
    rowIdentifierName: "Listing Comp 2",
    rowIdentifierPrefix: "L2"
}, {
    rowIdentifierId: "3",
    rowIdentifierName: "Listing Comp 3",
    rowIdentifierPrefix: "L3"
}]

export const rowIdentifiersWithImportedRowAssignments = [{
    rowIdentifierId: "1",
    rowIdentifierName: "Listing Comp 1",
    rowIdentifierPrefix: "L1",
    importedRowIdentifierValue: "2983 Briggs Avenue"
}, {
    rowIdentifierId: "2",
    rowIdentifierName: "Listing Comp 2",
    rowIdentifierPrefix: "L2",
    importedRowIdentifierValue: "2731 Kingsbridge Terrace"
}, {
    rowIdentifierId: "3",
    rowIdentifierName: "Listing Comp 3",
    rowIdentifierPrefix: "L3"
}]

export const importedData = [{
    "Baths Full": "2",
    "Baths Half": "0",
    "Lot Size": "0.0631",
    "Street Address": "2983 Briggs Avenue",
    "Financing": "",
    "Fireplacesnumberof": "",
    "City/Town": "Bronx",
    "State Or Province": "NY",
    "Monthly Common Charge/HOA Fee": "",
    "Hoa Fee Includes": "",
    "Basement Description": "Full, Partially Finished, Walk Out",
    "Style": "Two Story",
    "Air Conditioning": "Window Units",
    "Contract Date": "",
    "Current Price": "350000",
    "DOM": "2",
    "List Price": "350000",
    "Listing Date": "2017-04-01",
    "Concessions Paid By Seller": "",
    "MLS Number": "4713175",
    "Parking": "Street Parking",
    "Year Built": "1920",
    "Postal Code": "10458",
    "Original List Price": "400000",
    "Heating Type": "Radiator",
    "Last List Price": "400000",
    "Number Of Units Total": "2",
    "Numof Levels": "",
    "Property Type": "Multi-Family 2-4",
    "Sold Date": "",
    "Sold Price": "",
    "Sq Ft Total": "2484",
    "Status": "Active",
    "Total Rooms Finished": "",
    "Zoning": "",
    "Beds Total": "6",
    "List Agent Direct Work Phone": "(646) 326-2474",
    "List Agent Full Name": "Tashecca Winstead",
    "List Office Name": "Keller Williams Realty NYC Grp",
    "Location Description": "",
    "Num Cars Garage Parking": "",
    "Numberof Residential Units": "",
    "RATIO List Price By SQFT": "140.9",
    "REO Bank Owned": "FALSE",
    "School District": "Bronx",
    "Improvement Remarks": "",
    "IDX Address Mapg": "TRUE",
    "Living Quarters Description": "",
    "Lot Description": "",
    "Marketing Remarks": "With a little attention, this Bedford Park area home is a great investment and has great income potential. This legal 2 family home with both a front and back yard features two three bedroom one bathroom apartments both with formal dining rooms separate from the living room. The First floor unit boasts a front porch while the 2nd floor has a balcony. The attic space is finished and has a separate entrance and is easily accessible to both the 2nd floor unit and balcony if a family would like to use it as an additional bedroom. The partially finished basement has entrances within the home's foyer and the backyard. Public transportation is abundant The Metro-North, 4 and D trains as well as the 1/2, 10, 26, 34 and Bee-line and Manhattan Express buses are all within walking distance. Short Sale subject to third part approval."
}, {
    "Baths Full": "4",
    "Baths Half": "1",
    "Lot Size": "0.1214",
    "Street Address": "2731 Kingsbridge Terrace",
    "Financing": "",
    "Fireplacesnumberof": "",
    "City/Town": "Bronx",
    "State Or Province": "NY",
    "Monthly Common Charge/HOA Fee": "",
    "Hoa Fee Includes": "",
    "Basement Description": "",
    "Style": "",
    "Air Conditioning": "None",
    "Contract Date": "2016-10-03",
    "Current Price": "725000",
    "DOM": "41",
    "List Price": "725000",
    "Listing Date": "2016-08-23",
    "Concessions Paid By Seller": "",
    "MLS Number": "4637789",
    "Parking": "None",
    "Year Built": "1930",
    "Postal Code": "10463",
    "Original List Price": "725000",
    "Heating Type": "Radiant",
    "Last List Price": "680000",
    "Number Of Units Total": "3",
    "Numof Levels": "",
    "Property Type": "Multi-Family 2-4",
    "Sold Date": "",
    "Sold Price": "",
    "Sq Ft Total": "2492",
    "Status": "Contract",
    "Total Rooms Finished": "",
    "Zoning": "",
    "Beds Total": "5",
    "List Agent Direct Work Phone": "(914) 494-1549",
    "List Agent Full Name": "Arif Baksh",
    "List Office Name": "Besmatch Real Estate",
    "Location Description": "",
    "Num Cars Garage Parking": "",
    "Numberof Residential Units": "",
    "RATIO List Price By SQFT": "290.93",
    "REO Bank Owned": "",
    "School District": "Bronx",
    "Improvement Remarks": "",
    "IDX Address Mapg": "TRUE",
    "Living Quarters Description": "",
    "Lot Description": "",
    "Marketing Remarks": "Calling all investors! Handy Man Special! 3 family home sitting on a 54x97 lot / R6 Zoning. Minutes from Manhattan, perfect location! 3 Bedroom Over a 2 Bedroom, Over Studio. This House Will Not Last!"
}]

export const importedFieldNames = [
    "Baths Full",
    "Baths Half",
    "Lot Size",
    "Street Address",
    "Financing",
    "Fireplacesnumberof",
    "City/Town",
    "State Or Province",
    "Monthly Common Charge/HOA Fee",
    "Hoa Fee Includes",
    "Basement Description",
    "Style",
    "Air Conditioning",
    "Contract Date",
    "Current Price",
    "DOM",
    "List Price",
    "Listing Date",
    "Concessions Paid By Seller",
    "MLS Number",
    "Parking",
    "Year Built",
    "Postal Code",
    "Original List Price",
    "Heating Type",
    "Last List Price",
    "Number Of Units Total",
    "Numof Levels",
    "Property Type",
    "Sold Date",
    "Sold Price",
    "Sq Ft Total",
    "Status",
    "Total Rooms Finished",
    "Zoning",
    "Beds Total",
    "List Agent Direct Work Phone",
    "List Agent Full Name",
    "List Office Name",
    "Location Description",
    "Num Cars Garage Parking",
    "Numberof Residential Units",
    "RATIO List Price By SQFT",
    "REO Bank Owned",
    "School District",
    "Improvement Remarks",
    "IDX Address Mapg",
    "Living Quarters Description",
    "Lot Description",
    "Marketing Remarks"
]

export const importRowIdentifierField = "Street Address"

export const importRowIdentifierValues = [
    "2983 Briggs Avenue",
    // "2787 Briggs Avenue",
    // "East 190 205th Street",
    // "3220 Corlear Avenue",
    // "East 223 203rd Street",
    // "2932 Valentine Avenue",
    "2731 Kingsbridge Terrace"
    // "2789 Morris Avenue",
    // "3415 Corlear Avenue",
    // "East 188 205th Street"
]

export const importSetupArray = [{
    importedFieldValue: "TRUE",
    importRowIdentifierId: "1",
    standardFieldId: "1" //IDX Address Mapg
},{
    importedFieldValue: "Multi-Family 2-4",
    importRowIdentifierId: "1",
    standardFieldId: "2" //Property Type
},{
    importedFieldValue: "2983 Briggs Avenue",
    importRowIdentifierId: "1",
    standardFieldId: "3" //address
},{
    importedFieldValue: "TRUE",
    importRowIdentifierId: "2",
    standardFieldId: "1" //IDX Address Mapping
},{
    importedFieldValue: "Multi-Family 2-4",
    importRowIdentifierId: "2",
    standardFieldId: "2" //Property Type
},{
    importedFieldValue: "2731 Kingsbridge Terrace",
    importRowIdentifierId: "2",
    standardFieldId: "3" //address
}]

export const importFieldOptions = [
    "Street Address",
    "Property Type",
    "IDX Address Mapg"
]

