// Water System Database - Complete Hierarchical Water Distribution Data
// Real water consumption data for Muscat Bay with accurate A1, A2, A3 levels
// A1 = Main Source (L1), A2 = Zone Bulk + Direct Connections (L2+DC), A3 = End Users (L3+DC)

export const waterRawDataString = `Meter Label,Acct #,Zone,Type,Parent Meter,Label,Jan-24,Feb-24,Mar-24,Apr-24,May-24,Jun-24,Jul-24,Aug-24,Sep-24,Oct-24,Nov-24,Dec-24,Jan-25,Feb-25,Mar-25,Apr-25,May-25
Main Bulk (NAMA),C43659,Main Bulk,Main BULK,NAMA,L1,32803,27996,23860,31869,30737,41953,35166,35420,41341,31519,35290,36733,32580,44043,34915,46039,58425
Village Square (Zone Bulk),4300335,Zone_VS,Zone Bulk,Main Bulk (NAMA),L2,26,19,72,60,125,277,143,137,145,63,34,17,14,12,21,13,28
ZONE 8 (Bulk Zone 8),4300342,Zone_08,Zone Bulk,Main Bulk (NAMA),L2,2170,1825,2021,2753,2722,3193,3639,3957,3947,4296,3569,3018,1547,1498,2605,3203,6075
ZONE 3A (Bulk Zone 3A),4300343,Zone_03_(A),Zone Bulk,Main Bulk (NAMA),L2,1234,1099,1297,1892,2254,2227,3313,3172,2698,3715,3501,3796,4235,4273,3591,4041,8893
ZONE 3B (Bulk Zone 3B),4300344,Zone_03_(B),Zone Bulk,Main Bulk (NAMA),L2,2653,2169,2315,2381,2634,2932,3369,3458,3742,2906,2695,3583,3256,2962,3331,2157,5177
ZONE 5 (Bulk Zone 5),4300345,Zone_05,Zone Bulk,Main Bulk (NAMA),L2,4286,3897,4127,4911,2639,4992,5305,4039,2736,3383,1438,3788,4267,4231,3862,3737,7511
ZONE FM ( BULK ZONE FM ),4300346,Zone_01_(FM),Zone Bulk,Main Bulk (NAMA),L2,1595,1283,1255,1383,1411,2078,2601,1638,1550,2098,1808,1946,2008,1740,1880,1880,3448
Irrigation Tank 04 - (Z08),4300294,Direct Connection,IRR_Servies,Main Bulk (NAMA),DC,764,509,440,970,1165,1475,782,559,0,0,0,0,0,0,0,0,0
Sales Center Common Building,4300295,Direct Connection,MB_Common,Main Bulk (NAMA),DC,45,46,37,35,61,32,36,28,25,41,54,62,76,68,37,67,63
Building (Security),4300297,Direct Connection,MB_Common,Main Bulk (NAMA),DC,33,31,30,32,9,4,4,4,5,6,10,17,17,18,13,16,16
Building (ROP),4300299,Direct Connection,MB_Common,Main Bulk (NAMA),DC,38,31,31,33,10,2,3,25,42,45,25,22,23,21,19,20,20
Irrigation Tank 01 (Inlet),4300323,Direct Connection,IRR_Servies,Main Bulk (NAMA),DC,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2
Hotel Main Building,4300334,Direct Connection,Retail,Main Bulk (NAMA),DC,14012,12880,11222,13217,13980,15385,12810,13747,13031,17688,15156,14668,18048,19482,22151,27676,26963
Community Mgmt - Technical Zone STP,4300336,Direct Connection,MB_Common,Main Bulk (NAMA),DC,28,47,34,27,24,51,18,23,22,17,14,25,29,37,25,35,29
PHASE 02 MAIN ENTRANCE (Infrastructure),4300338,Direct Connection,MB_Common,Main Bulk (NAMA),DC,34,33,35,40,40,49,24,11,12,12,12,10,11,8,6,7,6
Irrigation- Controller UP,4300340,Direct Connection,IRR_Servies,Main Bulk (NAMA),DC,647,297,318,351,414,1038,1636,1213,1410,1204,124,53,0,0,0,1000,33
Irrigation- Controller DOWN,4300341,Direct Connection,IRR_Servies,Main Bulk (NAMA),DC,1124,907,773,628,601,891,1006,742,860,1559,171,185,159,239,283,411,910
Al Adrak Construction,4300347,Direct Connection,Retail,Main Bulk (NAMA),DC,0,0,0,0,0,0,0,0,474,1179,494,494,597,520,580,600,2657
Al Adrak Camp,4300348,Direct Connection,Retail,Main Bulk (NAMA),DC,0,0,0,0,0,0,0,0,193,1073,808,808,1038,702,1161,1000,1228
Z5-17,4300001,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,99,51,53,62,135,140,34,132,63,103,54,148,112,80,81,90,58
Z3-42 (Villa),4300002,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,61,33,36,47,39,42,25,20,44,57,51,75,32,46,19,62,87
Z3-46(5) (Building),4300003,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,4
Z3-49(3) (Building),4300004,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,1,1,22,30,18,6,7,11,7,10,9,5,10,15,11,13,11
Z3-38 (Villa),4300005,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,0,0,0,0,0,3,0,4,30,2,12,11,10,7,7,7,8
Z3-75(4) (Building),4300006,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,0,14,3,0,0,0,0,0,0,0,7,6,0,0,0,0,0
Z3-46(3A) (Building),4300007,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,13,7,6,25,27,30,35,41,29,44,32,43,38,35,15,35,42
Z3-049(4) (Building),4300010,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,11,1,0,0,0,0,0,0,0,0,0,4,8,1,8,0,0
Z3-46(1A) (Building),4300011,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,9,10,10,11,10,10,11,11,12,17,11,13,11,10,10,11,11
Z3-47(2) (Building),4300012,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,0,0,0,0,0,0,2,2,3,1,3,1,1,1,1,1,0
Z3-45(3A) (Building),4300013,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,5,8,0,2,0,2,0,0,0,1,0,2,8,4,0,1,1
Z3-46(2A) (Building),4300014,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-46(6) (Building),4300015,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,3,2,1,1,3,3,2,2,2,2,1,2,3,1,1,5,5
Z3-47(4) (Building),4300016,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,15,15,26,15,22,14,23,6,16,16,8,13,11,12,0,1,0
Z3-45(5) (Building),4300017,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,4,3,2,10,6,8,9,3,7,22,15,10,5,3,2,2,2
Z3-47(5) (Building),4300018,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,8,56,13,7,2,0,1,15,0,13,5,9,36,12,11,18,16
Z3-45(6) (Building),4300019,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,3,3,4,20,3,8,6,4,5,6,7,4,5,18,32,42,47
Z3-50(4) (Building),4300021,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,15,4,7,6,11,5,6,9,6,9,8,9,6,4,6,17,6
Z3-74(3) (Building),0,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,21,54,16,6,22,5,6,12,13,24,19,12,12,19,19,27,26
Z3-45(4A) (Building),4300026,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-50(5) (Building),4300027,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,2,0,0,1,0,1,23,10,9,8,12,8,9,10,22,11,11
Z3-50(6) (Building),4300028,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,6,14,16,15,16,20,1,12,17,25,21,23,21,20,18,13,16
Z3-44(1A) (Building),4300030,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,0,0,20,25,23,7,0,0,2,9,8,5,11,11,10,6,11
Z3-44(1B) (Building),4300031,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-44(2A) (Building),4300032,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,4,2,15,20,21,1,5,2,3,7,7,2,9,3,5,10,6
Z3-44(2B) (Building),4300033,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,7,3,8,3,4,2,2,4,5,9,5,8,7,7,7,8,2
Z3-44(5) (Building),4300034,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,148,135,126,99,15,25,61,132,115,249,208,135,118,139,38,25,5
Z3-44(6) (Building),4300035,Zone_03_(A),Residential (Apart),D-44 Building Bulk Meter,L3,36,20,19,16,13,9,7,9,17,39,33,33,34,37,31,37,35
Z3-75(1) (Building),4300036,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,6,1,0,0,1,1
Z3-75(3) (Building),4300037,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,4,0,0,0,0,2,0,0,0,3,1,4,2,7,0,6,0
Z3-23 (Villa),4300038,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,29,16,18,18,15,32,24,28,25,37,2,2,0,0,0,0,1
Z3-47(3) (Building),4300039,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,14,15,14,14,19,14,16,19,13,21,17,18,18,19,17,17,19
Z3-48(3) (Building),4300040,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,8,8,7,8,7,3,4,8,7,10,10,3,3,5,4,4,7
Z3-48(6) (Building),4300041,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,1,0,0,0,0,3,5,10,0,10,1,0,0,0,0,1,0
Z3-46(4A) (Building),4300043,Zone_03_(A),Residential (Apart),D-46 Building Bulk Meter,L3,1,1,1,1,1,1,0,0,1,3,1,0,4,1,0,19,5
Z3-41 (Villa),4300044,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,50,38,26,20,90,66,128,192,58,53,44,22,13,18,34,26,25
Z3-74(5) (Building),4300045,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,10,2,5,5,7,6,5,7,5,4,5,7,13,7,12,16,10
Z3-74(6) (Building),4300046,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,32,12,6,13,9,2,3,0,2,12,6,6,12,4,4,5,5
Z3-50(3) (Building),4300047,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,2,8,7,6,3,4,4,5,5,9,9,7,8,13,6,0,0
Z3-48(5) (Building),4300048,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,0,0,0,0,0,0,2,4,2,4,33,16,2,1,1,0,1
Z3-37 (Villa),4300049,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,1,2,0,1,0,0,5,13,0,1,1,3,26,15,18,28,48
Z3-43 (Villa),4300050,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,79,67,50,62,72,75,49,83,76,91,77,70,70,68,46,52,48
Z3-47(6) (Building),4300051,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,18,19,27,15,10,12,6,6,16,13,23,27,29,14,16,17,9
Z3-31 (Villa),4300052,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,115,105,86,81,140,135,151,258,222,37,164,176,165,133,30,306,527
Z3-49(5) (Building),4300053,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,3,6,1,1,2,0,0,2,1,10,0,0,0,5,0,0,0
Z3-75(5) (Building),4300055,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,0,0,11,8,9,11,8,10,12,27,22,14,16,12,12,16,16
Z3-49(6) (Building),4300061,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,34,26,16,15,16,34,16,4,10,36,25,26,25,22,21,27,23
Z3-75(6) (Building),4300063,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,52,39,21,17,24,24,20,24,19,24,40,34,35,32,35,36,25
Z3-35 (Villa),4300075,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,82,78,77,67,91,54,58,70,78,92,83,69,65,61,52,74,68
Z3-40 (Villa),4300079,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,26,18,25,19,26,19,12,10,12,36,20,20,18,23,37,37,139
Z3-30 (Villa),4300081,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,16,14,19,26,9,8,8,0,0,1,1,0,0,0,4,0,0
Z3-33 (Villa),4300082,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,78,32,43,36,52,68,60,60,47,76,52,45,45,45,40,50,49
Z3-36 (Villa),4300084,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,13,11,22,44,85,68,61,58,72,102,115,93,81,83,69,83,170
Z3-32 (Villa),4300085,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,19,25,32,29,13,0,30,31,38,57,44,30,38,39,33,38,40
Z3-39 (Villa),4300086,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,67,33,35,40,27,51,24,38,35,47,34,37,39,36,29,33,41
Z3-34 (Villa),4300087,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,1,12,9,30,14,0,0,0,0,0,0,31,0,0,0,20,17
Z3-27 (Villa),4300089,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,0,0,0,0,8,0,5,0,4,0,8,59,15,32,55,73,26
Z3-24 (Villa),4300091,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,10,8,10,7,15,7,6,7,4,5,4,15,18,39,78,101,75
Z3-25 (Villa),4300093,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,15,12,9,9,25,11,15,6,0,0,0,0,3,0,0,0,0
Z3-26 (Villa),4300095,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,10,69,13,21,17,18,13,4,4,3,0,0,0,0,0,0,0
Z3-29 (Villa),4300097,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,12,5,9,12,9,9,7,1,0,2,0,1,0,7,3,2,0
Z3-28 (Villa),4300101,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,32,2,3,21,45,44,45,46,46,59,36,41,44,38,30,41,53
Z3-74(1) (Building),4300106,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,7,7,0,0,0,0,0,0,0,9,6,1,1,0,0,1,1
Z3-49(1) (Building),4300107,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,4,3,9,3
Z3-49(2) (Building),4300108,Zone_03_(A),Residential (Apart),D-49 Building Bulk Meter,L3,11,15,7,6,9,11,11,14,12,11,11,12,15,15,12,15,13
Z3-50(1) (Building),4300109,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,32,32,36,26,35,45,1,43,24,53,32,34,22,26,28,6,1
Z3-45(1A) (Building),4300110,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,8,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1
Z3-51(1) (Building),4300111,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,12,13,13,11,18,29,1,0,0,1,0,0,0,0,0,0,1
Z3-51(2) (Building),4300112,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,17,21,20,17,17,19,19,24,24,39,29,29,32,28,31,30,32
Z3-45(2A) (Building),4300113,Zone_03_(A),Residential (Apart),D-45 Building Bulk Meter,L3,0,8,2,6,5,0,1,0,0,5,9,2,2,7,9,11,4
Z3-050(2) (Building),4300114,Zone_03_(A),Residential (Apart),D-50 Building Bulk Meter,L3,2,3,4,5,2,1,0,3,0,0,2,1,0,8,0,3,0
Z3-47(1) (Building),4300115,Zone_03_(A),Residential (Apart),D-47  Building Bulk Meter,L3,0,0,5,0,0,0,0,1,15,13,17,9,9,11,10,15,10
Z3-48(1) (Building),4300117,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,0,2,0,0,0,0,1,0,0,1,28,8,3,5,4,5,14
Z3-74(2) (Building),4300118,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,0,0,0,0,6,18,11,0,0,1,0,0,0,0,0,0,0
Z3-51(3) (Building),4300121,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,7,5,6,20,24,4,6,8,9,11,14,12,13,10,9,11,14
Z3-75(2) (Building),4300122,Zone_03_(A),Residential (Apart),D-75 Building Bulk Meter,L3,3,2,2,1,2,5,19,7,0,0,12,5,7,7,9,8,7
Z3-48(2) (Building),4300123,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,0,2,2,3,5,2,8,3,4,11,2,5,3,0,4,2,0
Z3-74(4) (Building),4300125,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,7,17,23,27,33,29,28,24,3,0,0,0,0,2,0,0,0
Z3-51(4) (Building),4300127,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,20,15,13,12,9,12,11,11,9,15,9,9,11,9,12,9,11
Z3-051(5) (Building),4300128,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,3,0,61,0,2,4,5,8,0,0,1,1,2,5,19,6,8
Z3-48(4) (Building),4300131,Zone_03_(A),Residential (Apart),D-48 Building Bulk Meter,L3,13,17,14,16,2,2,7,0,0,3,4,3,5,5,5,4,2
Z3-51(6) (Building),4300134,Zone_03_(A),Residential (Apart),D-51 Building Bulk Meter,L3,6,0,0,9,3,4,10,4,3,9,9,18,8,2,5,6,10
D 45-Building Common Meter,4300135,Zone_03_(A),D_Building_Common,D-45 Building Bulk Meter,L3,3,3,2,1,1,1,1,0,1,1,1,1,0,1,1,0,1
D 50-Building Common Meter,4300136,Zone_03_(A),D_Building_Common,D-50 Building Bulk Meter,L3,3,5,1,2,0,1,1,1,0,2,1,0,1,1,1,1,0
D 51-Building Common Meter,4300137,Zone_03_(A),D_Building_Common,D-51 Building Bulk Meter,L3,4,3,2,2,1,3,1,1,1,1,2,1,1,0,1,1,2
D 46-Building Common Meter,4300138,Zone_03_(A),D_Building_Common,D-46 Building Bulk Meter,L3,3,5,2,1,51,0,1,1,0,1,0,1,1,0,1,0,2
D 74-Building Common Meter,4300139,Zone_03_(A),D_Building_Common,D-74 Building Bulk Meter,L3,3,3,2,1,2,0,1,1,0,2,1,1,0,1,1,2,1
D 49-Building Common Meter,4300140,Zone_03_(A),D_Building_Common,D-49 Building Bulk Meter,L3,3,4,1,2,1,1,1,1,0,1,1,1,0,1,2,1,1
D 48-Building Common Meter,4300141,Zone_03_(A),D_Building_Common,D-48 Building Bulk Meter,L3,3,4,1,2,1,1,1,0,0,1,0,1,0,1,0,1,0
D 47-Building Common Meter,4300143,Zone_03_(A),D_Building_Common,D-47  Building Bulk Meter,L3,4,5,2,1,1,1,1,1,1,1,1,1,1,0,0,2,0
D 44-Building Common Meter,4300144,Zone_03_(A),D_Building_Common,D-44 Building Bulk Meter,L3,3,4,2,1,1,1,1,1,0,2,1,1,1,1,0,1,1
D 75-Building Common Meter,4300145,Zone_03_(A),D_Building_Common,D-75 Building Bulk Meter,L3,4,5,2,2,2,1,2,2,2,7,6,2,3,4,3,7,9
Z3-74(3) (Building),4300322,Zone_03_(A),Residential (Apart),D-74 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,30
Z3-52(6) (Building),4300008,Zone_03_(B),Residential (Apart),D-52 Building Bulk Meter,L3,27,22,19,28,27,27,298,58,14,18,17,8,10,9,9,14,12
Z3-21 (Villa),4300009,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,37,38,24,20,31,41,9,54,263,68,45,43,41,53,42,48,51
Z3-20 (Villa),4300020,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,2,1,1,2,2,2,6,4,10,14,10,11,12,14,7,3,6
Z3-13 (Villa),4300025,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,24,27,23,17,20,24,10,11,5,20,16,19,20,22,18,24,20
Z3-52(4A) (Building),4300029,Zone_03_(B),Residential (Apart),D-52 Building Bulk Meter,L3,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,6
Z3-52(3A) (Building),4300042,Zone_03_(B),Residential (Apart),D-52 Building Bulk Meter,L3,1,1,1,0,1,0,1,2,8,9,8,6,6,9,5,5,12
Z3-62(6) (Building),4300054,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,12,14,15,14,3,0,0,0,0,0,0,1,39,19,17,11,3
Z3-52(5) (Building),4300056,Zone_03_(B),Residential (Apart),D-52 Building Bulk Meter,L3,13,5,6,4,7,9,6,5,6,4,3,4,5,3,4,7,9
Z3-15 (Villa),4300057,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,53,39,32,31,34,45,43,31,37,45,36,36,40,41,35,47,44
Z3-14 (Villa),4300060,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,55,45,42,57,66,27,31,11,16,27,30,173,166,102,30,43,32
Z3-62(1) (Building),4300062,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,0,3,0,0,4,19,0,0,1,9,2,1,4,1,15,10,5
Z3-12 (Villa),4300076,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,52,95,258,55,67,111,93,120,118,178,55,67,73,59,54,181,178
Z3-11 (Villa),4300077,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0
Z3-4 (Villa),4300078,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,105,90,96,106,126,122,156,150,97,171,56,111,90,55,22,23,113
Z3-17 (Villa),4300080,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,11,5,8,5,14,19,18,22,14,24,17,20,19,8,5,13,15
Z3-18 (Villa),4300083,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,62,43,36,56,47,63,59,67,46,58,42,31,36,36,33,39,76
Z3-3 (Villa),4300088,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,78,66,80,91,84,84,83,61,67,78,69,86,66,59,63,73,176
Z3-7 (Villa),4300090,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,27,23,14,21,30,46,23,43,24,50,34,31,38,45,46,57,58
Z3-10 (Villa),4300092,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,37,32,31,35,47,34,40,56,41,60,33,37,78,81,62,101,88
Z3-1 (Villa),4300094,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,6,6,3,4,5,5,5,6,5,3,4,3,4,4,5,7,7
Z3-9 (Villa),4300096,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,68,57,76,32,17,40,38,100,60,57,70,71,67,49,55,60,69
Z3-2 (Villa),4300098,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,111,114,97,110,57,129,113,88,74,89,52,17,6,6,8,7,38
Z3-19 (Villa),4300099,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,38,11,9,16,15,6,6,9,6,5,11,13,138,6,26,108,77
Z3-6 (Villa),4300100,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,34,21,29,32,34,45,49,57,39,49,40,34,31,33,38,36,29
Z3-22 (Villa),4300102,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,24,20,17,19,22,20,36,22,15,20,15,23,32,14,53,31,32
Z3-16 (Villa),4300103,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,43,14,16,10,38,6,1,21,6,2,3,5,1,28,2,5,22
Z3-5 (Villa),4300104,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,52,63,47,58,42,24,68,44,40,34,26,34,40,51,42,55,51
Z3-8 (Villa),4300105,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,56,32,19,15,49,40,38,25,49,68,181,290,83,106,196,358,414
Z3-52(1A) (Building),4300116,Zone_03_(B),Residential (Apart),D-52 Building Bulk Meter,L3,5,6,4,4,4,5,5,6,8,14,16,17,19,14,5,8,7
Z3-62(2) (Building),4300119,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,0,1,0,16,10,9,7,17,10,14,5,17,7,10,8,11,14
Z3-58(5) (Building),4300120,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,79,43,12,31,32,32,22,29,25,36,29,29,29,23,32,30,30
Z3-62(3) (Building),4300124,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0
D 52-Building Common Meter,4300126,Zone_03_(B),D_Building_Common,D-52 Building Bulk Meter,L3,4,3,2,2,0,1,1,1,1,2,1,1,1,1,2,4,1
Z3-62(4) (Building),4300129,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,12,8,28,39,28,21,39,49,33,2,0,2,0,0,0,0,0
Z3-58(3B) (Building),4300130,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,0,0,0,0,0,3,2,6,1,9,6,6,6,6,3,29,7
Z3-058(4B) (Building),4300132,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,20,7,6,4,4,5,3,5,7,5,7,4,9,8,4,6,5
Z3-62(5) (Building),4300133,Zone_03_(B),Residential (Apart),D-62 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
D 62-Building Common Meter,4300142,Zone_03_(B),D_Building_Common,D-62 Building Bulk Meter,L3,4,4,2,3,1,1,2,0,1,0,0,0,0,0,0,0,0
D 53-Building Common Meter,4300201,Zone_03_(B),D_Building_Common,D-53 Building Bulk Meter,L3,5,2,2,1,0,0,1,1,1,2,0,1,0,1,7,2,2
D 54-Building Common Meter,4300202,Zone_03_(B),D_Building_Common,D-54 Building Bulk Meter,L3,5,2,4,2,0,1,2,1,0,2,1,1,0,1,1,3,1
D 55-Building Common Meter,4300203,Zone_03_(B),D_Building_Common,D-55 Building Bulk Meter,L3,7,3,1,2,1,0,2,1,1,3,2,2,1,1,2,3,2
D 56-Building Common Meter,4300204,Zone_03_(B),D_Building_Common,D-56 Building Bulk Meter,L3,4,3,1,2,0,1,2,2,2,2,1,2,1,2,8,3,4
D 57-Building Common Meter,4300205,Zone_03_(B),D_Building_Common,D-57 Building Bulk Meter,L3,4,2,1,1,1,1,1,1,1,2,1,1,2,1,4,7,3
D 58-Building Common Meter,4300206,Zone_03_(B),D_Building_Common,D-58 Building Bulk Meter,L3,4,3,1,1,1,0,1,1,0,2,1,0,1,0,0,3,0
D 59-Building Common Meter,4300207,Zone_03_(B),D_Building_Common,D-59 Building Bulk Meter,L3,4,2,1,2,0,0,1,1,0,1,0,1,1,0,1,1,1
D 60-Building Common Meter,4300208,Zone_03_(B),D_Building_Common,D-60 Building Bulk Meter,L3,4,3,2,1,0,1,0,1,0,1,1,0,1,1,0,1,2
D 61-Building Common Meter,4300209,Zone_03_(B),D_Building_Common,D-61 Building Bulk Meter,L3,0,1,0,0,1,0,0,0,0,1,0,1,1,0,1,2,1
Z3-53(1A) (Building),4300210,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,3,10,5,9,9,7,5,8,9,13,6,7,8,9,10,12,4
Z3-53(1B) (Building),4300211,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,11,10,4,4,1,9,5,5,3,9,12,12,6,8,6,8,9
Z3-53(2A) (Building),4300212,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-53(2B) (Building),4300213,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-53(3A) (Building),4300214,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,8,8,4,6,2,8,4,0,0,0,0,0,0,1,0,6,0
Z3-53(3B) (Building),4300215,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,1,4,1,3,1,6,5
Z3-53(4A) (Building),4300216,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,6,6,3,1,0,7,0,2,5,7,5,3,0,5,0,5,0
Z3-53(5) (Building),4300217,Zone_03_(B),Residential (Apart),D-53 Building Bulk Meter,L3,0,0,2,0,0,0,0,0,0,3,2,2,2,1,1,0,1
Z3-54(1A) (Building),4300218,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,12,6,10,11,16,12,7,5,7,10,9,14,11,12,8,13,5
Z3-54(1B) (Building),4300219,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,0,0,1,0,2,1,1,0,1,0,2,1,1,1,5,6,3
Z3-54(2A) (Building),4300220,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,2,4,3,0,0,3,16,2,1,2,4,3,3,3,3,1,0
Z3-54(2B) (Building),4300221,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,8,8,8,5,10,9,7,2,4,15,18,19,20,9,19,14,10
Z3-54(3A) (Building),4300222,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,8,9,7,7,9,6,8,8,7,10,10,6,8,8,3,8,5
Z3-54(3B) (Building),4300223,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,0,5,6,9,1,0,0,0,0,3,11,1,1,1,0,1,0
Z3-54(4A) (Building),4300224,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,0,3,0,0,0,0,4,3,0,0,4,2,0,0,0,14,0
Z3-54(4B) (Building),4300225,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,0,0,1,2,1,3,0,0,0,0,1,0,0,0,1,2,0
Z3-54(5) (Building),4300226,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,18,20,18,21,21,21,18,17,19,21,16,16,15,18,11,19,19
Z3-54(6) (Building),4300227,Zone_03_(B),Residential (Apart),D-54 Building Bulk Meter,L3,1,1,2,7,2,1,2,0,0,0,20,3,5,4,4,23,8
Z3-55(1A) (Building),4300228,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,0,0,4,1,1,0,1,4,0,0,0,0,0,0,0,0,0
Z3-55(2A) (Building),4300229,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,26,23,19,23,25,25,27,24,16,24,21,24,23,24,5,15,26
Z3-55(2B) (Building),4300230,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,2,4,4,7,5,2,6,6,2,3,5,4,3,4,5,5,4
Z3-55(3A) (Building),4300231,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,1,2,1,0,2,2,9,18,11,10,12,11,17,8,4,10,12
Z3-55(3B) (Building),4300232,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,1,5,6,6,3,8,2,6,8,8,6,3,7,3,5,7,5
Z3-55(4A) (Building),4300233,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,8,7,8,10,6,1,4,11,7,10,8,5,4,7,7,9,6
Z3-55(4B) (Building),4300234,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,9,8,10,8,7,1,1,4,2,5,4,5,6,5,5,5,3
Z3-55(5) (Building),4300235,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,2,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1
Z3-55(6) (Building),4300236,Zone_03_(B),Residential (Apart),D-55 Building Bulk Meter,L3,46,41,33,50,66,72,16,2,14,41,20,4,7,5,68,129,31
Z3-56(1A) (Building),4300237,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,5,8,3,4,4,3,2,1,1,4,3,174,50,0,0,0,0
Z3-56(1B) (Building),4300238,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1
Z3-56(2A) (Building),4300239,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,1,0,1,64,31,0,0,0,0,0,2,2,2,7,0,4,6
Z3-56(2B) (Building),4300240,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,5,3,3,9,2,1,0,0,0,2,5,9,5,1,8,11,2
Z3-56(3A) (Building),4300241,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z3-56(3B) (Building),4300242,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,1,10,10,12,0,3,0,0,0,0,0,0,0,1,0,0,0
Z3-56(4A) (Building),4300243,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,1,5,0,0,13,18,16,0,0,0,0,0,0,4,3,2
Z3-56(4B) (Building),4300244,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,0,0,0,0,2,4,8,1,2,3,2,7,0,0,0,0
Z3-56(5) (Building),4300245,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,7,4,7,0,2,1,1,0,5,0,1,1,2,0,1,0
Z3-56(6) (Building),4300246,Zone_03_(B),Residential (Apart),D-56 Building Bulk Meter,L3,0,0,3,5,1,7,4,24,17,13,6,10,14,3,17,3,0
Z3-57(1A) (Building),4300247,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,6,3,3,2,6,0,2,4,4,5,2,7,2,8,0,0,2
Z3-57(1B) (Building),4300248,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,1,1,0,4,0,1,10,0,0,0,0,3,3,1,0,1,0
Z3-57(2A) (Building),4300249,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,5,4,4,4,5,4,3,6,5,7,5,4,4,5,5,4,5
Z3-57(2B) (Building),4300250,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,5,2,0,3,0,0,0,0,0,1,2,3,1,1,5,8,11
Z3-57(3A) (Building),4300251,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,7,6,7,7,24,14,5,6,5,5,5,5,6,4,5,5,7
Z3-57(3B) (Building),4300252,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,1,1,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0
Z3-57(4A) (Building),4300253,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0
Z3-57(4B) (Building),4300254,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,0,2,0,0,5,1,2,0,0,3,0,3,0,3,0,3,0
Z3-57(5) (Building),4300255,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,9,4,1,17,5,9,20,27,0,12,33,29,17,14,7,21,30
Z3-57(6) (Building),4300256,Zone_03_(B),Residential (Apart),D-57 Building Bulk Meter,L3,0,13,0,0,2,0,18,24,0,15,1,0,10,26,22,14,13
Z3-58(1A) (Building),4300257,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,10,12,4,4,3,4,3,3,2,3,2,3,3,2,4,4,3
Z3-58(2A) (Building),4300258,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,10,8,0,11,0,4,3,0,2,2,0,1,0,0,4,5,0
Z3-58(2B) (Building),4300259,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,2,2,0,0,2,5,4,4,1,1,3,6,5,5,1,9,6
Z3-58(3A) (Building),4300260,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,13,7,1,0,0,0,0,9,10,16,10,2,0,0,0,0,12
Z3-58(4A) (Building),4300261,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,2,3,0,1,0,2,2,1,1,1,2,0,0,0,1,0,0
Z3-58(6) (Building),4300262,Zone_03_(B),Residential (Apart),D-58 Building Bulk Meter,L3,0,0,1,0,0,0,0,3,15,16,1,1,2,3,3,9,14
Z3-59(1A) (Building),4300263,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,0,0,0,0,0,0,0,0,2,3,3,4,7,7,4,5,6
Z3-59(1B) (Building),4300264,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,1,4,1,1,2,1,3,2,0,1,2,2,2,4,1,0,0
Z3-59(2A) (Building),4300265,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,0,0,1,17,14,8,4,7,12,11,11,8,9,13,14,14,15
Z3-59(2B) (Building),4300266,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,11,13,9,12,8,13,11,19,9,12,10,17,13,15,10,16,10
Z3-59(3B) (Building),4300267,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,0,0,0,0,0,0,0,1,2,2,1,2,1,4,3,3,0
Z3-59(4A) (Building),4300268,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,12,3,26,17,61,0,0,0,9,15,10,13,10,8,6,7,5
Z3-59(5) (Building),4300269,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,0,8,14,8,10,6,1,8,0,16,5,3,12,3,7,11,6
Z3-59(6) (Building),4300270,Zone_03_(B),Residential (Apart),D-59 Building Bulk Meter,L3,10,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,14
Z3-60(1A) (Building),4300271,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,2,2,2,1,1,4,1,1,0,3,2,1,3,7,6,6,6
Z3-60(2A) (Building),4300272,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,5,4,5,4,0,1,0,0,0,5,4,4,4,4,3,3,4
Z3-60(3A) (Building),4300273,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,11,12,12,9,0,7,7,6,7,6,11,9,5,10,15,10,7
Z3-60(4A) (Building),4300274,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,5,5,4,6,4,15,7,12,6,5,6,6,6,5,5,5,7
Z3-60(5) (Building),4300275,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,5,1,1,0,0,0,0,0,23,25,6,0,0,0,0,0,0
Z3-60(6) (Building),4300276,Zone_03_(B),Residential (Apart),D-60 Building Bulk Meter,L3,27,12,42,48,95,166,72,33,27,37,28,14,20,38,39,49,45
Z3-61(1A) (Building),4300277,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,0,4,0,17,15,6,2,0,0,6,8,10,2,0,3,3,1
Z3-61(1B) (Building),4300278,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,4,3,1,2,3,4,3,5,3,5,14,6,9,9,2,9,2
Z3-61(2A) (Building),4300279,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,21,18,17,17,18,9,18,11,0,0,0,0,0,0,11,11,12
Z3-61(2B) (Building),4300280,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,1,2,1,1,1,0,0,0,2,0,0,1,0,1,0,1,1
Z3-61(3A) (Building),4300281,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,0,4,0,1,0,2,1,2,1,4,0,0,0,7,19,23,1
Z3-61(3B) (Building),4300282,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,1,1,0,1,0,1,0,0,1,0,1,1,0,0,0,5,11
Z3-61(4A) (Building),4300283,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,0,0,1,0,1,0,0,0,0,1,6,7,6,11,5,9,5
Z3-61(4B) (Building),4300284,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,0,0,1,7,5,2,4,7,9,9,5,8,2,5,8,4,3
Z3-61(5) (Building),4300285,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,0,9,11,8,2,4,0,0,0,0,8,0,6,0,1,2,0
Z3-61(6) (Building),4300286,Zone_03_(B),Residential (Apart),D-61 Building Bulk Meter,L3,20,8,5,23,6,17,10,6,3,1,4,9,16,16,17,17,12
Irrigation Tank 02 (Z03),4300320,Zone_03_(B),IRR_Servies,ZONE 3B (BULK ZONE 3B),L3,42,36,74,39,31,36,45,45,30,30,29,57,49,47,43,15,319
Z3-4 (Villa),4300078,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,105,90,96,106,126,122,156,150,97,171,56,111,90,55,22,23,113
Z3-18 (Villa),4300083,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,62,43,36,56,47,63,59,67,46,58,42,31,36,36,33,39,76
Z3-3 (Villa),4300088,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,78,66,80,91,84,84,83,61,67,78,69,86,66,59,63,73,176
Z3-9 (Villa),4300096,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,68,57,76,32,17,40,38,100,60,57,70,71,67,49,55,60,69
Z3-2 (Villa),4300098,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,111,114,97,110,57,129,113,88,74,89,52,17,6,6,8,7,38
Z3-5 (Villa),4300104,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,52,63,47,58,42,24,68,44,40,34,26,34,40,51,42,55,51
Z3-8 (Villa),4300105,Zone_03_(B),Residential (Villa),ZONE 3B (BULK ZONE 3B),L3,56,32,19,15,49,40,38,25,49,68,181,290,83,106,196,358,414
Z8-12,4300196,Zone_08,Residential (Villa),BULK ZONE 8,L3,109,148,169,235,180,235,237,442,661,417,223,287,236,192,249,267,295
Z8-15,4300198,Zone_08,Residential (Villa),BULK ZONE 8,L3,227,74,90,145,179,100,136,152,144,87,100,90,99,61,70,125,112
Z8-16,4300199,Zone_08,Residential (Villa),BULK ZONE 8,L3,180,165,52,147,0,62,113,86,91,112,103,98,67,72,54,98,95
Z8-17,4300200,Zone_08,Residential (Villa),BULK ZONE 8,L3,198,135,213,190,196,138,94,220,0,191,154,155,164,162,171,207,238
Z8-5,4300287,Zone_08,Residential (Villa),BULK ZONE 8,L3,131,117,131,142,208,247,272,344,236,280,309,314,208,341,313,336,325
Z8-18,4300289,Zone_08,Residential (Villa),BULK ZONE 8,L3,290,212,253,418,384,478,459,410,312,196,239,149,122,111,336,0,679
Z8-19,4300290,Zone_08,Residential (Villa),BULK ZONE 8,L3,161,147,205,271,282,340,157,306,239,197,248,125,104,87,231,0,513
Z8-20,4300291,Zone_08,Residential (Villa),BULK ZONE 8,L3,226,210,289,358,298,313,290,297,275,219,298,158,146,110,312,0,579
Z8-21,4300292,Zone_08,Residential (Villa),BULK ZONE 8,L3,188,173,172,320,254,344,233,243,200,119,167,101,99,72,276,0,393
Z8-22,4300293,Zone_08,Residential (Villa),BULK ZONE 8,L3,262,168,174,366,388,418,271,343,330,138,213,177,225,156,336,0,806
Z5-13,4300058,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,78,73,9,46,17,83,40,80,61,56,68,85,72,106,89,120,110
Z5-14,4300059,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,68,56,52,250,128,100,12,20,22,22,62,72,71,93,77,93,82
Z5-4,4300150,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,54,40,98,36,30,52,110,85,32,38,86,100,81,98,35,49,29
Z5-9,4300155,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,72,97,84,96,158,82,70,74,95,134,94,56,38,49,40,56,76
Z5-12,4300166,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,59,78,49,39,89,105,90,90,84,112,89,71,44,47,40,66,81
Z5-016,4300168,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,306,64,6,10,34,118,363,347,16,85,67,57,27,29,37,51,53
Z5-3,4300170,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,1,1,0,0,1,5,24,28,68,116,205,141,149,86,67,100,71
Z5-5,4300146,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,1,2,0,3,1,8,3,0,2,13,4,3,3,6,2,5,39
Z5-30,4300147,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,1,3,53,10,1,0,17,17,4,6,60,65,87,71,113,202
Z5-2,4300148,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,2,2,0,0,3,3,1,1,0,0,0,0,0,0,0,0,0
Z5-10,4300149,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,0,6,3,0,4,37,0,0,0,0
Z5-6,4300151,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,1,0,1,0,0,0,0,0,5,12,5,2,6,3,10,5,37
Z5 020,4300152,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,26,13,13,20,18,34,51,3,1,0,28,24,25,30,147,164,203
Z5-23,4300153,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,5,6,56,1,0,4,11,3,0,0,22,19,0,1
Z5-15,4300154,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,39,33,33,27,41,60,47,40,36,51,40,37,35,19,16,23,30
Z5-26,4300156,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,2,0,12,18,25,61,41,16,69,107
Z5-25,4300157,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,0,24,20,37,18,37,24,10,71,104
Z5-31,4300158,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,7,20,0,0,0,0,189,68,61,0,0,14,33,24,14,16,4
Z5-33,4300159,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,7,3,3,0,0,0,1,18,3,0,0,2,0,24,0,18
Z5-29,4300160,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,1,0,68,15,21,49,66,21,20,28
Z5-28,4300161,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,40,0,90,16,11,50,21,9,8,14
Z5-32,4300162,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,2,2,3,0,0,0,1,47,1,3,1,59,119,71,72,67
Z5-22,4300163,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,89,32,38,10,36,17,21,39,0,18,25,28,15,40,186,243,202
Z5-7,4300164,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,2,2,1,2,2,6,2,0,2,0,0,0,0,26,14,7,5
Z5-27,4300165,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,0,0,0,12,9,9,11,36,13,19,12,15
Z5 024,4300167,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,19,2,0,30,1,1,1,0,0,3,4,39,68,1,0,0,0
Z5-21,4300169,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,2,0,0,1,1,0,3,1,0,5,13,23,25,22,34,58,57
Z5 019,4300171,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,4,9,6,8,9,14,8,9,8,12,6,7,5,7,6,2,57
Z5-1,4300172,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,3,8,7,43,0,1,6,88,8,5,5,5,5,4,5,47
Z5-11,4300173,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,15,6,10,24,13,15,16,34,50,65,71,68,30,45,3,3,9
Z5-18,4300174,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,5,13,11,10,12,26,10,15,35,23,23,18,8,12,11,37,30
Z5-8,4300175,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,0,0,0,0,0,1,1,3,1,3,0,5,6,12,11,67,12
Irrigation Tank 03 (Z05),4300321,Zone_05,IRR_Servies,ZONE 5 (Bulk Zone 5),L3,1223,1016,552,808,0,347,763,0,0,0,1,0,0,0,0,0,0
Z8-11,4300023,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,1,0,0,1,23,2,2,1,1,2,0,0,1,0,0,0
Z8-13,4300024,Zone_08,Residential (Villa),BULK ZONE 8,L3,6,2,1,1,0,15,0,0,0,3,2,1,0,0,0,0,0
Z8-1,4300188,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,16,6
Z8-2,4300189,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-3,4300190,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-4,4300191,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-6,4300192,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0
Z8-7,4300193,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-8,4300194,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-10,4300195,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-14,4300197,Zone_08,Residential (Villa),BULK ZONE 8,L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
Z8-9,4300288,Zone_08,Residential (Villa),BULK ZONE 8,L3,8,8,0,4,2,5,47,51,4,14,12,25,5,12,5,4,6
Building FM,4300296,Zone_01_(FM),MB_Common,ZONE FM ( BULK ZONE FM ),L3,34,43,22,18,27,22,32,37,34,45,30,38,37,39,49,40,41
Building Taxi,4300298,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,11,9,10,10,13,10,8,13,12,17,11,13,11,16,12,14,13
Building B1,4300300,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,258,183,178,184,198,181,164,202,184,167,214,245,228,225,235,253,233
Building B2,4300301,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,239,194,214,205,167,187,177,191,206,163,194,226,236,213,202,187,200
Building B3,4300302,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,166,147,153,190,170,124,119,123,131,112,172,161,169,165,132,134,160
Building B4,4300303,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,8,17,21,29,30,5,93,130,119,92,134,138,108,108,148,148,120
Building B5,4300304,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,28,0,0,17,49,175,8,8,3,0,0,0,1,2,1,1,0
Building B6,4300305,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,7,9,9,11,16,57,131,234,226,196,195,224,254,228,268,281,214
Building B7,4300306,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,304,243,251,275,244,226,140,161,36,116,148,151,178,190,174,201,199
Building B8,4300307,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,557,260,253,290,320,275,261,196,176,178,261,276,268,250,233,0,413
Irrigation Tank (Z01_FM),4300308,Zone_01_(FM),IRR_Servies,ZONE FM ( BULK ZONE FM ),L3,0,0,0,0,0,519,877,0,0,0,0,0,0,0,0,0,0
Room PUMP (FIRE),4300309,Zone_01_(FM),MB_Common,ZONE FM ( BULK ZONE FM ),L3,0,0,0,0,0,0,0,0,0,0,25,107,78,0,0,0,0
Building (MEP),4300310,Zone_01_(FM),MB_Common,ZONE FM ( BULK ZONE FM ),L3,1,1,1,2,4,4,6,8,3,2,3,2,2,2,1,5,6
Building CIF/CB,4300324,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,8,5,6,27,29,25,258,300,285,388,349,347,420,331,306,307,284
Building Nursery Building,4300325,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,7,6,5,5,6,4,5,6,6,8,5,5,4,4,4,0,6
Irrigation Tank - VS,4300326,Zone_VS,IRR_Servies,Village Square (Zone Bulk),L3,0,0,0,2,0,157,116,71,100,0,1,0,0,0,0,0,0
Coffee 1 (GF Shop No.591),4300327,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,-3,0
Coffee 2 (GF Shop No.594 A),4300329,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,0,0,0,0,0,0,0,0,3,1,3,2,3,5,5,5
Supermarket (FF Shop No.591),4300330,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0
Pharmacy (FF Shop No.591 A),4300331,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0
Laundry Services (FF Shop No.593),4300332,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,1,16,49,32,34,32,47,34,45,52,31,33,25,22,0,43
Shop No.593 A,4300333,Zone_VS,Retail,Village Square (Zone Bulk),L3,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0
Cabinet FM (CONTRACTORS OFFICE),4300337,Zone_01_(FM),MB_Common,ZONE FM ( BULK ZONE FM ),L3,99,98,70,53,22,95,90,10,4,1,15,42,68,59,52,58,52
Building CIF/CB (COFFEE SH),4300339,Zone_01_(FM),Retail,ZONE FM ( BULK ZONE FM ),L3,19,10,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0`.trim();

