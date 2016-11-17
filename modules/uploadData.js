var data = [
    ['.75mb',100000,1095],
    ['.75mb',110000,1160],
    ['.75mb',121000,1282],
    ['.75mb',133100,1404],
    ['.75mb',146410,1538],
    ['.75mb',161051,1725],
    ['.75mb',177156,1862, 'recommendedSize'],
    ['.75mb',194872,2042],
    ['.75mb',214359,2256],
    ['.75mb',235795,2472],
    ['.75mb',259374,2721],
    ['.75mb',285312,3026],
    ['.75mb',313843,3285],
    ['.75mb',345227,3644],
    ['1.5mb',100000,604],
    ['1.5mb',110000,595],
    ['1.5mb',121000,648],
    ['1.5mb',133100,710],
    ['1.5mb',146410,782],
    ['1.5mb',161051,856],
    ['1.5mb',177156,944],
    ['1.5mb',194872,1048],
    ['1.5mb',214359,1132],
    ['1.5mb',235795,1250],
    ['1.5mb',259374,1363],
    ['1.5mb',285312,1503],
    ['1.5mb',313843,1677],
    ['1.5mb',345227,1822, 'recommendedSize'],
    ['1.5mb',379750,2003],
    ['1.5mb',417725,2220],
    ['1.5mb',459497,2413],
    ['1.5mb',505447,2655],
    ['1.5mb',555992,2938],
    ['1.5mb',611591,3212],
    ['1.5mb',672750,3552],
    ['1.5mb',740025,3882],
    ['2mb',100000,449],
    ['2mb',110000,448],
    ['2mb',121000,488],
    ['2mb',133100,540],
    ['2mb',146410,591],
    ['2mb',161051,650],
    ['2mb',177156,716],
    ['2mb',194872,777],
    ['2mb',214359,855],
    ['2mb',235795,968],
    ['2mb',259374,1030],
    ['2mb',285312,1132],
    ['2mb',313843,1247],
    ['2mb',345227,1371],
    ['2mb',379750,1523],
    ['2mb',417725,1653],
    ['2mb',459497,1818, 'recommendedSize'],
    ['2mb',505447,2016],
    ['2mb',555992,2196],
    ['2mb',611591,2410],
    ['2mb',672750,2673],
    ['2mb',740025,2914],
    ['2mb',814027,3224],
    ['2mb',895430,3520],
    ['3mb',100000,313],
    ['3mb',110000,297],
    ['3mb',121000,322],
    ['3mb',133100,354],
    ['3mb',146410,387],
    ['3mb',161051,427],
    ['3mb',177156,466],
    ['3mb',194872,508],
    ['3mb',214359,560],
    ['3mb',235795,615],
    ['3mb',259374,672],
    ['3mb',285312,740],
    ['3mb',313843,831],
    ['3mb',345227,890],
    ['3mb',379750,979],
    ['3mb',417725,1073],
    ['3mb',459497,1181],
    ['3mb',505447,1319],
    ['3mb',555992,1421],
    ['3mb',611591,1563],
    ['3mb',672750,1719],
    ['3mb',740025,1909, 'recommendedSize'],
    ['3mb',814027,2077],
    ['3mb',895430,2283],
    ['3mb',984973,2529],
    ['3mb',1083471,2763],
    ['3mb',1191818,3052],
    ['3mb',1310999,3337],
    ['3mb',1442099,3689],
    ['4mb',100000,248],
    ['4mb',110000,226],
    ['4mb',121000,249],
    ['4mb',133100,271],
    ['4mb',146410,300],
    ['4mb',161051,324],
    ['4mb',177156,357],
    ['4mb',194872,391],
    ['4mb',214359,429],
    ['4mb',235795,468],
    ['4mb',259374,514],
    ['4mb',285312,566],
    ['4mb',313843,622],
    ['4mb',345227,701],
    ['4mb',379750,744],
    ['4mb',417725,818],
    ['4mb',459497,897],
    ['4mb',505447,984],
    ['4mb',555992,1083],
    ['4mb',611591,1212],
    ['4mb',672750,1306],
    ['4mb',740025,1437],
    ['4mb',814027,1574],
    ['4mb',895430,1751],
    ['4mb',984973,1903, 'recommendedSize'],
    ['4mb',1083471,2097],
    ['4mb',1191818,2322],
    ['4mb',1310999,2528],
    ['4mb',1442099,2798],
    ['4mb',1586309,3054],
    ['4mb',1744940,3390],
    ['4mb',1919434,3696],
    ['5mb',100000,204],
    ['5mb',110000,188],
    ['5mb',121000,203],
    ['5mb',133100,223],
    ['5mb',146410,245],
    ['5mb',161051,264],
    ['5mb',177156,293],
    ['5mb',194872,320],
    ['5mb',214359,347],
    ['5mb',235795,381],
    ['5mb',259374,417],
    ['5mb',285312,460],
    ['5mb',313843,502],
    ['5mb',345227,551],
    ['5mb',379750,604],
    ['5mb',417725,681],
    ['5mb',459497,724],
    ['5mb',505447,793],
    ['5mb',555992,872],
    ['5mb',611591,958],
    ['5mb',672750,1052],
    ['5mb',740025,1178],
    ['5mb',814027,1270],
    ['5mb',895430,1396],
    ['5mb',984973,1536],
    ['5mb',1083471,1705],
    ['5mb',1191818,1859, 'recommendedSize'],
    ['5mb',1310999,2039],
    ['5mb',1442099,2264],
    ['5mb',1586309,2463],
    ['5mb',1744940,2727],
    ['5mb',1919434,2976],
    ['5mb',2111378,3299],
    ['5mb',2322515,3601],
    ['6mb',100000,187],
    ['6mb',110000,156],
    ['6mb',121000,174],
    ['6mb',133100,187],
    ['6mb',146410,204],
    ['6mb',161051,225],
    ['6mb',177156,247],
    ['6mb',194872,269],
    ['6mb',214359,293],
    ['6mb',235795,322],
    ['6mb',259374,350],
    ['6mb',285312,384],
    ['6mb',313843,421],
    ['6mb',345227,463],
    ['6mb',379750,506],
    ['6mb',417725,558],
    ['6mb',459497,632],
    ['6mb',505447,667],
    ['6mb',555992,734],
    ['6mb',611591,806],
    ['6mb',672750,886],
    ['6mb',740025,974],
    ['6mb',814027,1094],
    ['6mb',895430,1171],
    ['6mb',984973,1293],
    ['6mb',1083471,1415],
    ['6mb',1191818,1582],
    ['6mb',1310999,1714],
    ['6mb',1442099,1878, 'recommendedSize'],
    ['6mb',1586309,2094],
    ['6mb',1744940,2273],
    ['6mb',1919434,2498],
    ['6mb',2111378,2766],
    ['6mb',2322515,3020],
    ['6mb',2554767,3341],
    ['7mb',100000,165],
    ['7mb',110000,139],
    ['7mb',121000,153],
    ['7mb',133100,167],
    ['7mb',146410,179],
    ['7mb',161051,198],
    ['7mb',177156,212],
    ['7mb',194872,231],
    ['7mb',214359,256],
    ['7mb',235795,280],
    ['7mb',259374,305],
    ['7mb',285312,333],
    ['7mb',313843,365],
    ['7mb',345227,400],
    ['7mb',379750,440],
    ['7mb',417725,481],
    ['7mb',459497,527],
    ['7mb',505447,598],
    ['7mb',555992,633],
    ['7mb',611591,694],
    ['7mb',672750,761],
    ['7mb',740025,838],
    ['7mb',814027,919],
    ['7mb',895430,1010],
    ['7mb',984973,1133],
    ['7mb',1083471,1222],
    ['7mb',1191818,1342],
    ['7mb',1310999,1475],
    ['7mb',1442099,1636],
    ['7mb',1586309,1781],
    ['7mb',1744940,1955, 'recommendedSize'],
    ['7mb',1919434,2172],
    ['7mb',2111378,2361],
    ['7mb',2322515,2619],
    ['7mb',2554767,2857],
    ['7mb',2810244,3164],
    ['7mb',3091268,3450],
    ['8mb',100000,148],
    ['8mb',110000,122],
    ['8mb',121000,133],
    ['8mb',133100,143],
    ['8mb',146410,159],
    ['8mb',161051,171],
    ['8mb',177156,190],
    ['8mb',194872,202],
    ['8mb',214359,220],
    ['8mb',235795,245],
    ['8mb',259374,266],
    ['8mb',285312,294],
    ['8mb',313843,319],
    ['8mb',345227,350],
    ['8mb',379750,385],
    ['8mb',417725,418],
    ['8mb',459497,461],
    ['8mb',505447,503],
    ['8mb',555992,570],
    ['8mb',611591,605],
    ['8mb',672750,665],
    ['8mb',740025,734],
    ['8mb',814027,802],
    ['8mb',895430,880],
    ['8mb',984973,968],
    ['8mb',1083471,1082],
    ['8mb',1191818,1167],
    ['8mb',1310999,1283],
    ['8mb',1442099,1412],
    ['8mb',1586309,1571],
    ['8mb',1744940,1701],
    ['8mb',1919434,1866, 'recommendedSize'],
    ['8mb',2111378,2075],
    ['8mb',2322515,2267],
    ['8mb',2554767,2481],
    ['8mb',2810244,2749],
    ['8mb',3091268,3004],
    ['8mb',3400395,3322],
    ['9mb',100000,139],
    ['9mb',110000,111],
    ['9mb',121000,122],
    ['9mb',133100,132],
    ['9mb',146410,147],
    ['9mb',161051,154],
    ['9mb',177156,172],
    ['9mb',194872,184],
    ['9mb',214359,200],
    ['9mb',235795,221],
    ['9mb',259374,239],
    ['9mb',285312,261],
    ['9mb',313843,287],
    ['9mb',345227,313],
    ['9mb',379750,343],
    ['9mb',417725,378],
    ['9mb',459497,417],
    ['9mb',505447,450],
    ['9mb',555992,494],
    ['9mb',611591,565],
    ['9mb',672750,597],
    ['9mb',740025,650],
    ['9mb',814027,718],
    ['9mb',895430,785],
    ['9mb',984973,867],
    ['9mb',1083471,947],
    ['9mb',1191818,1064],
    ['9mb',1310999,1147],
    ['9mb',1442099,1260],
    ['9mb',1586309,1385],
    ['9mb',1744940,1543],
    ['9mb',1919434,1664],
    ['9mb',2111378,1831, 'recommendedSize'],
    ['9mb',2322515,2030],
    ['9mb',2554767,2211],
    ['9mb',2810244,2442],
    ['9mb',3091268,2702],
    ['9mb',3400395,2953],
    ['9mb',3740434,3265],
    ['10mb',100000,134],
    ['10mb',110000,104],
    ['10mb',121000,110],
    ['10mb',133100,122],
    ['10mb',146410,130],
    ['10mb',161051,144],
    ['10mb',177156,156],
    ['10mb',194872,168],
    ['10mb',214359,186],
    ['10mb',235795,204],
    ['10mb',259374,215],
    ['10mb',285312,239],
    ['10mb',313843,263],
    ['10mb',345227,288],
    ['10mb',379750,316],
    ['10mb',417725,341],
    ['10mb',459497,376],
    ['10mb',505447,412],
    ['10mb',555992,452],
    ['10mb',611591,496],
    ['10mb',672750,567],
    ['10mb',740025,592],
    ['10mb',814027,651],
    ['10mb',895430,715],
    ['10mb',984973,785],
    ['10mb',1083471,866],
    ['10mb',1191818,954],
    ['10mb',1310999,1058],
    ['10mb',1442099,1146],
    ['10mb',1586309,1262],
    ['10mb',1744940,1386],
    ['10mb',1919434,1547],
    ['10mb',2111378,1672],
    ['10mb',2322515,1843, 'recommendedSize'],
    ['10mb',2554767,2050],
    ['10mb',2810244,2220],
    ['10mb',3091268,2434],
    ['10mb',3400395,2705],
    ['10mb',3740434,2955],
    ['10mb',4114478,3264],
    ['11mb',100000,118],
    ['11mb',110000,96],
    ['11mb',121000,103],
    ['11mb',133100,113],
    ['11mb',146410,118],
    ['11mb',161051,130],
    ['11mb',177156,141],
    ['11mb',194872,157],
    ['11mb',214359,166],
    ['11mb',235795,185],
    ['11mb',259374,199],
    ['11mb',285312,218],
    ['11mb',313843,239],
    ['11mb',345227,263],
    ['11mb',379750,284],
    ['11mb',417725,311],
    ['11mb',459497,342],
    ['11mb',505447,373],
    ['11mb',555992,408],
    ['11mb',611591,451],
    ['11mb',672750,492],
    ['11mb',740025,561],
    ['11mb',814027,593],
    ['11mb',895430,650],
    ['11mb',984973,711],
    ['11mb',1083471,785],
    ['11mb',1191818,861],
    ['11mb',1310999,945],
    ['11mb',1442099,1061],
    ['11mb',1586309,1141],
    ['11mb',1744940,1248],
    ['11mb',1919434,1371],
    ['11mb',2111378,1532],
    ['11mb',2322515,1659],
    ['11mb',2554767,1819, 'recommendedSize'],
    ['11mb',2810244,2024],
    ['11mb',3091268,2205],
    ['11mb',3400395,2427],
    ['11mb',3740434,2688],
    ['11mb',4114478,2931],
    ['11mb',4525926,3243],
    ['12mb',100000,117],
    ['12mb',110000,86],
    ['12mb',121000,97],
    ['12mb',133100,101],
    ['12mb',146410,117],
    ['12mb',161051,122],
    ['12mb',177156,132],
    ['12mb',194872,147],
    ['12mb',214359,156],
    ['12mb',235795,170],
    ['12mb',259374,188],
    ['12mb',285312,204],
    ['12mb',313843,217],
    ['12mb',345227,244],
    ['12mb',379750,261],
    ['12mb',417725,288],
    ['12mb',459497,317],
    ['12mb',505447,346],
    ['12mb',555992,378],
    ['12mb',611591,415],
    ['12mb',672750,453],
    ['12mb',740025,496],
    ['12mb',814027,566],
    ['12mb',895430,596],
    ['12mb',984973,653],
    ['12mb',1083471,719],
    ['12mb',1191818,792],
    ['12mb',1310999,869],
    ['12mb',1442099,959],
    ['12mb',1586309,1071],
    ['12mb',1744940,1145],
    ['12mb',1919434,1266],
    ['12mb',2111378,1395],
    ['12mb',2322515,1557],
    ['12mb',2554767,1677],
    ['12mb',2810244,1844, 'recommendedSize'],
    ['12mb',3091268,2044],
    ['12mb',3400395,2231],
    ['12mb',3740434,2450],
    ['12mb',4114478,2720],
    ['12mb',4525926,2956],
    ['12mb',4978518,3269],
    ['13mb',100000,116],
    ['13mb',110000,82],
    ['13mb',121000,88],
    ['13mb',133100,98],
    ['13mb',146410,104],
    ['13mb',161051,114],
    ['13mb',177156,123],
    ['13mb',194872,135],
    ['13mb',214359,144],
    ['13mb',235795,159],
    ['13mb',259374,171],
    ['13mb',285312,188],
    ['13mb',313843,207],
    ['13mb',345227,224],
    ['13mb',379750,251],
    ['13mb',417725,266],
    ['13mb',459497,291],
    ['13mb',505447,325],
    ['13mb',555992,351],
    ['13mb',611591,381],
    ['13mb',672750,422],
    ['13mb',740025,464],
    ['13mb',814027,528],
    ['13mb',895430,558],
    ['13mb',984973,610],
    ['13mb',1083471,667],
    ['13mb',1191818,737],
    ['13mb',1310999,811],
    ['13mb',1442099,887],
    ['13mb',1586309,991],
    ['13mb',1744940,1061],
    ['13mb',1919434,1172],
    ['13mb',2111378,1293],
    ['13mb',2322515,1464],
    ['13mb',2554767,1557],
    ['13mb',2810244,1705],
    ['13mb',3091268,1908, 'recommendedSize'],
    ['13mb',3400395,2068],
    ['13mb',3740434,2244],
    ['13mb',4114478,2504],
    ['13mb',4525926,2737],
    ['13mb',4978518,3025],
    ['13mb',5476370,3308],
    ['14mb',100000,109],
    ['14mb',110000,79],
    ['14mb',121000,84],
    ['14mb',133100,90],
    ['14mb',146410,101],
    ['14mb',161051,111],
    ['14mb',177156,114],
    ['14mb',194872,124],
    ['14mb',214359,137],
    ['14mb',235795,151],
    ['14mb',259374,162],
    ['14mb',285312,177],
    ['14mb',313843,195],
    ['14mb',345227,207],
    ['14mb',379750,229],
    ['14mb',417725,251],
    ['14mb',459497,272],
    ['14mb',505447,297],
    ['14mb',555992,325],
    ['14mb',611591,357],
    ['14mb',672750,388],
    ['14mb',740025,424],
    ['14mb',814027,468],
    ['14mb',895430,533],
    ['14mb',984973,557],
    ['14mb',1083471,616],
    ['14mb',1191818,680],
    ['14mb',1310999,743],
    ['14mb',1442099,819],
    ['14mb',1586309,897],
    ['14mb',1744940,1008],
    ['14mb',1919434,1080],
    ['14mb',2111378,1192],
    ['14mb',2322515,1310],
    ['14mb',2554767,1456],
    ['14mb',2810244,1580],
    ['14mb',3091268,1741],
    ['14mb',3400395,1928, 'recommendedSize'],
    ['14mb',3740434,2099],
    ['14mb',4114478,2299],
    ['14mb',4525926,2566],
    ['14mb',4978518,2791],
    ['14mb',5476370,3079],
    ['14mb',6024007,3369],
    ['15mb',100000,111],
    ['15mb',110000,74],
    ['15mb',121000,80],
    ['15mb',133100,87],
    ['15mb',146410,93],
    ['15mb',161051,102],
    ['15mb',177156,112],
    ['15mb',194872,120],
    ['15mb',214359,130],
    ['15mb',235795,139],
    ['15mb',259374,151],
    ['15mb',285312,165],
    ['15mb',313843,183],
    ['15mb',345227,195],
    ['15mb',379750,211],
    ['15mb',417725,235],
    ['15mb',459497,251],
    ['15mb',505447,279],
    ['15mb',555992,308],
    ['15mb',611591,334],
    ['15mb',672750,363],
    ['15mb',740025,403],
    ['15mb',814027,441],
    ['15mb',895430,499],
    ['15mb',984973,529],
    ['15mb',1083471,581],
    ['15mb',1191818,635],
    ['15mb',1310999,702],
    ['15mb',1442099,771],
    ['15mb',1586309,840],
    ['15mb',1744940,964],
    ['15mb',1919434,1017],
    ['15mb',2111378,1111],
    ['15mb',2322515,1226],
    ['15mb',2554767,1367],
    ['15mb',2810244,1483],
    ['15mb',3091268,1628],
    ['15mb',3400395,1806],
    ['15mb',3740434,1966, 'recommendedSize'],
    ['15mb',4114478,2160],
    ['15mb',4525926,2400],
    ['15mb',4978518,2610],
    ['15mb',5476370,2907],
    ['15mb',6024007,3149],
    ['20mb',100000,92],
    ['20mb',110000,60],
    ['20mb',121000,67],
    ['20mb',133100,69],
    ['20mb',146410,74],
    ['20mb',161051,82],
    ['20mb',177156,88],
    ['20mb',194872,93],
    ['20mb',214359,102],
    ['20mb',235795,109],
    ['20mb',259374,117],
    ['20mb',285312,132],
    ['20mb',313843,142],
    ['20mb',345227,153],
    ['20mb',379750,165],
    ['20mb',417725,184],
    ['20mb',459497,198],
    ['20mb',505447,230],
    ['20mb',555992,237],
    ['20mb',611591,258],
    ['20mb',672750,284],
    ['20mb',740025,306],
    ['20mb',814027,337],
    ['20mb',895430,368],
    ['20mb',984973,405],
    ['20mb',1083471,467],
    ['20mb',1191818,488],
    ['20mb',1310999,536],
    ['20mb',1442099,586],
    ['20mb',1586309,642],
    ['20mb',1744940,708],
    ['20mb',1919434,780],
    ['20mb',2111378,873],
    ['20mb',2322515,946],
    ['20mb',2554767,1031],
    ['20mb',2810244,1129],
    ['20mb',3091268,1267],
    ['20mb',3400395,1367],
    ['20mb',3740434,1492],
    ['20mb',4114478,1667],
    ['20mb',4525926,1820, 'recommendedSize'],
    ['20mb',4978518,2042],
    ['20mb',5476370,2202],
    ['20mb',6024007,2411],
    ['20mb',6626408,2671],
    ['20mb',7289048,2910],
    ['30mb',100000,92],
    ['30mb',110000,44],
    ['30mb',121000,49],
    ['30mb',133100,50],
    ['30mb',146410,56],
    ['30mb',161051,60],
    ['30mb',177156,67],
    ['30mb',194872,69],
    ['30mb',214359,71],
    ['30mb',235795,78],
    ['30mb',259374,86],
    ['30mb',285312,93],
    ['30mb',313843,101],
    ['30mb',345227,111],
    ['30mb',379750,116],
    ['30mb',417725,130],
    ['30mb',459497,145],
    ['30mb',505447,152],
    ['30mb',555992,164],
    ['30mb',611591,180],
    ['30mb',672750,196],
    ['30mb',740025,218],
    ['30mb',814027,237],
    ['30mb',895430,258],
    ['30mb',984973,286],
    ['30mb',1083471,312],
    ['30mb',1191818,340],
    ['30mb',1310999,372],
    ['30mb',1442099,429],
    ['30mb',1586309,446],
    ['30mb',1744940,493],
    ['30mb',1919434,539],
    ['30mb',2111378,595],
    ['30mb',2322515,647],
    ['30mb',2554767,719],
    ['30mb',2810244,804],
    ['30mb',3091268,862],
    ['30mb',3400395,935],
    ['30mb',3740434,1033],
    ['30mb',4114478,1162],
    ['30mb',4525926,1252],
    ['30mb',4978518,1382],
    ['30mb',5476370,1527],
    ['30mb',6024007,1640],
    ['30mb',6626408,1828],
    ['30mb',7289048,1989, 'recommendedSize'],
    ['30mb',8017953,2209],
    ['30mb',8819749,2437],
    ['30mb',9701723,2676],
    ['40mb',100000,73],
    ['40mb',110000,39],
    ['40mb',121000,39],
    ['40mb',133100,44],
    ['40mb',146410,47],
    ['40mb',161051,50],
    ['40mb',177156,55],
    ['40mb',194872,58],
    ['40mb',214359,61],
    ['40mb',235795,66],
    ['40mb',259374,70],
    ['40mb',285312,79],
    ['40mb',313843,80],
    ['40mb',345227,88],
    ['40mb',379750,94],
    ['40mb',417725,102],
    ['40mb',459497,110],
    ['40mb',505447,122],
    ['40mb',555992,134],
    ['40mb',611591,140],
    ['40mb',672750,154],
    ['40mb',740025,169],
    ['40mb',814027,185],
    ['40mb',895430,203],
    ['40mb',984973,222],
    ['40mb',1083471,240],
    ['40mb',1191818,266],
    ['40mb',1310999,286],
    ['40mb',1442099,315],
    ['40mb',1586309,344],
    ['40mb',1744940,401],
    ['40mb',1919434,416],
    ['40mb',2111378,452],
    ['40mb',2322515,497],
    ['40mb',2554767,551],
    ['40mb',2810244,606],
    ['40mb',3091268,661],
    ['40mb',3400395,742],
    ['40mb',3740434,793],
    ['40mb',4114478,873],
    ['40mb',4525926,963],
    ['40mb',4978518,1072],
    ['40mb',5476370,1152],
    ['40mb',6024007,1269],
    ['40mb',6626408,1419],
    ['40mb',7289048,1535],
    ['40mb',8017953,1684],
    ['40mb',8819749,1878, 'recommendedSize'],
    ['40mb',9701723,2048],
    ['40mb',10671896,2229],
    ['40mb',11739085,2478],
    ['50mb',100000,70],
    ['50mb',110000,72],
    ['50mb',121000,48],
    ['50mb',133100,43],
    ['50mb',146410,41],
    ['50mb',161051,48],
    ['50mb',177156,46],
    ['50mb',194872,48],
    ['50mb',214359,53],
    ['50mb',235795,54],
    ['50mb',259374,56],
    ['50mb',285312,60],
    ['50mb',313843,67],
    ['50mb',345227,75],
    ['50mb',379750,79],
    ['50mb',417725,89],
    ['50mb',459497,91],
    ['50mb',505447,176],
    ['50mb',555992,107],
    ['50mb',611591,119],
    ['50mb',672750,125],
    ['50mb',740025,139],
    ['50mb',814027,148],
    ['50mb',895430,160],
    ['50mb',984973,182],
    ['50mb',1083471,197],
    ['50mb',1191818,215],
    ['50mb',1310999,234],
    ['50mb',1442099,252],
    ['50mb',1586309,280],
    ['50mb',1744940,307],
    ['50mb',1919434,355],
    ['50mb',2111378,368],
    ['50mb',2322515,402],
    ['50mb',2554767,440],
    ['50mb',2810244,486],
    ['50mb',3091268,534],
    ['50mb',3400395,581],
    ['50mb',3740434,657],
    ['50mb',4114478,703],
    ['50mb',4525926,771],
    ['50mb',4978518,852],
    ['50mb',5476370,957],
    ['50mb',6024007,1029],
    ['50mb',6626408,1132],
    ['50mb',7289048,1260],
    ['50mb',8017953,1353],
    ['50mb',8819749,1500],
    ['50mb',9701723,1664],
    ['50mb',10671896,1796, 'recommendedSize'],
    ['50mb',11739085,2009],
    ['50mb',12912994,2178],
    ['60mb',100000,66],
    ['60mb',110000,75],
    ['60mb',121000,48],
    ['60mb',133100,39],
    ['60mb',146410,37],
    ['60mb',161051,44],
    ['60mb',177156,45],
    ['60mb',194872,45],
    ['60mb',214359,52],
    ['60mb',235795,51],
    ['60mb',259374,54],
    ['60mb',285312,58],
    ['60mb',313843,60],
    ['60mb',345227,64],
    ['60mb',379750,70],
    ['60mb',417725,73],
    ['60mb',459497,79],
    ['60mb',505447,86],
    ['60mb',555992,92],
    ['60mb',611591,101],
    ['60mb',672750,109],
    ['60mb',740025,118],
    ['60mb',814027,132],
    ['60mb',895430,142],
    ['60mb',984973,153],
    ['60mb',1083471,166],
    ['60mb',1191818,180],
    ['60mb',1310999,202],
    ['60mb',1442099,316],
    ['60mb',1586309,333],
    ['60mb',1744940,265],
    ['60mb',1919434,284],
    ['60mb',2111378,331],
    ['60mb',2322515,348],
    ['60mb',2554767,378],
    ['60mb',2810244,416],
    ['60mb',3091268,455],
    ['60mb',3400395,494],
    ['60mb',3740434,547],
    ['60mb',4114478,598],
    ['60mb',4525926,688],
    ['60mb',4978518,724],
    ['60mb',5476370,796],
    ['60mb',6024007,867],
    ['60mb',6626408,962],
    ['60mb',7289048,1074],
    ['60mb',8017953,1155],
    ['60mb',8819749,1272],
    ['60mb',9701723,1432],
    ['60mb',10671896,1538],
    ['60mb',11739085,1666],
    ['60mb',12912994,1879, 'recommendedSize'],
    ['60mb',14204293,2032],
    ['60mb',15624723,2208],
    ['60mb',17187195,2466],
    ['60mb',18905914,2966],
    ['60mb',20796506,3296],
    ['60mb',22876156,3299],
    ['60mb',25163772,3594],
    ['70mb',100000,64],
    ['70mb',110000,86],
    ['70mb',121000,39],
    ['70mb',133100,36],
    ['70mb',146410,38],
    ['70mb',161051,38],
    ['70mb',177156,41],
    ['70mb',194872,42],
    ['70mb',214359,46],
    ['70mb',235795,49],
    ['70mb',259374,50],
    ['70mb',285312,53],
    ['70mb',313843,53],
    ['70mb',345227,57],
    ['70mb',379750,62],
    ['70mb',417725,69],
    ['70mb',459497,72],
    ['70mb',505447,180],
    ['70mb',555992,82],
    ['70mb',611591,90],
    ['70mb',672750,97],
    ['70mb',740025,220],
    ['70mb',814027,112],
    ['70mb',895430,129],
    ['70mb',984973,136],
    ['70mb',1083471,147],
    ['70mb',1191818,162],
    ['70mb',1310999,177],
    ['70mb',1442099,309],
    ['70mb',1586309,370],
    ['70mb',1744940,225],
    ['70mb',1919434,249],
    ['70mb',2111378,289],
    ['70mb',2322515,300],
    ['70mb',2554767,328],
    ['70mb',2810244,353],
    ['70mb',3091268,389],
    ['70mb',3400395,431],
    ['70mb',3740434,469],
    ['70mb',4114478,516],
    ['70mb',4525926,589],
    ['70mb',4978518,621],
    ['70mb',5476370,677],
    ['70mb',6024007,745],
    ['70mb',6626408,845],
    ['70mb',7289048,906],
    ['70mb',8017953,986],
    ['70mb',8819749,1107],
    ['70mb',9701723,1215],
    ['70mb',10671896,1317],
    ['70mb',11739085,1476],
    ['70mb',12912994,1583],
    ['70mb',14204293,1843],
    ['70mb',15624723,1923, 'recommendedSize'],
    ['70mb',17187195,2146],
    ['70mb',18905914,2591],
    ['70mb',20796506,2594],
    ['70mb',22876156,2867],
    ['70mb',25163772,3114],
    ['80mb',100000,58],
    ['80mb',110000,31],
    ['80mb',121000,30],
    ['80mb',133100,34],
    ['80mb',146410,46],
    ['80mb',161051,39],
    ['80mb',177156,36],
    ['80mb',194872,37],
    ['80mb',214359,38],
    ['80mb',235795,41],
    ['80mb',259374,46],
    ['80mb',285312,47],
    ['80mb',313843,50],
    ['80mb',345227,54],
    ['80mb',379750,58],
    ['80mb',417725,61],
    ['80mb',459497,68],
    ['80mb',505447,73],
    ['80mb',555992,75],
    ['80mb',611591,81],
    ['80mb',672750,89],
    ['80mb',740025,92],
    ['80mb',814027,101],
    ['80mb',895430,115],
    ['80mb',984973,125],
    ['80mb',1083471,130],
    ['80mb',1191818,144],
    ['80mb',1310999,159],
    ['80mb',1442099,169],
    ['80mb',1586309,190],
    ['80mb',1744940,207],
    ['80mb',1919434,224],
    ['80mb',2111378,241],
    ['80mb',2322515,308],
    ['80mb',2554767,290],
    ['80mb',2810244,316],
    ['80mb',3091268,347],
    ['80mb',3400395,383],
    ['80mb',3740434,413],
    ['80mb',4114478,463],
    ['80mb',4525926,531],
    ['80mb',4978518,556],
    ['80mb',5476370,604],
    ['80mb',6024007,668],
    ['80mb',6626408,756],
    ['80mb',7289048,803],
    ['80mb',8017953,870],
    ['80mb',8819749,991],
    ['80mb',9701723,1059],
    ['80mb',10671896,1174],
    ['80mb',11739085,1309],
    ['80mb',12912994,1408],
    ['80mb',14204293,1641],
    ['80mb',15624723,1719],
    ['80mb',17187195,1906, 'recommendedSize'],
    ['80mb',18905914,2049],
    ['80mb',20796506,2287],
    ['80mb',22876156,2537],
    ['80mb',25163772,2966],
    ['80mb',27680149,3116],
    ['90mb',100000,61],
    ['90mb',110000,78],
    ['90mb',121000,47],
    ['90mb',133100,33],
    ['90mb',146410,36],
    ['90mb',161051,39],
    ['90mb',177156,40],
    ['90mb',194872,34],
    ['90mb',214359,36],
    ['90mb',235795,38],
    ['90mb',259374,43],
    ['90mb',285312,44],
    ['90mb',313843,50],
    ['90mb',345227,50],
    ['90mb',379750,54],
    ['90mb',417725,58],
    ['90mb',459497,60],
    ['90mb',505447,206],
    ['90mb',555992,74],
    ['90mb',611591,75],
    ['90mb',672750,81],
    ['90mb',740025,205],
    ['90mb',814027,96],
    ['90mb',895430,101],
    ['90mb',984973,115],
    ['90mb',1083471,122],
    ['90mb',1191818,131],
    ['90mb',1310999,141],
    ['90mb',1442099,284],
    ['90mb',1586309,168],
    ['90mb',1744940,183],
    ['90mb',1919434,202],
    ['90mb',2111378,220],
    ['90mb',2322515,283],
    ['90mb',2554767,263],
    ['90mb',2810244,284],
    ['90mb',3091268,312],
    ['90mb',3400395,344],
    ['90mb',3740434,377],
    ['90mb',4114478,410],
    ['90mb',4525926,458],
    ['90mb',4978518,524],
    ['90mb',5476370,547],
    ['90mb',6024007,606],
    ['90mb',6626408,667],
    ['90mb',7289048,748],
    ['90mb',8017953,792],
    ['90mb',8819749,875],
    ['90mb',9701723,988],
    ['90mb',10671896,1061],
    ['90mb',11739085,1161],
    ['90mb',12912994,1356],
    ['90mb',14204293,1390],
    ['90mb',15624723,1557],
    ['90mb',17187195,1691, 'recommendedSize'],
    ['90mb',18905914,2081],
    ['90mb',20796506,2043],
    ['90mb',22876156,2316],
    ['90mb',25163772,2485],
    ['90mb',27680149,2761],
    ['100mb',100000,63],
    ['100mb',110000,27],
    ['100mb',121000,28],
    ['100mb',133100,28],
    ['100mb',146410,34],
    ['100mb',161051,35],
    ['100mb',177156,33],
    ['100mb',194872,36],
    ['100mb',214359,35],
    ['100mb',235795,34],
    ['100mb',259374,41],
    ['100mb',285312,49],
    ['100mb',313843,49],
    ['100mb',345227,50],
    ['100mb',379750,49],
    ['100mb',417725,57],
    ['100mb',459497,53],
    ['100mb',505447,148],
    ['100mb',555992,71],
    ['100mb',611591,69],
    ['100mb',672750,77],
    ['100mb',740025,205],
    ['100mb',814027,87],
    ['100mb',895430,249],
    ['100mb',984973,104],
    ['100mb',1083471,109],
    ['100mb',1191818,118],
    ['100mb',1310999,133],
    ['100mb',1442099,321],
    ['100mb',1586309,159],
    ['100mb',1744940,167],
    ['100mb',1919434,184],
    ['100mb',2111378,201],
    ['100mb',2322515,240],
    ['100mb',2554767,240],
    ['100mb',2810244,259],
    ['100mb',3091268,290],
    ['100mb',3400395,314],
    ['100mb',3740434,347],
    ['100mb',4114478,378],
    ['100mb',4525926,420],
    ['100mb',4978518,476],
    ['100mb',5476370,506],
    ['100mb',6024007,555],
    ['100mb',6626408,601],
    ['100mb',7289048,657],
    ['100mb',8017953,753],
    ['100mb',8819749,801],
    ['100mb',9701723,881],
    ['100mb',10671896,981],
    ['100mb',11739085,1055],
    ['100mb',12912994,1165],
    ['100mb',14204293,1447],
    ['100mb',15624723,1389],
    ['100mb',17187195,2091, 'recommendedSize'],
    ['100mb',18905914,2592],
    ['100mb',20796506,2183],
    ['100mb',22876156,2068],
    ['100mb',25163772,2287],
    ['100mb',27680149,2513],
    ['100mb',30448164,2735]
];

var bandwidthResults = [];

module.exports = {
    GetUploadSize: function (bufferSize, time) {

        if (bufferSize && time) {
            //client has completed probing and is requesting what size to upload
            for (var i = 0; i < data.length; i++) {
                if (parseInt(data[i][1]) === parseInt(bufferSize)) {
                    var timeDifference = Math.abs(parseInt(time) - data[i][2]);
                    bandwidthResults.push({
                        browserBandwidth: data[i][0],
                        time: timeDifference
                    });
                }
            }
            //sort results
            bandwidthResults = bandwidthResults.sort(function (a, b) {
                return +a.time - +b.time;
            });

            var uploadSpeed = bandwidthResults[0].browserBandwidth;

            var dataset = data.filter(function (results) { return results[0] === uploadSpeed });

            var maxBufferSize;
            for (var j = 0; j < dataset.length; j++) {
                if (dataset[j].length === 4) {
                    maxBufferSize = dataset[j][1];
                }
            }
            console.log(maxBufferSize);
            return 4978518;
        }

    }
};