<template>
  <div class="dashboard">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="3" class="mt-5">
          <v-card flat height="400px">
            <v-list dense>
              <v-subheader class="title">Filter by date</v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-menu
                    v-model="start_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="start_date"
                        label="Start date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="start_date"
                      @input="start_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-menu
                    v-model="end_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="end_date"
                        label="End date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="end_date"
                      @input="end_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- <v-card-actions> -->
            <v-btn @click="filterByDate()" text color="primary accent-4">
              Filter
            </v-btn>
            <!-- </v-card-actions> -->
          </v-card>
        </v-col>
        <v-col cols="9">
          <div>
            <v-container fluid>
              <!-- filtered data -->
              <v-row v-if="Object.keys(filtered_asteroids).length !== 0">
                <v-row v-for="(asteroid_row, i) in daylist" :key="i">
                  <!-- <v-row> -->
                    
                  <!-- </v-row> -->
                  <v-row>
                    <p class="font-weight-medium mx-auto">{{computedDateFormattedMomentjs(asteroid_row)}}</p>
                     <v-col
                    v-for="(asteroid, i) in filtered_asteroids
                      .near_earth_objects[asteroid_row]"
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
                        <div class="text--primary">
                          Name: {{ asteroid.name }}
                        </div>
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
                 
                </v-row>
              </v-row>
              <!-- dashboard data -->
              <v-row v-else>
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
// import SideDrawer from "@/components/SideDrawer";
import moment from "moment";
import AsteroidDataService from "../services/AsteroidDataService";
export default {
  name: "Dashboard",
  props: ["id"],
  data() {
    return {
      asteroids: {},
      filtered_asteroids: {},
      daylist: [],
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      start_menu: false,
      end_menu: false
    };
  },
  methods: {
    getDaysArray(start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    },
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
      AsteroidDataService.create(asteroid)
        .then(() => {
          this.$toasted.success("Added to favorites successfully").goAway(2000);
        })
        .catch(e => {
          this.$toasted.error(e).goAway(2000);
        });
    },
    filterByDate() {
      AsteroidDataService.filterByDate(this.start_date, this.end_date)
        .then(response => {
          console.log("***response data***");
          console.log(response.data);
          var mydaylist = this.getDaysArray(
            new Date(this.start_date),
            new Date(this.end_date)
          );
          console.log("***date format***");
          console.log(new Date("2018-05-01"));
          this.daylist = mydaylist.map(v => v.toISOString().slice(0, 10));
          console.log("day list");
          console.log(this.daylist);
          this.filtered_asteroids = response.data;
          // location.reload();
        })
        .catch(e => {
          this.$toasted.error(e).goAway(2000);
        });
    }
  },
  computed: {
    computedDateFormattedMomentjs(mydate) {
      return mydate
        ? moment(
            mydate
          ).format("dddd, MMMM Do YYYY")
        : "";
    }
  },
  created() {
    this.getAsteroids();
  }
};
</script>
