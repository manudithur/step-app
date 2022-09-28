import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#1B56ED',
            secondary: '#55B8FF',
            accent: '#BAE2FF',
            textColor: '#5A6175',
            background: '#1B56ED'
          },
        },
      },
});
