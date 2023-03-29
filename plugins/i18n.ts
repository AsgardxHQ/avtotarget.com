import uk from '@/locales/uk.json';
import ru from '@/locales/ru.json';
const localStrings = {
  uk, ru
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      t: (key: string) => {
        const lang = localStrings[nuxtApp._route.params.locale];
        if(!nuxtApp._route.params.locale || !lang) return null;
        if(key.indexOf('.') !== -1) {
          const [p1, p2] = key.split('.');
          return lang[p1] ? lang[p1][p2] || '' : '';
        } else {
          return lang[key] || ''
        }
      }
    }
  }
})