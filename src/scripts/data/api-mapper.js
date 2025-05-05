// import Map from "../utils/map";

// export async function storyMapper(story) {
//   return {
//     ...story,
//     location: {
//       ...story.location,
//       placeName: await Map.getPlaceNameByCoordinate(
//         story.location.latitude,
//         story.location.longitude
//       ),
//     },
//   };
// }

import Map from "../utils/map";

export async function storyMapper(story) {
  let placeName = null;

  // Validasi: hanya panggil API jika koordinat tersedia
  if (story.location?.latitude && story.location?.longitude) {
    try {
      placeName = await Map.getPlaceNameByCoordinate(
        story.location.latitude,
        story.location.longitude
      );
    } catch (e) {
      console.error("Gagal mengambil placeName:", e);
    }
  }

  return {
    ...story,
    location: {
      ...(story.location ?? {}),
      placeName,
    },
  };
}
