import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Service, Vehicle } from './types';
import { FLEET as BASE_FLEET } from './constants';

export type Language = 'cz' | 'en' | 'de';

interface StatTranslation {
  value: string;
  title: string;
  description: string;
}

interface GdprSection {
  heading: string;
  text: string;
}

export interface Translations {
  metaTitle: string;
  logoSub: string;
  nav: {
    fleet: string;
    services: string;
    references: string;
    contact: string;
    ctaHeader: string;
    ctaMobile: string;
    callTitle: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    leadLine1: string;
    leadLine2: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: StatTranslation[];
  fleet: {
    title: string;
    desc: string;
    galleryBtn: string;
    bookBtn: string;
    bookThisVehicle: string;
    capacityLabel: string;
    photoOf: (current: number, total: number) => string;
    closeGallery: string;
    prevPhoto: string;
    nextPhoto: string;
    thumbAlt: (index: number) => string;
  };
  services: {
    title: string;
    closeDetail: string;
    items: Service[];
  };
  references: {
    title: string;
    desc: string;
  };
  contact: {
    title: string;
    desc: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    icoLabel: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      vehicleLabel: string;
      vehiclePlaceholder: string;
      fromLabel: string;
      fromPlaceholder: string;
      toLabel: string;
      toPlaceholder: string;
      dateLabel: string;
      datePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      sendingBtn: string;
      submittedBtn: string;
      errorFallback: string;
      gdprPrefix: string;
      gdprLink: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    gdprLink: string;
  };
  gdprModal: {
    title: string;
    closeAria: string;
    sections: GdprSection[];
  };
  vehicles: Vehicle[];
}

const VEHICLE_TRANSLATIONS: Record<
  Language,
  Record<string, { model: string; subtitle: string; capacity: string; features: string[] }>
> = {
  cz: {
    'e-class': {
      model: 'Mercedes-Benz Třídy E',
      subtitle: 'Business & VIP kombi',
      capacity: '4 místa',
      features: [
        'Dvouzónová klimatizace',
        'Kožený interiér',
        'Vzduchový podvozek',
        'Panoramatická střecha',
      ],
    },
    viano: {
      model: 'Mercedes-Benz Viano',
      subtitle: 'Komfortní rodinný a firemní minivan',
      capacity: '7 míst',
      features: [
        'Klimatizace v celém voze',
        'Kožená polohovatelná sedadla',
        'Velký zavazadlový prostor',
        'Automatické otevírání/zavírání bočních dveří',
      ],
    },
    'sprinter-gold': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Zájezdový mikrobus',
      capacity: '20 míst',
      features: [
        'Klimatizace v celém voze',
        'Polohovatelná zájezdová sedadla',
        'Mikrofon pro průvodce a TV',
        'Lednice a velký zavazadlový prostor',
      ],
    },
    'sprinter-black': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Zájezdový mikrobus',
      capacity: '20 míst',
      features: [
        'Klimatizace v celém voze',
        'Polohovatelná zájezdová sedadla',
        'Mikrofon pro průvodce a TV',
        'Lednice a velký zavazadlový prostor',
      ],
    },
    setra: {
      model: 'Setra S 416 GT-HD',
      subtitle: 'Příměstský autobus',
      capacity: '52 míst',
      features: [
        'Klimatizace v celém voze',
        'Polohovatelná zájezdová sedadla',
        'Mikrofon pro průvodce a TV',
        'Lednice a velký zavazadlový prostor',
      ],
    },
  },
  en: {
    'e-class': {
      model: 'Mercedes-Benz E-Class',
      subtitle: 'Business & VIP Estate',
      capacity: '4 seats',
      features: [
        'Dual-zone climate control',
        'Leather interior',
        'Air suspension',
        'Panoramic sunroof',
      ],
    },
    viano: {
      model: 'Mercedes-Benz Viano',
      subtitle: 'Comfortable Family & Corporate Minivan',
      capacity: '7 seats',
      features: [
        'Full-cabin air conditioning',
        'Reclining leather seats',
        'Spacious luggage compartment',
        'Power sliding side doors',
      ],
    },
    'sprinter-gold': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Touring Minibus',
      capacity: '20 seats',
      features: [
        'Full-cabin air conditioning',
        'Reclining touring seats',
        'Tour guide microphone & TV',
        'Fridge & large luggage compartment',
      ],
    },
    'sprinter-black': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Touring Minibus',
      capacity: '20 seats',
      features: [
        'Full-cabin air conditioning',
        'Reclining touring seats',
        'Tour guide microphone & TV',
        'Fridge & large luggage compartment',
      ],
    },
    setra: {
      model: 'Setra S 416 GT-HD',
      subtitle: 'Intercity & Touring Coach',
      capacity: '52 seats',
      features: [
        'Full-cabin air conditioning',
        'Reclining touring seats',
        'Tour guide microphone & TV',
        'Fridge & large luggage compartment',
      ],
    },
  },
  de: {
    'e-class': {
      model: 'Mercedes-Benz E-Klasse',
      subtitle: 'Business & VIP Kombi',
      capacity: '4 Sitzplätze',
      features: [
        'Zwei-Zonen-Klimaanlage',
        'Lederausstattung',
        'Luftfederung',
        'Panoramadach',
      ],
    },
    viano: {
      model: 'Mercedes-Benz Viano',
      subtitle: 'Komfortabler Familien- & Business-Minivan',
      capacity: '7 Sitzplätze',
      features: [
        'Klimaanlage im gesamten Fahrzeug',
        'Verstellbare Ledersitze',
        'Großer Gepäckraum',
        'Elektrische Schiebetüren',
      ],
    },
    'sprinter-gold': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Reise-Kleinbus',
      capacity: '20 Sitzplätze',
      features: [
        'Klimaanlage im gesamten Fahrzeug',
        'Verstellbare Reisesitze',
        'Reiseleitermikrofon & TV',
        'Kühlschrank & großer Gepäckraum',
      ],
    },
    'sprinter-black': {
      model: 'Mercedes-Benz Sprinter',
      subtitle: 'Reise-Kleinbus',
      capacity: '20 Sitzplätze',
      features: [
        'Klimaanlage im gesamten Fahrzeug',
        'Verstellbare Reisesitze',
        'Reiseleitermikrofon & TV',
        'Kühlschrank & großer Gepäckraum',
      ],
    },
    setra: {
      model: 'Setra S 416 GT-HD',
      subtitle: 'Überland- & Reisebus',
      capacity: '52 Sitzplätze',
      features: [
        'Klimaanlage im gesamten Fahrzeug',
        'Verstellbare Reisesitze',
        'Reiseleitermikrofon & TV',
        'Kühlschrank & großer Gepäckraum',
      ],
    },
  },
};

