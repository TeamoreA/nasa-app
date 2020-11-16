<template>
  
</template>
<script>
import AsteroidDataService from "../services/AsteroidDataService";
export default {
  
  name: "SideDrawer",
  data() {
    return {
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      // menu: false,
      // modal: false,
      start_menu: false,
      end_menu: false
    };
  },
  methods: {
    filterByDate() {
      AsteroidDataService.filterByDate(this.start_date, this.end_date)
      .then(response => {
        this.asteroids
      })
    }
  }
};
</script>