export const parseWaterSystemData = (rawData) => {
  const lines = rawData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthColumns = headers.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const entry = {
      id: index + 1,
      meterLabel: values[0] || 'N/A',
      acctNo: values[1] || 'N/A',
      zone: values[2] || 'N/A',
      type: values[3] || 'N/A',
      parentMeter: values[4] || 'N/A',
      label: values[5] || 'N/A',
      consumption: {},
      totalConsumption: 0,
    };

    let totalConsumption = 0;
    monthColumns.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]) || 0;
      entry.consumption[month] = consumptionValue;
      totalConsumption += consumptionValue;
    });
    
    entry.totalConsumption = parseFloat(totalConsumption.toFixed(2));
    return entry;
  });
};

// Export parsed data
export const waterSystemData = parseWaterSystemData(waterRawDataString);
export const waterMonthsAvailable = Object.keys(waterSystemData[0]?.consumption || {});

// Water System Hierarchy Helper Functions
export const getA1Supply = (month) => {
  const mainBulkMeter = waterSystemData.find(item => item.label === 'L1');
  return mainBulkMeter ? mainBulkMeter.consumption[month] || 0 : 0;
};

export const getA2Total = (month) => {
  const L2_meters = waterSystemData.filter(item => item.label === 'L2');
  const DC_meters = waterSystemData.filter(item => item.label === 'DC');
  const L2_total = L2_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  const DC_total = DC_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  return L2_total + DC_total;
};

