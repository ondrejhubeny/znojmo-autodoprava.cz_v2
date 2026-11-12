import type { Service, Vehicle, ContactInfo } from './types';

// Medailonky vozidel (hlavní fotky)
import eckoMain from './assets/vozidla/ecko.JPG';
import vianoMain from './assets/vozidla/viano.JPG';
import sprinterZlatyMain from './assets/vozidla/sprinter_zlaty.JPG';
import sprinterCernyMain from './assets/vozidla/sprinter_cerny.JPG';
import setraMain from './assets/vozidla/setra.JPG';

// Galerie - Mercedes-Benz E-Class (6 fotek)
import ecko1 from './assets/vozidla/ecko/IMG_0724.JPG';
import ecko2 from './assets/vozidla/ecko/IMG_0739.JPG';
import ecko3 from './assets/vozidla/ecko/IMG_0748.JPG';
import ecko4 from './assets/vozidla/ecko/IMG_0767.JPG';
import ecko5 from './assets/vozidla/ecko/IMG_0769.JPG';
import ecko6 from './assets/vozidla/ecko/IMG_0770.JPG';

// Galerie - Mercedes-Benz Viano (6 fotek)
import viano1 from './assets/vozidla/viano/IMG_0780.JPG';
import viano2 from './assets/vozidla/viano/IMG_0782.JPG';
import viano3 from './assets/vozidla/viano/IMG_0787.JPG';
import viano4 from './assets/vozidla/viano/IMG_0789.JPG';
import viano5 from './assets/vozidla/viano/IMG_0793.JPG';
import viano6 from './assets/vozidla/viano/IMG_0796.JPG';

// Galerie - Mercedes-Benz Sprinter Zlatý (6 fotek)
import sz1 from './assets/vozidla/sprinter_zlaty/IMG_0819.JPG';
import sz2 from './assets/vozidla/sprinter_zlaty/IMG_0833.JPG';
import sz3 from './assets/vozidla/sprinter_zlaty/IMG_0835.JPG';
import sz4 from './assets/vozidla/sprinter_zlaty/IMG_0837.JPG';
import sz5 from './assets/vozidla/sprinter_zlaty/IMG_0843.JPG';
import sz6 from './assets/vozidla/sprinter_zlaty/IMG_0845.JPG';

// Galerie - Mercedes-Benz Sprinter Černý (6 fotek)
import sc1 from './assets/vozidla/sprinter_cerny/IMG_0860.JPG';
import sc2 from './assets/vozidla/sprinter_cerny/IMG_0867.JPG';
import sc3 from './assets/vozidla/sprinter_cerny/IMG_0869.JPG';
import sc4 from './assets/vozidla/sprinter_cerny/IMG_0870.JPG';
import sc5 from './assets/vozidla/sprinter_cerny/IMG_0874.JPG';
import sc6 from './assets/vozidla/sprinter_cerny/IMG_0877.JPG';

// Galerie - Autobus Setra (6 fotek)
import setra1 from './assets/vozidla/setra/IMG_0893.JPG';
import setra2 from './assets/vozidla/setra/IMG_0897.JPG';
import setra3 from './assets/vozidla/setra/IMG_0899.JPG';
import setra4 from './assets/vozidla/setra/IMG_0909.JPG';
import setra5 from './assets/vozidla/setra/IMG_0910.JPG';
import setra6 from './assets/vozidla/setra/IMG_0911.JPG';

export const CONTACT_INFO: ContactInfo = {
  owner: 'Petr Chochola',
  address: 'Vančurova 13, Znojmo 669 02',
  phones: ['+420 608 707 225'],
  email: 'petrchochola@seznam.cz',
  ico: '49407891',
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
    subtitle: 'Business & VIP sedan',
    capacity: '4 místa',
    features: ['Kožený interiér', 'Dvouzónová klimatizace', 'Tichý a komfortní chod', 'Ideální na letiště a schůzky'],
    image: eckoMain,
    gallery: [ecko1, ecko2, ecko3, ecko4, ecko5, ecko6],
  },
  {
    id: 'viano',
    model: 'Mercedes-Benz Viano',
    subtitle: 'Komfortní rodinný a firemní minivan',
    capacity: '7 míst',
    features: ['Kožená sedadla', 'Klimatizace v celém voze', 'Velký zavazadlový prostor', 'Variabilní uspořádání'],
    image: vianoMain,
    gallery: [viano1, viano2, viano3, viano4, viano5, viano6],
  },
  {
    id: 'sprinter-gold',
    model: 'Mercedes-Benz Sprinter',
    subtitle: 'Zlatá metalíza • Zájezdový mikrobus',
    capacity: '20+1 míst',
    features: ['Polohovatelná sedadla', 'Klimatizace a topení', 'Mikrofon pro průvodce', 'Tažné zařízení / velký kufr'],
    image: sprinterZlatyMain,
    gallery: [sz1, sz2, sz3, sz4, sz5, sz6],
  },
  {
    id: 'sprinter-black',
    model: 'Mercedes-Benz Sprinter',
    subtitle: 'Černá perleť • VIP mikrobus',
    capacity: '20+1 míst',
    features: ['Komfortní zájezdová sedadla', 'Klimatizace', 'Tónovaná skla', 'Ideální pro týmy a firemní akce'],
    image: sprinterCernyMain,
    gallery: [sc1, sc2, sc3, sc4, sc5, sc6],
  },
  {
    id: 'setra',
    model: 'Autobus Setra',
    subtitle: 'Dálkový zájezdový autokar',
    capacity: '48+1 míst',
    features: ['Luxusní zájezdový autokar', 'Klimatizace a WC', 'Kuchyňka a občerstvení', 'Velký zavazadlový prostor'],
    image: setraMain,
    gallery: [setra1, setra2, setra3, setra4, setra5, setra6],
  },
];
