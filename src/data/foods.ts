import { FoodItem } from '../types';

export const FOODS: FoodItem[] = [
  // ============================================================
  // Крупы и каши
  // ============================================================
  { id: 'grechka', name: 'Гречка (крупа)', calories: 313, protein: 12.6, fat: 3.3, carbs: 62.1, category: 'Крупы и каши' },
  { id: 'grechka-kasha', name: 'Гречневая каша на воде', calories: 110, protein: 4.2, fat: 1.1, carbs: 21.3, category: 'Крупы и каши' },
  { id: 'ovsyanka-krupa', name: 'Овсяная крупа', calories: 342, protein: 12.3, fat: 6.1, carbs: 59.5, category: 'Крупы и каши' },
  { id: 'ovsyanka-kasha', name: 'Овсяная каша на воде', calories: 88, protein: 3.0, fat: 1.7, carbs: 15.0, category: 'Крупы и каши' },
  { id: 'ovsyanka-kasha-moloko', name: 'Овсяная каша на молоке', calories: 102, protein: 3.2, fat: 4.1, carbs: 14.2, category: 'Крупы и каши' },
  { id: 'ris-belyj', name: 'Рис белый (крупа)', calories: 344, protein: 6.7, fat: 0.7, carbs: 78.9, category: 'Крупы и каши' },
  { id: 'ris-kasha', name: 'Рис отварной', calories: 116, protein: 2.2, fat: 0.5, carbs: 24.9, category: 'Крупы и каши' },
  { id: 'ris-buryj', name: 'Рис бурый (крупа)', calories: 337, protein: 7.4, fat: 1.8, carbs: 72.8, category: 'Крупы и каши' },
  { id: 'psheno-krupa', name: 'Пшено (крупа)', calories: 348, protein: 11.5, fat: 3.3, carbs: 69.3, category: 'Крупы и каши' },
  { id: 'psheno-kasha', name: 'Пшённая каша на воде', calories: 90, protein: 3.0, fat: 0.7, carbs: 17.0, category: 'Крупы и каши' },
  { id: 'perlovka-krupa', name: 'Перловая крупа', calories: 320, protein: 9.3, fat: 1.1, carbs: 66.9, category: 'Крупы и каши' },
  { id: 'perlovka-kasha', name: 'Перловая каша на воде', calories: 109, protein: 3.1, fat: 0.4, carbs: 22.2, category: 'Крупы и каши' },
  { id: 'mannaya-krupa', name: 'Манная крупа', calories: 328, protein: 10.3, fat: 1.0, carbs: 67.4, category: 'Крупы и каши' },
  { id: 'mannaya-kasha-moloko', name: 'Манная каша на молоке', calories: 98, protein: 3.0, fat: 3.2, carbs: 15.3, category: 'Крупы и каши' },
  { id: 'kukuruznaya-krupa', name: 'Кукурузная крупа', calories: 337, protein: 8.3, fat: 1.2, carbs: 71.6, category: 'Крупы и каши' },
  { id: 'bulgur', name: 'Булгур (крупа)', calories: 342, protein: 12.3, fat: 1.3, carbs: 63.4, category: 'Крупы и каши' },
  { id: 'kuskus', name: 'Кускус (крупа)', calories: 376, protein: 12.8, fat: 0.6, carbs: 77.4, category: 'Крупы и каши' },

  // ============================================================
  // Мясо и птица
  // ============================================================
  { id: 'kuritsa-grudka', name: 'Куриная грудка', calories: 113, protein: 23.6, fat: 1.9, carbs: 0.4, category: 'Мясо и птица' },
  { id: 'kuritsa-grudka-otvar', name: 'Куриная грудка отварная', calories: 137, protein: 29.8, fat: 1.8, carbs: 0.5, category: 'Мясо и птица' },
  { id: 'kuritsa-bedro', name: 'Куриное бедро', calories: 185, protein: 18.2, fat: 12.5, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'kuritsa-golen', name: 'Куриная голень', calories: 172, protein: 18.0, fat: 11.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'kuritsa-krylyshki', name: 'Куриные крылышки', calories: 222, protein: 18.3, fat: 16.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'kuritsa-farsh', name: 'Куриный фарш', calories: 143, protein: 17.4, fat: 8.1, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'indeyka-file', name: 'Индейка (филе)', calories: 114, protein: 23.5, fat: 1.6, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'indeyka-bedro', name: 'Индейка (бедро)', calories: 144, protein: 20.0, fat: 7.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'govyadina', name: 'Говядина', calories: 187, protein: 18.9, fat: 12.4, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'govyadina-vyrezka', name: 'Говяжья вырезка', calories: 155, protein: 20.2, fat: 7.1, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'govyadina-farsh', name: 'Говяжий фарш', calories: 254, protein: 17.2, fat: 20.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'svinina', name: 'Свинина', calories: 242, protein: 16.0, fat: 21.6, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'svinina-postnaya', name: 'Свинина постная', calories: 160, protein: 19.4, fat: 7.1, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'svinina-farsh', name: 'Свиной фарш', calories: 263, protein: 17.0, fat: 21.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'baranina', name: 'Баранина', calories: 209, protein: 15.6, fat: 16.3, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'krolik', name: 'Крольчатина', calories: 156, protein: 21.0, fat: 8.0, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'utka', name: 'Утка', calories: 308, protein: 13.5, fat: 28.6, carbs: 0.0, category: 'Мясо и птица' },
  { id: 'pechen-govyazhya', name: 'Печень говяжья', calories: 127, protein: 17.9, fat: 3.7, carbs: 5.3, category: 'Мясо и птица' },
  { id: 'pechen-kurinaya', name: 'Печень куриная', calories: 136, protein: 19.1, fat: 6.3, carbs: 0.6, category: 'Мясо и птица' },
  { id: 'kolbasa-doktorskaya', name: 'Колбаса докторская', calories: 257, protein: 12.8, fat: 22.2, carbs: 1.5, category: 'Мясо и птица' },
  { id: 'kolbasa-varenaya', name: 'Колбаса варёная', calories: 260, protein: 11.0, fat: 23.0, carbs: 2.0, category: 'Мясо и птица' },
  { id: 'kolbasa-kopchenaya', name: 'Колбаса копчёная', calories: 410, protein: 16.2, fat: 38.0, carbs: 2.2, category: 'Мясо и птица' },
  { id: 'sosiski', name: 'Сосиски', calories: 277, protein: 11.0, fat: 23.9, carbs: 1.6, category: 'Мясо и птица' },
  { id: 'sardelki', name: 'Сардельки', calories: 215, protein: 11.4, fat: 17.0, carbs: 1.9, category: 'Мясо и птица' },
  { id: 'vetcina', name: 'Ветчина', calories: 270, protein: 14.0, fat: 24.0, carbs: 0.0, category: 'Мясо и птица' },

  // ============================================================
  // Рыба и морепродукты
  // ============================================================
  { id: 'syomga', name: 'Сёмга (лосось)', calories: 208, protein: 20.0, fat: 13.6, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'treska', name: 'Треска', calories: 69, protein: 16.0, fat: 0.6, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'mintaj', name: 'Минтай', calories: 72, protein: 15.9, fat: 0.9, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'sudak', name: 'Судак', calories: 84, protein: 18.4, fat: 1.1, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'shchuka', name: 'Щука', calories: 82, protein: 18.4, fat: 0.8, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'okun-morskoj', name: 'Окунь морской', calories: 103, protein: 18.2, fat: 3.3, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'skumbriya', name: 'Скумбрия', calories: 191, protein: 18.0, fat: 13.2, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'forel', name: 'Форель', calories: 119, protein: 20.5, fat: 3.5, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'seledka', name: 'Сельдь', calories: 217, protein: 17.7, fat: 15.4, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'tilapia', name: 'Тилапия', calories: 96, protein: 20.1, fat: 1.7, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'tunets', name: 'Тунец', calories: 139, protein: 24.4, fat: 4.6, carbs: 0.0, category: 'Рыба и морепродукты' },
  { id: 'krevetki', name: 'Креветки', calories: 95, protein: 20.5, fat: 1.6, carbs: 0.3, category: 'Рыба и морепродукты' },
  { id: 'kalmary', name: 'Кальмары', calories: 86, protein: 18.0, fat: 0.3, carbs: 2.0, category: 'Рыба и морепродукты' },
  { id: 'midii', name: 'Мидии', calories: 77, protein: 11.5, fat: 2.0, carbs: 3.3, category: 'Рыба и морепродукты' },
  { id: 'krab-palochki', name: 'Крабовые палочки', calories: 73, protein: 6.0, fat: 1.0, carbs: 10.0, category: 'Рыба и морепродукты' },
  { id: 'ikra-krasnaya', name: 'Икра красная', calories: 245, protein: 32.0, fat: 15.0, carbs: 0.0, category: 'Рыба и морепродукты' },

  // ============================================================
  // Молочные продукты
  // ============================================================
  { id: 'moloko-25', name: 'Молоко 2.5%', calories: 52, protein: 2.8, fat: 2.5, carbs: 4.7, category: 'Молочные продукты' },
  { id: 'moloko-32', name: 'Молоко 3.2%', calories: 59, protein: 2.9, fat: 3.2, carbs: 4.7, category: 'Молочные продукты' },
  { id: 'kefir-1', name: 'Кефир 1%', calories: 40, protein: 3.0, fat: 1.0, carbs: 4.0, category: 'Молочные продукты' },
  { id: 'kefir-25', name: 'Кефир 2.5%', calories: 53, protein: 2.9, fat: 2.5, carbs: 3.9, category: 'Молочные продукты' },
  { id: 'ryazhenka-25', name: 'Ряженка 2.5%', calories: 54, protein: 2.9, fat: 2.5, carbs: 4.2, category: 'Молочные продукты' },
  { id: 'tvorog-0', name: 'Творог обезжиренный', calories: 71, protein: 16.5, fat: 0.0, carbs: 1.3, category: 'Молочные продукты' },
  { id: 'tvorog-5', name: 'Творог 5%', calories: 121, protein: 17.2, fat: 5.0, carbs: 1.8, category: 'Молочные продукты' },
  { id: 'tvorog-9', name: 'Творог 9%', calories: 159, protein: 16.7, fat: 9.0, carbs: 2.0, category: 'Молочные продукты' },
  { id: 'smetana-10', name: 'Сметана 10%', calories: 115, protein: 3.0, fat: 10.0, carbs: 2.9, category: 'Молочные продукты' },
  { id: 'smetana-15', name: 'Сметана 15%', calories: 158, protein: 2.6, fat: 15.0, carbs: 3.0, category: 'Молочные продукты' },
  { id: 'smetana-20', name: 'Сметана 20%', calories: 206, protein: 2.8, fat: 20.0, carbs: 3.2, category: 'Молочные продукты' },
  { id: 'yogurt-naturalnyj', name: 'Йогурт натуральный', calories: 60, protein: 4.3, fat: 2.0, carbs: 6.2, category: 'Молочные продукты' },
  { id: 'yogurt-fruktovyj', name: 'Йогурт фруктовый', calories: 90, protein: 3.7, fat: 2.8, carbs: 12.0, category: 'Молочные продукты' },
  { id: 'syr-rossijskij', name: 'Сыр Российский', calories: 363, protein: 24.1, fat: 29.5, carbs: 0.3, category: 'Молочные продукты' },
  { id: 'syr-gollandskij', name: 'Сыр Голландский', calories: 352, protein: 26.0, fat: 27.3, carbs: 0.0, category: 'Молочные продукты' },
  { id: 'syr-adygejskij', name: 'Сыр Адыгейский', calories: 240, protein: 18.5, fat: 14.0, carbs: 0.0, category: 'Молочные продукты' },
  { id: 'syr-mocarella', name: 'Моцарелла', calories: 280, protein: 22.2, fat: 22.0, carbs: 0.7, category: 'Молочные продукты' },
  { id: 'syr-plavlenyj', name: 'Сыр плавленый', calories: 257, protein: 16.8, fat: 18.8, carbs: 5.0, category: 'Молочные продукты' },
  { id: 'maslo-slivochnoe', name: 'Масло сливочное 82.5%', calories: 748, protein: 0.5, fat: 82.5, carbs: 0.8, category: 'Молочные продукты' },
  { id: 'slivki-10', name: 'Сливки 10%', calories: 118, protein: 3.0, fat: 10.0, carbs: 4.0, category: 'Молочные продукты' },
  { id: 'slivki-20', name: 'Сливки 20%', calories: 205, protein: 2.8, fat: 20.0, carbs: 3.7, category: 'Молочные продукты' },
  { id: 'tvorozhok-glazur', name: 'Сырок глазированный', calories: 407, protein: 8.5, fat: 27.8, carbs: 32.0, category: 'Молочные продукты' },

  // ============================================================
  // Яйца
  // ============================================================
  { id: 'yajtso-kurinoe', name: 'Яйцо куриное (целое)', calories: 155, protein: 12.7, fat: 10.9, carbs: 0.7, category: 'Яйца' },
  { id: 'yajtso-belok', name: 'Яичный белок', calories: 48, protein: 11.1, fat: 0.0, carbs: 1.0, category: 'Яйца' },
  { id: 'yajtso-zheltok', name: 'Яичный желток', calories: 352, protein: 16.2, fat: 31.2, carbs: 1.0, category: 'Яйца' },
  { id: 'yajtso-perepelinoe', name: 'Яйцо перепелиное', calories: 168, protein: 11.9, fat: 13.1, carbs: 0.6, category: 'Яйца' },

  // ============================================================
  // Хлеб и выпечка
  // ============================================================
  { id: 'hleb-belyj', name: 'Хлеб белый пшеничный', calories: 266, protein: 8.1, fat: 1.0, carbs: 52.0, category: 'Хлеб и выпечка' },
  { id: 'hleb-rzhano-pshenichnyj', name: 'Хлеб ржано-пшеничный', calories: 224, protein: 7.0, fat: 1.2, carbs: 45.2, category: 'Хлеб и выпечка' },
  { id: 'hleb-borodinskij', name: 'Хлеб Бородинский', calories: 208, protein: 6.9, fat: 1.3, carbs: 40.9, category: 'Хлеб и выпечка' },
  { id: 'hleb-rzhanoj', name: 'Хлеб ржаной', calories: 174, protein: 6.6, fat: 1.2, carbs: 33.4, category: 'Хлеб и выпечка' },
  { id: 'hleb-zlakovyj', name: 'Хлеб зерновой', calories: 228, protein: 8.6, fat: 1.4, carbs: 45.1, category: 'Хлеб и выпечка' },
  { id: 'baton', name: 'Батон нарезной', calories: 264, protein: 7.5, fat: 2.9, carbs: 51.4, category: 'Хлеб и выпечка' },
  { id: 'lavash-tonkij', name: 'Лаваш тонкий', calories: 275, protein: 9.1, fat: 1.2, carbs: 56.8, category: 'Хлеб и выпечка' },
  { id: 'hlebcy', name: 'Хлебцы цельнозерновые', calories: 300, protein: 10.1, fat: 2.3, carbs: 57.1, category: 'Хлеб и выпечка' },
  { id: 'bulochka-sdoibnaya', name: 'Булочка сдобная', calories: 339, protein: 7.9, fat: 9.4, carbs: 55.5, category: 'Хлеб и выпечка' },
  { id: 'sushki', name: 'Сушки', calories: 330, protein: 10.8, fat: 1.2, carbs: 73.0, category: 'Хлеб и выпечка' },
  { id: 'suhari', name: 'Сухари пшеничные', calories: 331, protein: 11.2, fat: 1.4, carbs: 72.2, category: 'Хлеб и выпечка' },
  { id: 'bliny', name: 'Блины', calories: 233, protein: 6.1, fat: 12.3, carbs: 26.0, category: 'Хлеб и выпечка' },
  { id: 'pirog-s-myasom', name: 'Пирожок с мясом', calories: 280, protein: 13.0, fat: 10.0, carbs: 33.0, category: 'Хлеб и выпечка' },

  // ============================================================
  // Овощи
  // ============================================================
  { id: 'pomidor', name: 'Помидор', calories: 20, protein: 0.6, fat: 0.2, carbs: 4.2, category: 'Овощи' },
  { id: 'ogurets', name: 'Огурец', calories: 15, protein: 0.8, fat: 0.1, carbs: 2.8, category: 'Овощи' },
  { id: 'morkov', name: 'Морковь', calories: 35, protein: 1.3, fat: 0.1, carbs: 6.9, category: 'Овощи' },
  { id: 'kapusta-belokochannaya', name: 'Капуста белокочанная', calories: 27, protein: 1.8, fat: 0.1, carbs: 4.7, category: 'Овощи' },
  { id: 'kapusta-cvetnaya', name: 'Капуста цветная', calories: 30, protein: 2.5, fat: 0.3, carbs: 4.2, category: 'Овощи' },
  { id: 'kapusta-pekinskaya', name: 'Капуста пекинская', calories: 16, protein: 1.2, fat: 0.2, carbs: 2.0, category: 'Овощи' },
  { id: 'kartofel', name: 'Картофель', calories: 80, protein: 2.0, fat: 0.4, carbs: 16.3, category: 'Овощи' },
  { id: 'kartofel-otvarnoj', name: 'Картофель отварной', calories: 82, protein: 2.0, fat: 0.4, carbs: 16.7, category: 'Овощи' },
  { id: 'luk-repchatyj', name: 'Лук репчатый', calories: 41, protein: 1.4, fat: 0.0, carbs: 8.2, category: 'Овощи' },
  { id: 'luk-zelenyj', name: 'Лук зелёный', calories: 20, protein: 1.3, fat: 0.0, carbs: 3.2, category: 'Овощи' },
  { id: 'chesnok', name: 'Чеснок', calories: 143, protein: 6.5, fat: 0.5, carbs: 29.9, category: 'Овощи' },
  { id: 'perets-bolgarskij', name: 'Перец болгарский', calories: 27, protein: 1.3, fat: 0.0, carbs: 5.3, category: 'Овощи' },
  { id: 'svekla', name: 'Свёкла', calories: 42, protein: 1.5, fat: 0.1, carbs: 8.8, category: 'Овощи' },
  { id: 'svekla-otvarnaya', name: 'Свёкла отварная', calories: 49, protein: 1.8, fat: 0.0, carbs: 10.8, category: 'Овощи' },
  { id: 'brokkoli', name: 'Брокколи', calories: 34, protein: 2.8, fat: 0.4, carbs: 6.6, category: 'Овощи' },
  { id: 'kabachok', name: 'Кабачок', calories: 24, protein: 0.6, fat: 0.3, carbs: 4.6, category: 'Овощи' },
  { id: 'baklazhan', name: 'Баклажан', calories: 24, protein: 1.2, fat: 0.1, carbs: 4.5, category: 'Овощи' },
  { id: 'tykva', name: 'Тыква', calories: 28, protein: 1.3, fat: 0.3, carbs: 7.7, category: 'Овощи' },
  { id: 'redis', name: 'Редис', calories: 19, protein: 1.2, fat: 0.1, carbs: 3.4, category: 'Овощи' },
  { id: 'shpinat', name: 'Шпинат', calories: 23, protein: 2.9, fat: 0.3, carbs: 2.0, category: 'Овощи' },
  { id: 'salat-listovoj', name: 'Салат листовой', calories: 14, protein: 1.2, fat: 0.3, carbs: 1.3, category: 'Овощи' },
  { id: 'selderej-stebel', name: 'Сельдерей (стебель)', calories: 12, protein: 0.9, fat: 0.1, carbs: 2.1, category: 'Овощи' },
  { id: 'griby-shampinoiny', name: 'Шампиньоны', calories: 27, protein: 4.3, fat: 1.0, carbs: 0.1, category: 'Овощи' },
  { id: 'kukuruza-konserv', name: 'Кукуруза консервированная', calories: 58, protein: 2.2, fat: 0.4, carbs: 11.2, category: 'Овощи' },
  { id: 'goroshek-zelenyj', name: 'Горошек зелёный', calories: 73, protein: 5.0, fat: 0.2, carbs: 13.8, category: 'Овощи' },
  { id: 'fasol-struchkovaya', name: 'Фасоль стручковая', calories: 24, protein: 2.0, fat: 0.2, carbs: 3.6, category: 'Овощи' },

  // ============================================================
  // Фрукты и ягоды
  // ============================================================
  { id: 'yabloko', name: 'Яблоко', calories: 47, protein: 0.4, fat: 0.4, carbs: 9.8, category: 'Фрукты и ягоды' },
  { id: 'banan', name: 'Банан', calories: 95, protein: 1.5, fat: 0.2, carbs: 21.8, category: 'Фрукты и ягоды' },
  { id: 'apelsin', name: 'Апельсин', calories: 43, protein: 0.9, fat: 0.2, carbs: 8.1, category: 'Фрукты и ягоды' },
  { id: 'mandarin', name: 'Мандарин', calories: 38, protein: 0.8, fat: 0.2, carbs: 7.5, category: 'Фрукты и ягоды' },
  { id: 'grejpfrut', name: 'Грейпфрут', calories: 35, protein: 0.7, fat: 0.2, carbs: 6.5, category: 'Фрукты и ягоды' },
  { id: 'grusha', name: 'Груша', calories: 42, protein: 0.4, fat: 0.3, carbs: 10.9, category: 'Фрукты и ягоды' },
  { id: 'persik', name: 'Персик', calories: 45, protein: 0.9, fat: 0.1, carbs: 9.5, category: 'Фрукты и ягоды' },
  { id: 'abrikos', name: 'Абрикос', calories: 44, protein: 0.9, fat: 0.1, carbs: 9.0, category: 'Фрукты и ягоды' },
  { id: 'sliva', name: 'Слива', calories: 49, protein: 0.8, fat: 0.3, carbs: 9.6, category: 'Фрукты и ягоды' },
  { id: 'vinograd', name: 'Виноград', calories: 65, protein: 0.6, fat: 0.2, carbs: 15.4, category: 'Фрукты и ягоды' },
  { id: 'kivi', name: 'Киви', calories: 48, protein: 1.0, fat: 0.6, carbs: 10.3, category: 'Фрукты и ягоды' },
  { id: 'ananas', name: 'Ананас', calories: 52, protein: 0.3, fat: 0.1, carbs: 11.8, category: 'Фрукты и ягоды' },
  { id: 'arbuz', name: 'Арбуз', calories: 27, protein: 0.6, fat: 0.1, carbs: 5.8, category: 'Фрукты и ягоды' },
  { id: 'dynya', name: 'Дыня', calories: 35, protein: 0.6, fat: 0.3, carbs: 7.4, category: 'Фрукты и ягоды' },
  { id: 'klubnika', name: 'Клубника', calories: 36, protein: 0.8, fat: 0.4, carbs: 7.5, category: 'Фрукты и ягоды' },
  { id: 'malina', name: 'Малина', calories: 46, protein: 0.8, fat: 0.5, carbs: 8.3, category: 'Фрукты и ягоды' },
  { id: 'chernika', name: 'Черника', calories: 44, protein: 1.1, fat: 0.6, carbs: 7.6, category: 'Фрукты и ягоды' },
  { id: 'vishnya', name: 'Вишня', calories: 52, protein: 0.8, fat: 0.5, carbs: 10.6, category: 'Фрукты и ягоды' },
  { id: 'granat', name: 'Гранат', calories: 72, protein: 0.7, fat: 0.6, carbs: 14.5, category: 'Фрукты и ягоды' },
  { id: 'hurma', name: 'Хурма', calories: 67, protein: 0.5, fat: 0.4, carbs: 15.3, category: 'Фрукты и ягоды' },
  { id: 'avokado', name: 'Авокадо', calories: 160, protein: 2.0, fat: 14.7, carbs: 1.8, category: 'Фрукты и ягоды' },
  { id: 'limon', name: 'Лимон', calories: 34, protein: 0.9, fat: 0.1, carbs: 3.0, category: 'Фрукты и ягоды' },

  // ============================================================
  // Орехи и семена
  // ============================================================
  { id: 'mindal', name: 'Миндаль', calories: 609, protein: 18.6, fat: 53.7, carbs: 13.0, category: 'Орехи и семена' },
  { id: 'gretskij-oreh', name: 'Грецкий орех', calories: 654, protein: 15.2, fat: 65.2, carbs: 7.0, category: 'Орехи и семена' },
  { id: 'funduk', name: 'Фундук', calories: 651, protein: 15.0, fat: 61.5, carbs: 9.4, category: 'Орехи и семена' },
  { id: 'arahis', name: 'Арахис', calories: 567, protein: 26.3, fat: 45.2, carbs: 9.9, category: 'Орехи и семена' },
  { id: 'kashiu', name: 'Кешью', calories: 572, protein: 18.5, fat: 43.8, carbs: 22.5, category: 'Орехи и семена' },
  { id: 'kedrovyj-oreh', name: 'Кедровый орех', calories: 673, protein: 13.7, fat: 68.4, carbs: 13.1, category: 'Орехи и семена' },
  { id: 'fistashki', name: 'Фисташки', calories: 556, protein: 20.0, fat: 45.3, carbs: 16.6, category: 'Орехи и семена' },
  { id: 'semechki-podsolnuh', name: 'Семечки подсолнуха', calories: 578, protein: 20.7, fat: 52.9, carbs: 10.5, category: 'Орехи и семена' },
  { id: 'semena-lna', name: 'Семена льна', calories: 534, protein: 18.3, fat: 42.2, carbs: 1.6, category: 'Орехи и семена' },
  { id: 'semena-chia', name: 'Семена чиа', calories: 486, protein: 16.5, fat: 30.7, carbs: 7.7, category: 'Орехи и семена' },
  { id: 'semena-tykvy', name: 'Тыквенные семечки', calories: 559, protein: 30.2, fat: 49.1, carbs: 4.7, category: 'Орехи и семена' },
  { id: 'semena-kunzhut', name: 'Кунжут', calories: 573, protein: 17.7, fat: 49.7, carbs: 12.2, category: 'Орехи и семена' },

  // ============================================================
  // Масла и жиры
  // ============================================================
  { id: 'maslo-olivkovoe', name: 'Масло оливковое', calories: 898, protein: 0.0, fat: 99.8, carbs: 0.0, category: 'Масла и жиры' },
  { id: 'maslo-podsolnechnoe', name: 'Масло подсолнечное', calories: 899, protein: 0.0, fat: 99.9, carbs: 0.0, category: 'Масла и жиры' },
  { id: 'maslo-lnyanoe', name: 'Масло льняное', calories: 898, protein: 0.0, fat: 99.8, carbs: 0.0, category: 'Масла и жиры' },
  { id: 'maslo-kokosovoe', name: 'Масло кокосовое', calories: 892, protein: 0.0, fat: 99.0, carbs: 0.0, category: 'Масла и жиры' },
  { id: 'majonez-67', name: 'Майонез 67%', calories: 624, protein: 2.8, fat: 67.0, carbs: 3.7, category: 'Масла и жиры' },
  { id: 'majonez-legkij', name: 'Майонез лёгкий 30%', calories: 310, protein: 1.0, fat: 30.0, carbs: 7.5, category: 'Масла и жиры' },

  // ============================================================
  // Напитки
  // ============================================================
  { id: 'chaj-bez-sahara', name: 'Чай без сахара', calories: 1, protein: 0.0, fat: 0.0, carbs: 0.3, category: 'Напитки' },
  { id: 'chaj-s-saharom', name: 'Чай с сахаром (1 ч.л.)', calories: 28, protein: 0.0, fat: 0.0, carbs: 7.0, category: 'Напитки' },
  { id: 'kofe-chernyj', name: 'Кофе чёрный без сахара', calories: 2, protein: 0.3, fat: 0.0, carbs: 0.0, category: 'Напитки' },
  { id: 'kofe-s-molokom', name: 'Кофе с молоком', calories: 34, protein: 1.4, fat: 1.4, carbs: 3.3, category: 'Напитки' },
  { id: 'kapuchino', name: 'Капучино', calories: 45, protein: 2.4, fat: 2.0, carbs: 4.3, category: 'Напитки' },
  { id: 'latte', name: 'Латте', calories: 64, protein: 3.2, fat: 3.5, carbs: 5.0, category: 'Напитки' },
  { id: 'sok-apelsinovyj', name: 'Сок апельсиновый', calories: 45, protein: 0.7, fat: 0.1, carbs: 10.4, category: 'Напитки' },
  { id: 'sok-yablochnyj', name: 'Сок яблочный', calories: 46, protein: 0.5, fat: 0.1, carbs: 10.1, category: 'Напитки' },
  { id: 'sok-tomatnyj', name: 'Сок томатный', calories: 21, protein: 1.1, fat: 0.2, carbs: 3.8, category: 'Напитки' },
  { id: 'kompot', name: 'Компот из сухофруктов', calories: 60, protein: 0.8, fat: 0.0, carbs: 14.2, category: 'Напитки' },
  { id: 'mors-klyukvennyj', name: 'Морс клюквенный', calories: 36, protein: 0.0, fat: 0.0, carbs: 8.0, category: 'Напитки' },
  { id: 'kakao-na-moloke', name: 'Какао на молоке', calories: 85, protein: 3.2, fat: 3.8, carbs: 10.2, category: 'Напитки' },
  { id: 'kvas', name: 'Квас хлебный', calories: 27, protein: 0.2, fat: 0.0, carbs: 5.2, category: 'Напитки' },
  { id: 'limonad', name: 'Лимонад', calories: 40, protein: 0.0, fat: 0.0, carbs: 10.0, category: 'Напитки' },
  { id: 'voda-mineralnaya', name: 'Вода минеральная', calories: 0, protein: 0.0, fat: 0.0, carbs: 0.0, category: 'Напитки' },

  // ============================================================
  // Сладости
  // ============================================================
  { id: 'shokolad-molochnyj', name: 'Шоколад молочный', calories: 550, protein: 6.9, fat: 35.7, carbs: 54.4, category: 'Сладости' },
  { id: 'shokolad-gorzkij', name: 'Шоколад горький (70%)', calories: 539, protein: 6.2, fat: 35.4, carbs: 48.2, category: 'Сладости' },
  { id: 'shokolad-belyj', name: 'Шоколад белый', calories: 541, protein: 4.2, fat: 30.4, carbs: 62.2, category: 'Сладости' },
  { id: 'konfety-karamel', name: 'Конфеты карамель', calories: 378, protein: 0.0, fat: 1.0, carbs: 92.0, category: 'Сладости' },
  { id: 'konfety-shokoladnye', name: 'Конфеты шоколадные', calories: 530, protein: 4.0, fat: 30.0, carbs: 57.0, category: 'Сладости' },
  { id: 'pechene-ovsyanoe', name: 'Печенье овсяное', calories: 437, protein: 6.5, fat: 14.4, carbs: 71.8, category: 'Сладости' },
  { id: 'pechene-saharnoe', name: 'Печенье сахарное', calories: 458, protein: 7.5, fat: 11.8, carbs: 74.9, category: 'Сладости' },
  { id: 'pryanik', name: 'Пряник', calories: 350, protein: 4.8, fat: 2.8, carbs: 77.7, category: 'Сладости' },
  { id: 'zefir', name: 'Зефир', calories: 304, protein: 0.8, fat: 0.0, carbs: 78.5, category: 'Сладости' },
  { id: 'pastila', name: 'Пастила', calories: 310, protein: 0.5, fat: 0.0, carbs: 80.4, category: 'Сладости' },
  { id: 'marmelad', name: 'Мармелад', calories: 296, protein: 0.4, fat: 0.1, carbs: 76.6, category: 'Сладости' },
  { id: 'med', name: 'Мёд', calories: 329, protein: 0.8, fat: 0.0, carbs: 81.5, category: 'Сладости' },
  { id: 'varenie', name: 'Варенье', calories: 271, protein: 0.3, fat: 0.3, carbs: 70.9, category: 'Сладости' },
  { id: 'sgushchyonka', name: 'Сгущёнка', calories: 320, protein: 7.2, fat: 8.5, carbs: 55.5, category: 'Сладости' },
  { id: 'morozhenoe-plombir', name: 'Мороженое пломбир', calories: 227, protein: 3.7, fat: 13.0, carbs: 23.0, category: 'Сладости' },
  { id: 'tort-napoleon', name: 'Торт «Наполеон»', calories: 370, protein: 5.5, fat: 21.0, carbs: 39.5, category: 'Сладости' },
  { id: 'khalva', name: 'Халва подсолнечная', calories: 523, protein: 11.6, fat: 29.7, carbs: 54.0, category: 'Сладости' },
  { id: 'sahar-pesok', name: 'Сахар-песок', calories: 399, protein: 0.0, fat: 0.0, carbs: 99.7, category: 'Сладости' },

  // ============================================================
  // Супы
  // ============================================================
  { id: 'borshch', name: 'Борщ', calories: 49, protein: 1.1, fat: 2.2, carbs: 6.7, category: 'Супы' },
  { id: 'shchi', name: 'Щи из свежей капусты', calories: 31, protein: 1.0, fat: 2.1, carbs: 3.1, category: 'Супы' },
  { id: 'sup-kurinyj', name: 'Суп куриный с лапшой', calories: 36, protein: 3.2, fat: 1.4, carbs: 3.2, category: 'Супы' },
  { id: 'solyanka', name: 'Солянка мясная', calories: 73, protein: 5.2, fat: 3.6, carbs: 4.3, category: 'Супы' },
  { id: 'rassoljnik', name: 'Рассольник', calories: 42, protein: 1.4, fat: 2.0, carbs: 5.0, category: 'Супы' },
  { id: 'uha', name: 'Уха', calories: 46, protein: 3.4, fat: 1.0, carbs: 5.5, category: 'Супы' },
  { id: 'sup-gorohovyj', name: 'Суп гороховый', calories: 66, protein: 4.4, fat: 2.4, carbs: 8.9, category: 'Супы' },
  { id: 'sup-gribnoj', name: 'Суп грибной', calories: 34, protein: 1.6, fat: 1.8, carbs: 3.2, category: 'Супы' },
  { id: 'sup-pyure-tykva', name: 'Суп-пюре из тыквы', calories: 38, protein: 1.2, fat: 1.5, carbs: 5.6, category: 'Супы' },
  { id: 'svekolnik', name: 'Свекольник холодный', calories: 36, protein: 0.5, fat: 2.0, carbs: 4.2, category: 'Супы' },
  { id: 'okroshka', name: 'Окрошка на кефире', calories: 52, protein: 2.1, fat: 1.4, carbs: 7.7, category: 'Супы' },

  // ============================================================
  // Готовые блюда
  // ============================================================
  { id: 'pelmeni', name: 'Пельмени', calories: 275, protein: 11.9, fat: 12.4, carbs: 29.0, category: 'Готовые блюда' },
  { id: 'vareniki-tvorog', name: 'Вареники с творогом', calories: 203, protein: 10.8, fat: 3.6, carbs: 28.7, category: 'Готовые блюда' },
  { id: 'vareniki-kartoshka', name: 'Вареники с картошкой', calories: 148, protein: 3.7, fat: 3.8, carbs: 25.3, category: 'Готовые блюда' },
  { id: 'syrniki', name: 'Сырники из творога', calories: 183, protein: 18.6, fat: 3.6, carbs: 18.2, category: 'Готовые блюда' },
  { id: 'yaichnitsa', name: 'Яичница из 2 яиц', calories: 174, protein: 11.9, fat: 13.0, carbs: 0.7, category: 'Готовые блюда' },
  { id: 'omlet', name: 'Омлет', calories: 184, protein: 9.6, fat: 15.4, carbs: 1.9, category: 'Готовые блюда' },
  { id: 'kotlety-govyazhi', name: 'Котлеты говяжьи', calories: 220, protein: 14.6, fat: 11.8, carbs: 13.6, category: 'Готовые блюда' },
  { id: 'kotlety-kurinye', name: 'Котлеты куриные', calories: 190, protein: 18.0, fat: 10.4, carbs: 4.2, category: 'Готовые блюда' },
  { id: 'golubtsy', name: 'Голубцы', calories: 97, protein: 7.1, fat: 4.7, carbs: 6.7, category: 'Готовые блюда' },
  { id: 'plov', name: 'Плов с курицей', calories: 150, protein: 10.2, fat: 6.2, carbs: 14.9, category: 'Готовые блюда' },
  { id: 'plov-govyadina', name: 'Плов с говядиной', calories: 166, protein: 8.4, fat: 7.4, carbs: 16.5, category: 'Готовые блюда' },
  { id: 'makarony-otvar', name: 'Макароны отварные', calories: 112, protein: 3.5, fat: 0.4, carbs: 23.2, category: 'Готовые блюда' },
  { id: 'makarony-po-flotski', name: 'Макароны по-флотски', calories: 180, protein: 10.0, fat: 6.0, carbs: 20.0, category: 'Готовые блюда' },
  { id: 'kartofelnoe-pyure', name: 'Картофельное пюре', calories: 106, protein: 2.5, fat: 4.2, carbs: 14.7, category: 'Готовые блюда' },
  { id: 'kartoshka-zharenaya', name: 'Картошка жареная', calories: 192, protein: 2.8, fat: 9.5, carbs: 23.4, category: 'Готовые блюда' },
  { id: 'kartofel-fri', name: 'Картофель фри', calories: 312, protein: 3.4, fat: 15.0, carbs: 41.4, category: 'Готовые блюда' },
  { id: 'vinegret', name: 'Винегрет', calories: 76, protein: 1.7, fat: 4.5, carbs: 6.7, category: 'Готовые блюда' },
  { id: 'salat-olivie', name: 'Салат «Оливье»', calories: 198, protein: 5.5, fat: 16.0, carbs: 7.8, category: 'Готовые блюда' },
  { id: 'salat-cezar', name: 'Салат «Цезарь»', calories: 175, protein: 14.8, fat: 10.0, carbs: 5.5, category: 'Готовые блюда' },
  { id: 'ovoshchi-na-paru', name: 'Овощи на пару', calories: 30, protein: 1.5, fat: 0.1, carbs: 6.0, category: 'Готовые блюда' },
  { id: 'tushyonaya-kapusta', name: 'Тушёная капуста', calories: 75, protein: 2.0, fat: 3.3, carbs: 9.4, category: 'Готовые блюда' },
  { id: 'ryba-zharenaya', name: 'Рыба жареная (минтай)', calories: 137, protein: 14.7, fat: 5.5, carbs: 7.4, category: 'Готовые блюда' },
  { id: 'ryba-zapechennaya', name: 'Рыба запечённая', calories: 102, protein: 17.3, fat: 3.2, carbs: 1.2, category: 'Готовые блюда' },
  { id: 'kuritsa-zapechennaya', name: 'Курица запечённая', calories: 164, protein: 25.0, fat: 7.4, carbs: 0.0, category: 'Готовые блюда' },
  { id: 'kuritsa-tushenaya', name: 'Курица тушёная', calories: 143, protein: 21.0, fat: 5.7, carbs: 1.5, category: 'Готовые блюда' },
  { id: 'draniki', name: 'Драники', calories: 188, protein: 4.7, fat: 10.2, carbs: 20.5, category: 'Готовые блюда' },
  { id: 'chebureki', name: 'Чебуреки', calories: 279, protein: 10.0, fat: 13.0, carbs: 28.0, category: 'Готовые блюда' },
  { id: 'blinchiki-s-myasom', name: 'Блинчики с мясом', calories: 194, protein: 11.0, fat: 7.2, carbs: 18.4, category: 'Готовые блюда' },
  { id: 'blinchiki-s-tvorogom', name: 'Блинчики с творогом', calories: 196, protein: 10.6, fat: 6.8, carbs: 22.0, category: 'Готовые блюда' },
  { id: 'zapekanka-tvorozhnaya', name: 'Запеканка творожная', calories: 168, protein: 17.6, fat: 4.2, carbs: 14.2, category: 'Готовые блюда' },

  // ============================================================
  // Бобовые и макароны (дополнение)
  // ============================================================
  { id: 'chechevitsa', name: 'Чечевица (крупа)', calories: 295, protein: 24.0, fat: 1.5, carbs: 46.3, category: 'Крупы и каши' },
  { id: 'fasol-belaya', name: 'Фасоль белая (крупа)', calories: 298, protein: 21.0, fat: 2.0, carbs: 47.0, category: 'Крупы и каши' },
  { id: 'goroh', name: 'Горох (крупа)', calories: 299, protein: 20.5, fat: 2.0, carbs: 49.5, category: 'Крупы и каши' },
  { id: 'nut', name: 'Нут (крупа)', calories: 309, protein: 20.1, fat: 4.3, carbs: 46.2, category: 'Крупы и каши' },
  { id: 'makarony-suhie', name: 'Макароны (сухие)', calories: 338, protein: 10.4, fat: 1.1, carbs: 71.5, category: 'Крупы и каши' },

  // ============================================================
  // Сухофрукты (дополнение к фруктам)
  // ============================================================
  { id: 'kuraga', name: 'Курага', calories: 215, protein: 5.2, fat: 0.3, carbs: 51.0, category: 'Фрукты и ягоды' },
  { id: 'izyum', name: 'Изюм', calories: 264, protein: 2.9, fat: 0.6, carbs: 66.0, category: 'Фрукты и ягоды' },
  { id: 'chernosliv', name: 'Чернослив', calories: 256, protein: 2.3, fat: 0.7, carbs: 57.5, category: 'Фрукты и ягоды' },
  { id: 'finiki', name: 'Финики', calories: 274, protein: 2.5, fat: 0.5, carbs: 69.2, category: 'Фрукты и ягоды' },
];

export const FOOD_CATEGORIES: string[] = [
  ...new Set(FOODS.map((food) => food.category)),
];
