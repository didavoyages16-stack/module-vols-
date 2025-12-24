const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Sert les fichiers statiques (comme index.html)

// Route pour la recherche de vols (simulation ou appel API réel)
app.post('/search-flights', async (req, res) => {
    const { departure, arrival, departDate, returnDate, passengers } = req.body;
    
    // Simulation de résultats (par défaut)
    let flights = [
        {
            airline: "Amadeus Airlines",
            from: departure,
            to: arrival,
            date: departDate,
            price: "€250",
            duration: "8h 30m"
        },
        {
            airline: "Wajeez Flights",
            from: departure,
            to: arrival,
            date: departDate,
            price: "€180",
            duration: "9h 15m"
        }
    ];
    
    if (returnDate) {
        flights.push({
            airline: "Amadeus Airlines",
            from: arrival,
            to: departure,
            date: returnDate,
            price: "€270",
            duration: "8h 45m"
        });
    }
    
    // Optionnel : Intégration API Amadeus réelle (décommentez et configurez)
    /*
    const fetch = require('node-fetch');
    const apiKey = 'VOTRE_CLE_API_AMADEUS'; // Remplacez par votre clé API obtenue sur https://developers.amadeus.com/
    try {
        const response = await fetch(`https://api.amadeus.com/v2/shopping/flight-offers?origin=${departure}&destination=${arrival}&departureDate=${departDate}&adults=${passengers}`, {
            headers: { 'Authorization': `Bearer ${apiKey}` } // Note : Vous pourriez avoir besoin d'un token OAuth2 réel
        });
        const data = await response.json();
        // Traitez les données Amadeus (ex. : extraire airline, price, etc.) et remplacez 'flights'
        // Exemple simplifié : flights = data.data.map(item => ({ airline: item.airline, ... }));
    } catch (error) {
        console.error('Erreur API Amadeus:', error);
        // Revenez à la simulation en cas d'erreur
    }
    */
    
    res.json(flights);
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});