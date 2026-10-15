// i18n store: en/zh dictionaries + reactive lang. Terminal chrome (C:\>, [OK],
// whoami, paths), project data and proper nouns stay English in both modes.

const en = {
  'meta.title': 'Daniel Kebaili — Software Engineer',
  'meta.description':
    'Daniel Kebaili — software engineer portfolio. Cybersecurity, data engineering, full-stack systems.',
  'hero.role': 'Software Engineer',
  'hero.explore': 'Explore Work',
  'hero.scroll': 'scroll',
  'heading.work': 'Selected Work',
  'heading.about': 'About',
  'heading.contact': 'Contact',
  'about.education': 'education',
  'about.interests': 'areas of interest',
  'about.bio': [
    'Hi, I am Daniel Kebaili. I am studying my BSc in Computer Science and Advanced Technologies at University of Portsmouth. Cybersecurity is where I am heading — a genuine passion and the career I intend to pursue.',
    'I have hands-on experience with PyTorch and TensorFlow for developing and experimenting with neural networks, along with practical knowledge of data workflows using Python, NumPy, pandas, and scikit-learn. I also have a passion for tinkering with web applications frameworks, both frontend and backend. Deployment and containerisation are areas I am knowledgeable to some extent, but I am always discovering new techniques.',
    'Most of my work so far spans data engineering, software engineering, and machine learning — but alongside those, my focus now is cybersecurity.'
  ],
  'about.stats': [
    { label: 'focus', value: 'Cybersecurity' },
    { label: 'based', value: 'Portsmouth' },
    { label: 'mode', value: 'Hybrid, or Remote' }
  ],
  'about.educationList': [
    {
      degree: 'BSc (Hons) Computer Science and Advanced Technologies',
      school: 'University of Portsmouth',
      years: '2026 — 2027'
    },
    { degree: 'HND System Analysis and Development', school: 'UNISEPE', years: '2019 — 2022' }
  ],
  'about.stackGroups': ['Data & ML', 'Backend', 'Languages'],
  'about.interestsList': ['Cybersecurity', 'Cloud Infrastructure', 'Data Engineering', 'Full-Stack Systems'],
  'contact.hint': '// find me elsewhere',
  'contact.name': 'name',
  'contact.email': 'email',
  'contact.message': 'message',
  'contact.send': 'send_message',
  'contact.sending': 'sending...',
  'contact.validating': 'validating...',
  'contact.queued': 'message queued',
  'contact.thanks': 'thanks — I read everything.',
  'contact.continue': 'continue:',
  'form.name_required': 'name is required',
  'form.email_invalid': 'valid email is required',
  'form.message_required': 'message is required',
  'form.send_failed': 'send failed',
  'form.try_again': 'try again',
  'form.network_error': 'network error — try again',
  'error.lost': 'Lost in the matrix.',
  'error.back': '← Back to reality'
};

const zh = {
  'meta.title': 'Daniel Kebaili — 软件工程师',
  'meta.description': 'Daniel Kebaili — 软件工程师个人主页。网络安全、数据工程、全栈系统。',
  'hero.role': '软件工程师',
  'hero.explore': '查看项目',
  'hero.scroll': '下滑',
  'heading.work': '精选项目',
  'heading.about': '关于',
  'heading.contact': '联系',
  'about.education': '教育经历',
  'about.interests': '兴趣方向',
  'about.bio': [
    '你好，我是 Daniel Kebaili，目前在朴茨茅斯大学攻读计算机科学与先进技术学士学位（BSc）。网络安全是我的方向——真正的热爱，也是我决心投身的职业。',
    '我有使用 PyTorch 和 TensorFlow 开发和实验神经网络的实战经验，也熟悉用 Python、NumPy、pandas 和 scikit-learn 构建数据工作流。同时热衷于折腾前后端 Web 应用框架。部署与容器化也有一定了解，并且一直在探索新技术。',
    '到目前为止，我的工作涵盖数据工程、软件工程和机器学习——但接下来，我的重心是网络安全。'
  ],
  'about.stats': [
    { label: '方向', value: '网络安全' },
    { label: '坐标', value: '朴茨茅斯' },
    { label: '方式', value: '混合或远程' }
  ],
  'about.educationList': [
    { degree: '计算机科学与先进技术（荣誉）理学士', school: '朴茨茅斯大学', years: '2026 — 2027' },
    { degree: '系统分析与开发 HND', school: 'UNISEPE', years: '2019 — 2022' }
  ],
  'about.stackGroups': ['数据与 ML', '后端', '编程语言'],
  'about.interestsList': ['网络安全', '云基础设施', '数据工程', '全栈系统'],
  'contact.hint': '// 其他地方找我',
  'contact.name': '姓名',
  'contact.email': '邮箱',
  'contact.message': '消息',
  'contact.send': '发送消息',
  'contact.sending': '发送中...',
  'contact.validating': '校验中...',
  'contact.queued': '消息已排队',
  'contact.thanks': '谢谢——每条消息我都会读。',
  'contact.continue': '继续：',
  'form.name_required': '请填写姓名',
  'form.email_invalid': '请填写有效邮箱',
  'form.message_required': '请填写消息',
  'form.send_failed': '发送失败',
  'form.try_again': '请重试',
  'form.network_error': '网络错误——请重试',
  'error.lost': '在矩阵中迷路了。',
  'error.back': '← 回到现实'
};

export const dicts = { en, zh };

let lang = $state('en');

export function getLang() {
  return lang;
}

/** @param {'en' | 'zh'} l */
export function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
}

/** First visit: zh navigator → zh; stored choice always wins. */
export function initLang() {
  const stored = localStorage.getItem('lang');
  if (stored === 'zh' || stored === 'en') lang = stored;
  else if (navigator.language?.startsWith('zh')) lang = 'zh';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

/**
 * @param {string} key
 * @returns {any}
 */
export function t(key) {
  return dicts[lang][key] ?? key;
}
