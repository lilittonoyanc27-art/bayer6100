import { WordPair, QuizQuestion, SentenceItem, StoryTheme } from './types';

// Themed interactive stories about Luisa and Carlos's trip to Spain
// Spanish A2 Level with Pretérito Indefinido, Imperfecto, and Futuro Simple
// Each theme contains exactly 10 sentences for deep immersive reading
export const interactiveThemes: StoryTheme[] = [
  {
    id: "aeropuerto",
    titleEs: "Nuestra Llegada a Madrid y Planes de Viaje",
    titleAm: "Մեր ժամանումը Մադրիդ և ճանապարհորդության ծրագրերը",
    emoji: "✈️",
    description: "Լուիսայի և Կառլոսի ժամանումը, անցյալի թռիչքի հիշողությունները և առաջիկա պլանները:",
    sentences: [
      {
        id: 101,
        spanish: "Ayer por la tarde, Luisa y Carlos llegaron al aeropuerto de Madrid-Barajas después de un vuelo largo.",
        armenian: "Երեկ երեկոյան Լուիսան և Կառլոսը երկար թռիչքից հետո ժամանեցին Մադրիդ-Բարախաս օդանավակայան:",
        notes: "ayer por la tarde = երեկ երեկոյան, llegaron = ժամանեցին (llegar), vuelo = թռիչք:",
        location: "Madrid (Մադրիդ)"
      },
      {
        id: 102,
        spanish: "Ellos ya recogieron sus maletas de la cinta y ahora buscarán el autobús de traslado.",
        armenian: "Նրանք արդեն վերցրեցին իրենց ճամպրուկները ժապավենից և այժմ կփնտրեն տրանսֆերային ավտոբուսը:",
        notes: "recogieron = վերցրեցին (recoger), cinta = ժապավեն (ուղեբեռի), buscarán = կփնտրեն (buscar - futuro):",
        location: "Madrid (Մադրիդ)"
      },
      {
        id: 103,
        spanish: "Carlos dijo con emoción: 'Mañana visitaremos el famoso Museo del Prado y luego descansaremos.'",
        armenian: "Կառլոսն ոգևորությամբ ասաց. «Վաղը մենք կայցելենք հայտնի Պրադո թանգարանը, իսկ հետո կհանգստանանք»:",
        notes: "dijo = ասաց (decir), visitaremos = կայցելենք (visitar - futuro), descansaremos = կհանգստանանք (descansar - futuro):",
        location: "Madrid (Մադրիդ)"
      },
      {
        id: 104,
        spanish: "Luisa sonrió porque siempre quiso conocer la arquitectura clásica de la capital española.",
        armenian: "Լուիսան ժպտաց, որովհետև նա միշտ ցանկացել էր ճանաչել իսպանական մայրաքաղաքի դասական ճարտարապետությունը:",
        notes: "sonrió = ժպտաց (sonreír), quiso = ցանկացավ (querer), conocer = ճանաչել/ծանոթանալ:",
        location: "Madrid (Մադրիդ)"
      },
      {
        id: 105,
        spanish: "Hace unos años, ella estudió español en su país y ahora podrá practicar el idioma.",
        armenian: "Մի քանի տարի առաջ նա սովորել էր իսպաներեն իր երկրում, իսկ հիմա կկարողանա կիրառել լեզուն:",
        notes: "hace unos años = մի քանի տարի առաջ, estudió = սովորեց (estudiar), podrá = կկարողանա (poder - futuro):",
        location: "Madrid (Մադրիդ)"
      },
      {
        id: 106,
        spanish: "Por el camino, el conductor les explicó que la temperatura de hoy será templada y agradable.",
        armenian: "Ճանապարհին վարորդը նրանց բացատրեց, որ այսօրվա ջերմաստիճանը կլինի մեղմ և հաճելի:",
        notes: "conductor = վարորդ, explicó = բացատրեց (explicar), será = կլինի (ser - futuro):",
        location: "Viaje (Ճանապարհորդություն)"
      },
      {
        id: 107,
        spanish: "Luisa le preguntó a Carlos si ya compró los billetes de tren para ir a Segovia.",
        armenian: "Լուիսան հարցրեց Կառլոսին, թե արդյոք նա արդեն գնել է գնացքի տոմսերը Սեգովիա գնալու համար:",
        notes: "preguntó = հարցրեց, compró = գնեց (comprar), para ir = գնալու համար:",
        location: "Viaje (Ճանապարհորդություն)"
      },
      {
        id: 108,
        spanish: "Él contestó: 'No te preocupes, los compré en línea y viajaremos el próximo lunes.'",
        armenian: "Նա պատասխանեց. «Մի՛ անհանգստացիր, ես դրանք գնել եմ առցանց, և մենք կմեկնենք հաջորդ երկուշաբթի»:",
        notes: "contestó = պատասխանեց (contestar), compré = գնեցի, viajaremos = կճանապարհորդենք/կմեկնենք (viajar - futuro):",
        location: "Viaje (Ճանապարհորդություն)"
      },
      {
        id: 109,
        spanish: "A las ocho de la tarde, ellos llegaron al centro y vieron las luces brillantes de la Gran Vía.",
        armenian: "Երեկոյան ժամը ութին նրանք հասան կենտրոն և տեսան Գրան Վիայի պայծառ լույսերը:",
        notes: "llegaron = հասան, vieron = տեսան (ver), luces brillantes = պայծառ լույսեր:",
        location: "Viaje (Ճանապարհորդություն)"
      },
      {
        id: 110,
        spanish: "¡Esta maravillosa aventura por tierras de España será inolvidable para Luisa y Carlos!",
        armenian: "Այս հիասքանչ արկածը Իսպանիայի հողերում անմոռանալի կլինի Լուիսայի և Կառլոսի համար:",
        notes: "aventura = արկած, tierras = հողեր/երկրներ, será = կլինի, inolvidable = անմոռանալի:",
        location: "Viaje (Ճանապարհորդություն)"
      }
    ]
  },
  {
    id: "hotel",
    titleEs: "Una Estancia Histórica en Toledo",
    titleAm: "Պատմական կացություն Տոլեդոյում",
    emoji: "🏨",
    description: "Գրանցում հին հյուրանոցում, անցյալի հուշեր և ապագայի ծրագրեր:",
    sentences: [
      {
        id: 201,
        spanish: "El lunes pasado, Luisa y Carlos viajaron a Toledo y se hospedaron en un hotel antiguo.",
        armenian: "Անցյալ երկուշաբթի Լուիսան և Կառլոսը մեկնեցին Տոլեդո և հաստատվեցին մի հին հյուրանոցում:",
        notes: "el lunes pasado = անցյալ երկուշաբթի, viajaron = մեկնեցին (viajar), se hospedaron = հաստատվեցին/գիշերեցին:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 202,
        spanish: "Cuando entraron a la habitación, vieron que las ventanas daban a un patio decorado con flores.",
        armenian: "Երբ նրանք մտան սենյակ, տեսան, որ պատուհանները նայում էին ծաղիկներով զարդարված բակին:",
        notes: "entraron = մտան (entrar), vieron = տեսան, daban a = նայում էին դեպի (dar a), patio = բակ:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 203,
        spanish: "Carlos recordó: 'Durante mi infancia, yo visitaba este lugar histórico con mis abuelos.'",
        armenian: "Կառլոսը հիշեց. «Մանկությանս տարիներին ես իմ տատիկ-պապիկների հետ այցելում էի այս պատմական վայրը»:",
        notes: "recordó = հիշեց (recordar), infancia = մանկություն, visitaba = այցելում էի (visitar - imperfecto):",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 204,
        spanish: "Luisa exclamó: '¡Qué interesante! Mañana caminaremos por sus calles estrechas y empedradas.'",
        armenian: "Լուիսան բացականչեց. «Ինչքա՜ն հետաքրքիր է: Վաղը մենք կքայլենք նրա նեղ ու սալարկված փողոցներով»:",
        notes: "exclamó = բացականչեց (exclamar), caminaremos = կքայլենք, estrechas = նեղ, empedradas = սալարկված:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 205,
        spanish: "La recepcionista les explicó que el desayuno del hotel incluirá platos típicos de la región.",
        armenian: "Ընդունարանի աշխատակիցը նրանց բացատրեց, որ հյուրանոցի նախաճաշը ներառելու է տարածաշรջանի տիպիկ ուտեստներ:",
        notes: "les explicó = նրանց բացատրեց, incluirá = կներառի (incluir - futuro), platos típicos = տիպիկ ուտեստներ:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 206,
        spanish: "Por la noche, ellos salieron a cenar tapas en una taberna tradicional muy ruidosa.",
        armenian: "Երեկոյան նրանք դուրս եկան ընթրելու տապաս (տեղական սնունդ) մի շատ աղմկոտ ավանդական պանդոկում:",
        notes: "salieron = դուրս եկան (salir), cenar = ընթրել, ruidosa = աղմկոտ, taberna = պանդոկ:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 207,
        spanish: "Allí probaron el famoso queso manchego, que les gustó muchísimo de inmediato.",
        armenian: "Այնտեղ նրանք փորձեցին հայտնի ማንչեգո պանիրը, որը նրանց անմիջապես շատ դուր եկավ:",
        notes: "probaron = փորձեցին (probar), queso = պանիր, les gustó muchísimo = նրանց չափազանց շատ դուր եկավ:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 208,
        spanish: "Carlos dijo: 'En el futuro, volveremos aquí con nuestros amigos de Armenia.'",
        armenian: "Կառլոսն ասաց. «Ապագայում մենք այստեղ կվերադառնանք Հայաստանից մեր ընկերների հետ»:",
        notes: "en el futuro = ապագայում, volveremos = կվերադառնանք (volver - futuro), de Armenia = Հայաստանից:",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 209,
        spanish: "Antes de acostarse, ellos revisaron el mapa político e hicieron una lista de monumentos.",
        armenian: "Քնելուց առաջ նրանք ուսումնասիրեցին քաղաքական քարտեզը և կազմեցին հուշարձանների ցուցակը:",
        notes: "antes de acostarse = քնելուց առաջ, revisaron = ուսումնասիրեցին/վերանայեցին, hicieron = արեցին/կազմեցին (hacer):",
        location: "Toledo (Տոլեդո)"
      },
      {
        id: 210,
        spanish: "Ellos durmieron muy bien porque la verdad es que estaban bastante cansados por el viaje.",
        armenian: "Նրանք շատ լավ քնեցին, որովհետև ճշմարտությունն այն է, որ բավականին հոգնած էին ճանապարհից:",
        notes: "durmieron = քնեցին, la verdad es que = ճշմարտությունն այն է, որ, estaban cansados = հոգնած էին (estar - imperfecto):",
        location: "Toledo (Տոլեդո)"
      }
    ]
  },
  {
    id: "restaurante",
    titleEs: "Una Experiencia Gastronómica en Sevilla",
    titleAm: "Գաստրոնոմիական փորձ Սևիլյայում",
    emoji: "🥘",
    description: "Ճաշ Սևիլյայի գեղեցիկ սրահում, տեղական համերի բացահայտում և ֆլամենկոյի պլաններ:",
    sentences: [
      {
        id: 301,
        spanish: "Ayer Luisa y Carlos caminaron bajo el sol de Sevilla y decidieron almorzar en un patio andaluz.",
        armenian: "Երեկ Լուիսան և Կառլոսը քայլեցին Սևիլյայի արևի տակ և որոշեցին ճաշել անդալուզյան բակում:",
        notes: "ayer = երեկ, caminaron = քայլեցին (caminar), decidieron = որոշեցին (decidir), almorzar = ճաշել:",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 302,
        spanish: "El mesón estaba lleno de gente, pero el camarero les encontró una mesa al lado de las plantas.",
        armenian: "Պանդոկը լիքն էր մարդկանցով, բայց մատուցողը նրանց համար բույսերի կողքին սեղան գտավ:",
        notes: "estaba lleno = լիքն էր (imperfecto), camarero = մատուցող, encontró = գտավ (encontrar):",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 303,
        spanish: "Carlos pidió salmorejo de primero porque siempre le encantaban las sopas frías.",
        armenian: "Կառլոսը առաջին ուտեստ ընտրեց սալմորեխո (տեղական ապուր), քանի որ միշտ սիրել էր սառը ապուրներ:",
        notes: "pidió = պատվիրեց (pedir), de primero = առաջին հերթին, encantaban = դուր էին գալիս (encantar - imperfecto):",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 304,
        spanish: "Luisa eligió bacalao frito y comentó que su abuela cocinaba un pescado similar.",
        armenian: "Լուիսան ընտրեց տապակած ձողաձուկ և նշեց, որ իր տատիկը նմանատիպ ձուկ էր պատրաստում:",
        notes: "eligió = ընտրեց (elegir), bacalao frito = տապակած ձողաձուկ, cocinaba = պատրաստում էր (cocinar - imperfecto):",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 305,
        spanish: "Durante el almuerzo, hablaron sobre los bailes de flamenco que verán esta tarde.",
        armenian: "Ճաշի ժամանակ նրանք խոսեցին ֆլամենկոյի պարերի մասին, որոնք տեսնելու են այս երեկո:",
        notes: "hablaron = խոսեցին (hablar), bailes de flamenco = ֆլամենկո պարեր, verán = կտեսնեն (ver - futuro):",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 306,
        spanish: "Carlos sonrió: 'Compramos las entradas el mes pasado, así que tendremos buenos asientos.'",
        armenian: "Կառլոսը ժպտաց. «Մենք տոմսերը գնել ենք անցյալ ամիս, այնպես որ լավ տեղեր կունենանք»:",
        notes: "compramos = գնեցինք (comprar), entradas = տոմսեր, tendremos = կունենանք (tener - futuro):",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 307,
        spanish: "De postre, ellos compartieron unos churros con chocolate bien caliente y espeso.",
        armenian: "Որպես աղանդեր, նրանք կիսեցին չուրոս (քաղցրավենիք) շատ տաք և թանձր շոկոլադով:",
        notes: "de postre = որպես աղանդեր, compartieron = կիսեցին (compartir), espeso = թանձր:",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 308,
        spanish: "La comida fue espectacular y Luisa le agradeció al camarero por su perfecto servicio.",
        armenian: "Ուտելիքը հիասքանչ էր, և Լուիսան շնորհակալություն հայտնեց մատուցողին իր կատարյալ սպասարկման համար:",
        notes: "fue = էր (ser - indefinido), agradeció = շնորհակալություն հայտնեց (agradecer), servicio = սպասարկում:",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 309,
        spanish: "Él les respondió con cortesía: 'De nada, amigos, ¡espero que disfruten su estancia en Sevilla!'",
        armenian: "Նա նրանց քաղաքավարի պատասխանեց. «Խնդրե՛մ, ընկերներ, հուսով եմ՝ կվայելեք ձեր կացությունը Սևիլյայում»:",
        notes: "respondió = պատասխանեց, cortesía = քաղաքավարություն, disfruten = կվայելեք:",
        location: "Sevilla (Սևիլյա)"
      },
      {
        id: 310,
        spanish: "Ellos dejaron una buena propina en efectivo y salieron contentos a continuar el paseo.",
        armenian: "Նրանք կանխիկ լավ թեյավճար թողեցին և գոհ դուրս եկան զբոսանքը շարունակելու:",
        notes: "dejaron = թողեցին (dejar), efectivo = կանխիկ, salieron = դուրս եկան (salir), continuar = շարունակել:",
        location: "Sevilla (Սևիլյա)"
      }
    ]
  },
  {
    id: "barcelona",
    titleEs: "Aventuras Modernistas en Barcelona",
    titleAm: "Մոդեռնիստական արկածներ Բարսելոնայում",
    emoji: "🎡",
    description: "Գաուդիի հրաշալիքները, Միջերկրական ծովը և ապագա վերադարձի պլանները:",
    sentences: [
      {
        id: 401,
        spanish: "El miércoles pasado, Luisa y Carlos tomaron un tren de alta velocidad hacia Barcelona.",
        armenian: "Անցյալ չորեքշաբթի Լուիսան և Կառլոսը արագընթաց գնացք նստեցին դեպի Բարսելոնա:",
        notes: "tomaron = նստեցին/մեկնեցին (tomar), tren de alta velocidad = արագընթաց գնացք, hacia = դեպի:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 402,
        spanish: "Durante el viaje, contemplaron los paisajes mientras escuchaban música folclórica.",
        armenian: "Ճանապարհորդության ընթացքում նրանք հիանում էին տեսարաններով, մինչդեռ լսում էին ժողովրդական երաժշտություն:",
        notes: "contemplaron = հիանում էին (contemplar), escuchaban = լսում էին (escuchar - imperfecto):",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 403,
        spanish: "Al llegar, visitaron la Sagrada Familia y quedaron sin palabras por su impresionante diseño.",
        armenian: "Ժամանելուն պես նրանք այցելեցին Սագրադա Ֆամիլիա և ապշած մնացին դրա տպավորիչ դիզայնից:",
        notes: "al llegar = ժամանելուն պես, visitaron = այցելեցին (visitar), quedaron = մնացին (quedar):",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 404,
        spanish: "Luisa exclamó: '¡Es la obra más bella que he visto jamás, Gaudí era un genio!'",
        armenian: "Լուիսան բացականչեց. «Սա երբևէ տեսածս ամենագեղեցիկ գործն է, Գաուդին հանճար էր»:",
        notes: "obra = աշխատանք, bella = գեղեցիկ, he visto = տեսել եմ (visto), genio = հանճար:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 405,
        spanish: "Ellos pasearon por el Parque Güell, donde tomaron fotos coloridas con las esculturas de dragones.",
        armenian: "Նրանք զբոսնեցին Գուել զբոսայգով, որտեղ գունավոր լուսանկարներ արեցին վիշապների քանդակներով:",
        notes: "pasearon = զբոսնեցին (pasear), tomaron fotos = լուսանկարներ արեցին, esculturas = քանդակներ:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 406,
        spanish: "Carlos dijo sonriendo: 'En unos días volaremos de regreso a nuestro hogar en Armenia.'",
        armenian: "Կառլոսը ժպտալով ասաց. «Մի քանի օրից մենք հետ կթռչենք մեր տուն՝ Հայաստան»:",
        notes: "volaremos = կթռչենք (volar - futuro), de regreso = վերադարձող, hogar = տուն/օջախ:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 407,
        spanish: "Luisa respondió: 'Sí, pero antes de partir compraremos regalos y dulces típicos para todos.'",
        armenian: "Լուիսան պատասխանեց. «Այո, բայց մեկնելուց առաջ մենք նվերներ և տիպիկ քաղցրավենիք կգնենք բոլորի համար»:",
        notes: "antes de partir = մեկնելուց առաջ, compraremos = կգնենք (comprar - futuro), regalos = նվերներ:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 408,
        spanish: "Esa tarde, ellos caminaron por la orilla del mar Mediterráneo y sintieron el viento suave.",
        armenian: "Այդ երեկո նրանք քայլեցին Միջերկրական ծովի ափով և զգացին մեղմ քամին:",
        notes: "orilla del mar = ծովափ, sintieron = զգացին (sentir - indefinido), viento suave = մեղմ քամի:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 409,
        spanish: "Ellos sabían bien que este viaje escolar había sido la mejor experiencia de sus vidas.",
        armenian: "Նրանք լավ գիտեին, որ այս դպրոցական ճանապարհորդությունը եղել էր իրենց կյանքի լավագույն փորձը:",
        notes: "sabían = գիտեին (saber - imperfecto), había sido = եղել էր (pluscuamperfecto), experiencia = փորձ:",
        location: "Barcelona (Բարսելոնա)"
      },
      {
        id: 410,
        spanish: "¡Luisa y Carlos siempre recordarán con mucho cariño cada rincón de la mágica España!",
        armenian: "Լուիսան և Կառլոսը միշտ մեծ սիրով կհիշեն կախարդական Իսպանիայի յուրաքանչյուր անկյունը:",
        notes: "recordarán = կհիշեն (recordar - futuro), cariño = սեր/ջերմություն, rincón = անկյուն:",
        location: "Barcelona (Բարսելոնա)"
      }
    ]
  }
];

