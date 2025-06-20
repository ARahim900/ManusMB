// STP Plant data parsing utilities

export const rawStpDataString = `Date:	Total Treated Water Produced - m³	Total TSE Water Output to Irrigation - m³	Total Inlet Sewage Received from (MB+Tnk) -m³	Number of Tankers Discharged:	Expected Tanker Volume (m³) (20 m3)	Direct In line Sewage (MB)
01/07/2024	385	340	339	10	200	139
02/07/2024	519	458	526	14	280	246
03/07/2024	479	425	468	13	260	208
04/07/2024	547	489	464	11	220	244
05/07/2024	653	574	565	15	300	265
06/07/2024	552	492	502	14	280	222
07/07/2024	575	498	549	13	260	289
08/07/2024	587	515	532	16	320	212
09/07/2024	586	519	532	13	260	272
10/07/2024	542	462	493	12	240	253
12/07/2024	533	468	506	12	240	266
13/07/2024	464	402	479	10	200	279
14/07/2024	506	448	486	13	260	226
15/07/2024	482	418	391	6	120	271
16/07/2024	670	600	576	18	360	216
17/07/2024	344	300	506	12	240	266
18/07/2024	585	517	369	8	160	209
19/07/2024	687	605	614	15	300	314
20/07/2024	536	465	483	12	240	243
21/07/2024	504	455	501	13	260	241
22/07/2024	549	492	480	13	260	220
23/07/2024	611	535	568	16	320	248
24/07/2024	599	528	563	18	360	203
25/07/2024	517	444	415	14	280	135
26/07/2024	650	570	584	18	360	224
27/07/2024	475	414	537	10	200	337
28/07/2024	512	449	453	12	240	213
29/07/2024	671	577	685	19	380	305
30/07/2024	668	582	527	13	260	267
31/07/2024	613	529	606	17	340	266
01/08/2024	601	528	542	15	300	242
02/08/2024	676	590	660	15	300	360
03/08/2024	544	474	493	13	260	233
04/08/2024	571	497	510	13	260	250
05/08/2024	574	500	515	13	260	255
06/08/2024	643	554	604	16	320	284
07/08/2024	608	516	490	19	380	110
08/08/2024	610	524	642	17	340	302
09/08/2024	630	550	531	12	240	291
10/08/2024	583	499	525	13	260	265
11/08/2024	554	483	559	11	220	339
12/08/2024	606	531	469	12	240	229
13/08/2024	569	499	459	12	240	219
14/08/2024	525	492	509	11	220	289
15/08/2024	579	502	541	13	260	281
16/08/2024	591	516	548	11	220	328
17/08/2024	466	414	512	14	280	232
18/08/2024	591	516	478	13	260	218
19/08/2024	529	470	430	11	220	210
20/08/2024	579	495	521	13	260	261
21/08/2024	586	500	478	12	240	238
22/08/2024	486	437	552	13	260	292
23/08/2024	564	478	449	12	240	209
24/08/2024	581	505	461	9	180	281
25/08/2024	488	420	369	8	160	209
26/08/2024	371	291	409	8	160	249
27/08/2024	453	417	391	8	160	231
28/08/2024	642	557	535	9	180	355
29/08/2024	413	360	368	9	180	188
30/08/2024	624	551	626	14	280	346
31/08/2024	535	473	465	9	180	285`.trim();

export const parseStpData = (rawData: string) => {
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
      parsedDate = new Date(year, month - 1, day);
    }

    return {
      id: index + 1,
      date: dateStr,
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater: parseFloat(values[1]) || 0,
      tseOutput: parseFloat(values[2]) || 0,
      totalInlet: parseFloat(values[3]) || 0,
      tankersDischarge: parseInt(values[4]) || 0,
      expectedTankerVolume: parseFloat(values[5]) || 0,
      directSewage: parseFloat(values[6]) || 0,
      // Calculated fields
      treatmentEfficiency: values[1] && values[3] ? ((parseFloat(values[1]) / parseFloat(values[3])) * 100) : 0,
      irrigationEfficiency: values[2] && values[1] ? ((parseFloat(values[2]) / parseFloat(values[1])) * 100) : 0,
      tankerPercentage: values[5] && values[3] ? ((parseFloat(values[5]) / parseFloat(values[3])) * 100) : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
};

export const initialStpData = parseStpData(rawStpDataString);