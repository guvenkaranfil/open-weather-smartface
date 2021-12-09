import ServiceCall from '@smartface/extension-utils/lib/service-call';

const apiKey = '177c2c97b62e34ac818255c90280f3c6';

export const baseURLApi = new ServiceCall({
    baseUrl: `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`,
    logEnabled: false,
    headers: {
        apiVersion: '1.0'
    }
});

export const cityBaseApi = new ServiceCall({
    baseUrl: 'https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88',
    logEnabled: false
})

/*
  {
    "id": 1,
    "name": "Adana",
    "latitude": "37.0000",
    "longitude": "35.3213",
    "population": 2183167,
    "region": "Akdeniz"
  },
*/

export type City = {
    id: number
    name: string
    latitude: string
    longitude: string
    population: number
    region: string
}

export async function getCities(): Promise<City[]> {
    try {
        const response = await cityBaseApi.request('/cities_of_turkey.json', {
            method: 'GET'
        });
        if (response) {
            const parsedCities = JSON.parse(response)
            return parsedCities
        }
        return []
    } catch (err) {
        console.error(err);
        throw err;
    }
}