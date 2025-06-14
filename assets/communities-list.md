# LoliNya Network | AS207529

## Internal Community:

>(207529, <999,  0)            Community for all my node
>
>(207529, <999,  1)            Community only for this node

```
(207529,   1, *)   do not send to ibgp
(207529,   2, *)   do not send to ebgp
(207529,   3, *)   do not send to kernel
(207529,   4, *)   send to kernel but mark unreachable
(207529,   5, *)   send to kernel but mark blackhole
(207529, 101, *)   allow bgp_local_perf
(207529, 201, *)   transit routes
(207529, 202, *)   ixp rs routes
(207529, 203, *)   peer routes
(207529, 204, *)   customer routes
(207529, 209, *)   ibgp routes
```

## Control Community:
```
 Actions:
  * = 0   do not announce to target
  * = 1   prepend 1 to target
  * = 2   prepend 2 to target
  * = 4   prepend 4 to target
  * = 8   prepend 8 to target
 Action target selector:
  * = Action
  (207529, 1*00, 0)            Do action to everyone
  (207529, 1*01, asn)          Don't do action to this asn
  (207529, 1*02, asn)          Do action to this asn
  (207529, 1*10, 0)            Do action to every region
  (207529, 1*11, region_code)  Don't do action to this region
  (207529, 1*12, region_code)  Do action to this region
  (207529, 1019, 0)            Disable (asn, 1010, 0),  (asn, 1011, local_region) as default value
  (207529, 1*20, 0)            Do action to every country
  (207529, 1*21, country_code) Don't do action to this country
  (207529, 1*22, country_code) Do action to this country
  (207529, 1*30, 1)            Do action to upstreams
  (207529, 1*30, 2)            Do action to ixp rs
  (207529, 1*30, 3)            Do action to peers
  (207529, 1*30, 4)            Do action to downstreams
  (207529, 1*30, 8)            Do action to route collectors
```

## Examples:
```
  prepend 11 to AS6939: 
     (207529, 1102, 6939): prepend 1 to AS6939
     (207529, 1202, 6939): prepend 2 to AS6939
     (207529, 1802, 6939): prepend 8 to AS6939
                 Total : 1+2+8 = 11
  prepend 2 to everyone but 6939:
    (207529, 1200, 0):     prepend 2 to everyone
    (207529, 1201, 6939):  don't do this action(prepend 2) to AS6939
  do not announce to anyone: 
    (207529, 1000, 0):     do not announce to everyone
  announce to all region:
    (207529, 1019, 0):     announce to all region
  announce in Asia-E only:
    (207529, 1010, 0):     do not announce to every region
    (207529, 1011, 52):    but announce to Asia-E region
```

## Informational Community
```
(207529, 10000, region_code)    Received from region
(207529, 10001, country_code)   Received from country
```

## Region code:
```
* 41: Europe
* 42: North America-East
* 43: North America-Central
* 44: North America-West
* 45: Central America
* 46: South America-Central
* 47: South America-West
* 48: Africa-N (above Sahara)
* 49: Africa-S (below Sahara)
* 50: Asia-S (IN, PK, BD)
* 51: Asia-SE (TH, SG, PH, ID, MY)
* 52: Asia-E (JP, KR, TW, HK, CN)
* 53: Pacific&Oceania (AU, NZ, FJ)
* 54: Antarctica
* 55: Asia-N (RU)
* 56: Asia-W (IR, TR, UAE)
* 57: Central Asia (AF, UZ, KZ)
```

## Country code:
ISO-3166 numeric-3 country code