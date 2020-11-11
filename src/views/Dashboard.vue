<template>
  <div class="dashboard">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="3" class="mt-5">
          <SideDrawer />
        </v-col>
        <v-col cols="9">
          <div>
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="(asteroid, i) in asteroids.near_earth_objects"
                  :key="i"
                  cols="3"
                >
                  <v-card class="mx-auto" max-width="344">
                    <v-card-text>
                      <div>
                        <span>Id: {{ asteroid.id }}</span>
                        <v-btn
                          class="float-right"
                          text
                          icon
                          color="default lighten-2"
                          @click="favoriteAsteroid(asteroid)"
                        >
                          <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                      </div>
                      <div class="text--primary">Name: {{ asteroid.name }}</div>
                      <p>
                        Min diameter(KM):
                        {{
                          asteroid.estimated_diameter.kilometers
                            .estimated_diameter_min
                        }}
                      </p>
                      <p>
                        Max diameter(KM):
                        {{
                          asteroid.estimated_diameter.kilometers
                            .estimated_diameter_max
                        }}
                      </p>
                      <v-chip
                        v-if="asteroid.is_potentially_hazardous_asteroid"
                        small
                        color="red"
                        text-color="white"
                      >
                        Hazardous
                      </v-chip>
                      <v-chip v-else small color="green" text-color="white">
                        Safe
                      </v-chip>
                      <v-chip
                        v-if="asteroid.is_sentry_object"
                        color="default"
                        text-color="white"
                        class="mx-2"
                        small
                      >
                        None Sentry Object
                      </v-chip>
                      <v-chip
                        v-else
                        color="primary"
                        text-color="white"
                        class="mx-2"
                        small
                      >
                        Sentry Object
                      </v-chip>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        @click="viewAsteroid(asteroid.id)"
                        text
                        color="primary accent-4"
                      >
                        Learn More
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SideDrawer from "@/components/SideDrawer";
import AsteroidDataService from "../services/AsteroidDataService";
export default {
  name: "Dashboard",
  props: ["id"],
  data() {
    return {
      asteroids: {}
    };
  },
  components: {
    SideDrawer
  },
  methods: {
    viewAsteroid(id) {
      this.$router.push({ name: "Asteroid", params: { id } });
    },
    getAsteroids() {
      AsteroidDataService.all()
        .then(response => {
          this.asteroids = response.data;
        })
        .catch(e => {
          this.$toasted.error(e).goAway(2000);
        });
    },
    favoriteAsteroid(asteroid) {
      // console.log("asteroid ddata");
      // console.log(asteroid.id);
      AsteroidDataService.create(asteroid)
        .then(() => {
          this.$toasted.success("Added to favorites successfully").goAway(2000);
        })
        .catch(e => {
          this.$toasted.error(e).goAway(2000);
        });
    }
  },
  created() {
    this.getAsteroids();
  }
};
</script>
