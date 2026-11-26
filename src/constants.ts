import type { Service, Vehicle, ContactInfo } from './types';

// Medailonky vozidel (hlavní exteriérové fotky z public/vozidla/)
const eckoMain = '/vozidla/mercedes-tridy-e.jpg';
const vianoMain = '/vozidla/mercedes-viano.jpg';
const sprinterZlatyMain = '/vozidla/mercedes-sprinter-zlaty.jpg';
const sprinterCernyMain = '/vozidla/mercedes-sprinter-cerny.jpg';
const setraMain = '/vozidla/autobus-setra.jpg';

// Galerie - Mercedes-Benz Třídy E (01 až 07)
const ecko1 = '/vozidla/ecko/mercedes-tridy-e-01.jpg';
const ecko2 = '/vozidla/ecko/mercedes-tridy-e-02.jpg';
const ecko3 = '/vozidla/ecko/mercedes-tridy-e-03.jpg';
const ecko4 = '/vozidla/ecko/mercedes-tridy-e-04.jpg';
const ecko5 = '/vozidla/ecko/mercedes-tridy-e-05.jpg';
const ecko6 = '/vozidla/ecko/mercedes-tridy-e-06.jpg';
const ecko7 = '/vozidla/ecko/mercedes-tridy-e-07.jpg';

// Galerie - Mercedes-Benz Viano (01 až 07)
const viano1 = '/vozidla/viano/mercedes-viano-01.jpg';
const viano2 = '/vozidla/viano/mercedes-viano-02.jpg';
const viano3 = '/vozidla/viano/mercedes-viano-03.jpg';
const viano4 = '/vozidla/viano/mercedes-viano-04.jpg';
const viano5 = '/vozidla/viano/mercedes-viano-05.jpg';
const viano6 = '/vozidla/viano/mercedes-viano-06.jpg';
const viano7 = '/vozidla/viano/mercedes-viano-07.jpg';

// Galerie - Mercedes-Benz Sprinter Zlatý (01 až 07)
const sz1 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-01.jpg';
const sz2 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-02.jpg';
const sz3 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-03.jpg';
const sz4 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-04.jpg';
const sz5 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-05.jpg';
const sz6 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-06.jpg';
const sz7 = '/vozidla/sprinter-zlaty/mercedes-sprinter-zlaty-07.jpg';

// Galerie - Mercedes-Benz Sprinter Černý (01 až 07)
const sc1 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-01.jpg';
const sc2 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-02.jpg';
const sc3 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-03.jpg';
const sc4 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-04.jpg';
const sc5 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-05.jpg';
const sc6 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-06.jpg';
const sc7 = '/vozidla/sprinter-cerny/mercedes-sprinter-cerny-07.jpg';

// Galerie - Autobus Setra (01 až 07)
const setra1 = '/vozidla/setra/autobus-setra-01.jpg';
const setra2 = '/vozidla/setra/autobus-setra-02.jpg';
const setra3 = '/vozidla/setra/autobus-setra-03.jpg';
const setra4 = '/vozidla/setra/autobus-setra-04.jpg';
const setra5 = '/vozidla/setra/autobus-setra-05.jpg';
const setra6 = '/vozidla/setra/autobus-setra-06.jpg';
const setra7 = '/vozidla/setra/autobus-setra-07.jpg';

export const CONTACT_INFO: ContactInfo = {
  owner: 'Petr Chochola',
  address: 'Vančurova 13, Znojmo 669 02',
  phones: ['+420 608 707 225'],
  email: 'petrchochola@seznam.cz',
  ico: '64432157',
};