function buildLocalizedFleet(lang: Language): Vehicle[] {
  return BASE_FLEET.map((v) => {
    const tr = VEHICLE_TRANSLATIONS[lang][v.id];
    if (!tr) return v;
    return {
      ...v,
      model: tr.model,
      subtitle: tr.subtitle,
      capacity: tr.capacity,
      features: tr.features,
    };
  });
}

export const TRANSLATIONS: Record<Language, Translations> = {
  cz: {
    metaTitle: 'Znojmo Autodoprava | Prémiová osobní, mikrobusová a autobusová doprava',
    logoSub: 'Autodoprava',
    nav: {
      fleet: 'Vozový park',
      services: 'Služby',
      references: 'Reference',
      contact: 'Kontakt',
      ctaHeader: 'Poptat jízdu',
      ctaMobile: 'Nezávazná poptávka',
      callTitle: 'Volejte',
      openMenu: 'Otevřít menu',
      closeMenu: 'Zavřít menu',
    },
    hero: {
      title: 'Prémiová osobní doprava',
      subtitle: 'již od roku 1993',
      leadLine1:
        'Profesionální osobní, mikrobusová a autobusová přeprava ze Znojma po celé ČR i Evropě.',
      leadLine2:
        'Od luxusního kombi pro 4 osoby až po příměstský autobus pro 52 cestujících.',
      ctaPrimary: 'Nezávazná poptávka',
      ctaSecondary: 'Prohlédnout vozový park',
    },
    stats: [
      {
        value: '30+',
        title: 'Let tradice',
        description: 'Spolehlivé přepravní služby již od roku 1993',
      },
      {
        value: '1 000 000+',
        title: 'Najetých km',
        description: 'Miliony kilometrů s profesionálními řidiči',
      },
      {
        value: '100%',
        title: 'Mercedes-Benz',
        description: 'Výhradně luxusní a klimatizovaná flotila',
      },
      {
        value: '24/7',
        title: 'Dispečink & Služby',
        description: 'Pohotovost a individuální domluva',
      },
    ],
    fleet: {
      title: 'Vozový park',
      desc: 'Klikněte na kterékoliv vozidlo pro zobrazení fotogalerie exteriéru a interiéru.',
      galleryBtn: 'Galerie',
      bookBtn: 'Poptat vůz',
      bookThisVehicle: 'Poptat tento vůz',
      capacityLabel: 'Kapacita',
      photoOf: (c, t) => `Fotka ${c} z ${t}`,
      closeGallery: 'Zavřít galerii',
      prevPhoto: 'Předchozí fotka',
      nextPhoto: 'Další fotka',
      thumbAlt: (i) => `Náhled ${i}`,
    },
    services: {
      title: 'Naše služby',
      closeDetail: 'Zavřít detail',
      items: [
        {
          id: 'airport',
          title: 'Transfery na letiště',
          description:
            'Pohodlná doprava na letiště Vídeň, Praha, Brno či Bratislava pro jednotlivce i skupiny.',
        },
        {
          id: 'sports',
          title: 'Doprava pro sportovce',
          description:
            'Pravidelné i jednorázové svozy sportovních týmů a klubů na zápasy a soustředění.',
        },
        {
          id: 'weddings',
          title: 'Svatby a oslavy',
          description:
            'Reprezentativní vozy Mercedes-Benz s profesionálním řidičem pro váš velký den.',
        },
        {
          id: 'excursions',
          title: 'Výlety a zájezdy',
          description:
            'Poznávací zájezdy po ČR i Evropě, školní výlety a skupinová turistika.',
        },
        {
          id: 'corporate',
          title: 'Firemní přeprava',
          description:
            'Přeprava managementu i týmů na obchodní jednání, konference a teambuildingy.',
        },
        {
          id: 'drink-drive',
          title: 'Drink & Drive',
          description:
            'Bezpečný odvoz vás i vašeho vozu z oslav a společenských akcí.',
        },
        {
          id: 'wine-cellars',
          title: 'Putování po sklípcích',
          description:
            'Degustační večery a zájezdy do vinných sklípců na Znojemsku s jistotou odvozu.',
        },
        {
          id: 'shuttle',
          title: 'Svoz zaměstnanců',
          description:
            'Spolehlivé smluvní a pravidelné svozy zaměstnanců pro firmy v regionu.',
        },
        {
          id: 'cargo-express',
          title: 'Expresní zásilky',
          description:
            'Rychlá přeprava důležitých zásilek a dokumentů přímo na místo určení.',
        },
      ],
    },
    references: {
      title: 'Naše reference',
      desc: 'Za více než 30 let v autodopravě nám pravidelně svěřují přepravu významné firmy, hotely, sportovní kluby i instituce z celého regionu.',
    },
    contact: {
      title: 'Rezervujte si vůz',
      desc: 'Napište nám podrobnosti vaší cesty a obratem vám připravíme přesnou cenovou kalkulaci.',
      phoneLabel: 'Telefon',
      emailLabel: 'E-mail',
      addressLabel: 'Sídlo společnosti',
      icoLabel: 'IČO',
      form: {
        nameLabel: 'Jméno a příjmení *',
        namePlaceholder: 'Jan Novák',
        phoneLabel: 'Telefon *',
        phonePlaceholder: '+420 777 000 000',
        emailLabel: 'E-mail *',
        emailPlaceholder: 'vas@email.cz',
        vehicleLabel: 'Preferovaný vůz',
        vehiclePlaceholder: 'Vyberte vůz (nepovinné)',
        fromLabel: 'Odkud *',
        fromPlaceholder: 'Např. Znojmo',
        toLabel: 'Kam *',
        toPlaceholder: 'Např. Letiště Vídeň',
        dateLabel: 'Datum a čas',
        datePlaceholder: 'Např. 15. 6. v 8:00',
        messageLabel: 'Poznámka / Počet osob a zavazadel',
        messagePlaceholder:
          'Upřesněte počet osob, zpáteční cestu nebo další požadavky...',
        submitBtn: 'Odeslat nezávaznou poptávku',
        sendingBtn: 'Odesílám poptávku...',
        submittedBtn: 'Poptávka byla úspěšně odeslána',
        errorFallback: 'Nepodařilo se odeslat formulář. Zavolejte nám prosím na ',
        gdprPrefix: 'Odesláním poptávky berete na vědomí',
        gdprLink: 'Zásady ochrany osobních údajů (GDPR)',
      },
    },
    footer: {
      tagline: 'Prémiová osobní doprava',
      rights: 'Všechna práva vyhrazena',
      gdprLink: 'Ochrana osobních údajů (GDPR)',
    },
    gdprModal: {
      title: 'Zásady ochrany osobních údajů (GDPR)',
      closeAria: 'Zavřít okno GDPR',
      sections: [
        {
          heading: '1. Správce osobních údajů',
          text: 'Správcem osobních údajů je Petr Chochola, se sídlem Vančurova 13, Znojmo 669 02, IČO: 64432157, telefon: +420 608 707 225, e-mail: petrchochola@seznam.cz.',
        },
        {
          heading: '2. Rozsah a účel zpracování',
          text: 'Pokud využijete poptávkový formulář na tomto webu, zpracováváme vámi vyplněné údaje (jméno a příjmení, telefonní číslo, e-mailovou adresu a parametry poptávané cesty) výhradně za účelem vyřízení vaší poptávky, vypracování cenové kalkulace a případné realizace přepravy (předsmluvní jednání a plnění smlouvy dle čl. 6 odst. 1 písm. b) nařízení GDPR).',
        },
        {
          heading: '3. Doba uchování a předávání údajů',
          text: 'Osobní údaje jsou uchovávány pouze po dobu nezbytnou k vyřízení poptávky a realizaci přepravy, případně po dobu stanovenou příslušnými daňovými a účetními předpisy. Osobní údaje nejsou předávány třetím stranám pro marketingové účely.',
        },
        {
          heading: '4. Soubory cookies',
          text: 'Tyto webové stránky nepoužívají žádné reklamní ani sledovací soubory cookies třetích stran.',
        },
        {
          heading: '5. Vaše práva',
          text: 'Máte právo požadovat přístup ke svým osobním údajům, jejich opravu, výmaz nebo omezení zpracování, případně vznést námitku proti zpracování. Se svými požadavky se můžete kdykoliv obrátit na výše uvedený e-mail nebo telefon správce, případně na Úřad pro ochranu osobních údajů (uoou.cz).',
        },
      ],
    },
    vehicles: buildLocalizedFleet('cz'),
  },

  en: {
    metaTitle: 'Znojmo Autodoprava | Premium Passenger, Minibus & Coach Transport',
    logoSub: 'Transport',
    nav: {
      fleet: 'Fleet',
      services: 'Services',
      references: 'References',
      contact: 'Contact',
      ctaHeader: 'Book a Ride',
      ctaMobile: 'Free Quote Request',
      callTitle: 'Call',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      title: 'Premium Passenger Transport',
      subtitle: 'since 1993',
      leadLine1:
        'Professional car, minibus, and coach transportation from Znojmo across the Czech Republic and Europe.',
      leadLine2:
        'From a luxury 4-seat estate car to an intercity coach for up to 52 passengers.',
      ctaPrimary: 'Request a Free Quote',
      ctaSecondary: 'Explore Our Fleet',
    },
    stats: [
      {
        value: '30+',
        title: 'Years of Tradition',
        description: 'Reliable passenger transport services since 1993',
      },
      {
        value: '1,000,000+',
        title: 'Kilometers Driven',
        description: 'Millions of safe kilometers with professional drivers',
      },
      {
        value: '100%',
        title: 'Mercedes-Benz',
        description: 'Exclusively luxury and air-conditioned fleet',
      },
      {
        value: '24/7',
        title: 'Dispatch & Service',
        description: 'Non-stop availability and tailored scheduling',
      },
    ],
    fleet: {
      title: 'Our Fleet',
      desc: 'Click on any vehicle to open the exterior and interior photo gallery.',
      galleryBtn: 'Gallery',
      bookBtn: 'Request Vehicle',
      bookThisVehicle: 'Request This Vehicle',
      capacityLabel: 'Capacity',
      photoOf: (c, t) => `Photo ${c} of ${t}`,
      closeGallery: 'Close gallery',
      prevPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
      thumbAlt: (i) => `Thumbnail ${i}`,
    },
    services: {
      title: 'Our Services',
      closeDetail: 'Close detail',
      items: [
        {
          id: 'airport',
          title: 'Airport Transfers',
          description:
            'Comfortable transfers to Vienna, Prague, Brno, or Bratislava airports for individuals and groups.',
        },
        {
          id: 'sports',
          title: 'Sports Team Transport',
          description:
            'Regular and one-off transport for sports teams and clubs to matches, tournaments, and training camps.',
        },
        {
          id: 'weddings',
          title: 'Weddings & Celebrations',
          description:
            'Prestigious Mercedes-Benz vehicles with a professional chauffeur for your special day.',
        },
        {
          id: 'excursions',
          title: 'Tours & Excursions',
          description:
            'Sightseeing tours across the Czech Republic and Europe, school trips, and group travel.',
        },
        {
          id: 'corporate',
          title: 'Corporate Transport',
          description:
            'Executive and team transportation to business meetings, conferences, and corporate events.',
        },
        {
          id: 'drink-drive',
          title: 'Drink & Drive',
          description:
            'Safe transport home for you and your car from parties and social events.',
        },
        {
          id: 'wine-cellars',
          title: 'Wine Cellar Tours',
          description:
            'Wine tasting evenings and trips across the Znojmo wine region with a guaranteed safe ride back.',
        },
        {
          id: 'shuttle',
          title: 'Employee Shuttle',
          description:
            'Reliable contracted and daily staff transport solutions for companies in the region.',
        },
        {
          id: 'cargo-express',
          title: 'Express Shipments',
          description:
            'Fast door-to-door delivery of urgent parcels and confidential documents.',
        },
      ],
    },
    references: {
      title: 'Our References',
      desc: 'For over 30 years, leading companies, hotels, sports clubs, and institutions across the region have trusted us with their transport.',
    },
    contact: {
      title: 'Book a Vehicle',
      desc: 'Send us the details of your trip and we will promptly prepare an exact price calculation.',
      phoneLabel: 'Phone',
      emailLabel: 'E-mail',
      addressLabel: 'Company Address',
      icoLabel: 'Company ID (IČO)',
      form: {
        nameLabel: 'Full Name / Company *',
        namePlaceholder: 'John Smith',
        phoneLabel: 'Phone *',
        phonePlaceholder: '+420 777 000 000',
        emailLabel: 'E-mail *',
        emailPlaceholder: 'you@example.com',
        vehicleLabel: 'Preferred Vehicle',
        vehiclePlaceholder: 'Select a vehicle (optional)',
        fromLabel: 'Pick-up Location *',
        fromPlaceholder: 'e.g. Znojmo',
        toLabel: 'Destination *',
        toPlaceholder: 'e.g. Vienna Airport',
        dateLabel: 'Date & Time',
        datePlaceholder: 'e.g. June 15 at 08:00',
        messageLabel: 'Note / Passengers & Luggage',
        messagePlaceholder:
          'Specify the number of passengers, return trip, or any special requests...',
        submitBtn: 'Send Non-Binding Inquiry',
        sendingBtn: 'Sending inquiry...',
        submittedBtn: 'Inquiry sent successfully',
        errorFallback: 'Could not send the form. Please call us directly at ',
        gdprPrefix: 'By submitting this inquiry you acknowledge our',
        gdprLink: 'Privacy Policy (GDPR)',
      },
    },
    footer: {
      tagline: 'Premium Passenger Transport',
      rights: 'All rights reserved',
      gdprLink: 'Privacy Policy (GDPR)',
    },
    gdprModal: {
      title: 'Privacy Policy (GDPR)',
      closeAria: 'Close GDPR window',
      sections: [
        {
          heading: '1. Data Controller',
          text: 'The data controller is Petr Chochola, registered at Vančurova 13, 669 02 Znojmo, Czech Republic, Company ID (IČO): 64432157, phone: +420 608 707 225, e-mail: petrchochola@seznam.cz.',
        },
        {
          heading: '2. Scope and Purpose of Processing',
          text: 'When you submit an inquiry via the contact form on this website, we process the details you provide (name, phone number, e-mail address, and trip requirements) solely for the purpose of answering your inquiry, preparing a price quote, and providing the requested transport service (pre-contractual measures and performance of a contract under Art. 6(1)(b) GDPR).',
        },
        {
          heading: '3. Data Retention and Sharing',
          text: 'Personal data is stored only for the time necessary to process your inquiry and provide the transport service, or as required by applicable tax and accounting laws. We never share your personal data with third parties for marketing purposes.',
        },
        {
          heading: '4. Cookies',
          text: 'This website does not use any third-party advertising or tracking cookies.',
        },
        {
          heading: '5. Your Rights',
          text: 'You have the right to request access to your personal data, its rectification, erasure, or restriction of processing. You may contact the controller at any time via the e-mail or phone number listed above.',
        },
      ],
    },
    vehicles: buildLocalizedFleet('en'),
  },

  de: {
    metaTitle: 'Znojmo Transport | Exklusive Personen-, Kleinbus- & Busbeförderung',
    logoSub: 'Transport',
    nav: {
      fleet: 'Fuhrpark',
      services: 'Leistungen',
      references: 'Referenzen',
      contact: 'Kontakt',
      ctaHeader: 'Fahrt anfragen',
      ctaMobile: 'Unverbindliche Anfrage',
      callTitle: 'Anrufen',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
    },
    hero: {
      title: 'Premium Personen-Transport',
      subtitle: 'bereits seit 1993',
      leadLine1:
        'Professionelle PKW-, Kleinbus- und Busbeförderung ab Znojmo (Znaim) in ganz Tschechien und Europa.',
      leadLine2:
        'Vom luxuriösen 4-Sitzer-Kombi bis zum Reisebus für 52 Fahrgäste.',
      ctaPrimary: 'Unverbindliche Anfrage',
      ctaSecondary: 'Fuhrpark ansehen',
    },
    stats: [
      {
        value: '30+',
        title: 'Jahre Tradition',
        description: 'Zuverlässige Personenbeförderung seit 1993',
      },
      {
        value: '1 000 000+',
        title: 'Gefahrene km',
        description: 'Millionen sichere Kilometer mit Profifahrern',
      },
      {
        value: '100%',
        title: 'Mercedes-Benz',
        description: 'Ausschließlich luxuriöse und klimatisierte Flotte',
      },
      {
        value: '24/7',
        title: 'Disposition',
        description: 'Rund um die Uhr erreichbar & individuelle Planung',
      },
    ],
    fleet: {
      title: 'Fuhrpark',
      desc: 'Klicken Sie auf ein Fahrzeug, um die Fotogalerie (Außen- und Innenansichten) zu öffnen.',
      galleryBtn: 'Galerie',
      bookBtn: 'Fahrzeug anfragen',
      bookThisVehicle: 'Fahrzeug anfragen',
      capacityLabel: 'Kapazität',
      photoOf: (c, t) => `Foto ${c} von ${t}`,
      closeGallery: 'Galerie schließen',
      prevPhoto: 'Vorheriges Foto',
      nextPhoto: 'Nächstes Foto',
      thumbAlt: (i) => `Vorschau ${i}`,
    },
    services: {
      title: 'Unsere Leistungen',
      closeDetail: 'Detail schließen',
      items: [
        {
          id: 'airport',
          title: 'Flughafen-Transfer',
          description:
            'Komfortabler Transfer zu den Flughäfen Wien, Prag, Brünn oder Bratislava für Einzelpersonen und Gruppen.',
        },
        {
          id: 'sports',
          title: 'Sportteams & Vereine',
          description:
            'Regelmäßige und einmalige Fahrten für Sportmannschaften und Vereine zu Spielen und Trainingslagern.',
        },
        {
          id: 'weddings',
          title: 'Hochzeiten & Feiern',
          description:
            'Repräsentative Mercedes-Benz Fahrzeuge mit professionellem Chauffeur für Ihren großen Tag.',
        },
        {
          id: 'excursions',
          title: 'Ausflüge & Reisen',
          description:
            'Rundreisen durch Tschechien und ganz Europa, Schulausflüge und Gruppenreisen.',
        },
        {
          id: 'corporate',
          title: 'Firmen-Shuttle',
          description:
            'Beförderung von Management und Teams zu Geschäftsterminen, Konferenzen und Teambuildings.',
        },
        {
          id: 'drink-drive',
          title: 'Drink & Drive',
          description:
            'Sichere Heimfahrt für Sie und Ihr Fahrzeug von Feiern und gesellschaftlichen Veranstaltungen.',
        },
        {
          id: 'wine-cellars',
          title: 'Weinkeller-Touren',
          description:
            'Verkostungsabende und Ausflüge in die Weinkeller der Region Znojmo mit sicherer Rückfahrt.',
        },
        {
          id: 'shuttle',
          title: 'Mitarbeiter-Shuttle',
          description:
            'Zuverlässige Vertrags- und Linienfahrten für Mitarbeiter von Unternehmen in der Region.',
        },
        {
          id: 'cargo-express',
          title: 'Express-Sendungen',
          description:
            'Schneller Direkttransport wichtiger Sendungen und Dokumente direkt an den Bestimmungsort.',
        },
      ],
    },
    references: {
      title: 'Unsere Referenzen',
      desc: 'Seit mehr als 30 Jahren vertrauen uns namhafte Unternehmen, Hotels, Sportvereine und Institutionen aus der gesamten Region.',
    },
    contact: {
      title: 'Fahrzeug reservieren',
      desc: 'Schreiben Sie uns die Details Ihrer Fahrt und wir erstellen Ihnen umgehend ein genaues Preisangebot.',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      addressLabel: 'Firmensitz',
      icoLabel: 'IdNr. (IČO)',
      form: {
        nameLabel: 'Vor- und Nachname / Firma *',
        namePlaceholder: 'Max Mustermann',
        phoneLabel: 'Telefon *',
        phonePlaceholder: '+43 664 000 0000',
        emailLabel: 'E-Mail *',
        emailPlaceholder: 'ihre@email.at',
        vehicleLabel: 'Gewünschtes Fahrzeug',
        vehiclePlaceholder: 'Fahrzeug wählen (optional)',
        fromLabel: 'Abholort *',
        fromPlaceholder: 'z.B. Znojmo / Wien',
        toLabel: 'Zielort *',
        toPlaceholder: 'z.B. Flughafen Wien',
        dateLabel: 'Datum und Uhrzeit',
        datePlaceholder: 'z.B. 15. 6. um 8:00 Uhr',
        messageLabel: 'Anmerkung / Personen & Gepäck',
        messagePlaceholder:
          'Anzahl der Fahrgäste, Rückfahrt oder besondere Wünsche...',
        submitBtn: 'Unverbindliche Anfrage',
        sendingBtn: 'Wird gesendet...',
        submittedBtn: 'Anfrage erfolgreich gesendet',
        errorFallback: 'Formular konnte nicht gesendet werden. Bitte rufen Sie uns an unter ',
        gdprPrefix: 'Mit dem Absenden der Anfrage akzeptieren Sie unsere',
        gdprLink: 'Datenschutzerklärung (DSGVO)',
      },
    },
    footer: {
      tagline: 'Exklusive Personenbeförderung',
      rights: 'Alle Rechte vorbehalten',
      gdprLink: 'Datenschutz (DSGVO)',
    },
    gdprModal: {
      title: 'Datenschutzerklärung (DSGVO)',
      closeAria: 'DSGVO-Fenster schließen',
      sections: [
        {
          heading: '1. Verantwortlicher',
          text: 'Verantwortlicher für die Datenverarbeitung ist Petr Chochola, Vančurova 13, 669 02 Znojmo, Tschechische Republik, IdNr. (IČO): 64432157, Telefon: +420 608 707 225, E-Mail: petrchochola@seznam.cz.',
        },
        {
          heading: '2. Umfang und Zweck der Verarbeitung',
          text: 'Wenn Sie das Anfrageformular auf dieser Website nutzen, verarbeiten wir Ihre eingegebenen Daten (Name, Telefonnummer, E-Mail-Adresse und Angaben zur gewünschten Fahrt) ausschließlich zur Bearbeitung Ihrer Anfrage, zur Erstellung eines Preisangebots und zur Durchführung der Beförderung (Art. 6 Abs. 1 lit. b DSGVO).',
        },
        {
          heading: '3. Speicherdauer und Weitergabe',
          text: 'Personenbezogene Daten werden nur so lange gespeichert, wie es für die Abwicklung der Anfrage und Beförderung oder aufgrund gesetzlicher Steuer- und Buchhaltungspflichten erforderlich ist. Eine Weitergabe an Dritte zu Werbezwecken erfolgt nicht.',
        },
        {
          heading: '4. Cookies',
          text: 'Diese Website verwendet keine Werbe- oder Tracking-Cookies von Drittanbietern.',
        },
        {
          heading: '5. Ihre Rechte',
          text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich hierzu jederzeit an die oben genannte E-Mail-Adresse oder Telefonnummer.',
        },
      ],
    },
    vehicles: buildLocalizedFleet('de'),
  },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'cz',
  setLang: () => {},
  t: TRANSLATIONS.cz,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('cz');

  useEffect(() => {
    document.documentElement.lang = lang === 'cz' ? 'cs' : lang;
    document.title = TRANSLATIONS[lang].metaTitle;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
