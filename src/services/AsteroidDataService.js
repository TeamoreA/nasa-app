import http from "../http-common";
import * as fb from "../firebase";

const api_key = "IjcPhYKT6gdJimbBam6UqzDSI3p8h4Npd96K1HDz";
class AsteroidDataService {
  get(id) {
    return http.get(`/rest/v1/neo/${id}`, {
      params: { api_key: api_key }
    });
  }
  async create(asteroid) {
    return await fb.asteroidsCollection.add({
      createdOn: new Date(),
      userId: fb.auth.currentUser.uid,
      id: asteroid.id,
      name: asteroid.name,
      is_potentially_hazardous_asteroid:
        asteroid.is_potentially_hazardous_asteroid,
      estimated_diameter_min:
        asteroid.estimated_diameter.kilometers.estimated_diameter_min,
      estimated_diameter_max:
        asteroid.estimated_diameter.kilometers.estimated_diameter_max,
      is_sentry_object: asteroid.is_sentry_object
    });
  }
  async favorites() {
    return await fb.asteroidsCollection.orderBy("createdOn", "desc");
  }
  all() {
    return http.get("/rest/v1/neo/browse", {
      params: { page: 0, size: 12, api_key: api_key }
    });
  }
}

export default new AsteroidDataService();
