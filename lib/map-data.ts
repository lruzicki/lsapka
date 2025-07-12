export interface Unit {
  number: number;
  name: string;
}

export interface MapPin {
  coordinates: {
    lat: number;
    lng: number;
  };
  units: Unit[];
  district: string;
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

export const mapPins: MapPin[] = [
    {
      coordinates: {
      lat: 54.47169444,
        lng: 18.46097222
      },
    units: [
      {
        number: 8,
        name: "8 NGDH \"Twierdza\""
      },
      {
        number: 33,
        name: "33 NGZH \"Młodnik\""
      }
    ],
    district: "Gdynia, Dąbrowa"
    },
    {
      coordinates: {
      lat: 54.411560,
        lng: 18.555938
      },
    units: [
      {
        number: 2,
        name: "2 NGDH \"Smoczyce\""
      }
    ],
    district: "Gdańsk, Oliwa"
    },
    {
      coordinates: {
      lat: 54.464530,
      lng: 18.496043
      },
    units: [
      {
        number: 11,
        name: "11 NGDH \"Sherwood\""
    },
    {
        number: 25,
        name: "25 NGDH \"Ogniwo\""
      },
      {
        number: 6,
        name: "6 GGZ \"Flora\""
      }
    ],
    district: "Gdynia, Wielki Kack"
    },
    {
      coordinates: {
      lat: 54.430685,
        lng: 18.467231
      },
    units: [
      {
        number: 13,
        name: "13 NGDH \"Birmingham\""
      }
    ],
    district: "Gdańsk, Osowa"
    },
    {
      coordinates: {
      lat: 54.472222,
        lng: 18.487638
      },
    units: [
      {
        number: 20,
        name: "20 NGDH \"Alahambra\""
    },
    {
        number: 50,
        name: "50 NGDH \"Wrzosiwo\""
      }
    ],
    district: "Gdynia, Karwiny"
    },
    {
      coordinates: {
      lat: 54.501820,
        lng: 18.453005
      },
    units: [
      {
        number: 75,
        name: "75 NGDH \"Mistral\""
      }
    ],
    district: "Gdynia, Chwarzno"
  }
];

// Legacy export for backward compatibility
export const units = mapPins.flatMap(pin => 
  pin.units.map(unit => ({
    coordinates: pin.coordinates,
    unit: unit
  }))
);
  