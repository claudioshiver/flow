import {Session} from "next-auth";

export type NextSession = Session & {
  user: Session['user'] & {
    id: string
  }
}