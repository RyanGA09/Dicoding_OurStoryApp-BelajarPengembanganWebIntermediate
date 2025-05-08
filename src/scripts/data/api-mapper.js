import Map from "../utils/map";

export async function storyMapper(story) {
  return {
    ...story,
    location: {
      ...story.location,
      latitude: story.lat,
      longitude: story.lon,
      placeName: await Map.getPlaceNameByCoordinate(story.lat, story.lon),
    },
  };
}