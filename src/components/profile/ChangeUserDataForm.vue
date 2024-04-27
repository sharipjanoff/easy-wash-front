<template>
  <div className="change-user-data-form"></div>
</template>

<script setup></script>

<style scoped lang="scss">
.change-user-data-form {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21px;

    .error {
      color: #a20000;
    }
  }
}

.button {
  margin-top: -15px;
}
</style>
