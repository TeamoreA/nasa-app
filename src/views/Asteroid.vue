<template>
  <div class="asteroid">
    <v-card :loading="loading" class="mx-auto" max-width="474" flat>
      <v-card-title>Asteroid details</v-card-title>
      <v-card-text>
        <div class="subtitle-1">
          <span class="font-weight-medium">Name: </span>{{ asteroid.name }}
        </div>
        <div class="subtitle-3">
          <span class="font-weight-medium">Id: </span>{{ asteroid.id }}
        </div>
        <div>
          <span class="font-weight-medium">Designation: </span
          >{{ asteroid.designation }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Extra asteroid data</v-card-title>

      <v-card-text>
        <v-chip
          v-if="asteroid.is_potentially_hazardous_asteroid"
          color="red"
          text-color="white"
          class="mx-2"
        >
          Hazardous
        </v-chip>
        <v-chip v-else color="green" text-color="white" class="mx-2">
          Safe
        </v-chip>
        <v-chip
          v-if="asteroid.is_sentry_object"
          color="default"
          text-color="white"
          class="mx-2"
        >
          None Sentry Object
        </v-chip>
        <v-chip v-else color="primary" text-color="white" class="mx-2">
          Sentry Object
        </v-chip>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6">
              <div class="font-weight-bold mb-2">Orbital data</div>
              <v-divider></v-divider>
              <div>
                <span class="font-weight-medium">Orbit Id: </span
                >{{ asteroid.orbital_data.orbit_id }}
              </div>
              <div>
                <span class="font-weight-medium">Determination date: </span
                ><br />
                {{ computedDateFormattedMomentjs }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="font-weight-bold mb-2">Estimated diameter(KMs)</div>
              <v-divider></v-divider>
              <p>
                <span class="font-weight-medium">Maximum diameter</span>
                {{
                  asteroid.estimated_diameter.kilometers.estimated_diameter_max
                }}
              </p>
              <p>
                <span class="font-weight-medium">Minimum diameter</span>
                {{
                  asteroid.estimated_diameter.kilometers.estimated_diameter_min
                }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import AsteroidDataService from "../services/AsteroidDataService";
export default {
  data() {
    return {
      asteroid: {}
    };
  },
  methods: {
    getAsteroid(asteroid_id) {
      AsteroidDataService.get(asteroid_id)
        .then(response => {
          this.asteroid = response.data;
        })
        .catch(e => {
          this.$toasted.error(e).goAway(2000);
        });
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.asteroid.orbital_data.orbit_determination_date.split(" ")[0]
        ? moment(
            this.asteroid.orbital_data.orbit_determination_date.split(" ")[0]
          ).format("dddd, MMMM Do YYYY")
        : "";
    }
  },
  created() {
    this.getAsteroid(this.$route.params.id);
  }
};
</script>
