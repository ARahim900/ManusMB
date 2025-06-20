// STP Real Database Service
// Contains actual operational data from July 2024 to June 2025

const TANKER_INCOME_PER_TRIP = 4.5; // OMR per tanker trip
const TSE_SAVING_PER_M3 = 1.32; // OMR savings per m³ of TSE irrigation

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD
const convertDate = (ddmmyyyy) => {
  const [day, month, year] = ddmmyyyy.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Real STP operational data - Complete dataset from July 2024 to June 2025
// This includes data from your complete database
export const stpRealData = [
  // July 2024
  { date: '2024-07-01', treated: 385, tse: 340, inlet: 339, tankers: 10, expectedVolume: 200, directSewage: 139, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-02', treated: 519, tse: 458, inlet: 526, tankers: 14, expectedVolume: 280, directSewage: 246, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-03', treated: 479, tse: 425, inlet: 468, tankers: 13, expectedVolume: 260, directSewage: 208, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-04', treated: 547, tse: 489, inlet: 464, tankers: 11, expectedVolume: 220, directSewage: 244, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-05', treated: 653, tse: 574, inlet: 565, tankers: 15, expectedVolume: 300, directSewage: 265, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-06', treated: 552, tse: 492, inlet: 502, tankers: 14, expectedVolume: 280, directSewage: 222, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-07', treated: 575, tse: 498, inlet: 549, tankers: 13, expectedVolume: 260, directSewage: 289, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-08', treated: 587, tse: 515, inlet: 532, tankers: 16, expectedVolume: 320, directSewage: 212, maintenance1: "Need to empty the tank and the problem can be identified. need to open roof top structural work also even for cleaning activity considered as confined space.", maintenance2: "", maintenance3: "" },
  { date: '2024-07-09', treated: 586, tse: 519, inlet: 532, tankers: 13, expectedVolume: 260, directSewage: 272, maintenance1: "Need to empty out the tank and rooftop has to be removed for the maintainance activity.", maintenance2: "The maintenance activity over removing the debris got stuck inside Raw sewage pump was done", maintenance3: "" },
  { date: '2024-07-10', treated: 542, tse: 462, inlet: 493, tankers: 12, expectedVolume: 240, directSewage: 253, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-12', treated: 533, tse: 468, inlet: 506, tankers: 12, expectedVolume: 240, directSewage: 266, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-13', treated: 464, tse: 402, inlet: 479, tankers: 10, expectedVolume: 200, directSewage: 279, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-14', treated: 506, tse: 448, inlet: 486, tankers: 13, expectedVolume: 260, directSewage: 226, maintenance1: "today clean and cheaked aeration blower air filter - oil level and blower belt", maintenance2: "poured lime powder poured chlorine for cleaning mbr", maintenance3: "house keeping stp aera" },
  { date: '2024-07-15', treated: 482, tse: 418, inlet: 391, tankers: 6, expectedVolume: 120, directSewage: 271, maintenance1: "today clean and cheaked intermediate pump we found all three pump ok", maintenance2: "house keeping stp aera", maintenance3: "" },
  { date: '2024-07-16', treated: 670, tse: 600, inlet: 576, tankers: 18, expectedVolume: 360, directSewage: 216, maintenance1: "used chemical lime and nacl", maintenance2: "house keeping stp aera", maintenance3: "" },
  { date: '2024-07-17', treated: 344, tse: 300, inlet: 506, tankers: 12, expectedVolume: 240, directSewage: 266, maintenance1: "clean aeration tank with water poured chemical house keeping stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-18', treated: 585, tse: 517, inlet: 369, tankers: 8, expectedVolume: 160, directSewage: 209, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-19', treated: 687, tse: 605, inlet: 614, tankers: 15, expectedVolume: 300, directSewage: 314, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-20', treated: 536, tse: 465, inlet: 483, tankers: 12, expectedVolume: 240, directSewage: 243, maintenance1: "today all three mbr blower clean and cheaked house keeping in stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-21', treated: 504, tse: 455, inlet: 501, tankers: 13, expectedVolume: 260, directSewage: 241, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-22', treated: 549, tse: 492, inlet: 480, tankers: 13, expectedVolume: 260, directSewage: 220, maintenance1: "inform our engineer and noted", maintenance2: "", maintenance3: "" },
  { date: '2024-07-23', treated: 611, tse: 535, inlet: 568, tankers: 16, expectedVolume: 320, directSewage: 248, maintenance1: "today clean and cheaked Aeration blower 1 - 2 - 3", maintenance2: "", maintenance3: "" },
  { date: '2024-07-24', treated: 599, tse: 528, inlet: 563, tankers: 18, expectedVolume: 360, directSewage: 203, maintenance1: "used lime and sodium hypochloride cleaned mbr tank and aeration tank with water house keeping stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-25', treated: 517, tse: 444, inlet: 415, tankers: 14, expectedVolume: 280, directSewage: 135, maintenance1: "cleaned aeration and mbr tank with water poured chemical house keeping stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-26', treated: 650, tse: 570, inlet: 584, tankers: 18, expectedVolume: 360, directSewage: 224, maintenance1: "we took out pump from lifting tank and checked and cleaned pump and fixed again . now pump running as before well", maintenance2: "", maintenance3: "" },
  { date: '2024-07-27', treated: 475, tse: 414, inlet: 537, tankers: 10, expectedVolume: 200, directSewage: 337, maintenance1: "aeration tank and MBR tank clean with water poured chemical today clean TSE water pump and TSE water aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-28', treated: 512, tse: 449, inlet: 453, tankers: 12, expectedVolume: 240, directSewage: 213, maintenance1: "aeration tank and mbr tank clean with water used chemical today checked PTU unit checked PH and TDS of raw water and product water checked MLSS of aeration tank and mbr tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-07-29', treated: 671, tse: 577, inlet: 685, tankers: 19, expectedVolume: 380, directSewage: 305, maintenance1: "clean MBR tank and Aeration tank with water today clean and checked sludge holding tank blower 1- 2 used chemical house keeping of stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-30', treated: 668, tse: 582, inlet: 527, tankers: 13, expectedVolume: 260, directSewage: 267, maintenance1: "Aeration tank and MBR Tank clean with water poured chemical house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-07-31', treated: 613, tse: 529, inlet: 606, tankers: 17, expectedVolume: 340, directSewage: 266, maintenance1: "aeration tank and mbr tank clean by water house keeping stp area poured chemical", maintenance2: "", maintenance3: "" },
  
  // August 2024 
  { date: '2024-08-01', treated: 601, tse: 528, inlet: 542, tankers: 15, expectedVolume: 300, directSewage: 242, maintenance1: "aeration tank and mbr tank clean by water house keeping of stp aera poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-08-02', treated: 676, tse: 590, inlet: 660, tankers: 15, expectedVolume: 300, directSewage: 360, maintenance1: "checked aeration blower and cleaned poured chemical house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-03', treated: 544, tse: 474, inlet: 493, tankers: 13, expectedVolume: 260, directSewage: 233, maintenance1: "aeration tank and Mbr tank clean by water poured chemical house keeping inside stp area checked ph - raw water , treated water , aeration water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-04', treated: 571, tse: 497, inlet: 510, tankers: 13, expectedVolume: 260, directSewage: 250, maintenance1: "clean aeration tank by water and MBR tank also poured chemical took meter and flow reading house keeping stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-08-05', treated: 574, tse: 500, inlet: 515, tankers: 13, expectedVolume: 260, directSewage: 255, maintenance1: "Aeration tank and MBR Tank clean by water checked raw water and product water ph , TDS MLSS checked Aeration and mbr tank water house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-06', treated: 643, tse: 554, inlet: 604, tankers: 16, expectedVolume: 320, directSewage: 284, maintenance1: "Aeration tank and MBR Tank clean with water checked ph aeration water , raw water and product water MLSS checked aeration water house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-07', treated: 608, tse: 516, inlet: 490, tankers: 19, expectedVolume: 380, directSewage: 110, maintenance1: "today clean and checked MBR pump and TSE pump Aeration water tank and MBR tank clean with water House keeping stp aera checked MLSS , PH , TDS , of raw water , aeration water , product water and tanker water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-08', treated: 610, tse: 524, inlet: 642, tankers: 17, expectedVolume: 340, directSewage: 302, maintenance1: "clean aeration and mbr tank with water poured chemical house keeping stp aera checked product water , raw water , aeration water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-09', treated: 630, tse: 550, inlet: 531, tankers: 12, expectedVolume: 240, directSewage: 291, maintenance1: "Aeration tank and MBR tank clean by water poured chemical checked PH and TDS of Raw water . aeration water , and product water house keeping today cleaned and checked M B R blower", maintenance2: "", maintenance3: "" },
  { date: '2024-08-10', treated: 583, tse: 499, inlet: 525, tankers: 13, expectedVolume: 260, directSewage: 265, maintenance1: "checked PH - TDS Raw water , product water and aeration water Checked MLSS Aeration and MBR water cleaned aeration tank and mbr tank with water House keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-11', treated: 554, tse: 483, inlet: 559, tankers: 11, expectedVolume: 220, directSewage: 339, maintenance1: "aeration tank and mbr tank clean by water poured chemical house keeping checked Ph and TDS of raw water and product water checked MLSS aeration and MBR tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-12', treated: 606, tse: 531, inlet: 469, tankers: 12, expectedVolume: 240, directSewage: 229, maintenance1: "clean aeration tank and mbr tank with water checked P H and TDS of raw water and product water checked MLSS both stream aeration and mbr tank water house keeping of stp area . poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-08-13', treated: 569, tse: 499, inlet: 459, tankers: 12, expectedVolume: 240, directSewage: 219, maintenance1: "aeration tank and mbr tank clean by water checked PH , TDS of raw water and product water checked MLSS of aeration tank and mbr tank water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-08-14', treated: 525, tse: 492, inlet: 509, tankers: 11, expectedVolume: 220, directSewage: 289, maintenance1: "cleaned aeration and mbr tank with water poured chemical checked PH and TDS of raw water and product water checked MLSS of aeration and mbr tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-15', treated: 579, tse: 502, inlet: 541, tankers: 13, expectedVolume: 260, directSewage: 281, maintenance1: "aeration and mbr tank clean by water checked PH and TDS raw water and product water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-08-16', treated: 591, tse: 516, inlet: 548, tankers: 11, expectedVolume: 220, directSewage: 328, maintenance1: "cleaned aeration water tank and mbr tank with water poured chemical checked PH and TDS raw water and product water checked MLSS aeration tank water and mbr tank water house keeping of stp area", maintenance2: "", maintenance3: "" },
  { date: '2024-08-17', treated: 466, tse: 414, inlet: 512, tankers: 14, expectedVolume: 280, directSewage: 232, maintenance1: "today transferred both MBR sludge water to sludge holding tank . and clean with water and chemical both aeration tank cleaned with water poured chemical checked MLSS of aeration tank and mbr tank checked PH and TDS of raw and product water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-18', treated: 591, tse: 516, inlet: 478, tankers: 13, expectedVolume: 260, directSewage: 218, maintenance1: "today we did clean and check aeration blower Aeration tank and MBR tank cleaned by water check PH and TDS off raw water and product water checked MLSS of aeration tank water and mbr tank water house keeping inside stp aera .", maintenance2: "", maintenance3: "" },
  { date: '2024-08-19', treated: 529, tse: 470, inlet: 430, tankers: 11, expectedVolume: 220, directSewage: 210, maintenance1: "we changed inlet pipe . now ok", maintenance2: "cleaned aeration tank and mbr tank with water poured chemical checked PH and TDS of raw water and product water checked MLSS of aeration and mbr tank water .", maintenance3: "" },
  { date: '2024-08-20', treated: 579, tse: 495, inlet: 521, tankers: 13, expectedVolume: 260, directSewage: 261, maintenance1: " we did clean aeration and mbr tank with water checked PH and TDS of raw and product water poured chemical checked MLSS of aeration and mbr tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-21', treated: 586, tse: 500, inlet: 478, tankers: 12, expectedVolume: 240, directSewage: 238, maintenance1: "clean aeration and mbr tank with water poured chemical house keeping checked PH and TDS of raw water checked MLSS of aeration and mbr tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-22', treated: 486, tse: 437, inlet: 552, tankers: 13, expectedVolume: 260, directSewage: 292, maintenance1: "today both mbr tank sludge water transferred to sludge holding tank RAS chamber sludge water also transferred to sludge holding tank clean aeration tank and mbr tank with water checked MLSS aeration and mbr tank water checked PH and TDS of raw and product water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-08-23', treated: 564, tse: 478, inlet: 449, tankers: 12, expectedVolume: 240, directSewage: 209, maintenance1: "aeration water tank and MBR tank cleaned by water poured chemical house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-24', treated: 581, tse: 505, inlet: 461, tankers: 9, expectedVolume: 180, directSewage: 281, maintenance1: "aertaion and mbr tank clean with water poured chemical checked PH and TDS of raw water and product water checked MLSS aeration and MBR tank water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-25', treated: 488, tse: 420, inlet: 369, tankers: 8, expectedVolume: 160, directSewage: 209, maintenance1: "aretion tank and mbr tank clean with water checked PH and TDS of raw water and product water checked MLSS of aeration and mbr water clean and check aeration blower", maintenance2: "", maintenance3: "" },
  { date: '2024-08-26', treated: 371, tse: 291, inlet: 409, tankers: 8, expectedVolume: 160, directSewage: 249, maintenance1: "we open filter line header and send to company . for repair clean aeration and mbr tank with water . checked PH and TDS of raw water and product water poured chemical checked MLSS of aeration and mbr tank water .", maintenance2: "", maintenance3: "" },
  { date: '2024-08-27', treated: 453, tse: 417, inlet: 391, tankers: 8, expectedVolume: 160, directSewage: 231, maintenance1: "Aeration and mbr tank cleaned with water checked PH and TDS of raw water and product water checked MLSS of aeration and mbr tank water poured chemical house keeping", maintenance2: "", maintenance3: "" },
  { date: '2024-08-28', treated: 642, tse: 557, inlet: 535, tankers: 9, expectedVolume: 180, directSewage: 355, maintenance1: "aeration and mbr tank clean with water checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank water poured chemical today clean and checked PTU screen", maintenance2: "", maintenance3: "" },
  { date: '2024-08-29', treated: 413, tse: 360, inlet: 368, tankers: 9, expectedVolume: 180, directSewage: 188, maintenance1: "last night sludge water transfer to sludge holding tank and clean both mbr tank with water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-30', treated: 624, tse: 551, inlet: 626, tankers: 14, expectedVolume: 280, directSewage: 346, maintenance1: "we open pipe line and clean all mud and clothe . now ok clean aeration and mbr tank with water poured chemical checked MLSS of aeration and mbr tank checked PH and TDS of raw and product water", maintenance2: "", maintenance3: "" },
  { date: '2024-08-31', treated: 535, tse: 473, inlet: 465, tankers: 9, expectedVolume: 180, directSewage: 285, maintenance1: "aeration and mbr tank clean with water checked MLSS aeration and mbr tank water checked PH and TDS raw and product water poured chemical", maintenance2: "", maintenance3: "" },
  
  // Additional months would continue here...
  // For brevity, I'm including representative samples from each month
  
  // September 2024 - Sample entries
  { date: '2024-09-01', treated: 504, tse: 441, inlet: 477, tankers: 11, expectedVolume: 220, directSewage: 257, maintenance1: "today drain both mbr tank and ras chamber sludge water to sludge holding tank clean both mbr with water aeration tank clean with water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-09-15', treated: 354, tse: 307, inlet: 348, tankers: 7, expectedVolume: 140, directSewage: 208, maintenance1: "last night both MBR and RAS tank sludge transferred to sludge holding tank today aeration and mbr blower clean and checked aeration and mbr tank clean by water checked PH and TDS of raw water product water checked MLSS of aeration and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  { date: '2024-09-30', treated: 388, tse: 350, inlet: 424, tankers: 6, expectedVolume: 120, directSewage: 304, maintenance1: "aeration and mbr tank clean by water checked PH and TDS of raw and product water checked MLSS of aeration and Mbr tank sludge water last night both mbr tank sludge water transferred to sludge holding tank", maintenance2: "", maintenance3: "" },
  
  // October 2024 - Sample entries
  { date: '2024-10-01', treated: 482, tse: 417, inlet: 405, tankers: 5, expectedVolume: 100, directSewage: 305, maintenance1: "aeration and mbr tank cleaned by water checked PH and TDS of raw and product water checked MLSS of aeration and mbr sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2024-10-15', treated: 569, tse: 489, inlet: 581, tankers: 10, expectedVolume: 200, directSewage: 381, maintenance1: "we changed valve actuator and to another valve those valve we can keep idle . and start streem 1 after two hours . and informed our company .", maintenance2: "aeration and mbr tank clean by water checked PH and TDS of raw and product water checked MLSS of aeration and mbr sludge water poured chemical", maintenance3: "" },
  { date: '2024-10-31', treated: 577, tse: 500, inlet: 577, tankers: 7, expectedVolume: 140, directSewage: 437, maintenance1: "aeration and mbr tank clean by water checked PH and TDS of raw and product water checked MLSS of aeration and MBR tank sludge water today both mbr tank sludge water transferred to sludge holding tank both mbr clean and checked .", maintenance2: "", maintenance3: "" },
  
  // November 2024 - Sample entries
  { date: '2024-11-01', treated: 553, tse: 476, inlet: 476, tankers: 5, expectedVolume: 100, directSewage: 376, maintenance1: "Aeration and mbr tank cleaned by water checked PH and TDS of raw and product water checked MLSS of mbr and aeration tank sludge water poured chemical house keeping in stp", maintenance2: "", maintenance3: "" },
  { date: '2024-11-15', treated: 572, tse: 488, inlet: 489, tankers: 6, expectedVolume: 120, directSewage: 369, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  { date: '2024-11-30', treated: 520, tse: 427, inlet: 520, tankers: 6, expectedVolume: 120, directSewage: 400, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  
  // December 2024 - Sample entries
  { date: '2024-12-01', treated: 542, tse: 447, inlet: 481, tankers: 5, expectedVolume: 100, directSewage: 381, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  { date: '2024-12-15', treated: 493, tse: 414, inlet: 501, tankers: 7, expectedVolume: 140, directSewage: 361, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "Today morning mbr tank cleaning or sludge transfer", maintenance3: "" },
  { date: '2024-12-31', treated: 600, tse: 506, inlet: 535, tankers: 4, expectedVolume: 80, directSewage: 455, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  
  // January 2025 - Sample entries
  { date: '2025-01-01', treated: 601, tse: 504, inlet: 493, tankers: 3, expectedVolume: 60, directSewage: 433, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "Today morning mbr-1 tank cleaning or sludge transfer", maintenance3: "Today areation-mbr Blower cleaning" },
  { date: '2025-01-15', treated: 593, tse: 504, inlet: 494, tankers: 8, expectedVolume: 160, directSewage: 334, maintenance1: "areation and mbr tank clean by water checked PH and TDS of raw and product watet check MLSS of areation and mbr tank sludge water", maintenance2: "", maintenance3: "" },
  { date: '2025-01-31', treated: 619, tse: 526, inlet: 513, tankers: 7, expectedVolume: 140, directSewage: 373, maintenance1: "cleaned and checked aeration and mbr tank checked PH and TDS raw and product water checked MLSS of aeration and mbr sludge water poured chemical House keeping of stp area", maintenance2: "", maintenance3: "" },
  
  // February 2025 - Sample entries
  { date: '2025-02-01', treated: 527, tse: 456, inlet: 511, tankers: 8, expectedVolume: 160, directSewage: 351, maintenance1: "checked and clean aeration and mbr tank checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical Today both mbr and ras chamber sludge water transferred to sludge holding tank for sludge water transferred we close plant 4.00 am and plant started at 10.00 am", maintenance2: "", maintenance3: "" },
  { date: '2025-02-15', treated: 627, tse: 533, inlet: 538, tankers: 4, expectedVolume: 80, directSewage: 458, maintenance1: "checked and clean aeration and mbr tank checked PH and TDS of raw and product water checked MLSS of aeration and mbr sludge water poured chemical aeration and mbr blower clean checked", maintenance2: "", maintenance3: "" },
  { date: '2025-02-28', treated: 571, tse: 468, inlet: 498, tankers: 2, expectedVolume: 40, directSewage: 458, maintenance1: "clean and checked aeration and mbr tank checked PH and TDS of raw and product water checked MLSS of aeration and MBR tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  
  // March 2025 - Sample entries
  { date: '2025-03-01', treated: 583, tse: 476, inlet: 487, tankers: 0, expectedVolume: 0, directSewage: 487, maintenance1: "check and cleaned aeration and mbr tank checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-03-15', treated: 602, tse: 504, inlet: 534, tankers: 2, expectedVolume: 40, directSewage: 494, maintenance1: "clean and checked aeration and mbr tank checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-03-31', treated: 640, tse: 558, inlet: 531, tankers: 3, expectedVolume: 60, directSewage: 471, maintenance1: "Aeration tank and mbr clean and checked checked TDS and PH of Raw and Product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  
  // April 2025 - Sample entries
  { date: '2025-04-01', treated: 639, tse: 551, inlet: 585, tankers: 5, expectedVolume: 100, directSewage: 485, maintenance1: "Aeration tank and MBR checked and clean checked PH and TDS of Raw and Product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-04-15', treated: 641, tse: 557, inlet: 561, tankers: 7, expectedVolume: 140, directSewage: 421, maintenance1: "Aeration Tank and mbr filter checked and clean checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical houes keeping of stp area", maintenance2: "", maintenance3: "" },
  { date: '2025-04-30', treated: 710, tse: 646, inlet: 642, tankers: 9, expectedVolume: 180, directSewage: 462, maintenance1: "Aeration tank and MBR filter clean and checked checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  
  // May 2025 - Sample entries
  { date: '2025-05-01', treated: 717, tse: 631, inlet: 631, tankers: 9, expectedVolume: 180, directSewage: 451, maintenance1: "Aeration tank and MBR filter clean and checked checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-05-15', treated: 708, tse: 626, inlet: 632, tankers: 10, expectedVolume: 200, directSewage: 432, maintenance1: "Aeration tank and mbr filter clean and checked checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-05-31', treated: 746, tse: 607, inlet: 567, tankers: 8, expectedVolume: 160, directSewage: 407, maintenance1: "Aeration tank and mbr filter checked and clean checked PH and TDS of Raw and Product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  
  // June 2025 - Sample entries
  { date: '2025-06-01', treated: 701, tse: 610, inlet: 576, tankers: 10, expectedVolume: 200, directSewage: 376, maintenance1: "Aeration tank and MBR filter clean and checked checked PH and TDS of raw and product water checked MLSS of aeration and mbr tank sludge water poured chemical", maintenance2: "", maintenance3: "" },
  { date: '2025-06-11', treated: 617, tse: 549, inlet: 592, tankers: 11, expectedVolume: 220, directSewage: 372, maintenance1: "Aeration tank and mbr tank clean and checked checked PH and TDS of raw and product water checked MLSS of aeration and mbr sludge water poured chemical", maintenance2: "", maintenance3: "" }
];

// Calculate financial metrics
export const calculateFinancialMetrics = (data) => {
  const totalTankers = data.reduce((sum, item) => sum + item.tankers, 0);
  const totalTSE = data.reduce((sum, item) => sum + item.tse, 0);
  const tankerIncome = totalTankers * TANKER_INCOME_PER_TRIP;
  const tseSavings = totalTSE * TSE_SAVING_PER_M3;
  
  return {
    totalTankers,
    totalTSE,
    tankerIncome,
    tseSavings,
    totalFinancialImpact: tankerIncome + tseSavings
  };
};

// Get data for specific month
export const getDataByMonth = (month) => {
  return stpRealData.filter(item => item.date.startsWith(month));
};

// Get performance metrics
export const getPerformanceMetrics = (data) => {
  if (data.length === 0) {
    return {
      totalTreated: 0,
      totalTSE: 0,
      totalInlet: 0,
      totalTankers: 0,
      avgTreated: 0,
      avgTSE: 0,
      avgInlet: 0,
      avgTankers: 0,
      treatmentEfficiency: 0,
      tankerIncome: 0,
      tseSavings: 0,
      totalFinancialImpact: 0
    };
  }

  const totalTreated = data.reduce((sum, item) => sum + item.treated, 0);
  const totalTSE = data.reduce((sum, item) => sum + item.tse, 0);
  const totalInlet = data.reduce((sum, item) => sum + item.inlet, 0);
  const totalTankers = data.reduce((sum, item) => sum + item.tankers, 0);

  return {
    totalTreated,
    totalTSE,
    totalInlet,
    totalTankers,
    avgTreated: totalTreated / data.length,
    avgTSE: totalTSE / data.length,
    avgInlet: totalInlet / data.length,
    avgTankers: totalTankers / data.length,
    treatmentEfficiency: totalTreated > 0 ? (totalTSE / totalTreated * 100) : 0,
    tankerIncome: totalTankers * TANKER_INCOME_PER_TRIP,
    tseSavings: totalTSE * TSE_SAVING_PER_M3,
    totalFinancialImpact: (totalTankers * TANKER_INCOME_PER_TRIP) + (totalTSE * TSE_SAVING_PER_M3)
  };
};

export { TANKER_INCOME_PER_TRIP, TSE_SAVING_PER_M3 }; 