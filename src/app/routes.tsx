import { createHashRouter } from "react-router";
import Landing from "./pages/Landing";
import QuestionnaireStep1 from "./pages/QuestionnaireStep1";
import QuestionnaireStep2 from "./pages/QuestionnaireStep2";
import Matches from "./pages/Matches";
import Map from "./pages/Map";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

export const router = createHashRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/questionnaire/step1",
    Component: QuestionnaireStep1,
  },
  {
    path: "/questionnaire/step2",
    Component: QuestionnaireStep2,
  },
  {
    path: "/matches",
    Component: Matches,
  },
  {
    path: "/map",
    Component: Map,
  },
  {
    path: "/messages",
    Component: Messages,
  },
  {
    path: "/messages/chat/:conversationId",
    Component: Chat,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
