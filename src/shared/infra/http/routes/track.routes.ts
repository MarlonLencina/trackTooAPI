import { CreateTrackController } from "@modules/track/useCases/createTrack/createTrackController";
import { DeleteTrackController } from "@modules/track/useCases/deleteTrack/deleteTrackController";
import { GetTrackByUserController } from "@modules/track/useCases/getAllTrackByUser/getAllTrackByUserController";
import { GetTrackByIdController } from "@modules/track/useCases/getTrackById/getTrackByIdController";
import { Router } from "express";
import { ensureAuthenticated } from "../MIddlewares/ensureAuthenticated";

export const trackRoutes = Router()

const createTrackController = new CreateTrackController()
const getTrackByUserController = new GetTrackByUserController()
const getTrackByIdController = new GetTrackByIdController()
const deleteTrackController = new DeleteTrackController()

trackRoutes.post('/', ensureAuthenticated, createTrackController.handle);

trackRoutes.get('/', ensureAuthenticated, getTrackByUserController.handle);

trackRoutes.get('/:track_id', ensureAuthenticated, getTrackByIdController.handle);

trackRoutes.delete('/:track_id', ensureAuthenticated, deleteTrackController.handle);
