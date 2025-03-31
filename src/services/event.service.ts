import { Event } from "../models/event.model";
import { IPageFilter, PageMeta } from "../utils/pageMeta";

export const getUserEvents = async (filters: IPageFilter, userId: string) => {
 let { limit = 10, page = 1 } = filters;
 try {
  limit = Number(limit);
  page = Number(page);
  let matchStage: { [key: string]: any } = { user: userId };

  const totalCount = await Event.countDocuments(matchStage);
  const events = await Event.find(matchStage)
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

export const handleEventCreation = async (data: any) => {
 try {
  const event = await Event.create(...data);
  return event;
 } catch (error) {
  throw error;
 }
};

export const handleFetchEvent = async (eventId: string, userId: string) => {
 try {
  return await Event.findOne({ _id: eventId, user: userId }).populate("user");
 } catch (error) {
  throw error;
 }
};
