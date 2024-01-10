const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const restaurantSchema = new mongoose.Schema({
      address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String,
      },
      borough: String,
      cuisine: String,
      grades: [
        {
          date: Date,
          grade: String,
          score: Number,
        },
      ],
      name: String,
      restaurant_id: String,
    });

    // Cria um modelo a partir do esquema definido
    const Restaurant = mongoose.model(
      "Restaurant",
      restaurantSchema,
      "restaurants_list"
    );
    const queries = [
      {
        query: {},
        fields: null,
        description: "1. Consulta todos os documentos",
      },
      {
        query: {},
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description: "2. Mostrar campos restaurant_id, name, borough, cuisine",
      },
      {
        query: {},
        fields: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "3. Mostrar campos name, borough, cuisine menos restaurant_id",
      },
      {
        query: {},
        fields: {
          _id: 0,
          restaurant_id: 1,
          name: 1,
          borough: 1,
          "address.zipcode": 1,
        },
        description:
          "4. Mostrar restaurant_id, name, borough,  zip code, menos camp _id",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        description: "5. Restaurantes no Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        limit: 5,
        description: "6. Mostrar os primeiros 5 restaurantes no Bronx",
      },
      {
        query: { borough: "Bronx" },
        fields: null,
        skip: 5,
        limit: 5,
        description:
          "7. Mostrar os 5 restaurantes no Bronx depois dos 5 primeiros",
      },
      {
        query: { "grades.score": { $gt: 90 } },
        fields: null,
        description: "8. Restaurantes que tem score maior a 90.",
      },
      {
        query: { "grades.score": { $gt: 80, $lt: 100 } },
        fields: null,
        description:
          "9. Restaurantes que tem score maior a 80 mas menor que 100",
      },
      {
        query: { "address.coord.0": { $lt: -95.754168 } },
        fields: null,
        description:
          "10. Restaurantes que estão situados em uma longitude inferior a -95.754168",
      },
      {
        query: {
          cuisine: { $ne: "American" },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        description:
          "11. Restaurantes que não cozinham comida 'American' e tem score superior a 70 e longitude inferior a -65.754168",
      },
      {
        query: {
          cuisine: { $ne: "American" },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        description:
          "12. Restaurantes que não preparam comida 'American' e tem score superior a 70 e se localiza longitudes inferiores a -65.754168.",
      },
      {
        query: {
          cuisine: { $ne: "American" },
          "grades.score": { $gt: 70 },
          "address.coord.0": { $lt: -65.754168 },
        },
        fields: null,
        sort: { cuisine: -1 },
        description:
          "13. Restaurantes que não preparam comida 'American', tem alguma nota 'A' e não pertenecem a Brooklyn e ordem ascendente",
      },

      {
        query: { name: /^Wil/ },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "14. Restaurant_id, name, borough e culinária nos restaurantes que contem 'Wil' nas três primeiras letras do nome",
      },
      {
        query: { name: /ces$/ },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "15. Restaurant_id, name, borough e culinária nos restaurantes que contem 'ces' nas últimas tres letras do nome",
      },
      {
        query: { name: /Reg/ },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "16. Restaurant_id, name, borough e culinária dos restaurantes que contem 'Reg' em qualquer lugar do nome",
      },
      {
        query: { borough: "Bronx", cuisine: { $in: ["American", "Chinese"] } },
        fields: null,
        description:
          "17. Restaurantes que pertenecem ao Bronx e preparam pratos americanos ou chineses",
      },
      {
        query: {
          borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
        },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "18. Restaurantes com restaurant_id, name, borough e culinária de restaurantes que pertencem a Staten Island, Queens, Bronx ou Brooklyn",
      },
      {
        query: {
          borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
        },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "19. Restaurantes com restaurant_id, name, borough y culinária de restaurantes que NÃO pertencem a Staten Island, Queens, Bronx ou Brooklyn",
      },
      {
        query: { "grades.score": { $lt: 10 } },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "20. Restaurantes com restaurant_id, name, borough e culinária de restaurantes que obtiverem pontuação inferior a 10",
      },
      {
        query: {
          cuisine: "seafood",
          cuisine: { $nin: ["American", "Chinese"] },
        },
        fields: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
        description:
          "21. Restaurantes com restaurant_id, name, borough y ccuklinária de restaurantes que preparam seafood exceto se forem American, Chinese ou o nome começa com 'Wil'",
      },
      {
        query: {
          grades: {
            $elemMatch: { grade: "A", date: new Date("2014-08-11T00:00:00Z") },
          },
          fields: { restaurant_id: 1, name: 1, grades: 1 },
          description:
            "22. Restaurante com restaurant_id, name e notas que alcançam score 'A' e uma pontuação de 11 com uma ISODate '2014-08-11T00:00:00Z'",
        },
      },
      {
        query: {
          "grades.1": { score: 9, date: new Date("2014-08-11T00:00:00Z") },
        },
        fields: { restaurant_id: 1, name: 1, grades: 1 },
        description:
          "23. Restaurantes com restaurant_id, name e notas que no 2o elemento da matriz de notas tenha 'A' e um score 9 com ISODate '2014-08-11T00:00:00Z'",
      },
      {
        query: { "address.coord.1": { $gte: 42, $lte: 52 } },
        fields: { restaurant_id: 1, name: 1, address: 1 },
        description:
          "24. Restaurantes com rrestaurant_id, name, endereço e localização geográfica desses restaurantes no segundo elemento da matriz coord e tenha um valor entre 42 e 52",
      },
      {
        query: {},
        fields: null,
        sort: { name: 1 },
        description: "25. Restaurantes por nome em ordem crescente",
      },
      {
        query: {},
        fields: null,
        sort: { name: -1 },
        description: "26. Restaurantes por nome em ordem decrescente",
      },
      {
        query: {},
        fields: null,
        sort: { cuisine: 1, borough: -1 },
        description:
          "27. Restaurantes por nome de cozinha em ordem crescente e por bairro em ordem decrescente",
      },
      {
        query: { "address.street": { $exists: true } },
        fields: null,
        description: "28. Se os endereços contem a rua",
      },
      {
        query: { "address.coord": { $type: "double" } },
        fields: null,
        description:
          "29. Os valores do campo de coordenadas são do tipo double",
      },
      {
        query: { "grades.score": { $mod: [7, 0] } },
        fields: { restaurant_id: 1, name: 1, grades: 1 },
        description:
          "30. Restaurant_id, name e a nota dos restaurantes que retornam 0 como restante após dividir qualquer uma de seus score por 7",
      },
      {
        query: { name: /mon/ },
        fields: { name: 1, borough: 1, "address.coord": 1, cuisine: 1 },
        description:
          "31. Nome de restaurant, borough, longitude, latitude e culinária de restaurantes que contêm 'mon' em alguma parte do nome",
      },
      {
        query: { name: /^Mad/ },
        fields: { name: 1, borough: 1, "address.coord": 1, cuisine: 1 },
        description:
          "32. Restaurant, borough, longitude, latitude e culinária de restaurantes que contêm 'Mad' como as três primeiras letras do nome",
      },
    ];

    for (const q of queries) {
      let resultQuery = Restaurant.find(q.query, q.fields);

      if (q.skip) {
        resultQuery = resultQuery.skip(q.skip);
      }
      if (q.limit) {
        resultQuery = resultQuery.limit(q.limit);
      }
      if (q.sort) {
        resultQuery = resultQuery.sort(q.sort);
      }

      const results = await resultQuery;
      console.log(`${q.description}:`, results);
    }
  } catch (err) {
    console.error("An error occurred while connecting to database", err);
  }
}

connectDB();