// For backward compatibility with general codes
export const interactiveStory: SentenceItem[] = interactiveThemes[0].sentences;

// Travel Quiz Data (10 Questions about Spanish Travel vocabulary and culture)
export const travelQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Ինչպե՞ս է իսպաներեն թարգմանվում «Ինքնաթիռ» բառը ճանապարհորդության համար:",
    options: ["El coche", "El avión", "El barco", "El tren"],
    correctAnswer: "El avión",
    explanation: "El avión նշանակում է «Ինքնաթիռ»։ El coche - մեքենա, El barco - նավ, El tren - գնացք։"
  },
  {
    id: 2,
    question: "Ի՞նչ է պետք քաղաքավարի ասել իսպաներեն հարցնելու համար՝ «Որտե՞ղ է հյուրանոցը»։",
    options: ["¿Dónde está el hotel?", "¿Cuánto cuesta el hotel?", "Me gusta el hotel", "Tengo un hotel"],
    correctAnswer: "¿Dónde está el hotel?",
    explanation: "¿Dónde está...?-ն նշանակում է «Որտե՞ղ է...»: Շատ օգտակար է վայրեր գտնելու համար:"
  },
  {
    id: 3,
    question: "Ինչպե՞ս է հայերեն թարգմանվում իսպաներեն «La maleta» բառը:",
    options: ["Տոմս", "Ճամպրուկ", "Անձնագիր", "Բանալի"],
    correctAnswer: "Ճամպրուկ",
    explanation: "La maleta նշանակում է «Ճամպրուկ»: Անփոխարինելի իր յուրաքանչյուր ճանապարհորդության ժամանակ:"
  },
  {
    id: 4,
    question: "Դուք քաղցած եք Սևիլյայի սրճարանում: Ինչպե՞ս կխնդրեք հաշիվը իսպաներեն:",
    options: ["¡Hola, amigo!", "Por favor, la cuenta", "Buenas noches", "Quiero un helado"],
    correctAnswer: "Por favor, la cuenta",
    explanation: "Por favor, la cuenta թարգմանվում է որպես «Հաշիվը, խնդրում եմ»: La cuenta նշանակում է հաշիվ:"
  },
  {
    id: 5,
    question: "Ինչպե՞ս առավոտյան ողջունել Իսպանիայի հյուրանոցի ադմինիստրատորին:",
    options: ["¡Buenas noches!", "¡Adiós!", "¡Buenos días!", "¡Muchas gracias!"],
    correctAnswer: "¡Buenos días!",
    explanation: "¡Buenos días!-ն նշանակում է «Բարի լույս» կամ «Բարի օր» (մինչև կեսօր):"
  },
  {
    id: 6,
    question: "Ո՞ր իսպաներեն բառն է նշանակում մայրաքաղաք (օրինակ՝ Մադրիդը Իսպանիայի մայրաքաղաքն է):",
    options: ["Capital", "Playa", "Habitación", "Ciudad"],
    correctAnswer: "Capital",
    explanation: "La capital նշանակում է «Մայրաքաղաք»: Մադրիդը Իսպանիայի մայրաքաղաքն է:"
  },
  {
    id: 7,
    question: "Ի՞նչ կգնեն զբոսաշրջիկները թանգարան մտնելու կամ մետրո նստելու համար:",
    options: ["La comida", "Un billete / El boleto", "La llave", "El mapa"],
    correctAnswer: "Un billete / El boleto",
    explanation: "Un billete-ն (կամ el boleto-ն) նշանակում է տոմս (ուղետոմս կամ մուտքի տոմս)։"
  },
  {
    id: 8,
    question: "Ինչպե՞ս թարգմանել իսպաներեն «Buen viaje» արտահայտությունը:",
    options: ["Բարի ճանապարհ", "Բարի լույս", "Շնորհակալություն", "Ցտեսություն"],
    correctAnswer: "Բարի ճանապարհ",
    explanation: "Buen viaje նշանակում է «Բարի՛ ճանապարհ»:"
  },
  {
    id: 9,
    question: "Բարսելոնայի ո՞ր տեսարժան վայրն է զարմացրել Լուիսային և Կառլոսին:",
    options: ["El Coliseo", "La Sagrada Familia", "La Torre Eiffel", "La Estatua de la Libertad"],
    correctAnswer: "La Sagrada Familia",
    explanation: "Սագրադա Ֆամիլիա (La Sagrada Familia) տաճարը ճարտարապետ Անտոնիո Գաուդիի հիասքանչ գլուխգործոցն է Բարսելոնայում:"
  },
  {
    id: 10,
    question: "Ինչպե՞ս է թարգմանվում «El pasaporte» բառը:",
    options: ["Անձնագիր", "Քարտեզ", "Բացիկ", "Ուղեցույց"],
    correctAnswer: "Անձնագիր",
    explanation: "El pasaporte նշանակում է «Անձնագիր»՝ ճանապարհորդի ամենակարևոր փաստաթուղթը:"
  }
];