export const getA3Total = (month) => {
  const L3_meters = waterSystemData.filter(item => item.label === 'L3');
  const DC_meters = waterSystemData.filter(item => item.label === 'DC');
  const L3_total = L3_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  const DC_total = DC_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  return L3_total + DC_total;
};

export const calculateWaterLoss = (month) => {
  const A1 = getA1Supply(month);
  const A2 = getA2Total(month);
  const A3 = getA3Total(month);
  
  const L2_total = waterSystemData.filter(item => item.label === 'L2')
    .reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  const L3_total = waterSystemData.filter(item => item.label === 'L3')
    .reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
  
  return {
    A1_supply: A1,
    A2_total: A2,
    A3_total: A3,
    stage1Loss: A1 - A2, // Trunk main loss
    stage2Loss: L2_total - L3_total, // Distribution loss within zones
    totalLoss: A1 - A3,
    stage1LossPercent: A1 > 0 ? ((A1 - A2) / A1) * 100 : 0,
    stage2LossPercent: L2_total > 0 ? ((L2_total - L3_total) / L2_total) * 100 : 0,
    totalLossPercent: A1 > 0 ? ((A1 - A3) / A1) * 100 : 0,
    systemEfficiency: A1 > 0 ? (A3 / A1) * 100 : 0
  };
};

