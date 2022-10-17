<template>
    <v-footer class="white footer">
      <v-row class="justify-center pt-8">
          <v-col cols="2">
            <v-img src="../assets/stepApp.png" class="footImg" ></v-img>
            <p class="pt-2">Ⓒ 2022 Step.com or its affiliates</p>
          </v-col>
          <v-col cols="2" class="pa-14">
            <v-select
              outlined
              :items="languages"
              label="EN"
            ></v-select>
          </v-col>

      </v-row>
    </v-footer>
</template>

<style scoped>
   .footer p {
    font-size: 20px;
  }

  .footImg {
    max-width: 250px;
  }
</style>

<script>
    export default{
        name: 'FooterBar',
        data: () => ({
            languages: ['EN', 'ESP', 'POR'],
        }),
    }
</script>
