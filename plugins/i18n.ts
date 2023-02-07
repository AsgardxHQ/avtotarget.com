import uk from '@/locales/uk.json';
import ru from '@/locales/ru.json';
const localStrings = {
  uk, ru
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      t: (key: string) => {
        if(key.indexOf('.') !== -1) {
          const [p1, p2] = key.split('.');
          return localStrings[nuxtApp._route.params.locale][p1][p2] || ''
        } else {
          return localStrings[nuxtApp._route.params.locale][key] || ''
        }
      }
    }
  }
})