// Dictionary of 15 essential word translations for matches and games
export const vocabulary: WordPair[] = [
  { id: "1", spanish: "El pasaporte", armenian: "Անձնագիր", category: "Travel", exampleSpanish: "Necesito mi pasaporte.", exampleArmenian: "Ինձ անհրաժեշտ է իմ անձնագիրը:", hint: "Գլխավոր փաստաթուղթը" },
  { id: "2", spanish: "La maleta", armenian: "Ճամպրուկ", category: "Travel", exampleSpanish: "Mi maleta es roja.", exampleArmenian: "Իմ ճամպրուկը կարմիր է:", hint: "Իրերը դասավորելու համար" },
  { id: "3", spanish: "El tren", armenian: "Գնացք", category: "Transport", exampleSpanish: "El tren sale a las diez.", exampleArmenian: "Գնացքը մեկնում է ժամը տասին:", hint: "Շարժվում է ռելսերով" },
  { id: "4", spanish: "El avión", armenian: "Ինքնաթիռ", category: "Transport", exampleSpanish: "El avión vuela alto.", exampleArmenian: "Ինքնաթիռը բարձր է թռչում:", hint: "Թռչում է երկնքում" },
  { id: "5", spanish: "La playa", armenian: "Լողափ", category: "Sightseeing", exampleSpanish: "Nos gusta caminar por la playa.", exampleArmenian: "Մեզ դուր է գալիս քայլել լողափով:", hint: "Ավազ և ծով" },
  { id: "6", spanish: "El hotel", armenian: "Հյուրանոց", category: "Accommodation", exampleSpanish: "El hotel es muy cómodo.", exampleArmenian: "Հյուրանոցը շատ հարմարավետ է:", hint: "Տուն զբոսաշրջիկների համար" },
  { id: "7", spanish: "La llave", armenian: "Բանալի", category: "Accommodation", exampleSpanish: "Aquí está la llave de la habitación.", exampleArmenian: "Ահա սենյակի բանալին:", hint: "Բացում է կողպեքը" },
  { id: "8", spanish: "La comida", armenian: "Ուտելիք", category: "Food", exampleSpanish: "La comida española es deliciosa.", exampleArmenian: "Իսպանական ուտելիքը համեղ է:", hint: "Այն, ինչ մենք ուտում ենք" },
  { id: "9", spanish: "El agua", armenian: "Ջուր", category: "Food", exampleSpanish: "Un vaso de agua, por favor.", exampleArmenian: "Մեկ բաժակ ջուր, խնդրում եմ:", hint: "Թափանցիկ հեղուկ" },
  { id: "10", spanish: "La calle", armenian: "Փողոց", category: "Sightseeing", exampleSpanish: "La calle está llena de gente.", exampleArmenian: "Փողոցը լիքն է մարդկանցով:", hint: "Որտեղով քայլում են մարդիկ" },
  { id: "11", spanish: "Gracias", armenian: "Շնորհակալություն", category: "Basics", exampleSpanish: "Muchas gracias por la ayuda.", exampleArmenian: "Շատ շնորհակալություն օգնության համար:", hint: "Քաղաքավարի բառ" },
  { id: "12", spanish: "Por favor", armenian: "Խնդրում եմ", category: "Basics", exampleSpanish: "Ayúdame, por favor.", exampleArmenian: "Օգնիր ինձ, խնդրում եմ:", hint: "Օգտագործվում է խնդրանքի դեպքում" },
  { id: "13", spanish: "El amigo", armenian: "Ընկեր", category: "Basics", exampleSpanish: "Él es mi mejor amigo.", exampleArmenian: "Նա իմ լավագույն ընկերն է:", hint: "Մտերիմ մարդ" },
  { id: "14", spanish: "El sol", armenian: "Արև", category: "Nature", exampleSpanish: "En España hace mucho sol.", exampleArmenian: "Իսպանիայում շատ արև կա:", hint: "Լուսավորում է ցերեկը" },
  { id: "15", spanish: "El mar", armenian: "Ծով", category: "Nature", exampleSpanish: "El agua del mar está caliente.", exampleArmenian: "Ծովի ջուրը տաք է:", hint: "Կապույտ ջրային տարածություն" }
];