// Zone-specific data for detailed analysis with complete meter information
export const zoneData = {
  'Zone_FM': {
    name: 'Zone FM',
    bulk: 'ZONE FM ( BULK ZONE FM )',
    bulkAccount: '4300346',
    individual: [
      { label: 'Building FM', account: '4300296', type: 'MB_Common' },
      { label: 'Building Taxi', account: '4300298', type: 'Retail' },
      { label: 'Building B1', account: '4300300', type: 'Retail' },
      { label: 'Building B2', account: '4300301', type: 'Retail' },
      { label: 'Building B3', account: '4300302', type: 'Retail' },
      { label: 'Building B4', account: '4300303', type: 'Retail' },
      { label: 'Building B5', account: '4300304', type: 'Retail' },
      { label: 'Building B6', account: '4300305', type: 'Retail' },
      { label: 'Building B7', account: '4300306', type: 'Retail' },
      { label: 'Building B8', account: '4300307', type: 'Retail' },
      { label: 'Irrigation Tank (Z01_FM)', account: '4300308', type: 'IRR_Servies' },
      { label: 'Room PUMP (FIRE)', account: '4300309', type: 'MB_Common' },
      { label: 'Building (MEP)', account: '4300310', type: 'MB_Common' },
      { label: 'Building CIF/CB', account: '4300324', type: 'Retail' },
      { label: 'Building Nursery Building', account: '4300325', type: 'Retail' },
      { label: 'Cabinet FM (CONTRACTORS OFFICE)', account: '4300337', type: 'MB_Common' },
      { label: 'Building CIF/CB (COFFEE SH)', account: '4300339', type: 'Retail' }
    ]
  },
  'Zone_05': {
    name: 'Zone 05',
    bulk: 'ZONE 5 (Bulk Zone 5)',
    bulkAccount: '4300345',
    individual: [
      { label: 'Z5-17', account: '4300001', type: 'Residential (Villa)' },
      { label: 'Z5-13', account: '4300058', type: 'Residential (Villa)' },
      { label: 'Z5-14', account: '4300059', type: 'Residential (Villa)' },
      { label: 'Z5-5', account: '4300146', type: 'Residential (Villa)' },
      { label: 'Z5-30', account: '4300147', type: 'Residential (Villa)' },
      { label: 'Z5-2', account: '4300148', type: 'Residential (Villa)' },
      { label: 'Z5-10', account: '4300149', type: 'Residential (Villa)' },
      { label: 'Z5-4', account: '4300150', type: 'Residential (Villa)' },
      { label: 'Z5-6', account: '4300151', type: 'Residential (Villa)' },
      { label: 'Z5 020', account: '4300152', type: 'Residential (Villa)' },
      { label: 'Z5-23', account: '4300153', type: 'Residential (Villa)' },
      { label: 'Z5-15', account: '4300154', type: 'Residential (Villa)' },
      { label: 'Z5-9', account: '4300155', type: 'Residential (Villa)' },
      { label: 'Z5-26', account: '4300156', type: 'Residential (Villa)' },
      { label: 'Z5-25', account: '4300157', type: 'Residential (Villa)' },
      { label: 'Z5-31', account: '4300158', type: 'Residential (Villa)' },
      { label: 'Z5-33', account: '4300159', type: 'Residential (Villa)' },
      { label: 'Z5-29', account: '4300160', type: 'Residential (Villa)' },
      { label: 'Z5-28', account: '4300161', type: 'Residential (Villa)' },
      { label: 'Z5-32', account: '4300162', type: 'Residential (Villa)' },
      { label: 'Z5-22', account: '4300163', type: 'Residential (Villa)' },
      { label: 'Z5-7', account: '4300164', type: 'Residential (Villa)' },
      { label: 'Z5-27', account: '4300165', type: 'Residential (Villa)' },
      { label: 'Z5-12', account: '4300166', type: 'Residential (Villa)' },
      { label: 'Z5 024', account: '4300167', type: 'Residential (Villa)' },
      { label: 'Z5 016', account: '4300168', type: 'Residential (Villa)' },
      { label: 'Z5-21', account: '4300169', type: 'Residential (Villa)' },
      { label: 'Z5-3', account: '4300170', type: 'Residential (Villa)' },
      { label: 'Z5 019', account: '4300171', type: 'Residential (Villa)' },
      { label: 'Z5-1', account: '4300172', type: 'Residential (Villa)' },
      { label: 'Z5-11', account: '4300173', type: 'Residential (Villa)' },
      { label: 'Z5-18', account: '4300174', type: 'Residential (Villa)' },
      { label: 'Z5-8', account: '4300175', type: 'Residential (Villa)' },
      { label: 'Irrigation Tank 03 (Z05)', account: '4300321', type: 'IRR_Servies' }
    ]
  },
  'Zone_08': {
    name: 'Zone 08',
    bulk: 'ZONE 8 (Bulk Zone 8)',
    bulkAccount: '4300342',
    individual: [
      { label: 'Z8-11', account: '4300023', type: 'Residential (Villa)' },
      { label: 'Z8-13', account: '4300024', type: 'Residential (Villa)' },
      { label: 'Z8-1', account: '4300188', type: 'Residential (Villa)' },
      { label: 'Z8-2', account: '4300189', type: 'Residential (Villa)' },
      { label: 'Z8-3', account: '4300190', type: 'Residential (Villa)' },
      { label: 'Z8-4', account: '4300191', type: 'Residential (Villa)' },
      { label: 'Z8-6', account: '4300192', type: 'Residential (Villa)' },
      { label: 'Z8-7', account: '4300193', type: 'Residential (Villa)' },
      { label: 'Z8-8', account: '4300194', type: 'Residential (Villa)' },
      { label: 'Z8-10', account: '4300195', type: 'Residential (Villa)' },
      { label: 'Z8-12', account: '4300196', type: 'Residential (Villa)' },
      { label: 'Z8-14', account: '4300197', type: 'Residential (Villa)' },
      { label: 'Z8-15', account: '4300198', type: 'Residential (Villa)' },
      { label: 'Z8-16', account: '4300199', type: 'Residential (Villa)' },
      { label: 'Z8-17', account: '4300200', type: 'Residential (Villa)' },
      { label: 'Z8-5', account: '4300287', type: 'Residential (Villa)' },
      { label: 'Z8-9', account: '4300288', type: 'Residential (Villa)' },
      { label: 'Z8-18', account: '4300289', type: 'Residential (Villa)' },
      { label: 'Z8-19', account: '4300290', type: 'Residential (Villa)' },
      { label: 'Z8-20', account: '4300291', type: 'Residential (Villa)' },
      { label: 'Z8-21', account: '4300292', type: 'Residential (Villa)' },
      { label: 'Z8-22', account: '4300293', type: 'Residential (Villa)' }
    ]
  },
  'Zone_VS': {
    name: 'Village Square',
    bulk: 'Village Square (Zone Bulk)',
    bulkAccount: '4300335',
    individual: [
      { label: 'Irrigation Tank - VS', account: '4300326', type: 'IRR_Servies' },
      { label: 'Coffee 1 (GF Shop No.591)', account: '4300327', type: 'Retail' },
      { label: 'Coffee 2 (GF Shop No.594 A)', account: '4300329', type: 'Retail' },
      { label: 'Supermarket (FF Shop No.591)', account: '4300330', type: 'Retail' },
      { label: 'Pharmacy (FF Shop No.591 A)', account: '4300331', type: 'Retail' },
      { label: 'Laundry Services (FF Shop No.593)', account: '4300332', type: 'Retail' },
      { label: 'Shop No.593 A', account: '4300333', type: 'Retail' }
    ]
  },
  'Zone_03A': {
    name: 'Zone 03(A)',
    bulk: 'ZONE 3A (Bulk Zone 3A)',
    bulkAccount: '4300343',
    individual: [
      // Villa meters (21 total)
      { label: 'Z3-42 (Villa)', account: '4300002', type: 'Residential (Villa)' },
      { label: 'Z3-38 (Villa)', account: '4300005', type: 'Residential (Villa)' },
      { label: 'Z3-23 (Villa)', account: '4300038', type: 'Residential (Villa)' },
      { label: 'Z3-41 (Villa)', account: '4300044', type: 'Residential (Villa)' },
      { label: 'Z3-37 (Villa)', account: '4300049', type: 'Residential (Villa)' },
      { label: 'Z3-43 (Villa)', account: '4300050', type: 'Residential (Villa)' },
      { label: 'Z3-31 (Villa)', account: '4300052', type: 'Residential (Villa)' },
      { label: 'Z3-35 (Villa)', account: '4300075', type: 'Residential (Villa)' },
      { label: 'Z3-40 (Villa)', account: '4300079', type: 'Residential (Villa)' },
      { label: 'Z3-30 (Villa)', account: '4300081', type: 'Residential (Villa)' },
      { label: 'Z3-33 (Villa)', account: '4300082', type: 'Residential (Villa)' },
      { label: 'Z3-36 (Villa)', account: '4300084', type: 'Residential (Villa)' },
      { label: 'Z3-32 (Villa)', account: '4300085', type: 'Residential (Villa)' },
      { label: 'Z3-39 (Villa)', account: '4300086', type: 'Residential (Villa)' },
      { label: 'Z3-34 (Villa)', account: '4300087', type: 'Residential (Villa)' },
      { label: 'Z3-27 (Villa)', account: '4300089', type: 'Residential (Villa)' },
      { label: 'Z3-24 (Villa)', account: '4300091', type: 'Residential (Villa)' },
      { label: 'Z3-25 (Villa)', account: '4300093', type: 'Residential (Villa)' },
      { label: 'Z3-26 (Villa)', account: '4300095', type: 'Residential (Villa)' },
      { label: 'Z3-29 (Villa)', account: '4300097', type: 'Residential (Villa)' },
      { label: 'Z3-28 (Villa)', account: '4300101', type: 'Residential (Villa)' },
      // Building apartment meters (53 total)
      { label: 'Z3-46(5) (Building)', account: '4300003', type: 'Residential (Apart)' },
      { label: 'Z3-49(3) (Building)', account: '4300004', type: 'Residential (Apart)' },
      { label: 'Z3-75(4) (Building)', account: '4300006', type: 'Residential (Apart)' },
      { label: 'Z3-46(3A) (Building)', account: '4300007', type: 'Residential (Apart)' },
      { label: 'Z3-049(4) (Building)', account: '4300010', type: 'Residential (Apart)' },
      { label: 'Z3-46(1A) (Building)', account: '4300011', type: 'Residential (Apart)' },
      { label: 'Z3-47(2) (Building)', account: '4300012', type: 'Residential (Apart)' },
      { label: 'Z3-45(3A) (Building)', account: '4300013', type: 'Residential (Apart)' },
      { label: 'Z3-46(2A) (Building)', account: '4300014', type: 'Residential (Apart)' },
      { label: 'Z3-46(6) (Building)', account: '4300015', type: 'Residential (Apart)' },
      { label: 'Z3-47(4) (Building)', account: '4300016', type: 'Residential (Apart)' },
      { label: 'Z3-45(5) (Building)', account: '4300017', type: 'Residential (Apart)' },
      { label: 'Z3-47(5) (Building)', account: '4300018', type: 'Residential (Apart)' },
      { label: 'Z3-45(6) (Building)', account: '4300019', type: 'Residential (Apart)' },
      { label: 'Z3-50(4) (Building)', account: '4300021', type: 'Residential (Apart)' },
      { label: 'Z3-74(3) (Building)', account: '0', type: 'Residential (Apart)' },
      { label: 'Z3-45(4A) (Building)', account: '4300026', type: 'Residential (Apart)' },
      { label: 'Z3-50(5) (Building)', account: '4300027', type: 'Residential (Apart)' },
      { label: 'Z3-50(6) (Building)', account: '4300028', type: 'Residential (Apart)' },
      { label: 'Z3-44(1A) (Building)', account: '4300030', type: 'Residential (Apart)' },
      { label: 'Z3-44(1B) (Building)', account: '4300031', type: 'Residential (Apart)' },
      { label: 'Z3-44(2A) (Building)', account: '4300032', type: 'Residential (Apart)' },
      { label: 'Z3-44(2B) (Building)', account: '4300033', type: 'Residential (Apart)' },
      { label: 'Z3-44(5) (Building)', account: '4300034', type: 'Residential (Apart)' },
      { label: 'Z3-44(6) (Building)', account: '4300035', type: 'Residential (Apart)' },
      { label: 'Z3-75(1) (Building)', account: '4300036', type: 'Residential (Apart)' },
      { label: 'Z3-75(3) (Building)', account: '4300037', type: 'Residential (Apart)' },
      { label: 'Z3-47(3) (Building)', account: '4300039', type: 'Residential (Apart)' },
      { label: 'Z3-48(3) (Building)', account: '4300040', type: 'Residential (Apart)' },
      { label: 'Z3-48(6) (Building)', account: '4300041', type: 'Residential (Apart)' },
      { label: 'Z3-46(4A) (Building)', account: '4300043', type: 'Residential (Apart)' },
      { label: 'Z3-74(5) (Building)', account: '4300045', type: 'Residential (Apart)' },
      { label: 'Z3-74(6) (Building)', account: '4300046', type: 'Residential (Apart)' },
      { label: 'Z3-50(3) (Building)', account: '4300047', type: 'Residential (Apart)' },
      { label: 'Z3-48(5) (Building)', account: '4300048', type: 'Residential (Apart)' },
      { label: 'Z3-47(6) (Building)', account: '4300051', type: 'Residential (Apart)' },
      { label: 'Z3-49(5) (Building)', account: '4300053', type: 'Residential (Apart)' },
      { label: 'Z3-75(5) (Building)', account: '4300055', type: 'Residential (Apart)' },
      { label: 'Z3-49(6) (Building)', account: '4300061', type: 'Residential (Apart)' },
      { label: 'Z3-75(6) (Building)', account: '4300063', type: 'Residential (Apart)' },
      { label: 'Z3-74(1) (Building)', account: '4300106', type: 'Residential (Apart)' },
      { label: 'Z3-49(1) (Building)', account: '4300107', type: 'Residential (Apart)' },
      { label: 'Z3-49(2) (Building)', account: '4300108', type: 'Residential (Apart)' },
      { label: 'Z3-50(1) (Building)', account: '4300109', type: 'Residential (Apart)' },
      { label: 'Z3-45(1A) (Building)', account: '4300110', type: 'Residential (Apart)' },
      { label: 'Z3-51(1) (Building)', account: '4300111', type: 'Residential (Apart)' },
      { label: 'Z3-51(2) (Building)', account: '4300112', type: 'Residential (Apart)' },
      { label: 'Z3-45(2A) (Building)', account: '4300113', type: 'Residential (Apart)' },
      { label: 'Z3-050(2) (Building)', account: '4300114', type: 'Residential (Apart)' },
      { label: 'Z3-47(1) (Building)', account: '4300115', type: 'Residential (Apart)' },
      { label: 'Z3-48(1) (Building)', account: '4300117', type: 'Residential (Apart)' },
      { label: 'Z3-74(2) (Building)', account: '4300118', type: 'Residential (Apart)' },
      { label: 'Z3-51(3) (Building)', account: '4300121', type: 'Residential (Apart)' },
      { label: 'Z3-75(2) (Building)', account: '4300122', type: 'Residential (Apart)' },
      { label: 'Z3-48(2) (Building)', account: '4300123', type: 'Residential (Apart)' },
      { label: 'Z3-74(4) (Building)', account: '4300125', type: 'Residential (Apart)' },
      { label: 'Z3-51(4) (Building)', account: '4300127', type: 'Residential (Apart)' },
      { label: 'Z3-051(5) (Building)', account: '4300128', type: 'Residential (Apart)' },
      { label: 'Z3-48(4) (Building)', account: '4300131', type: 'Residential (Apart)' },
      { label: 'Z3-51(6) (Building)', account: '4300134', type: 'Residential (Apart)' },
      { label: 'Z3-74(3) (Building)', account: '4300322', type: 'Residential (Apart)' },
      // Building common meters (10 total)
      { label: 'D 45-Building Common Meter', account: '4300135', type: 'D_Building_Common' },
      { label: 'D 50-Building Common Meter', account: '4300136', type: 'D_Building_Common' },
      { label: 'D 51-Building Common Meter', account: '4300137', type: 'D_Building_Common' },
      { label: 'D 46-Building Common Meter', account: '4300138', type: 'D_Building_Common' },
      { label: 'D 74-Building Common Meter', account: '4300139', type: 'D_Building_Common' },
      { label: 'D 49-Building Common Meter', account: '4300140', type: 'D_Building_Common' },
      { label: 'D 48-Building Common Meter', account: '4300141', type: 'D_Building_Common' },
      { label: 'D 47-Building Common Meter', account: '4300143', type: 'D_Building_Common' },
      { label: 'D 44-Building Common Meter', account: '4300144', type: 'D_Building_Common' },
      { label: 'D 75-Building Common Meter', account: '4300145', type: 'D_Building_Common' }
    ]
  },
  'Zone_03B': {
    name: 'Zone 03(B)',
    bulk: 'ZONE 3B (Bulk Zone 3B)',
    bulkAccount: '4300344',
    individual: [
      // Villa meters (22 total)
      { label: 'Z3-21 (Villa)', account: '4300009', type: 'Residential (Villa)' },
      { label: 'Z3-20 (Villa)', account: '4300020', type: 'Residential (Villa)' },
      { label: 'Z3-13 (Villa)', account: '4300025', type: 'Residential (Villa)' },
      { label: 'Z3-15 (Villa)', account: '4300057', type: 'Residential (Villa)' },
      { label: 'Z3-14 (Villa)', account: '4300060', type: 'Residential (Villa)' },
      { label: 'Z3-12 (Villa)', account: '4300076', type: 'Residential (Villa)' },
      { label: 'Z3-11 (Villa)', account: '4300077', type: 'Residential (Villa)' },
      { label: 'Z3-4 (Villa)', account: '4300078', type: 'Residential (Villa)' },
      { label: 'Z3-17 (Villa)', account: '4300080', type: 'Residential (Villa)' },
      { label: 'Z3-18 (Villa)', account: '4300083', type: 'Residential (Villa)' },
      { label: 'Z3-3 (Villa)', account: '4300088', type: 'Residential (Villa)' },
      { label: 'Z3-7 (Villa)', account: '4300090', type: 'Residential (Villa)' },
      { label: 'Z3-10 (Villa)', account: '4300092', type: 'Residential (Villa)' },
      { label: 'Z3-1 (Villa)', account: '4300094', type: 'Residential (Villa)' },
      { label: 'Z3-9 (Villa)', account: '4300096', type: 'Residential (Villa)' },
      { label: 'Z3-2 (Villa)', account: '4300098', type: 'Residential (Villa)' },
      { label: 'Z3-19 (Villa)', account: '4300099', type: 'Residential (Villa)' },
      { label: 'Z3-6 (Villa)', account: '4300100', type: 'Residential (Villa)' },
      { label: 'Z3-22 (Villa)', account: '4300102', type: 'Residential (Villa)' },
      { label: 'Z3-16 (Villa)', account: '4300103', type: 'Residential (Villa)' },
      { label: 'Z3-5 (Villa)', account: '4300104', type: 'Residential (Villa)' },
      { label: 'Z3-8 (Villa)', account: '4300105', type: 'Residential (Villa)' },
      // Building apartment meters (85 total)
      { label: 'Z3-52(6) (Building)', account: '4300008', type: 'Residential (Apart)' },
      { label: 'Z3-52(4A) (Building)', account: '4300029', type: 'Residential (Apart)' },
      { label: 'Z3-52(3A) (Building)', account: '4300042', type: 'Residential (Apart)' },
      { label: 'Z3-62(6) (Building)', account: '4300054', type: 'Residential (Apart)' },
      { label: 'Z3-52(5) (Building)', account: '4300056', type: 'Residential (Apart)' },
      { label: 'Z3-62(1) (Building)', account: '4300062', type: 'Residential (Apart)' },
      { label: 'Z3-53(4B) (Building)', account: '4300064', type: 'Residential (Apart)' },
      { label: 'Z3-60(1B) (Building)', account: '4300065', type: 'Residential (Apart)' },
      { label: 'Z3-59(4B) (Building)', account: '4300066', type: 'Residential (Apart)' },
      { label: 'Z3-60(3B) (Building)', account: '4300067', type: 'Residential (Apart)' },
      { label: 'Z3-60(4B) (Building)', account: '4300068', type: 'Residential (Apart)' },
      { label: 'Z3-60(5) (Building)', account: '4300069', type: 'Residential (Apart)' },
      { label: 'Z3-58(4A) (Building)', account: '4300070', type: 'Residential (Apart)' },
      { label: 'Z3-59(2B) (Building)', account: '4300071', type: 'Residential (Apart)' },
      { label: 'Z3-60(6) (Building)', account: '4300072', type: 'Residential (Apart)' },
      { label: 'Z3-58(2A) (Building)', account: '4300073', type: 'Residential (Apart)' },
      { label: 'Z3-60(2B) (Building)', account: '4300074', type: 'Residential (Apart)' },
      { label: 'Z3-52(1A) (Building)', account: '4300116', type: 'Residential (Apart)' },
      { label: 'Z3-62(2) (Building)', account: '4300119', type: 'Residential (Apart)' },
      { label: 'Z3-58(5) (Building)', account: '4300120', type: 'Residential (Apart)' },
      { label: 'Z3-62(3) (Building)', account: '4300124', type: 'Residential (Apart)' },
      { label: 'Z3-62(4) (Building)', account: '4300129', type: 'Residential (Apart)' },
      { label: 'Z3-58(3B) (Building)', account: '4300130', type: 'Residential (Apart)' },
      { label: 'Z3-058(4B) (Building)', account: '4300132', type: 'Residential (Apart)' },
      { label: 'Z3-62(5) (Building)', account: '4300133', type: 'Residential (Apart)' },
      { label: 'Z3-53(1A) (Building)', account: '4300210', type: 'Residential (Apart)' },
      { label: 'Z3-53(1B) (Building)', account: '4300211', type: 'Residential (Apart)' },
      { label: 'Z3-53(2A) (Building)', account: '4300212', type: 'Residential (Apart)' },
      { label: 'Z3-53(2B) (Building)', account: '4300213', type: 'Residential (Apart)' },
      { label: 'Z3-53(3A) (Building)', account: '4300214', type: 'Residential (Apart)' },
      { label: 'Z3-53(3B) (Building)', account: '4300215', type: 'Residential (Apart)' },
      { label: 'Z3-53(4A) (Building)', account: '4300216', type: 'Residential (Apart)' },
      { label: 'Z3-53(5) (Building)', account: '4300217', type: 'Residential (Apart)' },
      { label: 'Z3-54(1A) (Building)', account: '4300218', type: 'Residential (Apart)' },
      { label: 'Z3-54(1B) (Building)', account: '4300219', type: 'Residential (Apart)' },
      { label: 'Z3-54(2A) (Building)', account: '4300220', type: 'Residential (Apart)' },
      { label: 'Z3-54(2B) (Building)', account: '4300221', type: 'Residential (Apart)' },
      { label: 'Z3-54(3A) (Building)', account: '4300222', type: 'Residential (Apart)' },
      { label: 'Z3-54(3B) (Building)', account: '4300223', type: 'Residential (Apart)' },
      { label: 'Z3-54(4A) (Building)', account: '4300224', type: 'Residential (Apart)' },
      { label: 'Z3-54(4B) (Building)', account: '4300225', type: 'Residential (Apart)' },
      { label: 'Z3-54(5) (Building)', account: '4300226', type: 'Residential (Apart)' },
      { label: 'Z3-54(6) (Building)', account: '4300227', type: 'Residential (Apart)' },
      { label: 'Z3-55(1A) (Building)', account: '4300228', type: 'Residential (Apart)' },
      { label: 'Z3-55(2A) (Building)', account: '4300229', type: 'Residential (Apart)' },
      { label: 'Z3-55(2B) (Building)', account: '4300230', type: 'Residential (Apart)' },
      { label: 'Z3-55(3A) (Building)', account: '4300231', type: 'Residential (Apart)' },
      { label: 'Z3-55(3B) (Building)', account: '4300232', type: 'Residential (Apart)' },
      { label: 'Z3-55(4A) (Building)', account: '4300233', type: 'Residential (Apart)' },
      { label: 'Z3-55(4B) (Building)', account: '4300234', type: 'Residential (Apart)' },
      { label: 'Z3-55(5) (Building)', account: '4300235', type: 'Residential (Apart)' },
      { label: 'Z3-55(6) (Building)', account: '4300236', type: 'Residential (Apart)' },
      { label: 'Z3-56(1A) (Building)', account: '4300237', type: 'Residential (Apart)' },
      { label: 'Z3-56(1B) (Building)', account: '4300238', type: 'Residential (Apart)' },
      { label: 'Z3-56(2A) (Building)', account: '4300239', type: 'Residential (Apart)' },
      { label: 'Z3-56(2B) (Building)', account: '4300240', type: 'Residential (Apart)' },
      { label: 'Z3-56(3A) (Building)', account: '4300241', type: 'Residential (Apart)' },
      { label: 'Z3-56(3B) (Building)', account: '4300242', type: 'Residential (Apart)' },
      { label: 'Z3-56(4A) (Building)', account: '4300243', type: 'Residential (Apart)' },
      { label: 'Z3-56(4B) (Building)', account: '4300244', type: 'Residential (Apart)' },
      { label: 'Z3-56(5) (Building)', account: '4300245', type: 'Residential (Apart)' },
      { label: 'Z3-56(6) (Building)', account: '4300246', type: 'Residential (Apart)' },
      { label: 'Z3-57(1A) (Building)', account: '4300247', type: 'Residential (Apart)' },
      { label: 'Z3-57(1B) (Building)', account: '4300248', type: 'Residential (Apart)' },
      { label: 'Z3-57(2A) (Building)', account: '4300249', type: 'Residential (Apart)' },
      { label: 'Z3-57(2B) (Building)', account: '4300250', type: 'Residential (Apart)' },
      { label: 'Z3-57(3A) (Building)', account: '4300251', type: 'Residential (Apart)' },
      { label: 'Z3-57(3B) (Building)', account: '4300252', type: 'Residential (Apart)' },
      { label: 'Z3-57(4A) (Building)', account: '4300253', type: 'Residential (Apart)' },
      { label: 'Z3-57(4B) (Building)', account: '4300254', type: 'Residential (Apart)' },
      { label: 'Z3-57(5) (Building)', account: '4300255', type: 'Residential (Apart)' },
      { label: 'Z3-57(6) (Building)', account: '4300256', type: 'Residential (Apart)' },
      { label: 'Z3-58(1A) (Building)', account: '4300257', type: 'Residential (Apart)' },
      { label: 'Z3-58(1B) (Building)', account: '4300258', type: 'Residential (Apart)' },
      { label: 'Z3-58(2B) (Building)', account: '4300259', type: 'Residential (Apart)' },
      { label: 'Z3-58(3A) (Building)', account: '4300260', type: 'Residential (Apart)' },
      { label: 'Z3-58(4B) (Building)', account: '4300261', type: 'Residential (Apart)' },
      { label: 'Z3-58(6) (Building)', account: '4300262', type: 'Residential (Apart)' },
      { label: 'Z3-59(1A) (Building)', account: '4300263', type: 'Residential (Apart)' },
      { label: 'Z3-59(1B) (Building)', account: '4300264', type: 'Residential (Apart)' },
      { label: 'Z3-59(2A) (Building)', account: '4300265', type: 'Residential (Apart)' },
      { label: 'Z3-59(3A) (Building)', account: '4300266', type: 'Residential (Apart)' },
      { label: 'Z3-59(3B) (Building)', account: '4300267', type: 'Residential (Apart)' },
      { label: 'Z3-59(4A) (Building)', account: '4300268', type: 'Residential (Apart)' },
      { label: 'Z3-59(5) (Building)', account: '4300269', type: 'Residential (Apart)' },
      { label: 'Z3-59(6) (Building)', account: '4300270', type: 'Residential (Apart)' },
      { label: 'Z3-60(1A) (Building)', account: '4300271', type: 'Residential (Apart)' },
      { label: 'Z3-60(2A) (Building)', account: '4300272', type: 'Residential (Apart)' },
      { label: 'Z3-60(3A) (Building)', account: '4300273', type: 'Residential (Apart)' },
      { label: 'Z3-60(4A) (Building)', account: '4300274', type: 'Residential (Apart)' },
      { label: 'Z3-61(1A) (Building)', account: '4300275', type: 'Residential (Apart)' },
      { label: 'Z3-61(1B) (Building)', account: '4300276', type: 'Residential (Apart)' },
      { label: 'Z3-61(2A) (Building)', account: '4300277', type: 'Residential (Apart)' },
      { label: 'Z3-61(2B) (Building)', account: '4300278', type: 'Residential (Apart)' },
      { label: 'Z3-61(3A) (Building)', account: '4300279', type: 'Residential (Apart)' },
      { label: 'Z3-61(3B) (Building)', account: '4300280', type: 'Residential (Apart)' },
      { label: 'Z3-61(4A) (Building)', account: '4300281', type: 'Residential (Apart)' },
      { label: 'Z3-61(4B) (Building)', account: '4300282', type: 'Residential (Apart)' },
      { label: 'Z3-61(5) (Building)', account: '4300283', type: 'Residential (Apart)' },
      { label: 'Z3-61(6) (Building)', account: '4300284', type: 'Residential (Apart)' },
      // Building common meters (11 total)
      { label: 'D 52-Building Common Meter', account: '4300126', type: 'D_Building_Common' },
      { label: 'D 62-Building Common Meter', account: '4300142', type: 'D_Building_Common' },
      { label: 'D 53-Building Common Meter', account: '4300201', type: 'D_Building_Common' },
      { label: 'D 54-Building Common Meter', account: '4300202', type: 'D_Building_Common' },
      { label: 'D 55-Building Common Meter', account: '4300203', type: 'D_Building_Common' },
      { label: 'D 56-Building Common Meter', account: '4300204', type: 'D_Building_Common' },
      { label: 'D 57-Building Common Meter', account: '4300205', type: 'D_Building_Common' },
      { label: 'D 58-Building Common Meter', account: '4300206', type: 'D_Building_Common' },
      { label: 'D 59-Building Common Meter', account: '4300207', type: 'D_Building_Common' },
      { label: 'D 60-Building Common Meter', account: '4300208', type: 'D_Building_Common' },
      { label: 'D 61-Building Common Meter', account: '4300209', type: 'D_Building_Common' },
      // Irrigation tank
      { label: 'Irrigation Tank 02 (Z03)', account: '4300320', type: 'IRR_Servies' }
    ]
  },
  'Direct_Connection': {
    name: 'Direct Connection',
    bulk: null,
    bulkAccount: null,
    individual: [
      { label: 'Irrigation Tank 04 - (Z08)', account: '4300294', type: 'IRR_Servies' },
      { label: 'Sales Center Common Building', account: '4300295', type: 'MB_Common' },
      { label: 'Building (Security)', account: '4300297', type: 'MB_Common' },
      { label: 'Building (ROP)', account: '4300299', type: 'MB_Common' },
      { label: 'Irrigation Tank 01 (Inlet)', account: '4300323', type: 'IRR_Servies' },
      { label: 'Hotel Main Building', account: '4300334', type: 'Retail' },
      { label: 'Community Mgmt - Technical Zone, STP', account: '4300336', type: 'MB_Common' },
      { label: 'PHASE 02, MAIN ENTRANCE (Infrastructure)', account: '4300338', type: 'MB_Common' },
      { label: 'Irrigation- Controller UP', account: '4300340', type: 'IRR_Servies' },
      { label: 'Irrigation- Controller DOWN', account: '4300341', type: 'IRR_Servies' },
      { label: 'Al Adrak Construction', account: '4300347', type: 'Retail' },
      { label: 'Al Adrak Camp', account: '4300348', type: 'Retail' }
    ]
  }
};