export const SERVICES: Service[] = [
  {
    id: 'airport',
    title: 'Transfery na letiště',
    description: 'Pohodlná doprava na letiště Vídeň, Praha, Brno či Bratislava pro jednotlivce i skupiny.',
  },
  {
    id: 'sports',
    title: 'Doprava pro sportovce',
    description: 'Pravidelné i jednorázové svozy sportovních týmů a klubů na zápasy a soustředění.',
  },
  {
    id: 'weddings',
    title: 'Svatby a oslavy',
    description: 'Reprezentativní vozy Mercedes-Benz s profesionálním řidičem pro váš velký den.',
  },
  {
    id: 'excursions',
    title: 'Výlety a zájezdy',
    description: 'Poznávací zájezdy po ČR i Evropě, školní výlety a skupinová turistika.',
  },
  {
    id: 'corporate',
    title: 'Firemní přeprava',
    description: 'Přeprava managementu i týmů na obchodní jednání, konference a teambuildingy.',
  },
  {
    id: 'drink-drive',
    title: 'Drink & Drive',
    description: 'Bezpečný odvoz vás i vašeho vozu z oslav a společenských akcí.',
  },
  {
    id: 'wine-cellars',
    title: 'Putování po sklípcích',
    description: 'Degustační večery a zájezdy do vinných sklípců na Znojemsku s jistotou odvozu.',
  },
  {
    id: 'shuttle',
    title: 'Svoz zaměstnanců',
    description: 'Spolehlivé smluvní a pravidelné svozy zaměstnanců pro firmy v regionu.',
  },
  {
    id: 'cargo-express',
    title: 'Expresní zásilky',
    description: 'Rychlá přeprava důležitých zásilek a dokumentů přímo na místo určení.',
  },
];

export const FLEET: Vehicle[] = [
  {
    id: 'e-class',
    model: 'Mercedes-Benz Třídy E',
    subtitle: 'Business & VIP kombi',
    capacity: '4 místa',
    features: ['Dvouzónová klimatizace', 'Kožený interiér', 'Vzduchový podvozek', 'Panoramatická střecha'],
    image: eckoMain,
    gallery: [ecko1, ecko2, ecko3, ecko4, ecko5, ecko6, ecko7],
  },
  {
    id: 'viano',
    model: 'Mercedes-Benz Viano',
    subtitle: 'Komfortní rodinný a firemní minivan',
    capacity: '7 míst',
    features: ['Klimatizace v celém voze', 'Kožená polohovatelná sedadla', 'Velký zavazadlový prostor', 'Automatické otevírání/zavírání bočních dveří'],
    image: vianoMain,
    gallery: [viano1, viano2, viano3, viano4, viano5, viano6, viano7],
  },
  {
    id: 'sprinter-gold',
    model: 'Mercedes-Benz Sprinter',
    subtitle: 'Zájezdový mikrobus',
    capacity: '20 míst',
    features: ['Klimatizace v celém voze', 'Polohovatelná zájezdová sedadla', 'Mikrofon pro průvodce a TV', 'Lednice a velký zavazadlový prostor'],
    image: sprinterZlatyMain,
    gallery: [sz1, sz2, sz3, sz4, sz5, sz6, sz7],
  },
  {
    id: 'sprinter-black',
    model: 'Mercedes-Benz Sprinter',
    subtitle: 'Zájezdový mikrobus',
    capacity: '20 míst',
    features: ['Klimatizace v celém voze', 'Polohovatelná zájezdová sedadla', 'Mikrofon pro průvodce a TV', 'Lednice a velký zavazadlový prostor'],
    image: sprinterCernyMain,
    gallery: [sc1, sc2, sc3, sc4, sc5, sc6, sc7],
  },
  {
    id: 'setra',
    model: 'Setra S 416 GT-HD',
    subtitle: 'Příměstský autobus',
    capacity: '52 míst',
    features: ['Klimatizace v celém voze', 'Polohovatelná zájezdová sedadla', 'Mikrofon pro průvodce a TV', 'Lednice a velký zavazadlový prostor'],
    image: setraMain,
    gallery: [setra1, setra2, setra3, setra4, setra5, setra6, setra7],
  },
];