// Data for Game 4: Fill in the Blanks (Լրացրու բացթողումը)
export const fillBlanksData = [
  {
    id: 1,
    sentence: "Carlos viaja en _______ a Madrid.",
    translation: "Կառլոսը ինքնաթիռով մեկնում է Մադրիդ:",
    correct: "avión",
    options: ["avión", "playa", "llave"],
    hint: "Ինքնաթիռ"
  },
  {
    id: 2,
    sentence: "Luisa tiene la _______ de la habitación.",
    translation: "Լուիսան ունի սենյակի բանալին:",
    correct: "llave",
    options: ["comida", "llave", "tren"],
    hint: "Բանալի"
  },
  {
    id: 3,
    sentence: "En Barcelona hace mucho _______ y calor.",
    translation: "Բարսելոնայում շատ արև և տաք է:",
    correct: "sol",
    options: ["mar", "pasaporte", "sol"],
    hint: "Արև"
  },
  {
    id: 4,
    sentence: "Ellos compran un _______ para ir en metro.",
    translation: "Նրանք մետրոյով գնալու տոմս են գնում:",
    correct: "billete",
    options: ["billete", "hotel", "balcón"],
    hint: "Տոմս"
  },
  {
    id: 5,
    sentence: "La _______ española de mariscos se llama paella.",
    translation: "Ծովամթերքով իսպանական ուտելիքը կոչվում է պաելյա:",
    correct: "comida",
    options: ["playa", "amigo", "comida"],
    hint: "Ուտելիք"
  },
  {
    id: 6,
    sentence: "El agua del _______ de la Barceloneta está azul.",
    translation: "Բարսելոնետայի ծովի ջուրը կապույտ է:",
    correct: "mar",
    options: ["mar", "tren", "calle"],
    hint: "Ծով"
  }
];

