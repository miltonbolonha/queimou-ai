import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Here's what's available on context.geo

  // context: {
  //   geo: {
  //     city?: string;
  //     country?: {
  //       code?: string;
  //       name?: string;
  //     },
  //     subdivision?: {
  //       code?: string;
  //       name?: string;
  //     },
  //     latitude?: number;
  //     longitude?: number;
  //     timezone?: string;
  //   }
  // }

  return Response.json({
    geo: context.geo,
  });
};
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export const config = { path: "/geolocation" };
