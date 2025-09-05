'use strict';
// import { Storage } from "@google-cloud/storage";
// import { onObjectFinalized } from "firebase-functions/v2/storage";
// import { type Ctx, enhanceFunction } from "../manager";
Object.defineProperty(exports, '__esModule', { value: true });
// const storage = new Storage();
// export const newVideoUploaded = onObjectFinalized(
//   { bucket: "raw-videos-watchit.movie" },
//   enhanceFunction(async ({ ds, media }: Pick<Ctx, "ds" | "media">, event) => {
//     const tmpDir = process.env.API_GC_TMP_LOCAL_PATH || "/tmp";
//     const { bucket, name, contentType, size, metadata } = event.data;
//     storage
//       .bucket(bucket)
//       .file(name)
//       .download({ destination: `${tmpDir}${name}` });
//     media.extractSnapshots(`${tmpDir}${name}`, 60, 10, `${tmpDir}/snapshots`);
//     const meta = await media.extractMetadata(`${tmpDir}${name}`);
//     console.log("Metadata", meta);
//     //   const { displayName } = await ds.Users.getUser(authorizedUser);
//     //   const { description, title, year, runtime } = post;
//     //   const enhanceMetadata = ext.HarvestingGraph();
//   }),
// );
//# sourceMappingURL=storage.js.map
