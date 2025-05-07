<<<<<<< HEAD
import Map from '../utils/map';

export async function storyMapper(story) {
  return {
    ...story,
    location: {
      ...story.location,
      placeName: await Map.getPlaceNameByCoordinate(
        story.location.latitude,
        story.location.longitude
=======
import Map from "@/scripts/utils/map";

export async function reportMapper(report) {
  return {
    ...report,
    location: {
      ...report.location,
      placeName: await Map.getPlaceNameByCoordinate(
        report.location.latitude,
        report.location.longitude
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      ),
    },
  };
}
<<<<<<< HEAD

// import Map from "../utils/map";

// export async function storyMapper(story) {
//   let placeName = null;

//   // Validasi: hanya panggil API jika koordinat tersedia
//   if (story.location?.latitude && story.location?.longitude) {
//     try {
//       placeName = await Map.getPlaceNameByCoordinate(
//         story.location.latitude,
//         story.location.longitude
//       );
//     } catch (e) {
//       console.error("Gagal mengambil placeName:", e);
//     }
//   }

//   return {
//     ...story,
//     location: {
//       ...(story.location ?? {}),
//       placeName,
//     },
//   };
// }
=======
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
