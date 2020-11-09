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
export default {
  data() {
    return {
      asteroid: {
        links: {
          self:
            "http://www.neowsapp.com/rest/v1/neo/2021277?api_key=juxxowzMO7hTnMNLZahCoGra3I4DXETV7j5rWbJJ"
        },
        id: "2021277",
        neo_reference_id: "2021277",
        name: "21277 (1996 TO5)",
        designation: "21277",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2021277",
        absolute_magnitude_h: 16.1,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 1.6016033798,
            estimated_diameter_max: 3.5812940302
          },
          meters: {
            estimated_diameter_min: 1601.6033797856,
            estimated_diameter_max: 3581.2940301941
          },
          miles: {
            estimated_diameter_min: 0.9951898937,
            estimated_diameter_max: 2.2253122528
          },
          feet: {
            estimated_diameter_min: 5254.6044325359,
            estimated_diameter_max: 11749.652706022
          }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "1945-06-07",
            close_approach_date_full: "1945-Jun-07 22:35",
            epoch_date_close_approach: -775272300000,
            relative_velocity: {
              kilometers_per_second: "15.509475255",
              kilometers_per_hour: "55834.1109179878",
              miles_per_hour: "34693.1451979019"
            },
            miss_distance: {
              astronomical: "0.0334232931",
              lunar: "13.0016610159",
              kilometers: "5000053.456145697",
              miles: "3106889.1492847386"
            },
            orbiting_body: "Mars"
          }
        ],
        orbital_data: {
          orbit_id: "165",
          orbit_determination_date: "2020-08-02 06:25:53",
          first_observation_date: "1990-02-04",
          last_observation_date: "2020-05-13",
          data_arc_in_days: 11056,
          observations_used: 659,
          orbit_uncertainty: "0",
          minimum_orbit_intersection: ".313031",
          jupiter_tisserand_invariant: "3.267",
          epoch_osculation: "2459000.5",
          eccentricity: ".5205881328788736",
          semi_major_axis: "2.376601474329985",
          inclination: "20.9522649964117",
          ascending_node_longitude: "167.3841289832412",
          orbital_period: "1338.236805731597",
          perihelion_distance: "1.13937095021136",
          perihelion_argument: "250.1729632865032",
          aphelion_distance: "3.613831998448611",
          perihelion_time: "2458492.539291811604",
          mean_anomaly: "136.6468581379752",
          mean_motion: ".2690106851479045",
          equinox: "J2000",
          orbit_class: {
            orbit_class_type: "AMO",
            orbit_class_description:
              "Near-Earth asteroid orbits similar to that of 1221 Amor",
            orbit_class_range: "1.017 AU < q (perihelion) < 1.3 AU"
          }
        },
        is_sentry_object: false
      }
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.asteroid.orbital_data.orbit_determination_date.split(" ")[0]
        ? moment(
            this.asteroid.orbital_data.orbit_determination_date.split(" ")[0]
          ).format("dddd, MMMM Do YYYY")
        : "";
    }
  }
};
</script>
