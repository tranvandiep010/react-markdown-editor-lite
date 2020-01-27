import enUS from './lang/en-US';
import zhCN from './lang/zh-CN';
import emitter from 'share/emitter';

type LangItem = { [x: string]: string };
type Langs = { [x: string]: LangItem };

class I18n {
  private langs: Langs = { enUS, zhCN };
  private current: string = 'enUS';
  constructor() {
    let locale = 'enUS';
    // 检测语言
    if (navigator.language) {
      const it = navigator.language.split('-');
      locale = it[0];
      if (it.length !== 1) {
        locale += it[it.length - 1].toUpperCase();
      }
    }

    // IE10及更低版本使用browserLanguage
    if (navigator.browserLanguage) {
      const it = navigator.browserLanguage.split('-');
      locale = it[0];
      if (it[1]) {
        locale += it[1].toUpperCase();
      }
    }

    if (this.isAvaliable(locale)) {
      this.current = locale;
    }
  }

  isAvaliable(langName: string) {
    return typeof this.langs[langName] !== 'undefined';
  }

  add(langName: string, lang: LangItem) {
    this.langs[langName] = lang;
  }

  setCurrent(langName: string) {
    if (!this.isAvaliable(langName)) {
      throw new Error(`Language ${langName} is not exists`);
    }
    if (this.current !== langName) {
      this.current = langName;
      emitter.emit(emitter.EVENT_LANG_CHANGE, this, langName, this.langs[langName]);
    }
  }

  get(key: string, placeholders?: { [x: string]: string }) {
    let str = this.langs[this.current][key] || '';
    if (placeholders) {
      Object.keys(placeholders).forEach(k => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), placeholders[k]);
      });
    }
    return str;
  }
}

const i18n = new I18n();
export default i18n;
