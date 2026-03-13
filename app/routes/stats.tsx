import type { Route } from "./+types/home";
import Stats from "../pages/stats";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Stat() {
  return <Stats />;
}
