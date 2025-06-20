export const PLANT_DESIGN_CAPACITY = 750; // m³/day

export const rawStpDataString = `Date:\tTotal Treated Water Produced - m³\tTotal TSE Water Output to Irrigation - m³\tTotal Inlet Sewage Received from (MB+Tnk) -m³\tNumber of Tankers Discharged:\tExpected Tanker Volume (m³) (20 m3)\tDirect In line Sewage (MB)
01/07/2024\t385\t340\t339\t10\t200\t139
02/07/2024\t519\t458\t526\t14\t280\t246
03/07/2024\t479\t425\t468\t13\t260\t208
04/07/2024\t547\t489\t464\t11\t220\t244
05/07/2024\t653\t574\t565\t15\t300\t265
06/07/2024\t552\t492\t502\t14\t280\t222
07/07/2024\t575\t498\t549\t13\t260\t289
08/07/2024\t587\t515\t532\t16\t320\t212
09/07/2024\t586\t519\t532\t13\t260\t272
10/07/2024\t542\t462\t493\t12\t240\t253
12/07/2024\t533\t468\t506\t12\t240\t266
13/07/2024\t464\t402\t479\t10\t200\t279
14/07/2024\t506\t448\t486\t13\t260\t226
15/07/2024\t482\t418\t391\t6\t120\t271
16/07/2024\t670\t600\t576\t18\t360\t216
17/07/2024\t344\t300\t506\t12\t240\t266
18/07/2024\t585\t517\t369\t8\t160\t209
19/07/2024\t687\t605\t614\t15\t300\t314
20/07/2024\t536\t465\t483\t12\t240\t243
21/07/2024\t504\t455\t501\t13\t260\t241
22/07/2024\t549\t492\t480\t13\t260\t220
23/07/2024\t611\t535\t568\t16\t320\t248
24/07/2024\t599\t528\t563\t18\t360\t203
25/07/2024\t517\t444\t415\t14\t280\t135
26/07/2024\t650\t570\t584\t18\t360\t224
27/07/2024\t475\t414\t537\t10\t200\t337
28/07/2024\t512\t449\t453\t12\t240\t213
29/07/2024\t671\t577\t685\t19\t380\t305
30/07/2024\t668\t582\t527\t13\t260\t267
31/07/2024\t613\t529\t606\t17\t340\t266`.trim();

export interface StpData {
  id: number;
  date: string;
  parsedDate: Date | null;
  month: string;
  treatedWater: number;
  tseOutput: number;
  totalInlet: number;
  tankersDischarge: number;
  expectedTankerVolume: number;
  directSewage: number;
  treatmentEfficiency: number;
  irrigationEfficiency: number;
  tankerPercentage: number;
}

export const parseStpData = (rawData: string): StpData[] => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const dateStr = values[0]?.trim();
    
    // Parse date
    let parsedDate = null;
    if (dateStr) {
      const [day, month, year] = dateStr.split('/');
      parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const treatedWater = parseFloat(values[1]) || 0;
    const tseOutput = parseFloat(values[2]) || 0;
    const totalInlet = parseFloat(values[3]) || 0;
    const expectedTankerVolume = parseFloat(values[5]) || 0;

    return {
      id: index + 1,
      date: dateStr,
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater,
      tseOutput,
      totalInlet,
      tankersDischarge: parseInt(values[4]) || 0,
      expectedTankerVolume,
      directSewage: parseFloat(values[6]) || 0,
      // Calculated fields
      treatmentEfficiency: totalInlet > 0 ? ((treatedWater / totalInlet) * 100) : 0,
      irrigationEfficiency: treatedWater > 0 ? ((tseOutput / treatedWater) * 100) : 0,
      tankerPercentage: totalInlet > 0 ? ((expectedTankerVolume / totalInlet) * 100) : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
};

export const stpData = parseStpData(rawStpDataString);