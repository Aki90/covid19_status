<template>
  <footer>
    <address>
      <p>
        API address :
        <a href="https://api.dropper.tech/" target="_blank">
          https://api.dropper.tech
        </a>
      </p>
      <p>
        Copyright 2020 by
        <a href="https://github.com/Aki90" target="_blank">
          Aki90 ( Sehun Jeong ).
        </a>
        All right reserved
      </p>
    </address>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  // margin: 1rem auto;
  margin-top: 1rem;
  font-style: italic;
  padding: 50px 0;

  address p {
    font-size: 0.8rem;
    text-align: right;
    color: #8f8f8f;
    padding-bottom: 0.1rem;

    a {
      color: #8f8f8f;
    }
  }
}

// 미디어쿼리
@media (max-width: 1280px) {
  footer address p {
    margin-right: 0.5rem;
  }
}
/* Mobile, Tablet Device */
@media (max-width: 768px) {
  footer address p {
    font-size: 0.5rem;

    a {
      font-size: 0.6rem;
    }
  }
}
</style>
