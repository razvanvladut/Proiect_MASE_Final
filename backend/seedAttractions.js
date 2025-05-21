const mongoose = require('mongoose');
const Attraction = require('./models/Attraction');

const attractions = [
  {
    name: "Cascada Lotrișor",
    description: "Cascada Lotrișor, aflată în Parcul Național Cozia, este un punct spectaculos de atracție naturală, cu o cădere de apă de aproximativ 30 de metri, ce se revarsă peste un tunel forestier. Accesibilă pe un traseu ușor, este perfectă pentru drumeții și fotografii memorabile.",
    imageUrl: "/images/cascada_lotrisor.jpg",
    location: { lat: 45.301424, lng: 24.26785 }
  },
  {
    name: "Mănăstirea Horezu",
    description: "Mănăstirea Horezu, inclusă în patrimoniul UNESCO, este un remarcabil exemplu al stilului brâncovenesc, construită în 1690. Este recunoscută pentru frescele și sculpturile sale elaborate și pentru rolul său important în cultura ortodoxă românească.",
    imageUrl: "/images/manastirea_horezu.jpeg",
    location: { lat: 45.169937, lng: 24.007184 }
  },
  {
    name: "Mănăstirea Cozia",
    description: "Situată pe malul râului Olt, Mănăstirea Cozia este una dintre cele mai vechi și valoroase ctitorii medievale din România. Construită între 1387–1391 de Mircea cel Bătrân, adăpostește picturi murale rare și o atmosferă spirituală profundă.",
    imageUrl: "/images/manastirea_cozia.jpeg",
    location: { lat: 45.27170, lng: 24.31580 }
  },
  {
    name: "Salina Ocnele Mari",
    description: "Salina Ocnele Mari este una dintre cele mai populare destinații de relaxare și tratament din Vâlcea. Aflată la o adâncime de peste 200 metri, salina oferă un microclimat benefic pentru afecțiuni respiratorii, precum și locuri de joacă, capelă și spații recreative subterane.",
    imageUrl: "/images/salina_ocnele_mari.jpg",
    location: { lat: 45.0850907, lng: 24.3068919 }
  },
  {
    name: "Cheile Bistriței",
    description: "Cheile Bistriței sunt o formațiune spectaculoasă de stânci calcaroase, cu peșteri și trasee montane accesibile turiștilor. Traseul traversează mănăstiri vechi și oferă priveliști impresionante, fiind ideal pentru pasionații de natură și drumeții.",
    imageUrl: "/images/cheile_bistritei.jpg",
    location: { lat: 45.1895976, lng: 24.0298891 }
  },
  {
    name: "Muzeul Satului Vâlcean",
    description: "Aflat în apropierea Râmnicului, Muzeul Satului Vâlcean prezintă gospodării tradiționale din diferite zone ale județului. Vizitatorii pot explora case țărănești autentice, unelte, mobilier și biserici din lemn, oferind o incursiune în viața rurală de altădată.",
    imageUrl: "/images/muzeul_satului.jpg",
    location: { lat: 45.1411447, lng: 24.3610372 }
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Conectat la MongoDB.");

  await Attraction.deleteMany({});
  console.log("Date vechi șterse.");

  await Attraction.insertMany(attractions);
  console.log("Atractii turistice adăugate cu succes.");

  mongoose.disconnect();
}).catch(err => {
  console.error("Eroare conectare MongoDB:", err);
});
