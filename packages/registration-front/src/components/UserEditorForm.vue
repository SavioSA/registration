<template>
  <section class="main-section">
    <v-card class="registration-card" :title="title">
      <v-form ref="formRef">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.name"
                :rules="validation.nameRules"
                label="Nome"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formData.birthday"
                :rules="validation.dateRules"
                type="date"
                label="Data de nascimento"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-container class="buttons-container">
            <v-btn color="error" class="mr-4" @click="returnToMain">
              Cancelar
            </v-btn>
            <v-btn color="success" class="mr-4" @click="validate">
              Cadastrar
            </v-btn>
          </v-container>
        </v-container>
      </v-form>
    </v-card>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserEditorForm",
  props: ["pageTitle"],
  setup(props) {
    const title = computed(() => {
      return props.pageTitle;
    });
    const router = useRouter();
    const usersStore = useUsersStore();
    const formRef = ref(null);
    const formData = reactive({
      name: "",
      birthday: null,
    });
    const getAge = (dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const validation = {
      nameRules: [
        (v) => !!v || "Nome é obrigatório.",
        (v) => v.length <= 100 || "Tamanho Máximo de 100 characters.",
        (v) => v.length >= 3 || "Tamanho Mínimo de 100 characters.",
      ],
      dateRules: [
        (v) => !!v || "Data de nasciemnto é obrigatória.",
        (v) =>
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v) ||
          "Formato de data Inválida.",
        (v) => {
          const age = getAge(v);
          return age < 100 && age >= 18
            ? true
            : "Idade deve ser entre 18 e 100 anos.";
        },
      ],
    };
    const returnToMain = () => {
      router.replace("/");
    };
    const validate = async () => {
      const { valid } = await formRef.value.validate();
      if (valid) {
        await usersStore.createUser(formData);
        const { id } = usersStore.getCurrentUser;
        router.replace(`/users/${id}`);
      }
    };

    return {
      returnToMain,
      validation,
      formRef,
      validate,
      formData,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
section.main-section {
  width: 100%;
  display: flex;
  justify-content: center;
  .registration-card {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .v-card-title {
      font-size: 20pt;
    }
  }
  @media (min-width: 64rem) {
    .registration-card {
      width: 70%;
    }
  }

  .v-form {
    width: 100%;
  }

  .buttons-container {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }
}
</style>