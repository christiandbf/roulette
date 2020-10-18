import http from 'k6/http';

export default function () {
    const url = __ENV.URL;
    const params = { headers: { 'Content-Type': 'application/json', "USER": "20ed3270-a603-11ea-a08a-315bb84a695d" } };

    const createRoulettePayload = JSON.stringify({ name: "Casino Royale" });
    const createRouletteResponse = http.post(`${url}/roulettes`, createRoulettePayload, params);

    const roulette = JSON.parse(createRouletteResponse.body);
    http.put(`${url}/roulettes/open/${roulette.id}`);

    const createBetPayload = JSON.stringify({
        selection: "black",
        rouletteId: roulette.id,
        amount: 1000
    });
    http.post(`${url}/bets`, createBetPayload, params);

    http.put(`${url}/roulettes/close/${roulette.id}`);
};
