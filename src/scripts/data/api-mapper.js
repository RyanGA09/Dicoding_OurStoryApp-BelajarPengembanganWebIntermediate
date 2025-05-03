import Map from "../utils/map";

export async function storyMapper(story) {
  return {
    ...story,
    location: {
      ...story.location,
      placeName: await Map.getPlaceNameByCoordinate(
        story.location.latitude,
        story.location.longitude
      ),
    },
  };
}
