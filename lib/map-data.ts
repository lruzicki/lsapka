export interface Unit {
  coordinates: {
    lat: number;
    lng: number;
  };
  unit: {
    number: number;
    name: string;
  };
}

export interface MapBounds {
  boundingBox: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  area: string;
  country: string;
}

export const mapBounds: MapBounds = {
  boundingBox: {
    north: 54.6000,
    south: 54.3000,
    east: 18.7500,
    west: 18.4000
  },
  area: "Gdynia i Gdańsk",
  country: "Polska"
};

export const units: Unit[] = [
    {
      coordinates: {
        lat: 54.47169444,  // 8 NGDH "Twierdza"
        lng: 18.46097222
      },
      unit: {
        number: 8,
        name: "8 NGDH \"Twierdza\""
      }
    },
    {
      coordinates: {
        lat: 54.411560,     // Oliwa, SP 23 – ok. centrum Oliwy
        lng: 18.555938
      },
      unit: {
        number: 2,
        name: "2 NGDH \"Smoczyce\""
      }
    },
    {
      coordinates: {
        lat: 54.5260,     // Wielki Kack, SP 20
        lng: 18.4790
      },
      unit: {
        number: 11,
        name: "11 NGDH \"Sherwood\""
      }
    },
    {
      coordinates: {
        lat: 54.5260,     // Wielki Kack, SP 20 (ta sama szkoła)
        lng: 18.4790
      },
      unit: {
        number: 25,
        name: "25 NGDH \"Ogniwo\""
      }
    },
    {
      coordinates: {
        lat: 54.430685,     // Osowa, SP 81
        lng: 18.467231
      },
      unit: {
        number: 13,
        name: "13 NGDH \"Birmingham\""
      }
    },
    {
      coordinates: {
        lat: 54.472222,     // Karwiny, SP 46
        lng: 18.487638
      },
      unit: {
        number: 20,
        name: "20 NGDH \"Alahambra\""
      }
    },
    {
      coordinates: {
        lat: 54.472222,    // Karwiny, SP 46 (ta sama lokalizacja)
        lng: 18.488592
      },
      unit: {
        number: 50,
        name: "50 NGDH \"Wrzosiwo\""
      }
    },
    {
      coordinates: {
        lat: 54.501820,   // Mistral – dokładnie podane
        lng: 18.453005
      },
      unit: {
        number: 75,
        name: "75 NGDH \"Mistral\""
      }
    },
    {
      coordinates: {
        lat: 54.471730, 
        lng: 18.460227
      },
      unit: {
        number: 33,
        name: "33 NGZH \"Młodnik\""
      }
    }
  ];
  