// Zone Analysis Helper Functions
export const getZoneAnalysis = (zoneKey, month) => {
  const zone = zoneData[zoneKey];
  if (!zone) return null;

  // Get zone bulk consumption
  const zoneBulkConsumption = zone.bulk ? 
    (waterSystemData.find(item => item.meterLabel === zone.bulk)?.consumption[month] || 0) : 0;

  // Get individual meters consumption
  const individualMetersData = zone.individual.map(meter => {
    const meterData = waterSystemData.find(item => item.acctNo === meter.account);
    return {
      ...meter,
      consumption: meterData ? (meterData.consumption[month] || 0) : 0,
      meterData: meterData
    };
  });

  const totalIndividualConsumption = individualMetersData.reduce((sum, meter) => sum + meter.consumption, 0);
  const difference = zoneBulkConsumption - totalIndividualConsumption;
  const lossPercentage = zoneBulkConsumption > 0 ? (difference / zoneBulkConsumption) * 100 : 0;

  return {
    zone: zone,
    month: month,
    zoneBulkConsumption: zoneBulkConsumption,
    totalIndividualConsumption: totalIndividualConsumption,
    difference: difference,
    lossPercentage: lossPercentage,
    individualMetersData: individualMetersData,
    efficiency: zoneBulkConsumption > 0 ? ((totalIndividualConsumption / zoneBulkConsumption) * 100) : 0
  };
};

// Get all available zones
export const getAvailableZones = () => {
  return Object.keys(zoneData).map(key => ({
    key: key,
    name: zoneData[key].name
  }));
};
