import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  components: {
    VDataTable,
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          administrator: '#010066',
          member: '#600f18',
          white: '#fff',
          gray: '#808080',
          background: "#f5f5f5",
          anchor: '#000000',
        },
      },
    },
  },
})

