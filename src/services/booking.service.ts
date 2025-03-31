import { Booking } from "../models/bookings.model";
import { IPageFilter, PageMeta } from "../utils/pageMeta";

export const getEventBookings = async (
 filters: IPageFilter,
 userId: string
) => {
 let { limit = 10, page = 1 } = filters;
 try {
  limit = Number(limit);
  page = Number(page);
  let matchStage: { [key: string]: any } = { user: userId };

  const totalCount = await Booking.countDocuments(matchStage);
  const events = await Booking.find(matchStage)
   .sort({ createdAt: -1 })
   .skip((page - 1) * limit)
   .limit(limit);

  const meta = new PageMeta({ page, limit }, totalCount);
  return {
   events,
   meta,
  };
 } catch (error) {
  throw error;
 }
};
