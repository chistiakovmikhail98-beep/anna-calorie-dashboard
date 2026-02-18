import { HealthTestType } from '../types';

export interface TestQuestion {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

export interface HealthTest {
  type: HealthTestType;
  title: string;
  description: string;
  icon: string;
  questions: TestQuestion[];
  scoring: { min: number; max: number; level: string; description: string }[];
}

const SCALE_OPTIONS = [
  { value: 5, label: 'Никогда' },
  { value: 4, label: 'Редко' },
  { value: 3, label: 'Иногда' },
  { value: 2, label: 'Часто' },
  { value: 1, label: 'Постоянно' },
];

export const HEALTH_TESTS: HealthTest[] = [
  {
    type: 'digestive',
    title: 'Пищеварительная система',
    description: 'Оцените состояние вашего ЖКТ',
    icon: 'Stethoscope',
    questions: [
      { id: 'dig-1', text: 'Как часто вас беспокоит вздутие живота?', options: SCALE_OPTIONS },
      { id: 'dig-2', text: 'Бывает ли у вас изжога или отрыжка?', options: SCALE_OPTIONS },
      { id: 'dig-3', text: 'Есть ли проблемы со стулом (запор/диарея)?', options: SCALE_OPTIONS },
      { id: 'dig-4', text: 'Чувствуете ли тяжесть после еды?', options: SCALE_OPTIONS },
      { id: 'dig-5', text: 'Беспокоит ли тошнота?', options: SCALE_OPTIONS },
      { id: 'dig-6', text: 'Есть ли боли в животе?', options: SCALE_OPTIONS },
      { id: 'dig-7', text: 'Замечаете ли непереносимость каких-либо продуктов?', options: SCALE_OPTIONS },
      { id: 'dig-8', text: 'Есть ли неприятный запах изо рта?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Требует внимания', description: 'Рекомендуется консультация специалиста' },
      { min: 51, max: 75, level: 'Есть нюансы', description: 'Обратите внимание на питание и режим' },
      { min: 76, max: 100, level: 'Отлично', description: 'Пищеварение в хорошем состоянии' },
    ],
  },
  {
    type: 'hormonal',
    title: 'Гормональная система',
    description: 'Проверьте гормональный баланс',
    icon: 'Sparkles',
    questions: [
      { id: 'hor-1', text: 'Бывают ли перепады настроения?', options: SCALE_OPTIONS },
      { id: 'hor-2', text: 'Есть ли проблемы с кожей (акне, сухость)?', options: SCALE_OPTIONS },
      { id: 'hor-3', text: 'Замечаете ли выпадение волос?', options: SCALE_OPTIONS },
      { id: 'hor-4', text: 'Бывает ли беспричинная усталость?', options: SCALE_OPTIONS },
      { id: 'hor-5', text: 'Есть ли проблемы с весом (набор/потеря)?', options: SCALE_OPTIONS },
      { id: 'hor-6', text: 'Нарушен ли менструальный цикл?', options: SCALE_OPTIONS },
      { id: 'hor-7', text: 'Беспокоит ли потливость?', options: SCALE_OPTIONS },
      { id: 'hor-8', text: 'Есть ли снижение либидо?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Требует внимания', description: 'Рекомендуется проверить гормоны' },
      { min: 51, max: 75, level: 'Есть нюансы', description: 'Следите за питанием и режимом сна' },
      { min: 76, max: 100, level: 'Отлично', description: 'Гормональный фон стабилен' },
    ],
  },
  {
    type: 'stress',
    title: 'Нервная система и стресс',
    description: 'Оцените уровень стресса',
    icon: 'Brain',
    questions: [
      { id: 'str-1', text: 'Как часто вы чувствуете тревогу?', options: SCALE_OPTIONS },
      { id: 'str-2', text: 'Есть ли проблемы со сном?', options: SCALE_OPTIONS },
      { id: 'str-3', text: 'Бывает ли раздражительность?', options: SCALE_OPTIONS },
      { id: 'str-4', text: 'Трудно ли сосредоточиться?', options: SCALE_OPTIONS },
      { id: 'str-5', text: 'Есть ли головные боли?', options: SCALE_OPTIONS },
      { id: 'str-6', text: 'Чувствуете ли эмоциональное выгорание?', options: SCALE_OPTIONS },
      { id: 'str-7', text: 'Есть ли тяга к сладкому/алкоголю при стрессе?', options: SCALE_OPTIONS },
      { id: 'str-8', text: 'Бывает ли мышечное напряжение (шея, плечи)?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Высокий стресс', description: 'Необходимо снизить нагрузку' },
      { min: 51, max: 75, level: 'Умеренный стресс', description: 'Добавьте практики расслабления' },
      { min: 76, max: 100, level: 'Низкий стресс', description: 'Вы отлично справляетесь' },
    ],
  },
  {
    type: 'immunity',
    title: 'Иммунная система',
    description: 'Проверьте состояние иммунитета',
    icon: 'Shield',
    questions: [
      { id: 'imm-1', text: 'Как часто вы болеете простудой?', options: SCALE_OPTIONS },
      { id: 'imm-2', text: 'Долго ли заживают порезы/ранки?', options: SCALE_OPTIONS },
      { id: 'imm-3', text: 'Бывают ли аллергические реакции?', options: SCALE_OPTIONS },
      { id: 'imm-4', text: 'Есть ли хроническая усталость?', options: SCALE_OPTIONS },
      { id: 'imm-5', text: 'Бывают ли высыпания на коже?', options: SCALE_OPTIONS },
      { id: 'imm-6', text: 'Есть ли проблемы с дёснами?', options: SCALE_OPTIONS },
      { id: 'imm-7', text: 'Беспокоит ли грибок (ногти, кожа)?', options: SCALE_OPTIONS },
      { id: 'imm-8', text: 'Часто ли появляется герпес?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Ослабленный', description: 'Иммунитет требует поддержки' },
      { min: 51, max: 75, level: 'Нормальный', description: 'Поддерживайте здоровый образ жизни' },
      { min: 76, max: 100, level: 'Крепкий', description: 'Иммунная система в порядке' },
    ],
  },
  {
    type: 'detox',
    title: 'Детокс и печень',
    description: 'Оцените работу систем детоксикации',
    icon: 'Leaf',
    questions: [
      { id: 'det-1', text: 'Есть ли отёки (лицо, ноги)?', options: SCALE_OPTIONS },
      { id: 'det-2', text: 'Беспокоит ли горечь во рту?', options: SCALE_OPTIONS },
      { id: 'det-3', text: 'Есть ли тяжесть в правом подреберье?', options: SCALE_OPTIONS },
      { id: 'det-4', text: 'Замечаете ли желтоватый оттенок кожи?', options: SCALE_OPTIONS },
      { id: 'det-5', text: 'Есть ли тёмные круги под глазами?', options: SCALE_OPTIONS },
      { id: 'det-6', text: 'Бывает ли неприятный запах тела?', options: SCALE_OPTIONS },
      { id: 'det-7', text: 'Есть ли чувствительность к алкоголю/кофе?', options: SCALE_OPTIONS },
      { id: 'det-8', text: 'Беспокоит ли целлюлит?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Требует внимания', description: 'Поддержите печень и детокс' },
      { min: 51, max: 75, level: 'Есть нюансы', description: 'Увеличьте овощи и воду в рационе' },
      { min: 76, max: 100, level: 'Отлично', description: 'Системы детоксикации работают хорошо' },
    ],
  },
  {
    type: 'cardiovascular',
    title: 'Сердечно-сосудистая система',
    description: 'Проверьте здоровье сердца и сосудов',
    icon: 'HeartPulse',
    questions: [
      { id: 'car-1', text: 'Бывает ли одышка при нагрузке?', options: SCALE_OPTIONS },
      { id: 'car-2', text: 'Есть ли учащённое сердцебиение?', options: SCALE_OPTIONS },
      { id: 'car-3', text: 'Бывают ли головокружения?', options: SCALE_OPTIONS },
      { id: 'car-4', text: 'Есть ли отёки ног к вечеру?', options: SCALE_OPTIONS },
      { id: 'car-5', text: 'Беспокоит ли повышенное давление?', options: SCALE_OPTIONS },
      { id: 'car-6', text: 'Бывают ли боли в груди?', options: SCALE_OPTIONS },
      { id: 'car-7', text: 'Замечаете ли сосудистые звёздочки?', options: SCALE_OPTIONS },
      { id: 'car-8', text: 'Мёрзнут ли руки и ноги?', options: SCALE_OPTIONS },
    ],
    scoring: [
      { min: 0, max: 50, level: 'Требует внимания', description: 'Рекомендуется проверка у кардиолога' },
      { min: 51, max: 75, level: 'Есть нюансы', description: 'Увеличьте кардио-нагрузку' },
      { min: 76, max: 100, level: 'Отлично', description: 'Сердечно-сосудистая система в норме' },
    ],
  },
];
