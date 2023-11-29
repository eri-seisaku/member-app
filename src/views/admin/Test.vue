<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Formの内容をPDFに変換 -->
        <form @submit.prevent="exportPDF">
          <label>名前：</label>
          <v-text-field
            v-model="formData.name"
            variant="outlined"
          ></v-text-field>
          <label>メールアドレス：</label>
          <v-text-field
            v-model="formData.email"
            variant="outlined"
          ></v-text-field>
          <label>電話番号：</label>
          <v-text-field
            v-model="formData.phone"
            variant="outlined"
          ></v-text-field>
          <v-btn type="submit" variant="outlined">送信</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
// exportPdf
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const formData = ref({
  name: '',
  email: ''
});

const exportPDF = () => {
    const { name, email, phone } = formData.value;

    const docDefinition = {
        content: [
            { text: 'title', style: 'header' },
            { text: `Name: ${name}`, style: 'subheader' },
            { text: `Email: ${email}`, style: 'subheader' },
            { text: `Tel: ${phone}`, style: 'subheader' },
        ],
        styles: {
            header: { fontSize: 18, bold: true },
            subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        },
    };

    pdfMake.createPdf(docDefinition).open();
};

</script>