// Data for Game 6: Sentence Constructor (Կառուցիր նախադասությունը)
export const sentenceConstructorData = [
  {
    id: 1,
    armenian: "Մենք սիրում ենք Իսպանիան:",
    spanishWords: ["Nosotros", "nos", "gusta", "la", "comida", "encanta", "España"],
    correctOrder: ["Nosotros", "encanta", "España"],
    displayArmenian: "Մենք սիրում ենք Իսպանիան: (Nos encanta España)",
    words: ["Nos", "encanta", "España"],
    pool: ["España", "gusta", "Encanta", "amigo", "Nos", "encanta", "sol"] 
  },
  {
    id: 2,
    armenian: "Որտե՞ղ է հյուրանոցը:",
    displayArmenian: "Որտե՞ղ է հյուրանոցը: (¿Dónde está el hotel?)",
    words: ["¿Dónde", "está", "el", "hotel?"],
    pool: ["hotel?", "llave", "está", "calle", "el", "¿Dónde", "un"]
  },
  {
    id: 3,
    armenian: "Մեկ բաժակ սառը ջուր, խնդրում եմ:",
    displayArmenian: "Մեկ բաժակ սառը ջուր, խնդրում եմ: (Un vaso de agua fría, por favor)",
    words: ["Un", "vaso", "de", "agua", "fría,", "por", "favor"],
    pool: ["por", "favor", "mar", "agua", "Un", "de", "vaso", "fría,", "tren", "sol"]
  },
  {
    id: 4,
    armenian: "Գնում ենք օդանավակայան:",
    displayArmenian: "Գնում ենք օդանավակայան: (Vamos al aeropuerto)",
    words: ["Vamos", "al", "aeropuerto"],
    pool: ["Vamos", "al", "aeropuerto", "hotel", "habitación", "salida"]
  },
  {
    id: 5,
    armenian: "Ճամպրուկը շատ մեծ է:",
    displayArmenian: "Ճամպրուկը շատ մեծ է: (La maleta es muy grande)",
    words: ["La", "maleta", "es", "muy", "grande"],
    pool: ["La", "maleta", "es", "muy", "grande", "pequeño", "llave", "avión"]
  },
  {
    id: 6,
    armenian: "Շատ շնորհակալություն օգնության համար:",
    displayArmenian: "Շատ շնորհակալություն օգնության համար: (Muchas gracias por la ayuda)",
    words: ["Muchas", "gracias", "por", "la", "ayuda"],
    pool: ["Muchas", "gracias", "el", "por", "la", "ayuda", "salida", "correo"]
  }
];
