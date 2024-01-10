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
      "restaurant_list"
    );

    //1. Consulta para todos os documentos
    const allRestaurants = await Restaurant.find({});
    console.log(allRestaurants);

    // // 2. Mostrar campos restaurant_id, name, borough e cuisine
    // const specificFields = await Restaurant.find(
    //   {},
    //   { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
    // );
    // console.log("Restaurants with specific fields:", specificFields);

    // // 3. Monstrar campos name, borough e cuisine menos restaurant_id,
    // const specificNoId = await Restaurant.find(
    //   {},
    //   { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
    // );
    // console.log(specificNoId);

    // // 4. Mostrar restaurant_id, name, borough e zip code, mas excluindo o campo _id
    // const withZipcodeNoId = await Restaurant.find(
    //   {},
    //   { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1 }
    // );
    // console.log(withZipcodeNoId);

    // // 5. Mostrar todos os restaurantes que estão no Bronx.
    // const bronxRestaurants = await Restaurant.find({ borough: "Bronx" });
    // console.log(bronxRestaurants);

    // // 6. Mostrar os 5 primeiros restaurantes que estão no Bronx.
    // const bronxFirstFive = await Restaurant.find({ borough: "Bronx" }).limit(5);
    // console.log(bronxFirstFive);

    // // 7. Mostrar os 5 restaurantes depois dos 5 primeiros no Bronx.
    // const skipbronxFirstFive = await Restaurant.find({ borough: "Bronx" })
    //   .skip(5)
    //   .limit(5);
    // console.log(skipbronxFirstFive);

    // // 8. Restaurantes que tem score maior de 90.
    // const moreScore = await Restaurant.find({ "grades.score": { $gt: 90 } });
    // console.log(moreScore);

    // // 9. Restaurantes que tem  score maior que 80 mas menos que 100.
    // const scoreBetween = await Restaurant.find({
    //   "grades.score": { $gt: 80, $lt: 100 },
    // });
    // console.log(scoreBetween);

    // // 10. Restaurantes que estão situados em uma longitude inferior a -95.754168.
    // const restaurantWithLongitude = await Restaurant.find({
    //   "address.coord.0": { $lt: -95.754168 },
    // });
    // console.log(restaurantWithLongitude);

    // // 11. Restaurantes que não cozinham comida 'American' e tem score superior a 70 e longitud inferior a -65.754168.
    // const withAndLongitudNoAmerican = await Restaurant.find({
    //   $and: [
    //     { cuisine: { $ne: "American " } },
    //     { "grades.score": { $gt: 70 } },
    //     { "address.coord.0": { $lt: -65.754168 } },
    //   ],
    // });
    // console.log(withAndLongitudNoAmerican);

    // // 12. Restaurantes que não preparam comida 'americana' e têm pontuação superior a 70 e que, além disso, estão localizados em longitudes inferiores a -65,754168.
    // const withLongitudNoAmerican = await Restaurant.find({
    //   cuisine: { $ne: "American " },
    //   "grades.score": { $gt: 70 },
    //   "address.coord.0": { $lt: -65.754168 },
    // });
    // console.log(withLongitudNoAmerican);

    // // 13. Restaurantes que não preparam comida 'americana', têm nota 'A' e não pertencem ao Brooklyn.
    // const restaurantAnoBrooklyn = await Restaurant.find({
    //   cuisine: { $ne: "American " },
    //   "grades.grade": "A",
    //   borough: { $ne: "Brooklyn" },
    // }).sort({ cuisine: -1 });
    // console.log(restaurantAnoBrooklyn);

    // //  14. Restaurant_id, nome, bairro e culinária dos restaurantes que contêm 'Wil' nas três primeiras letras do nome.
    // const query = await Restaurant.find(
    //   {
    //     name: /^Wil/,
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 15. Restaurant_id, o nome, o bairro e a cozinha dos restaurantes que contêm 'ces' nas últimas três letras do nome.
    // const query = await Restaurant.find(
    //   {
    //     name: /ces$/,
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 16. ID do restaurante, o nome, o bairro e a culinária dos restaurantes que contêm 'Reg' em qualquer lugar do nome.
    // const query = await Restaurant.find(
    //   {
    //     name: /Reg/,
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 17. Restaurantes que pertencem ao Bronx e prepare pratos americanos ou chineses.
    // const query = await Restaurant.find({
    //   borough: "Bronx",
    //   cuisine: { $in: ["American ", "Chinese"] },
    // });

    // // 18. Restaurant_id, nome, bairro e culinária dos restaurantes pertencentes a Staten Island, Queens, Bronx ou Brooklyn.
    // const query = await Restaurant.find(
    //   {
    //     borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 19. Restaurant_id, o nome, o bairro e a culinária dos restaurantes que NÃO estão em Staten Island, Queens, Bronx ou Brooklyn.
    // const query = await Restaurant.find(
    //   {
    //     borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 20. Restaurant_id, nome, bairro e culinária dos restaurantes com pontuação inferior a 10.
    // const query = await Restaurant.find(
    //   {
    //     "grades.score": { $lt: 10 },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 21. ID do restaurante, o nome, o bairro e a culinária dos restaurantes que preparam frutos do mar ('frutos do mar'), a menos que sejam 'americanos', 'chineses' ou o nome do restaurante comece com as letras 'Wil'.
    // const query = await Restaurant.find(
    //   {
    //     cuisine: "seafood",
    //     cuisine: { $nin: ["American", "Chinese"] },
    //     name: { $not: /^Wil/ },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     borough: 1,
    //     cuisine: 1,
    //   }
    // );

    // // 22. Restaurant_id, o nome e as notas dos restaurantes que obtiveram uma nota "A" e uma pontuação de 11 com uma ISODate de "2014-08-11T00:00:00Z".
    // const query = await Restaurant.find(
    //   {
    //     grades: {
    //       $elemMatch: {
    //         grade: "A",
    //         score: 11,
    //         date: new Date("2014-08-11T00:00:00Z"),
    //       },
    //     },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     grades: 1,
    //   }
    // );

    // // 23. Restaurant_id, o nome e as notas dos restaurantes onde o segundo elemento da matriz de notas contém uma nota "A" e uma pontuação de 9 com uma ISODate de "2014-08-11T00:00:00Z".
    // const query = await Restaurant.find(
    //   {
    //     "grades.1": {
    //       grade: "A",
    //       score: 9,
    //       date: new Date("2014-08-11T00:00:00Z"),
    //     },
    //   },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     grades: 1,
    //   }
    // );

    // // 24. Restaurant_id, o nome, o endereço e a localização geográfica dos restaurantes onde o segundo elemento da matriz de coordenadas contém um valor entre 42 e 52.
    // const query = await Restaurant.find(
    //   { "address.coord.1": { $gte: 42, $lte: 52 } },
    //   {
    //     restaurant_id: 1,
    //     name: 1,
    //     address: 1,
    //   }
    // );

    // // 25. Restaurantes por nome em ordem crescente.
    // const query = await Restaurant.find({}).sort({ name: 1 });

    // // 26. Restaurantes por nome em ordem decrescente.
    // const query = await Restaurant.find({}).sort({ name: -1 });

    // // 27. Restaurantes pelo nome da culinária em ordem crescente e pelo bairro em ordem decrescente.
    // const query = await Restaurant.find({}).sort({ cuisine: 1, borough: -1 });

    // // 28. Consulta para descobrir se os endereços contêm a rua.
    // const query = await Restaurant.find({
    //   "address.street": { $exists: true },
    // });

    // // 29. Documentos da coleção do restaurante onde os valores do campo coord são do tipo Double.
    // const query = await Restaurant.find({
    //   "address.coord": { $type: "double" },
    // });

    // // 30. Restaurant_id, o nome e a nota para os restaurantes que retornam 0 como resto após dividir qualquer uma de suas pontuações por 7.
    // const query = await Restaurant.find({ "grades.score": { $mod: [7, 0] } }, {
    //   restaurant_id: 1, name: 1, grades: 1
    // })

    // // 31. Restaurante, bairro, longitude, latitude e culinária dos restaurantes que contêm 'mon' em algum lugar do nome.
    // const query = await Restaurant.find(
    //   {
    //     name: /mon/,
    //   },
    //   {
    //     name: 1,
    //     borough: 1,
    //     "address.coord": 1,
    //     cuisine: 1,
    //   }
    // );

    // // 32. Restaurante, bairro, longitude, latitude e culinária dos restaurantes que contêm 'Mad' nas três primeiras letras do nome.
    // const query = await Restaurant.find(
    //   {
    //     name: /^Mad/,
    //   },
    //   {
    //     name: 1,
    //     borough: 1,
    //     "address.coord": 1,
    //     cuisine: 1,
    //   }
    // );

    console.log(query);
  } catch (err) {
    console.error("An error occurred while connecting to database", err);
  }
}

connectDB();
